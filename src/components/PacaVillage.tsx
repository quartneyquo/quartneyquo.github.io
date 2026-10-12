'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Sprout } from 'lucide-react';
import { ContinuousJourney, JourneyStop } from './ContinuousJourney';
import { HeroAtmosphere } from './HeroAtmosphere';
import { pacaProducts } from '@/data/pacaProducts';
import './watercolorJourney.css';
import './pacaVillage.css';

// Each illustrated door sits at a different point within its square atlas tile.
const houseDoors = [77, 62, 51, 68, 21];

function HouseArt({ tile }: { tile: number }) {
  return <span className="journey-art paca-house-art" aria-hidden="true" style={{
    '--house-x': `${(tile % 3) * 50}%`, '--house-y': `${Math.floor(tile / 3) * 100}%`,
  } as CSSProperties} />;
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
          <p className="village-invitation">Five little houses, each with something useful inside.<br />Take a walk with Opaca and see what’s growing.</p>
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
          art={<HouseArt tile={product.tile} />}
          doorPosition={houseDoors[product.tile]}
          destination={product.href}
          visitOnEnter
        >
          <p className="editorial-eyebrow">0{index + 1} / {product.house}</p>
          <h2>{product.title}</h2>
          <p className="village-category">{product.category}</p>
          <p className="village-summary">{product.summary}</p>
          <p className="project-links"><a className="editorial-link" href={product.href}>Visit {product.title} <ExternalLink size={14} /></a></p>
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
