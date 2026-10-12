'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Sprout, Check } from 'lucide-react';
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
  return <article className="village-preview">
    <figure className="village-preview-figure">
      <div className="village-preview-browser" aria-hidden="true"><span>● ● ●</span>{new URL(product.href).hostname}</div>
      <img src={product.preview.src} alt={product.preview.alt} width="1280" height="800" />
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
          <p className="village-invitation">Six little houses, each with something useful inside.<br />Take a walk with Opaca and see what’s growing.</p>
          <a href="#pacaplate" className="editorial-button village-explore">Explore the village <ArrowDown size={16} /></a>
        </div>
        <nav className="village-map" aria-label="Jump to a village house">
          <span className="village-map-label">Around the village</span>
          <ol>
            {pacaProducts.map((product, index) => <li key={product.id}>
              <a href={`#${product.id}`}><span className="village-map-number">0{index + 1}</span>{product.title}<ArrowDown size={12} /></a>
            </li>)}
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
