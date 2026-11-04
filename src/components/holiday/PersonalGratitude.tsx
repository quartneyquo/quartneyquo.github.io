"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Download, Heart, Mail, Pencil, Share2 } from "lucide-react";
import { leafStyles, type LeafColor } from "@/data/gratitudeGarden";
import { decodeGratitudeCard, encodeGratitudeCard, gratitudeCardUrl, GRATITUDE_CARD_PATH, validateGratitudeCard, type GratitudeCard } from "@/lib/gratitudeCard";
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

export default function PersonalGratitude() {
  const [ready, setReady] = useState(false);
  const [received, setReceived] = useState<GratitudeCard | null>(null);
  const [invalidLink, setInvalidLink] = useState(false);
  const [prepared, setPrepared] = useState<GratitudeCard | null>(null);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState<LeafColor>("maple");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const successTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const readLink = () => {
      setInvalidLink(false); setReceived(null);
      if (window.location.hash) {
        try { setReceived(decodeGratitudeCard(window.location.hash)); }
        catch { setInvalidLink(true); }
      }
      setReady(true);
    };
    readLink(); setCanShare(typeof navigator.share === "function");
    window.addEventListener("hashchange", readLink);
    return () => window.removeEventListener("hashchange", readLink);
  }, []);

  useEffect(() => { if (prepared) successTitle.current?.focus(); }, [prepared]);

  const card = received ?? prepared;
  const url = card ? gratitudeCardUrl(card) : "";

  function prepare(event: FormEvent) {
    event.preventDefault(); setError(""); setNotice("");
    try { setPrepared(validateGratitudeCard({ recipient, message, author, color })); }
    catch (e) { setError(e instanceof Error ? e.message : "Please check your card."); }
  }

  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setNotice("Link copied. Paste it into a text or DM to send your card."); }
    catch { setNotice("Select and copy the card link below, then paste it into your message."); }
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
        <div className="thanks-recipient-actions"><button className="primary" onClick={download} disabled={downloading}><Download size={16} />{downloading ? "Making your keepsake…" : "Save this keepsake"}</button><a href={GRATITUDE_CARD_PATH}>Send a little thanks back <ArrowRight size={15} /></a></div>
        <p className="thanks-notice" role="status">{notice}</p>
      </section> : <section className="thanks-layout" aria-label="Make and share a gratitude card">
        <div className="thanks-compose-panel">
          {prepared ? <div className="thanks-ready">
            <span className="thanks-ready-icon"><Check size={25} /></span>
            <p className="eyebrow">READY TO MAKE SOMEONE SMILE</p>
            <h2 ref={successTitle} tabIndex={-1}>A little love for {prepared.recipient}.</h2>
            <p>Your card is ready. Share it through your favorite messaging app.</p>
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
            <fieldset className="thanks-leaf-picker"><legend>Choose a little leaf</legend><div>{leafStyles.map(leaf => <label key={leaf.id} className={color === leaf.id ? "is-selected" : ""} style={{ "--leaf-color": leaf.color, "--leaf-pale": leaf.pale } as CSSProperties}><input type="radio" name="thanks-leaf" value={leaf.id} checked={color === leaf.id} onChange={() => setColor(leaf.id)} /><Leaf color={leaf.id} /><span>{leaf.name}</span></label>)}</div></fieldset>
            <label htmlFor="thanks-message">What do you want to thank them for?</label>
            <textarea id="thanks-message" value={message} onChange={event => setMessage(event.target.value)} placeholder="Thank you for always making time for me…" rows={4} minLength={2} maxLength={240} required aria-describedby="thanks-message-limit" />
            <p className="thanks-character-count" id="thanks-message-limit">{message.length}/240</p>
            <label htmlFor="thanks-from">Your name <span>optional</span></label>
            <input id="thanks-from" value={author} onChange={event => setAuthor(event.target.value)} placeholder="A grateful little paca" maxLength={40} autoComplete="nickname" />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary" type="submit"><Mail size={16} /> Make my card <ArrowRight size={16} /></button>
            <p className="thanks-share-detail">Make a link to send by text or DM. Anyone with the link can open your card.</p>
          </form>}
        </div>
        <div className="thanks-preview"><p className="eyebrow">{prepared ? "YOUR LITTLE THANK-YOU" : "A PEEK AT YOUR CARD"}</p><CardArtwork card={prepared ?? { recipient, message, author, color }} preview /></div>
      </section>}
      <footer className="thanks-footer"><Heart size={13} /><span>Little thanks make a big garden.</span><a href="/paca-village/holiday/gratitude-garden/">Visit the garden <ArrowRight size={13} /></a></footer>
    </main>
  </div>;
}
