'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Gamepad2, Play, X } from 'lucide-react';
import './pacaArcade.css';

const games = [
  {
    id: 'snoopy-solitaire', title: 'Snoopy’s Cozy Solitaire', label: 'A little autumn magic',
    description: 'A few cards, a little company, and a whole lot of fall. Settle in with Snoopy and Woodstock for a cozy game of Klondike.',
    detail: 'Solitaire · Draw 1 or 3 · Hints & undo',
    image: 'https://snoopy-autumn-solitaire.courtneythko.chatgpt.site/assets/snoopy-fall-transparent.png',
    href: 'https://snoopy-autumn-solitaire.courtneythko.chatgpt.site/',
  },
  {
    id: 'meadow-cafe', title: 'Opaca’s Meadow Café', label: 'A little café rush',
    description: 'Seat fluffy guests, take their orders, and help Opaca keep the café running. Five cozy days, plenty of tiny hooves.',
    detail: 'Café management · Tap or click · Saves on this device',
    image: '/arcade/games/meadow-cafe/assets/meadow.webp',
    href: '/arcade/games/meadow-cafe/index.html',
  },
  {
    id: 'doctor-hog', title: 'Doctor Hog — Bug Rescue', label: 'The doctor is in',
    description: 'Help Doctor Hog catch falling bugs before they reach the code. A little rescue mission for a very busy doctor.',
    detail: 'Bug rescue · A / D or arrow keys · Drag on touch screens',
    image: 'https://doctor-hog-bug-rescue.courtneythko.chatgpt.site/doctor-hog.png',
    href: 'https://doctorhog.courtneyko.com/',
  },
  {
    id: 'pacagame', title: 'Pacagame — Meadow Match', label: 'A whole lot of fluff',
    description: 'Match fluffy alpacas and sparkling gems with the whole meadow herd cheering you on. Pick a companion, make a little magic, and settle in for one more level.',
    detail: 'Match-3 · Click or swipe · Opens in a new tab',
    image: '/arcade/pacagame-alpacas.png',
    href: 'https://pacagame-meadow-match.courtneythko.chatgpt.site/',
    launchInNewTab: true,
  },
];
type ArcadeGame = typeof games[number];

export default function PacaArcade() {
  const [activeGame, setActiveGame] = useState<ArcadeGame | null>(null);
  const [loaded, setLoaded] = useState(false);
  const playerHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (activeGame) {
      playerHeading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeGame]);

  function leaveGame() {
    setActiveGame(null);
    setLoaded(false);
    requestAnimationFrame(() => document.getElementById(`play-${activeGame?.id}`)?.focus());
  }

  return <div className="paca-arcade">
    <header className="arcade-header">
      <Link href="/paca-village/#arcade"><ArrowLeft size={16} aria-hidden="true" /> Back to the village</Link>
      <Link className="arcade-wordmark" href="/">Courtney Ko</Link>
    </header>
    <main>
      {!activeGame ? <>
        <section className="arcade-intro" aria-labelledby="arcade-title">
          <div className="arcade-intro-copy">
            <p className="arcade-eyebrow"><Gamepad2 size={16} aria-hidden="true" /> THE VILLAGE GAME ROOM</p>
            <h1 id="arcade-title">Paca Arcade<span>A little pause.<br />A little play.</span></h1>
            <p>Come in, get comfortable, and pick a game.<br />Made by me, just for the fun of it.</p>
            <span className="arcade-free">No coins needed. Just a little curiosity.</span>
          </div>
          <img className="arcade-building" src="/arcade/arcade-house.png" alt="A watercolor arcade cottage with a mossy green roof, flowering vines, and two game cabinets in its glowing window." width="1254" height="1254" />
        </section>
        <section className="arcade-shelf" aria-labelledby="arcade-games-title">
          <div className="arcade-shelf-title"><h2 id="arcade-games-title">Pick your little adventure</h2><span>Everyone’s welcome</span></div>
          <div className="arcade-games">{games.map((game, index) => <article className="arcade-game" key={game.id}>
            <div className={`arcade-game-art arcade-game-art--${game.id}`}><img src={game.image} alt="" width="800" height="500" /><span className="arcade-game-number">0{index + 1}</span>{game.id === 'meadow-cafe' && <div className="arcade-opaca" aria-hidden="true" />}</div>
            <div className="arcade-game-copy"><p className="arcade-eyebrow">{game.label}</p><h3>{game.title}</h3><p>{game.description}</p><span className="arcade-game-detail">{game.detail}</span>{'launchInNewTab' in game && game.launchInNewTab ? <a id={`play-${game.id}`} className="arcade-play" href={game.href} target="_blank" rel="noopener noreferrer"><Play size={16} aria-hidden="true" /> Play {game.title}<ArrowUpRight size={16} aria-hidden="true" /></a> : <button id={`play-${game.id}`} className="arcade-play" onClick={() => { setLoaded(false); setActiveGame(game); }}><Play size={16} aria-hidden="true" /> Play {game.title}<ArrowUpRight size={16} aria-hidden="true" /></button>}</div>
          </article>)}</div>
        </section>
        <p className="arcade-footer-note">One more round, then back to the meadow. ♡</p>
      </> : <section className="arcade-player" aria-labelledby="arcade-now-playing">
        <div className="arcade-player-toolbar"><div><p className="arcade-eyebrow">NOW PLAYING</p><h1 id="arcade-now-playing" ref={playerHeading} tabIndex={-1}>{activeGame.title}</h1></div><div className="arcade-player-actions"><a href={activeGame.href} target="_blank" rel="noopener noreferrer">Open in a new tab <ArrowUpRight size={15} aria-hidden="true" /></a><button onClick={leaveGame}><X size={16} aria-hidden="true" /> Back to games</button></div></div>
        {!loaded && <p className="arcade-loading" role="status">Opening the game…</p>}
        <iframe key={activeGame.id} className="arcade-game-frame" src={activeGame.href} title={`Play ${activeGame.title}`} onLoad={() => { setLoaded(true); window.scrollTo({ top: 0, behavior: 'instant' }); }} allow="fullscreen" />
      </section>}
    </main>
    <footer className="arcade-footer"><Link href="/paca-village/">Paca Village</Link><span>Small games. Happy little moments.</span></footer>
  </div>;
}
