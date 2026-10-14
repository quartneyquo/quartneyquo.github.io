'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Sprout, Check, Pause, Play } from 'lucide-react';
import { ContinuousJourney, JourneyStop } from './ContinuousJourney';
import { HeroAtmosphere } from './HeroAtmosphere';
import { pacaProducts, type PacaProduct } from '@/data/pacaProducts';
import './watercolorJourney.css';
import './pacaVillage.css';

function HouseArt({ product }: { product: PacaProduct }) {
  if (product.image) return <img className="journey-art paca-house-image" src={product.image} alt="" width="1024" height="1024" loading="lazy" />;
  const { tile } = product;
  return <span className="journey-art paca-house-art" aria-hidden="true" style={{
    '--house-x': `${(tile % 3) * 50}%`, '--house-y': `${Math.floor(tile / 3) * 100}%`,
  } as CSSProperties} />;
}

function ProjectPreview({ product }: { product: PacaProduct }) {
  const reducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLImageElement>(null);
  const [playing, setPlaying] = useState(false);
  const [frozenFrame, setFrozenFrame] = useState<string>();
  const [animationFailed, setAnimationFailed] = useState(false);

  useEffect(() => {
    setPlaying(reducedMotion === false);
    setFrozenFrame(undefined);
  }, [reducedMotion]);

  const togglePlayback = () => {
    if (playing && imageRef.current?.complete && imageRef.current.naturalWidth) {
      // Keep the current frame visible when pausing the GIF.
      try {
        const canvas = document.createElement('canvas');
        canvas.width = imageRef.current.naturalWidth;
        canvas.height = imageRef.current.naturalHeight;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(imageRef.current, 0, 0);
          setFrozenFrame(canvas.toDataURL('image/jpeg', 0.9));
        }
      } catch { setFrozenFrame(undefined); }
    }
    setPlaying(current => !current);
  };

  return <article className="village-preview">
    <figure className="village-preview-figure">
      <div className="village-preview-browser">
        <span className="village-preview-dots" aria-hidden="true">● ● ●</span>
        <span className="village-preview-domain" aria-hidden="true">{new URL(product.href).hostname}</span>
        <button type="button" className="village-preview-playback" onClick={togglePlayback} disabled={animationFailed} aria-label={`${playing ? 'Pause' : 'Play'} ${product.title} preview`}>
          {playing ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}{playing ? 'Pause' : 'Play'}
        </button>
      </div>
      <img ref={imageRef} src={playing && !animationFailed ? product.preview.animatedSrc : frozenFrame ?? product.preview.src} alt={product.preview.alt} width="800" height="500" onError={() => { setAnimationFailed(true); setPlaying(false); setFrozenFrame(undefined); }} />
      <figcaption>{product.preview.caption}</figcaption>
    </figure>
    <div className="village-preview-copy">
      <p className="village-preview-category">{product.category}</p>
      <h2>{product.title}</h2>
      <p className="village-preview-summary">{product.summary}</p>
      <ul>{product.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
      <a className="editorial-button village-preview-open" href={product.href} target="_blank" rel="noopener noreferrer">Open {product.title}<ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  </article>;
}

export default function PacaVillage() {
  const { scrollYProgress } = useScroll();

  return <div className="portfolio-editorial watercolor-portfolio paca-village-page">
    <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    <a className="village-skip" href="#pacaplate">Skip to the houses</a>
    <header className="village-header">
      <Link href="/#paca-village" className="village-back"><ArrowLeft size={16} /> Courtney’s portfolio</Link>
      <Link href="/trips/projects">All projects <ArrowRight size={15} /></Link>
    </header>

    <main className="portfolio-main" id="village">
      <section className="village-intro" aria-labelledby="village-title">
        <HeroAtmosphere />
        <div className="village-intro-copy">
          <p className="village-eyebrow"><Sprout size={15} /> Built by me, for everyday life</p>
          <h1 id="village-title">Paca Village</h1>
          <p className="village-tagline">Small ideas. Shipped products.</p>
          <p className="village-invitation">Six little houses and an arcade for a little fun.<br />Take a walk with Opaca and see what’s growing.</p>
          <a href="#pacaplate" className="editorial-button village-explore">Explore the village <ArrowDown size={16} /></a>
        </div>
        <nav className="village-map" aria-label="Jump to a village house">
          <span className="village-map-label">Around the village</span>
          <ol>
            {pacaProducts.map((product, index) => <li key={product.id}>
              <a href={`#${product.id}`}><span className="village-map-number">0{index + 1}</span>{product.title}<ArrowDown size={12} /></a>
            </li>)}
            <li><a href="#arcade"><span className="village-map-number">07</span>Paca Arcade<ArrowDown size={12} /></a></li>
          </ol>
        </nav>
      </section>

      <ContinuousJourney>
        {pacaProducts.map((product, index) => <JourneyStop
          key={product.id}
          id={product.id}
          tile={product.tile}
          title={product.title}
          className="village-stop"
          art={<HouseArt product={product} />}
          doorPosition={product.doorPosition}
          destination={product.href}
          preview={<ProjectPreview product={product} />}
        >
          <p className="editorial-eyebrow">0{index + 1} / {product.house}</p>
          <h2>{product.title}</h2>
          <p className="village-category">{product.category}</p>
          <p className="village-summary">{product.summary}</p>
          <p className="project-links"><button type="button" className="editorial-link village-preview-trigger" data-journey-preview-trigger aria-haspopup="dialog">Peek inside {product.title} <ArrowRight size={14} aria-hidden="true" /></button></p>
        </JourneyStop>)}
        <JourneyStop id="arcade" tile={5} title="Paca Arcade" className="village-stop" doorPosition={66} destination="/paca-village/arcade/" visitOnEnter art={<img className="journey-art paca-house-image" src="/arcade/arcade-house.png" alt="" width="1254" height="1254" loading="lazy" />}>
          <p className="editorial-eyebrow">07 / The village arcade</p>
          <h2>Paca Arcade</h2>
          <p className="village-category">A little time to play</p>
          <p className="village-summary">Step off the trail and into a cozy little game room. There’s always time for one more round.</p>
          <p className="project-links"><Link className="editorial-link" href="/paca-village/arcade/">Let’s play <ArrowRight size={14} aria-hidden="true" /></Link></p>
        </JourneyStop>
      </ContinuousJourney>

      <div className="village-homeward">
        <Sprout size={20} aria-hidden="true" />
        <p>A little curiosity. A lot of heart.</p>
        <Link className="editorial-link" href="/#paca-village"><ArrowLeft size={15} /> Back to the main trail</Link>
      </div>
    </main>

    <footer className="village-footer"><Link href="/">Courtney Ko</Link><span>Made to make the everyday a little brighter.</span></footer>
  </div>;
}
