'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { SkyClouds } from './SkyClouds';
import { WatercolorSprite } from './WatercolorSprite';
import { MeadowGallop } from './MeadowGallop';

export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  const running = inView && visible && !paused && !reducedMotion;
  return <>
    <div ref={ref} className="hero-atmosphere" aria-hidden="true" data-running={running}>
      <SkyClouds paused={!running} />
      {[0, 1, 2].map(index => <div key={index} className={`meadow-alpaca meadow-alpaca--${index + 1}${index > 0 ? ' meadow-alpaca--grazing' : ''}`}>
        <div className="meadow-alpaca-facing"><MeadowGallop row={index} grazing={index > 0} /></div>
      </div>)}
      <div className="hero-flowers hero-flowers--near"><WatercolorSprite tile={8} className="watercolor-flowers" /></div>
      <div className="hero-flowers hero-flowers--far"><WatercolorSprite tile={8} className="watercolor-flowers" /></div>
    </div>
    {!reducedMotion && <button type="button" className="hero-motion-toggle"
      aria-label={paused ? 'Play hero animation' : 'Pause hero animation'}
      title={paused ? 'Play hero animation' : 'Pause hero animation'}
      onClick={() => setPaused(value => !value)}>
      {paused ? <Play size={15} /> : <Pause size={15} />}
    </button>}
  </>;
}
