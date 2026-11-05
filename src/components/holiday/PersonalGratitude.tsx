"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Download, Heart, Mail, Pencil, Share2, Sprout } from "lucide-react";
import { leafStyles, type LeafColor } from "@/data/gratitudeGarden";
import { decodeGratitudeCard, encodeGratitudeCard, gratitudeCardEmail, gratitudeCardImageShare, gratitudeCardFingerprint, gratitudeCardUrl, GRATITUDE_CARD_PATH, validateGratitudeCard, type GratitudeCard } from "@/lib/gratitudeCard";
import { createGratitudeEmailFile } from "@/lib/gratitudeEmailFile";
import { gardenRequest } from "@/lib/gratitudeApi";
import { canSharePostcard, createPostcardFile, downloadPostcard, savePostcardFile } from "@/lib/gratitudePostcard";
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
  const [imageView, setImageView] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [prepared, setPrepared] = useState<GratitudeCard | null>(null);
  const [recipient, setRecipient] = useState("");
  const [postcard, setPostcard] = useState<{ card: GratitudeCard; file: File; preview: string; shareable: boolean; emailUrl: string } | null>(null);
  const [postcardError, setPostcardError] = useState("");
  const [postcardAttempt, setPostcardAttempt] = useState(0);
  const [emailSharing, setEmailSharing] = useState(false);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState<LeafColor>("maple");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
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
      const showImage = !embedded && new URLSearchParams(window.location.search).get("view") === "image";
      setImageView(showImage);
      if (!embedded && (window.location.hash || showImage)) {
        try { setReceived(decodeGratitudeCard(window.location.hash)); }
        catch { setInvalidLink(true); }
      }
      setReady(true);
    };
    readLink(); started.current = Date.now();
    window.addEventListener("hashchange", readLink);
    return () => window.removeEventListener("hashchange", readLink);
  }, [embedded]);

  useEffect(() => { if (prepared) successTitle.current?.focus(); }, [prepared]);

  const imageCard = prepared ?? (imageView ? received : null);
  useEffect(() => {
    setPostcard(null); setPostcardError("");
    if (!imageCard) return;
    let active = true;
    let preview = "";
    let emailUrl = "";
    // Render the same image for the sender and for recipients following the image link.
    void createPostcardFile(imageCard, imageCard.recipient).then(async file => {
      if (!active) return;
      preview = URL.createObjectURL(file);
      const result = { card: imageCard, file, preview, shareable: canSharePostcard(file, navigator), emailUrl: "" };
      setPostcard(result);
      if (!prepared) return;
      const email = await createGratitudeEmailFile(prepared, file);
      if (!active) return;
      emailUrl = URL.createObjectURL(email);
      setPostcard({ ...result, emailUrl });
    }).catch(() => {
      if (active) setPostcardError(prepared ? "The email attachment couldn’t be prepared." : "The postcard image couldn’t be loaded.");
    });
    return () => {
      active = false;
      if (preview) URL.revokeObjectURL(preview);
      if (emailUrl) URL.revokeObjectURL(emailUrl);
    };
  }, [imageCard, prepared, postcardAttempt]);

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
  const readyPostcard = postcard?.card === card ? postcard : null;
  const emailDraft = prepared && gratitudeCardEmail(prepared);

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
    try { draft = validateGratitudeCard({ recipient, message, author, color }); }
    catch (e) { setError(e instanceof Error ? e.message : "Please check your card."); return; }
    await connectCard(draft);
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setNotice("Link copied. Paste it into an email, text or DM to send your card."); }
    catch { setNotice("Select and copy the card link below, then paste it into your message."); }
  }

  async function sharePostcard() {
    if (!prepared || !readyPostcard?.shareable || emailSharing) return;
    setNotice("");
    setEmailSharing(true);
    try {
      await navigator.share(gratitudeCardImageShare(prepared, readyPostcard.file));
      setNotice("Add the recipient and send in the app you chose.");
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") setNotice("Sharing closed. Your postcard is ready whenever you are.");
      else setNotice("Sharing couldn’t open. Use Gmail or download the attached email above.");
    } finally { setEmailSharing(false); }
  }

  async function download() {
    if (!card || downloading) return;
    setDownloading(true); setNotice("");
    try {
      if (readyPostcard) savePostcardFile(readyPostcard.file);
      else await downloadPostcard(card, card.recipient);
      setNotice("Your keepsake is ready to save.");
    }
    catch { setNotice("The keepsake couldn’t download. Please try again."); }
    finally { setDownloading(false); }
  }

  const composer = <section className="thanks-layout" aria-label="Make and share a gratitude card">
        <div className="thanks-compose-panel">
          {prepared ? <div className="thanks-ready">
            <span className="thanks-ready-icon"><Check size={25} /></span>
            <h2 ref={successTitle} tabIndex={-1}>A little love for {prepared.recipient}.</h2>
            {prepared.growthId && <p className="thanks-growth-promise"><Sprout size={15} /> When they open the card link, a leaf grows on our tree.</p>}
            {growthError && <div className="thanks-growth-error" role="status"><p>{growthError}</p><button onClick={() => void connectCard(prepared)} disabled={preparing}>{preparing ? "Connecting…" : "Retry tree connection"}</button></div>}
            <div className="thanks-email-option">
              {readyPostcard && <img className="thanks-attachment-preview" src={readyPostcard.preview} alt={`Postcard image for ${prepared.recipient}`} width={1600} height={1000} />}
              {!readyPostcard && !postcardError && <p role="status">Preparing your postcard…</p>}
              {emailDraft && <>
                <h3>Email your postcard</h3>
                <a className="primary thanks-gmail" href={emailDraft.gmailHref} target="_blank" rel="noopener noreferrer"><Mail size={15} /> Open Gmail <ArrowRight size={14} /></a>
                <p>Your draft includes links to the postcard image and the garden card.</p>
                {readyPostcard?.emailUrl && <>
                  <a className="thanks-email-button" href={readyPostcard.emailUrl} download="paca-gratitude-email.eml"><Download size={15} /> Download for Apple Mail</a>
                  <p>Open the .eml file in Mail. The postcard PNG is attached.</p>
                </>}
              </>}
              {postcardError && <div className="thanks-growth-error" role="alert"><p>{postcardError}</p><button onClick={() => setPostcardAttempt(value => value + 1)}>Retry email attachment</button></div>}
            </div>
            <p className="thanks-notice" role="status">{notice}</p>
            <details className="thanks-email-instructions">
              <summary>More ways to share</summary>
              <div className="thanks-small-actions">
                {readyPostcard?.shareable && <button onClick={sharePostcard} disabled={emailSharing}><Share2 size={14} />{emailSharing ? "Choosing an app…" : "Share image & link"}</button>}
                <button onClick={copyLink}><Copy size={14} /> Copy link</button>
                <button onClick={download} disabled={downloading}><Download size={14} />{downloading ? "Making keepsake…" : "Download PNG"}</button>
                {emailDraft && <a href={emailDraft.href}><Mail size={14} /> Open default mail app with links</a>}
              </div>
              <label className="thanks-link-label" htmlFor="card-link">Your card link</label>
              <input id="card-link" className="thanks-link-input" value={url} readOnly onFocus={event => event.currentTarget.select()} />
              <p className="thanks-share-detail">Anyone with this link can open your card.</p>
            </details>
            <div className="thanks-small-actions"><button onClick={() => { setPrepared(null); setNotice(""); }}><Pencil size={14} /> Edit card</button><a href={`${GRATITUDE_CARD_PATH}#card=${encodeGratitudeCard(prepared)}`} target="_blank" rel="noopener noreferrer">Preview their card <ArrowRight size={14} /></a></div>
          </div> : <form className="thanks-form" onSubmit={prepare}>
            <label htmlFor="thanks-to">Who’s this for?</label>
            <input id="thanks-to" value={recipient} onChange={event => setRecipient(event.target.value)} placeholder="Their name" maxLength={40} required autoComplete="off" />
            <fieldset className="thanks-leaf-picker"><legend>Choose a little leaf</legend><div>{leafStyles.map(leaf => <label key={leaf.id} className={color === leaf.id ? "is-selected" : ""} style={{ "--leaf-color": leaf.color, "--leaf-pale": leaf.pale } as CSSProperties}><input type="radio" name="thanks-leaf" value={leaf.id} checked={color === leaf.id} onChange={() => setColor(leaf.id)} /><Leaf color={leaf.id} /><span>{leaf.name}</span></label>)}</div></fieldset>
            <label htmlFor="thanks-message">What do you want to thank them for?</label>
            <textarea id="thanks-message" value={message} onChange={event => setMessage(event.target.value)} placeholder="Thank you for always making time for me…" rows={4} minLength={2} maxLength={240} required aria-describedby="thanks-message-limit" />
            <p className="thanks-character-count" id="thanks-message-limit">{message.length}/240</p>
            <label htmlFor="thanks-from">Your name <span>optional</span></label>
            <input id="thanks-from" value={author} onChange={event => setAuthor(event.target.value)} placeholder="A grateful little paca" maxLength={40} autoComplete="nickname" />
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="honey" aria-hidden="true"><label>Leave this blank<input name="website" ref={trap} tabIndex={-1} autoComplete="off" /></label></div>
            <button className="primary" type="submit" disabled={preparing}><Mail size={16} />{preparing ? "Making your card…" : "Make my card"}<ArrowRight size={16} /></button>
            <p className="thanks-share-detail">Email a postcard image or share a card link. You’ll add their email address in your email app.</p>
            <p className="thanks-growth-promise"><Sprout size={15} /> Each card adds one leaf to our shared tree when someone opens it.</p>
          </form>}
        </div>
        <div className="thanks-preview"><p className="eyebrow">{prepared ? "YOUR LITTLE THANK-YOU" : "A PEEK AT YOUR CARD"}</p><CardArtwork card={prepared ?? { recipient, message, author, color }} preview /></div>
      </section>;

  if (embedded) return <div className="embedded-thanks"><div className="card-sprout"><Mail size={25} strokeWidth={1.4} /></div><p className="eyebrow">A LITTLE KINDNESS, JUST FOR THEM</p><h2>Send a little thanks.</h2><p className="card-intro">A small note. A brighter day.</p>{composer}</div>;

  return <div className="garden-app personal-gratitude-page">
    <main>
      <nav className="garden-return" aria-label="Return to the village"><a href="/paca-village/holiday/gratitude-garden/"><ArrowLeft size={13} /> Gratitude Garden</a><span aria-hidden="true">·</span><a href="/paca-village/">Paca Village</a></nav>
      {imageView && received ? <header className="thanks-image-title"><h1>Your postcard, {received.recipient}</h1></header> : <header className="thanks-intro">
        <a href="/paca-village/holiday/" aria-label="Paca’s Holiday Village"><img src="/holiday/panchita-scarf.png" alt="Panchita" width="48" height="60" /></a>
        <p className="eyebrow">FROM ONE GRATEFUL HEART TO ANOTHER</p>
        <h1>{received ? <>A little thanks, <em>just for you.</em></> : <>Send someone <em>a little thanks.</em></>}</h1>
        <p>{received ? "Someone’s world is a little brighter with you in it." : "For the person who made your day, or makes every day a little better."}</p>
      </header>}

      {!ready ? <p className="thanks-loading" role="status">Opening a little kindness…</p> : invalidLink ? <section className="thanks-empty" aria-labelledby="card-error-title"><Mail size={30} /><h2 id="card-error-title">This little note couldn’t be opened.</h2><p>The link may be incomplete. Ask the sender to copy and share the whole card link again.</p><a className="primary" href={GRATITUDE_CARD_PATH}>Make a new card <ArrowRight size={15} /></a></section> : received ? <section className={imageView ? "thanks-received thanks-image-view" : "thanks-received"} aria-label="A personal gratitude card">
        {imageView ? <>
          {readyPostcard && <img className="thanks-attachment-preview" src={readyPostcard.preview} alt={`Postcard for ${received.recipient}: ${received.message} — ${received.author}`} width={1600} height={1000} />}
          {postcardError && <div className="thanks-growth-error" role="alert">{postcardError} <button onClick={() => setPostcardAttempt(value => value + 1)}>Retry image</button></div>}
          {!readyPostcard && !postcardError && <p className="thanks-loading" role="status">Opening your postcard image…</p>}
          {readyPostcard && <a className="primary" href={readyPostcard.preview} download={readyPostcard.file.name}><Download size={16} /> Save postcard PNG</a>}
        </> : <CardArtwork card={received} />}
        {growthStatus && <div className="thanks-growth-note" role="status"><Sprout size={18} /><p>{growthStatus === "connecting" ? "Finding this kindness a place in the garden…" : growthStatus === "preview" ? "This is your preview. Your card adds one leaf when someone else opens the link." : growthStatus === "error" ? "Your card is here. The tree couldn’t update just yet." : "This little thank-you has added one leaf to our shared tree. The message stays on this card."}</p>{growthStatus === "error" ? <button onClick={() => setGrowthAttempt(value => value + 1)}>Try again</button> : growthStatus !== "connecting" && <a href="/paca-village/holiday/gratitude-garden/">See the growing garden <ArrowRight size={13} /></a>}</div>}
        <div className="thanks-recipient-actions">{!imageView && <button className="primary" onClick={download} disabled={downloading}><Download size={16} />{downloading ? "Making your keepsake…" : "Save this keepsake"}</button>}<a href={GRATITUDE_CARD_PATH}>Send a little thanks back <ArrowRight size={15} /></a></div>
        <p className="thanks-notice" role="status">{notice}</p>
      </section> : composer}
      <footer className="thanks-footer"><Heart size={13} /><span>Little thanks make a big garden.</span><a href="/paca-village/holiday/gratitude-garden/">Visit the garden <ArrowRight size={13} /></a></footer>
    </main>
  </div>;
}
