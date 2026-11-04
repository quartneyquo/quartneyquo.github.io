"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Music2, Pause } from "lucide-react";

/** Generated overlays complement the painting; the original artwork stays intact. */
export function LeafAnimation({ paused, celebration = false, children }: { paused: boolean; celebration?: boolean; children?: ReactNode }) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element || failed) return;
    if (paused) element.pause();
    else void element.play().catch(error => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFailed(true);
    });
  }, [paused, failed]);

  return <>
    {!ready || failed ? children : null}
    {!failed && <video
      ref={video}
      className={`leaf-media-overlay ${celebration ? "leaf-media-celebration" : "leaf-media-drift"} ${ready ? "is-ready" : ""}`}
      src={celebration ? "/holiday/gratitude-leaf-twirl.mp4" : "/holiday/autumn-leaf-drift.mp4"}
      muted playsInline loop={!celebration} preload={paused ? "none" : "auto"}
      aria-hidden="true" tabIndex={-1}
      onCanPlay={() => setReady(true)}
      onError={() => setFailed(true)}
      onEnded={celebration ? () => { if (video.current) video.current.style.opacity = "0"; } : undefined}
    />}
  </>;
}

export function GardenMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(25);
  const [error, setError] = useState("");

  useEffect(() => {
    const element = audio.current;
    return () => element?.pause();
  }, []);

  async function toggleMusic() {
    const element = audio.current;
    if (!element || loading) return;
    setError("");
    if (!element.paused) { element.pause(); return; }
    setLoading(true);
    element.volume = volume / 100;
    try { await element.play(); }
    catch { setError("The music couldn’t start. Tap to try again."); }
    finally { setLoading(false); }
  }

  return <div className="garden-music">
    <audio ref={audio} src="/holiday/autumn-lofi-instrumental.mp3" preload="none" loop
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { setPlaying(false); setLoading(false); setError("The music couldn’t load. Tap to try again."); }} />
    <button type="button" className={playing ? "music-is-playing" : ""} onClick={toggleMusic}
      aria-label={playing ? "Pause fall lo-fi" : "Play fall lo-fi"}
      aria-pressed={playing} disabled={loading} title="Autumn, with love · instrumental loop">
      {playing ? <Pause size={13} /> : <Music2 size={14} />}{loading ? "Tuning in…" : "Fall lo-fi"}
    </button>
    {playing && <input type="range" min="0" max="100" value={volume} aria-label="Music volume"
      onChange={event => { const next = Number(event.target.value); setVolume(next); if (audio.current) audio.current.volume = next / 100; }} />}
    {error && <span className="music-error" role="status">{error}</span>}
  </div>;
}
