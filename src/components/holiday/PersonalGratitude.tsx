"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Download, Heart, Mail, Pencil, Share2, Sprout } from "lucide-react";
import { leafStyles, type LeafColor } from "@/data/gratitudeGarden";
import { decodeGratitudeCard, encodeGratitudeCard, gratitudeCardEmail, gratitudeCardFingerprint, gratitudeCardUrl, GRATITUDE_CARD_PATH, validateGratitudeCard, type GratitudeCard } from "@/lib/gratitudeCard";
import { gardenRequest } from "@/lib/gratitudeApi";
import { downloadPostcard } from "@/lib/gratitudePostcard";
import Leaf from "./Leaf";
import "./gratitudeGarden.css";
import "./gratitudeCard.css";

function CardArtwork({ card, preview = false }: { card: GratitudeCard; preview?: boolean }) {
  const palette = leafStyles.find(leaf => leaf.id === card.color) ?? leafStyles[0];
  return <article className="personal-thanks-card" aria-label={preview ? "Your card preview" : "Your gratitude card"} style={{ "--card-tint": palette.pale, "--card-color": palette.color } as CSSProperties}>
    <img className="thanks-card-garden" src="/holiday/gratitude-garden-flourishing.png" alt="A lush watercolor autumn garden with two fluffy alpacas." width="1536" height="1024" />
    <div className="thanks-card-message">
      <Leaf color={card.color} className="thanks-card-leaf" />
      <p className="eyebrow">A LITTLE THANK-YOU FOR</p>
      <h2>{card.recipient || "someone special"}</h2>
      <blockquote>{card.message || "Thank you for making my world a little warmer."}</blockquote>
      <p className="thanks-card-author">With gratitude,<br /><strong>{card.author.trim() || "A grateful little paca"}</strong></p>
      <div className="thanks-card-signature"><img src="/holiday/panchita-scarf.png" alt="Panchita wearing her autumn scarf" width="48" height="60" /><span>A little card.<br />A whole lot of love.</span></div>
    </div>
  </article>;
}

export default function PersonalGratitude({ embedded = false }: { embedded?: boolean }) {
  const [ready, setReady] = useState(false);
  const [received, setReceived] = useState<GratitudeCard | null>(null);
  const [invalidLink, setInvalidLink] = useState(false);
  const [prepared, setPrepared] = useState<GratitudeCard | null>(null);
  const [recipient, setRecipient] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState<LeafColor>("maple");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [growthError, setGrowthError] = useState("");
  const [growthStatus, setGrowthStatus] = useState<"" | "connecting" | "counted" | "already-counted" | "preview" | "error">("");
  const [growthAttempt, setGrowthAttempt] = useState(0);
  const started = useRef(0);
  const trap = useRef<HTMLInputElement>(null);
  const successTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const readLink = () => {
      setInvalidLink(false); setReceived(null);
      if (!embedded && window.location.hash) {
        try { setReceived(decodeGratitudeCard(window.location.hash)); }
        catch { setInvalidLink(true); }
      }
      setReady(true);
    };
    readLink(); started.current = Date.now(); setCanShare(typeof navigator.share === "function");
    window.addEventListener("hashchange", readLink);
    return () => window.removeEventListener("hashchange", readLink);
  }, [embedded]);

  useEffect(() => { if (prepared) successTitle.current?.focus(); }, [prepared]);

  useEffect(() => {
    if (!received?.growthId) { setGrowthStatus(""); return; }
    let active = true;
    setGrowthStatus("connecting");
    void (async () => {
      try {
        const response = await gardenRequest("/api/cards/open", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: received.growthId }), signal: AbortSignal.timeout(10000) });
        const data = await response.json() as { status?: "counted" | "already-counted" | "preview" };
        if (!response.ok || !data.status || !["counted", "already-counted", "preview"].includes(data.status)) throw new Error("Tree unavailable");
        if (active) setGrowthStatus(data.status);
      } catch { if (active) setGrowthStatus("error"); }
    })();
    return () => { active = false; };
  }, [received?.growthId, growthAttempt]);

  const card = received ?? prepared;
  const url = card ? gratitudeCardUrl(card) : "";

  async function connectCard(draft: GratitudeCard) {
    setPreparing(true); setGrowthError("");
    try {
      const fingerprint = await gratitudeCardFingerprint(draft);
      const response = await gardenRequest("/api/cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fingerprint, elapsed: Date.now() - started.current, website: trap.current?.value ?? "" }), signal: AbortSignal.timeout(10000) });
      const data = await response.json() as { id?: string; error?: string };
      if (!response.ok || !data.id) throw new Error(data.error || "The tree couldn’t connect to your card yet.");
      setPrepared(validateGratitudeCard({ ...draft, growthId: data.id }));
    } catch (e) {
      setPrepared(draft);
      setGrowthError(`${e instanceof Error ? e.message : "The tree couldn’t connect yet."} Your card still works. Retry before sharing to let it grow the tree.`);
    } finally { setPreparing(false); }
  }

  async function prepare(event: FormEvent) {
    event.preventDefault(); if (preparing) return;
    setError(""); setNotice("");
    let draft: GratitudeCard;
    try {
      draft = validateGratitudeCard({ recipient, message, author, color });
      if (email.trim()) gratitudeCardEmail(draft, email);
    }
    catch (e) { setError(e instanceof Error ? e.message : "Please check your card."); return; }
    await connectCard(draft);
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setNotice("Link copied. Paste it into an email, text or DM to send your card."); }
    catch { setNotice("Select and copy the card link below, then paste it into your message."); }
  }

  function emailCard(event: FormEvent) {
    event.preventDefault(); if (!card) return;
    setEmailError("");
    try {
      const draft = gratitudeCardEmail(card, email);
      window.location.href = draft.href;
      setNotice("Review the draft in your email app, then send it. If no draft opens, copy the card link into your email.");
    } catch (e) { setEmailError(e instanceof Error ? e.message : "Please check the email address."); }
  }

  async function share() {
    if (!card || sharing) return;
    if (!canShare) { await copyLink(); return; }
    setSharing(true); setNotice("");
    try { await navigator.share({ title: `A little thanks for ${card.recipient}`, text: "I made you a little gratitude card. 🍂", url }); }
    catch (e) {
      if (e instanceof Error && e.name === "AbortError") setNotice("Your card is ready whenever you are.");
      else setNotice("Sharing couldn’t open. You can copy the link below instead.");
    } finally { setSharing(false); }
  }

  async function download() {
    if (!card || downloading) return;
    setDownloading(true); setNotice("");
    try { await downloadPostcard(card, card.recipient); setNotice("Your keepsake is ready to save."); }
    catch { setNotice("The keepsake couldn’t download. Please try again."); }
    finally { setDownloading(false); }
  }

  const composer = <section className="thanks-layout" aria-label="Make and share a gratitude card">
        <div className="thanks-compose-panel">
          {prepared ? <div className="thanks-ready">
            <span className="thanks-ready-icon"><Check size={25} /></span>
            <p className="eyebrow">READY TO MAKE SOMEONE SMILE</p>
            <h2 ref={successTitle} tabIndex={-1}>A little love for {prepared.recipient}.</h2>
            <p>Your card is ready. Email a little kindness or share the link.</p>
            {prepared.growthId && <p className="thanks-growth-promise"><Sprout size={15} /> One leaf joins our tree when someone opens your card. Your own preview won’t count.</p>}
            {growthError && <div className="thanks-growth-error" role="status"><p>{growthError}</p><button onClick={() => void connectCard(prepared)} disabled={preparing}>{preparing ? "Connecting…" : "Retry tree connection"}</button></div>}
            <form className="thanks-email-form" onSubmit={emailCard}>
              <label htmlFor="thanks-email">Their email</label>
              <input id="thanks-email" type="email" inputMode="email" autoComplete="off" autoCapitalize="none" spellCheck={false} value={email} onChange={event => { setEmail(event.target.value); setEmailError(""); }} placeholder="friend@example.com" maxLength={254} required aria-describedby="thanks-email-help" />
              <button className="thanks-email-button" type="submit"><Mail size={15} /> Email this card</button>
              <p id="thanks-email-help">Opens a draft in your email app. Review it, then send. We don’t save their email.</p>
              {emailError && <p className="form-error" role="alert">{emailError}</p>}
            </form>
            <button className="primary" onClick={share} disabled={sharing}>{canShare ? <Share2 size={16} /> : <Copy size={16} />}{sharing ? "Opening sharing…" : canShare ? "Share this card" : "Copy card link"}</button>
            <div className="thanks-small-actions">{canShare && <button onClick={copyLink}><Copy size={14} /> Copy link</button>}<button onClick={download} disabled={downloading}><Download size={14} />{downloading ? "Making keepsake…" : "Download PNG"}</button></div>
            <label className="thanks-link-label" htmlFor="card-link">Your card link</label>
            <input id="card-link" className="thanks-link-input" value={url} readOnly onFocus={event => event.currentTarget.select()} />
            <p className="thanks-share-detail">Anyone with this link can open your card.</p>
            <p className="thanks-notice" role="status">{notice}</p>
            <div className="thanks-small-actions"><button onClick={() => { setPrepared(null); setNotice(""); }}><Pencil size={14} /> Edit card</button><a href={`${GRATITUDE_CARD_PATH}#card=${encodeGratitudeCard(prepared)}`} target="_blank" rel="noopener noreferrer">Preview their card <ArrowRight size={14} /></a></div>
          </div> : <form className="thanks-form" onSubmit={prepare}>
            <label htmlFor="thanks-to">Who’s this for?</label>
            <input id="thanks-to" value={recipient} onChange={event => setRecipient(event.target.value)} placeholder="Their name" maxLength={40} required autoComplete="off" />
            <label htmlFor="thanks-email">Their email <span>optional</span></label>
            <input id="thanks-email" type="email" inputMode="email" autoComplete="off" autoCapitalize="none" spellCheck={false} value={email} onChange={event => setEmail(event.target.value)} placeholder="friend@example.com" maxLength={254} aria-describedby="thanks-email-help" />
            <p className="thanks-email-hint" id="thanks-email-help">For an email draft. We don’t save this address.</p>
            <fieldset className="thanks-leaf-picker"><legend>Choose a little leaf</legend><div>{leafStyles.map(leaf => <label key={leaf.id} className={color === leaf.id ? "is-selected" : ""} style={{ "--leaf-color": leaf.color, "--leaf-pale": leaf.pale } as CSSProperties}><input type="radio" name="thanks-leaf" value={leaf.id} checked={color === leaf.id} onChange={() => setColor(leaf.id)} /><Leaf color={leaf.id} /><span>{leaf.name}</span></label>)}</div></fieldset>
            <label htmlFor="thanks-message">What do you want to thank them for?</label>
            <textarea id="thanks-message" value={message} onChange={event => setMessage(event.target.value)} placeholder="Thank you for always making time for me…" rows={4} minLength={2} maxLength={240} required aria-describedby="thanks-message-limit" />
            <p className="thanks-character-count" id="thanks-message-limit">{message.length}/240</p>
            <label htmlFor="thanks-from">Your name <span>optional</span></label>
            <input id="thanks-from" value={author} onChange={event => setAuthor(event.target.value)} placeholder="A grateful little paca" maxLength={40} autoComplete="nickname" />
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="honey" aria-hidden="true"><label>Leave this blank<input name="website" ref={trap} tabIndex={-1} autoComplete="off" /></label></div>
            <button className="primary" type="submit" disabled={preparing}><Mail size={16} />{preparing ? "Making your card…" : "Make my card"}<ArrowRight size={16} /></button>
            <p className="thanks-share-detail">Send by email, text or DM. Anyone with the link can open your card.</p>
            <p className="thanks-growth-promise"><Sprout size={15} /> Each card adds one leaf to our shared tree when someone opens it.</p>
          </form>}
        </div>
        <div className="thanks-preview"><p className="eyebrow">{prepared ? "YOUR LITTLE THANK-YOU" : "A PEEK AT YOUR CARD"}</p><CardArtwork card={prepared ?? { recipient, message, author, color }} preview /></div>
      </section>;

  if (embedded) return <div className="embedded-thanks"><div className="card-sprout"><Mail size={25} strokeWidth={1.4} /></div><p className="eyebrow">A LITTLE KINDNESS, JUST FOR THEM</p><h2>Send a little thanks.</h2><p className="card-intro">A small note. A brighter day.</p>{composer}</div>;

  return <div className="garden-app personal-gratitude-page">
    <main>
      <nav className="garden-return" aria-label="Return to the village"><a href="/paca-village/holiday/gratitude-garden/"><ArrowLeft size={13} /> Gratitude Garden</a><span aria-hidden="true">·</span><a href="/paca-village/">Paca Village</a></nav>
      <header className="thanks-intro">
        <a href="/paca-village/holiday/" aria-label="Paca’s Holiday Village"><img src="/holiday/panchita-scarf.png" alt="Panchita" width="48" height="60" /></a>
        <p className="eyebrow">FROM ONE GRATEFUL HEART TO ANOTHER</p>
        <h1>{received ? <>A little thanks, <em>just for you.</em></> : <>Send someone <em>a little thanks.</em></>}</h1>
        <p>{received ? "Someone’s world is a little brighter with you in it." : "For the person who made your day, or makes every day a little better."}</p>
      </header>

      {!ready ? <p className="thanks-loading" role="status">Opening a little kindness…</p> : invalidLink ? <section className="thanks-empty" aria-labelledby="card-error-title"><Mail size={30} /><h2 id="card-error-title">This little note couldn’t be opened.</h2><p>The link may be incomplete. Ask the sender to copy and share the whole card link again.</p><a className="primary" href={GRATITUDE_CARD_PATH}>Make a new card <ArrowRight size={15} /></a></section> : received ? <section className="thanks-received" aria-label="A personal gratitude card">
        <CardArtwork card={received} />
        {growthStatus && <div className="thanks-growth-note" role="status"><Sprout size={18} /><p>{growthStatus === "connecting" ? "Finding this kindness a place in the garden…" : growthStatus === "preview" ? "This is your preview. Your card adds one leaf when someone else opens the link." : growthStatus === "error" ? "Your card is here. The tree couldn’t update just yet." : "This little thank-you has added one leaf to our shared tree. The message stays on this card."}</p>{growthStatus === "error" ? <button onClick={() => setGrowthAttempt(value => value + 1)}>Try again</button> : growthStatus !== "connecting" && <a href="/paca-village/holiday/gratitude-garden/">See the growing garden <ArrowRight size={13} /></a>}</div>}
        <div className="thanks-recipient-actions"><button className="primary" onClick={download} disabled={downloading}><Download size={16} />{downloading ? "Making your keepsake…" : "Save this keepsake"}</button><a href={GRATITUDE_CARD_PATH}>Send a little thanks back <ArrowRight size={15} /></a></div>
        <p className="thanks-notice" role="status">{notice}</p>
      </section> : composer}
      <footer className="thanks-footer"><Heart size={13} /><span>Little thanks make a big garden.</span><a href="/paca-village/holiday/gratitude-garden/">Visit the garden <ArrowRight size={13} /></a></footer>
    </main>
  </div>;
}
