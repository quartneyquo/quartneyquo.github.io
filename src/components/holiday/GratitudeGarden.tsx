"use client";
import { useState, useEffect, useRef, useCallback, type CSSProperties, type FormEvent } from "react";
import { ArrowRight, ArrowLeft, Heart, Sprout, Download, X, Check, Pause, Play, Sparkles, ChevronRight, Copy, Lock, RefreshCw } from "lucide-react";
import { leafStyles, welcomeNotes, milestones, type LeafColor, type GardenNote } from "@/data/gratitudeGarden";
import { downloadPostcard } from "@/lib/gratitudePostcard";
import Leaf from "./Leaf";
import GardenGrowth from "./GardenGrowth";
import { GardenMusic, LeafAnimation } from "./GardenAtmosphere";
import WindblownLeaves from "./WindblownLeaves";
import { gardenGrowth, GARDEN_MATURITY_COUNT } from "@/lib/gardenGrowth";
import { gardenRequest, gardenServiceUrl } from "@/lib/gratitudeApi";
import "./gratitudeGarden.css";

const positions = [[30,24,-25],[49,16,15],[69,25,22],[20,40,-20],[43,35,16],[61,41,-10],[80,42,25],[36,51,-20],[58,24,10],[72,52,25],[52,49,-15],[25,53,18]];
const prompts = ["A person who made your day a little brighter…", "A small thing you don’t want to take for granted…", "Something that made you smile this week…", "A little comfort that feels like home…"];

export default function GratitudeGarden() {
  const [notes, setNotes] = useState<GardenNote[]>(welcomeNotes);
  const [total, setTotal] = useState<number | null>(null);
  const [loadError, setLoadError] = useState("");
  const [color, setColor] = useState<LeafColor>("maple");
  const [message, setMessage] = useState(""); const [author, setAuthor] = useState("");
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const [planted, setPlanted] = useState<GardenNote | null>(null);
  const [selected, setSelected] = useState<GardenNote | null>(null);
  const [heartBusy, setHeartBusy] = useState(false); const [heartError, setHeartError] = useState("");
  const [paused, setPaused] = useState(true); const [prompt, setPrompt] = useState(0);
  const [postcardBusy, setPostcardBusy] = useState(false); const [notice, setNotice] = useState("");
  const [page, setPage] = useState(0);
  const [previewTotal, setPreviewTotal] = useState<number | null>(null);
  const [growthAnnouncement, setGrowthAnnouncement] = useState("");
  const previousTotal = useRef<number | null>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const scene = useRef<HTMLDivElement>(null);
  const started = useRef(0); const trap = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null); const form = useRef<HTMLElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null); const success = useRef<HTMLHeadingElement>(null);

  const refresh = useCallback(async () => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    try {
      const response = await gardenRequest("/api/garden", { cache: "no-store", signal: controller.signal });
      const data = await response.json() as { error?: string; notes: GardenNote[]; total: number };
      if (!response.ok) throw new Error(data.error);
      if (controller.signal.aborted) return;
      if (previousTotal.current !== null && data.total > previousTotal.current) {
        const added = data.total - previousTotal.current;
        setGrowthAnnouncement(`${added} new ${added === 1 ? "leaf has" : "leaves have"} joined the garden. Our tree is growing!`);
      }
      previousTotal.current = data.total;
      setNotes(data.notes); setTotal(data.total); setLoadError("");
      setPage(current => Math.min(current, Math.max(0, Math.ceil(data.notes.length / 3) - 1)));
      setPlanted(current => current ? data.notes.find(n => n.id === current.id) ?? current : null);
    } catch {
      if (!controller.signal.aborted) setLoadError("The latest community leaves couldn’t refresh. Please try again in a moment.");
    }
  }, []);
  useEffect(() => {
    started.current = Date.now(); void refresh();
    const refreshVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    const timer = window.setInterval(refreshVisible, 30000);
    document.addEventListener("visibilitychange", refreshVisible);
    window.addEventListener("focus", refreshVisible);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", refreshVisible); window.removeEventListener("focus", refreshVisible); activeRequest.current?.abort(); };
  }, [refresh]);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)"); setPaused(reduce.matches);
    const update = () => setPaused(reduce.matches); reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (selected) { if (!dialog.current?.open) dialog.current?.showModal(); }
    else dialog.current?.close();
  }, [selected]);
  const plantedId = planted?.id;
  useEffect(() => { if (plantedId) success.current?.focus(); }, [plantedId]);

  function focusForm() { form.current?.scrollIntoView({ behavior: paused ? "instant" : "smooth", block: "center" }); textarea.current?.focus({ preventScroll: true }); }
  function openNote(note: GardenNote) { setHeartError(""); setSelected(note); }
  async function plant(event: FormEvent) {
    event.preventDefault(); if (busy) return;
    setError(""); setBusy(true);
    try {
      const response = await gardenRequest("/api/garden", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, author, color, website: trap.current?.value ?? "", elapsed: Date.now() - started.current }) });
      const data = await response.json() as { error?: string; notes: GardenNote[]; total: number; note: GardenNote; hearts: number; liked: boolean }; if (!response.ok) throw new Error(data.error);
      setPlanted(data.note); setNotice("");
    } catch (e) { setError(e instanceof Error ? e.message : "Your leaf hasn’t been saved. Please try again."); }
    finally { setBusy(false); }
  }
  async function heart(note: GardenNote) {
    if (heartBusy || note.pending) return; setHeartBusy(true); setHeartError("");
    try {
      const response = await gardenRequest("/api/hearts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: note.id, liked: !note.liked }) });
      const data = await response.json() as { error?: string; notes: GardenNote[]; total: number; note: GardenNote; hearts: number; liked: boolean }; if (!response.ok) throw new Error(data.error);
      const updated = { ...note, hearts: data.hearts, liked: data.liked };
      setNotes(current => current.map(n => n.id === note.id ? updated : n)); setSelected(updated);
    } catch (e) { setHeartError(e instanceof Error ? e.message : "Please try again."); }
    finally { setHeartBusy(false); }
  }
  async function download() {
    if (!planted) return; setPostcardBusy(true); setNotice("");
    try { await downloadPostcard(planted); setNotice("Your little keepsake is ready to take home."); }
    catch { setNotice("The postcard couldn’t download. Please try again."); }
    finally { setPostcardBusy(false); }
  }
  async function copy() {
    if (!planted) return;
    try { await navigator.clipboard.writeText(`“${planted.message}” — ${planted.author}\nLittle thanks make a big garden. ${location.origin}/paca-village/holiday/gratitude-garden/`); setNotice("Your gratitude is copied and ready to share."); }
    catch { setNotice("Copy isn’t available here. You can download your postcard instead."); }
  }
  const liveGrowth = gardenGrowth(total);
  const displayedGrowth = gardenGrowth(previewTotal ?? total);
  const nextMilestone = liveGrowth.next;
  const progressTarget = nextMilestone?.count ?? Math.max(total ?? 0, GARDEN_MATURITY_COUNT);
  function previewMilestone(count: number) {
    setPreviewTotal(count);
    scene.current?.scrollIntoView({ behavior: paused ? "instant" : "smooth", block: "center" });
  }
  const celebrationKey = previewTotal !== null ? `preview-${previewTotal}` : planted?.id;
  const shownNotes = notes.slice(page * 3, page * 3 + 3);
  const palette = leafStyles.find(s => s.id === color)!;

  return <div className={`garden-app ${paused ? "motion-paused" : ""}`}>
    <WindblownLeaves />
    <a className="skip-link" href="#plant">Skip to planting a leaf</a>
    <main>
      <nav className="garden-return" aria-label="Return to the portfolio"><a href="/paca-village/"><ArrowLeft size={13} aria-hidden="true" /> Paca Village</a><span aria-hidden="true">·</span><a href="/">Home</a></nav>
      <section className="garden-intro" aria-labelledby="garden-title">
        <a className="garden-panchita" href="/paca-village/holiday/" aria-label="Paca’s Holiday Village"><img src="/holiday/panchita-scarf.png" alt="Panchita wearing her autumn scarf" width="58" height="70" /></a>
        <div className="season-label"><span /> A COZY CORNER OF THE PACAVERSE <span /></div>
        <h1 id="garden-title">Paca’s <em>Gratitude Garden</em></h1>
        <p>A little place to pause, give thanks, and grow something beautiful together.</p>
        <div className="season-stamp"><Leaf color="golden" /> AUTUMN, WITH LOVE</div>
      </section>
      <section className="garden-experience" id="garden" aria-label="Explore the gratitude tree and plant a leaf">
        <div className="garden-world">
          <div className={`garden-scene ${previewTotal !== null ? "growth-preview-active" : ""}`} ref={scene}>
            <img className="garden-art" src="/holiday/gratitude-garden-beginning.png" alt={displayedGrowth.total >= GARDEN_MATURITY_COUNT ? "A full golden autumn tree with five fluffy watercolor alpacas, fairy lights, pumpkins, a bench, and a wishing fountain." : "A watercolor gratitude garden whose sparse autumn branches fill with leaves as the community grows, with two fluffy alpacas and a winding path."} width="1536" height="1024" fetchPriority="high" />
            <GardenGrowth total={previewTotal ?? total} />
            <LeafAnimation paused={paused}><div className="falling-leaves" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <span key={i} style={{ "--left": `${12 + i * 12}%`, "--delay": `${i * -2.3}s`, "--duration": `${12 + i}s` } as CSSProperties}><Leaf color={leafStyles[i % 5].id} /></span>)}</div></LeafAnimation>
            <div className="tree-notes" aria-label="Gratitude leaves" style={{ "--canopy-scale": displayedGrowth.canopyScale } as CSSProperties}>{notes.slice(0, 12).map((note, i) => <button className="tree-leaf" key={note.id} style={{ left: `${positions[i][0]}%`, top: `${positions[i][1]}%`, "--rotation": `${positions[i][2]}deg`, "--delay": `${i * -.7}s` } as CSSProperties} onClick={() => openNote(note)} aria-label={`Read ${note.author}’s ${note.welcome ? "welcome" : "gratitude"} leaf`}><Leaf color={note.color} /><span className="leaf-dot" /></button>)}</div>
            {planted && !notes.slice(0, 12).some(note => note.id === planted.id) && <button key={planted.id} className="tree-leaf own-leaf" style={{ left: "52%", top: "33%", "--rotation": "10deg" } as CSSProperties} onClick={() => openNote(planted)} aria-label={planted.pending ? "Read your new leaf, awaiting review" : "Read your approved gratitude leaf"}><Leaf color={planted.color} /><span className="leaf-dot" /></button>}
            {celebrationKey && <LeafAnimation key={`twirl-${celebrationKey}`} paused={paused} celebration />}
            {planted && <span className="paca-cheer" key={`cheer-${planted.id}`} aria-hidden="true">♡<br /><span>you made my day!</span></span>}
            <div className="gate-sign">Little thanks make a big garden.</div>
          </div>
          <div className="garden-below"><span><span className="live-dot" /> {total === null ? "The garden is waking up…" : <><strong>{total.toLocaleString()}</strong> approved community {total === 1 ? "leaf" : "leaves"}</>}</span><div className="garden-sound-controls"><button onClick={() => setPaused(!paused)} aria-label={paused ? "Play autumn animations" : "Pause autumn animations"}>{paused ? <Play size={13} /> : <Pause size={13} />}{paused ? "Play" : "Pause"} leaves</button><GardenMusic /></div></div>
          <p className="garden-count-note" role="status">{planted?.pending ? "Your leaf is saved for review. It joins this count once approved." : "New leaves join the count after review and approval."}</p>
          <p className="tree-hint"><Sparkles size={14} /> Tap a fluttering leaf. There’s a little kindness inside.</p>
          <div className="tree-growth-caption">
            {previewTotal !== null ? <><span><Sparkles size={13} /> A peek ahead · {previewTotal.toLocaleString()} leaves</span><button onClick={() => setPreviewTotal(null)}><X size={12} /> Back to our garden</button></> : <><span><Sprout size={13} /> {liveGrowth.stage}</span><span>{total === null ? "Gathering our little thank-yous…" : nextMilestone ? `${liveGrowth.remaining} more to our ${nextMilestone.title.toLowerCase()}` : "A garden full of thanks. A golden kind of magic."}</span></>}
          </div>
          <p className="garden-growth-announcement" role="status" aria-live="polite">{growthAnnouncement}</p>
        </div>
        <aside className="plant-card" id="plant" ref={form} aria-labelledby="plant-title">
          {!planted ? <>
            <div className="card-sprout"><Sprout size={25} strokeWidth={1.4} /></div>
            <p className="eyebrow">SOMETHING GOOD STARTS HERE</p>
            <h2 id="plant-title">Plant a little gratitude.</h2>
            <p className="card-intro">Big or small, there’s room for it all.</p>
            <form onSubmit={plant}>
              <fieldset className="leaf-picker"><legend>01 <span>Choose your leaf</span></legend><div className="leaf-options">{leafStyles.map((s, index) => <label key={s.id} className={color === s.id ? "selected" : ""} style={{ "--leaf-color": s.color, "--leaf-pale": s.pale, "--leaf-tilt": `${[-10, 5, -7, 10, -4][index]}deg` } as CSSProperties}><input type="radio" name="leaf-color" value={s.id} checked={color === s.id} onChange={() => setColor(s.id)} /><span className="leaf-sample"><Leaf color={s.id} /></span><span className="leaf-name">{s.name}</span><span className="color-check" aria-hidden="true">{color === s.id && <Check size={10} strokeWidth={2.5} />}</span></label>)}</div></fieldset>
              <div className="field-label"><label htmlFor="gratitude"><span>02</span> I’m thankful for…</label><button className="inspire" type="button" onClick={() => { setPrompt((prompt + 1) % prompts.length); textarea.current?.focus(); }} aria-label="Show another writing prompt"><Sparkles size={12} /> Inspire me</button></div>
              <div className="textarea-wrap"><textarea ref={textarea} id="gratitude" placeholder={prompts[prompt]} value={message} onChange={e => setMessage(e.target.value)} maxLength={240} minLength={2} required rows={3} aria-describedby="message-limit" /><span id="message-limit">{message.length}/240</span></div>
              <label className="name-label" htmlFor="author">03 <span>Your name</span><small>optional</small></label>
              <input className="name-input" id="author" value={author} onChange={e => setAuthor(e.target.value)} placeholder="A grateful little paca" maxLength={40} autoComplete="nickname" />
              <div className="honey" aria-hidden="true"><label>Leave this blank<input name="website" ref={trap} tabIndex={-1} autoComplete="off" /></label></div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="primary plant-button" type="submit" disabled={busy}><Leaf color={color} />{busy ? "Finding your leaf a home…" : "Plant my gratitude"}<ArrowRight size={16} /></button>
              <p className="moderation-note"><Heart size={12} /> Your leaf joins the garden and counter after approval.</p>
            </form>
          </> : <div className="planted-state">
            <div className="success-leaf" style={{ background: palette.pale }}><Leaf color={planted.color} /><span><Check size={13} /></span></div>
            <p className="eyebrow">ONE LITTLE LEAF. SO MUCH LOVE.</p>
            <h2 id="plant-title" ref={success} tabIndex={-1}>Your gratitude<br />{planted.pending ? "is safely saved!" : "has blossomed!"}</h2>
            <div className="personal-note"><blockquote>“{planted.message}”</blockquote><p>— {planted.author}</p></div>
            <p className="pending-note"><Check size={13} /> {planted.pending ? "Saved · awaiting review" : "Approved · added to the community count"}</p>
            <p className="success-detail">{planted.pending ? "Once reviewed and approved, your leaf will add 1 to the community counter and help the tree grow. No need to submit it again." : "Paca approved your gratitude. It now helps our shared tree grow a little fuller."}</p>
            <button className="primary" onClick={download} disabled={postcardBusy}><Download size={16} />{postcardBusy ? "Making your keepsake…" : "Take home my postcard"}</button>
            <div className="success-actions"><button onClick={copy}><Copy size={13} /> Copy gratitude</button><button onClick={() => { setPlanted(null); setMessage(""); setError(""); setNotice(""); started.current = Date.now(); requestAnimationFrame(() => textarea.current?.focus()); }}>Plant another <ArrowRight size={13} /></button></div>
            <p className="download-notice" role="status">{notice}</p>
          </div>}
        </aside>
      </section>
      {loadError && <div className="load-error" role="status">{loadError}<button onClick={refresh}><RefreshCw size={13} /> Try again</button></div>}
      <section className="kindness-section" id="kindness" aria-labelledby="kindness-title">
        <div className="section-heading"><div><p className="eyebrow">A FEW THOUGHTS FROM THE TREE</p><h2 id="kindness-title">Little leaves. <em>Lovely reminders.</em></h2></div><div className="notes-navigation"><button aria-label="Previous gratitude notes" disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowLeft size={17} /></button><button aria-label="Next gratitude notes" disabled={(page + 1) * 3 >= notes.length} onClick={() => setPage(page + 1)}><ArrowRight size={17} /></button></div></div>
        <div className="note-grid">{shownNotes.map(note => <button className="note-card" key={note.id} onClick={() => openNote(note)} style={{ "--note-bg": leafStyles.find(s => s.id === note.color)?.pale } as CSSProperties}><Leaf color={note.color} /><blockquote>“{note.message}”</blockquote><div><span>— {note.author}{note.welcome && <small>A welcome note</small>}</span><span className="note-heart"><Heart size={14} fill={note.liked ? "currentColor" : "none"} />{note.hearts}</span></div></button>)}</div>
      </section>
      <section className="growing-section" id="growing" aria-labelledby="growing-title">
        <div className="growing-heading"><span className="sprout-circle"><Sprout size={26} strokeWidth={1.3} /></span><div><p className="eyebrow">A LITTLE MORE MAGIC, TOGETHER</p><h2 id="growing-title">Every thank-you helps us grow.</h2><p>Every approved note grows our tree a little fuller. Tap a milestone for a peek at what’s coming.</p></div></div>
        <div className="milestone-track">{milestones.map(m => <button type="button" key={m.count} className={`milestone ${(total ?? 0) >= m.count ? "unlocked" : ""} ${previewTotal === m.count ? "previewing" : ""}`} onClick={() => previewMilestone(m.count)} aria-pressed={previewTotal === m.count} aria-label={`Preview ${m.title.toLowerCase()} at ${m.count.toLocaleString()} gratitude leaves`}><span className="milestone-art" aria-hidden="true">{m.icon}</span><strong>{m.title}</strong><span>{m.count.toLocaleString()} leaves {(total ?? 0) >= m.count && <Check size={12} />}</span></button>)}</div>
        <div className="progress-caption"><span>{total === null ? "Loading approved leaves…" : `${total.toLocaleString()} approved community ${total === 1 ? "leaf" : "leaves"}`}</span><span>{nextMilestone ? `${nextMilestone.count - (total ?? 0)} more to our ${nextMilestone.title.toLowerCase()}` : "A whole garden full of gratitude. Thank you!"}<Sparkles size={12} /></span></div>
        <div className="progress-track" role="progressbar" aria-label="Progress toward the next garden milestone" aria-valuenow={total ?? 0} aria-valuemin={0} aria-valuemax={progressTarget}><span style={{ width: `${Math.min(100, ((total ?? 0) / progressTarget) * 100)}%` }} /></div>
        <p className="milestone-footnote">Only approved community notes grow the tree. Milestone previews are a little peek ahead; they don’t change our leaf count.</p>
      </section>
      <section className="season-footer"><span aria-hidden="true">❄</span><p>A little autumn gratitude. A little winter wishing.<br /><strong>The magic continues next season.</strong></p><span className="coming-next">CHRISTMAS WISHING TREE <span>Coming this winter <ChevronRight size={12} /></span></span></section>
      <div className="final-invitation"><p>There’s always room for one more little thank-you.</p><button onClick={focusForm}>Leave a little kindness <ArrowRight size={15} /></button></div>
    </main>
    <footer className="site-footer"><a className="footer-brand" href="/paca-village/holiday/"><img src="/holiday/panchita-scarf.png" alt="" width="28" height="35" /> Paca’s Holiday Village</a><span>Made with a grateful heart. <Heart size={12} /></span><a href={`${gardenServiceUrl}/keeper`}>Garden keeper <Lock size={12} /></a></footer>
    <dialog aria-label="A gratitude leaf" className="leaf-dialog" ref={dialog} onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={e => { if (e.target === dialog.current) setSelected(null); }}>
      {selected && <div className="leaf-dialog-content" style={{ "--note-bg": leafStyles.find(s => s.id === selected.color)?.pale } as CSSProperties}><button className="dialog-close" onClick={() => setSelected(null)} aria-label="Close gratitude note"><X size={20} /></button><Leaf color={selected.color} className="dialog-leaf" /><p className="eyebrow">{selected.pending ? "YOUR NEW LITTLE LEAF" : selected.welcome ? "A LITTLE WELCOME FROM PACA" : "A LITTLE GRATITUDE FROM THE GARDEN"}</p><blockquote>“{selected.message}”</blockquote><p className="dialog-author">— {selected.author}</p>{selected.pending ? <p className="pending-note">Visible only to you until reviewed.</p> : <button className={`heart-button ${selected.liked ? "is-liked" : ""}`} disabled={heartBusy} onClick={() => heart(selected)} aria-pressed={!!selected.liked}><Heart size={18} fill={selected.liked ? "currentColor" : "none"} />{selected.liked ? "A little love, sent" : "Leave a little love"}<span>{selected.hearts}</span></button>}{heartError && <p role="alert" className="form-error">{heartError}</p>}<p className="dialog-footnote">One little leaf, a whole lot of love.</p></div>}
    </dialog>
  </div>;
}
