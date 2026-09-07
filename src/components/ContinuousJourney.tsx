'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Cpu, Globe, Heart, House, Leaf, Mail, Shell, Sprout, Users } from 'lucide-react';
import { buildTrail, caseAnchor, closestStation, passedStops, pointOnTrail, scrollToTrailY, trailOutline, type TrailPoint, type TrailStation } from './journeyPath';
import './continuousJourney.css';

const destinationStamps = {
  basecamp: { icon: House, label: 'Basecamp' },
  work: { icon: Users, label: 'AI Valley' },
  'nvidia-lab': { icon: Cpu, label: 'NVIDIA Lab' },
  'pearle-port': { icon: Shell, label: 'Pearle Port' },
  'paca-village': { icon: Sprout, label: 'Paca Village' },
  about: { icon: Globe, label: 'Travel Atlas' },
  contact: { icon: Mail, label: 'Contact' },
};

export function JourneyScene({ tile, title }: { tile: number; title: string }) {
  const [x,y,w,h,foot] = [
    [24,64,430,373,45], [456,63,376,374,45], [834,70,414,367,48],
    [20,443,419,365,40], [442,475,398,322,48], [835,443,380,362,43],
    [29,828,378,334,44],
  ][tile];
  const style = { '--tile-x': `${x / (1254-w) * 100}%`, '--tile-y': `${y / (1254-h) * 100}%`,
    '--atlas-size': `${1254/w*100}% ${1254/h*100}%`, '--art-ratio': `${w} / ${h}`, '--foot-x': `${foot}%` } as CSSProperties;
  const href = ['#about', '#ai-valley', '#nvidia', '#pearle', '#products-title', '#toolkit', '#contact-title'][tile];
  return <div className="journey-scene" style={style}>
    <div className="journey-art" aria-hidden="true" />
    <div className="journey-arrival-row">
      <span className="journey-landing" aria-hidden="true" />
      <a className="journey-sign" href={href}>{title}<ArrowRight size={12} /></a>
    </div>
  </div>;
}

export function JourneyStop({ id, tile, title, children, className = '', placement }: {
  id: string; tile: number; title: string; children: ReactNode; className?: string; placement?: string;
}) {
  return <section id={id} className={`journey-stop ${className}`} data-journey-stop={id} data-placement={placement ?? id} aria-label={title}>
    <JourneyScene tile={tile} title={title} />
    <div className="journey-content">{children}</div>
  </section>;
}

export function JourneyDisclosure({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <details id={id} className="journey-disclosure">
    <summary data-case-study={id}><span>Explore the work</span><span className="sr-only">: {title}</span><ChevronDown size={16} className="disclosure-symbol" aria-hidden="true" /></summary>
    <div className="journey-case-content">{children}</div>
  </details>;
}

export function ContinuousJourney({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const guide = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [geometry, setGeometry] = useState<{ width: number; height: number; points: TrailPoint[]; branches: TrailPoint[][] }>({ width: 1, height: 1, points: [], branches: [] });
  const [reaction, setReaction] = useState('');
  const [moving, setMoving] = useState(false);
  const visitedRef = useRef(new Set<string>());
  const [celebrating, setCelebrating] = useState('');
  const [welcome, setWelcome] = useState(true);
  const reactionTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const container = root.current;
    const character = guide.current;
    if (!container || !character) return;
    let stations: TrailStation[] = [];
    let points: TrailPoint[] = [];
    let frame = 0;
    let measureFrame = 0;
    let previous: TrailPoint | undefined;
    let lastScroll = window.scrollY;
    let stopTimer: ReturnType<typeof setTimeout>;
    let disposed = false;
    let previousY: number | undefined;
    let celebrationTimer: ReturnType<typeof setTimeout>;

    const stop = () => {
      character.dataset.moving = 'false';
      setMoving(false);
      clearTimeout(stopTimer);
    };
    const draw = (animate: boolean) => {
      const startScroll = Math.max(0, container.getBoundingClientRect().top + window.scrollY + (stations[0]?.y ?? 0) - document.documentElement.clientHeight * 0.65);
      const y = scrollToTrailY(window.scrollY - startScroll,
        document.documentElement.scrollHeight - document.documentElement.clientHeight - startScroll,
        stations[0]?.y ?? 0, stations[stations.length-1]?.y ?? 0);
      const point = reduceMotion ? closestStation(stations, y) : pointOnTrail(points, y);
      if (!point) return;
      if (animate && previousY !== undefined) {
        const passed = passedStops(stations, previousY, y).filter(station => !visitedRef.current.has(station.id));
        if (passed.length) {
          passed.forEach(station => visitedRef.current.add(station.id));
          setWelcome(false);
          setCelebrating(passed[passed.length - 1].id);
          clearTimeout(celebrationTimer);
          celebrationTimer = setTimeout(() => setCelebrating(''), 1900);
        }
      }
      previousY = y;
      character.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      character.dataset.ready = 'true';
      if (previous && animate && !reduceMotion && Math.hypot(point.x - previous.x, point.y - previous.y) > 0.15) {
        const direction = Math.abs(point.x - previous.x) > 0.1 ? point.x - previous.x : point.y - previous.y;
        // The source sprite faces left; mirror it when traveling right/down.
        character.style.setProperty('--opaca-facing', direction > 0 ? '-1' : '1');
        character.dataset.moving = 'true';
        setMoving(true);
        clearTimeout(stopTimer);
        stopTimer = setTimeout(stop, 140);
      }
      previous = point;
    };
    const measure = () => {
      if (disposed) return;
      const rect = container.getBoundingClientRect();
      const branches: TrailPoint[][] = [];
      stations = Array.from(container.querySelectorAll<HTMLElement>('[data-journey-stop]')).map(section => {
        const landing = section.querySelector<HTMLElement>('.journey-landing')!.getBoundingClientRect();
        const scene = section.querySelector<HTMLElement>('.journey-scene')!.getBoundingClientRect();
        const art = section.querySelector<HTMLElement>('.journey-art')!.getBoundingClientRect();
        const approachX = getComputedStyle(section).display === 'flex' ? undefined :
          (scene.left + scene.width/2 > rect.left + rect.width/2 ? scene.left-35 : scene.right+35)-rect.left;
        const destination = {x:landing.left-rect.left,y:landing.top-rect.top};
        const door = {x:art.left-rect.left + art.width * parseFloat(getComputedStyle(section.querySelector('.journey-scene')!).getPropertyValue('--foot-x'))/100, y:art.bottom-rect.top-40};
        branches.push(Array.from({length:17},(_,i)=> {
          const t=i/16, ease=t*t*(3-2*t);
          return {x:door.x+(destination.x-door.x)*ease,y:door.y+(destination.y-door.y)*t};
        }));
        return { id: section.dataset.journeyStop!, x: landing.left + landing.width / 2 - rect.left,
          y: landing.top - rect.top, exitY: section.getBoundingClientRect().bottom - rect.top, approachX };
      });
      points = buildTrail(stations);
      setGeometry({ width: rect.width, height: rect.height, points, branches });
      draw(false);
    };
    const scheduleMeasure = () => {
      cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(measure);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const changed = window.scrollY !== lastScroll;
        lastScroll = window.scrollY;
        draw(changed);
      });
    };
    const onVisibility = () => { if (document.hidden) stop(); else { lastScroll = window.scrollY; measure(); } };
    const onHash = () => {
      const id = caseAnchor(window.location.hash);
      if (!id) return;
      const details = document.getElementById(id) as HTMLDetailsElement | null;
      if (!details) return;
      details.open = true;
      requestAnimationFrame(() => {
        if (disposed) return;
        measure();
        details.querySelector('summary')?.focus({ preventScroll: true });
        details.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      });
    };
    // A repeated link to the current hash must reopen a manually closed case study.
    const onLink = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (link?.getAttribute('href') === window.location.hash) onHash();
    };
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(container);
    container.querySelectorAll('[data-journey-stop]').forEach(section => observer.observe(section));
    measure();
    onHash();
    document.fonts.ready.then(() => { if (!disposed) scheduleMeasure(); });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', scheduleMeasure);
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onLink);
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(measureFrame);
      clearTimeout(stopTimer);
      clearTimeout(celebrationTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', scheduleMeasure);
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onLink);
      window.removeEventListener('blur', stop);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduceMotion]);

  useEffect(() => () => clearTimeout(reactionTimer.current), []);
  const react = (message: string) => {
    if (moving) return;
    clearTimeout(reactionTimer.current);
    setReaction(message);
    reactionTimer.current = setTimeout(() => setReaction(''), 2400);
  };
  const mobile = geometry.width < 860;
  const stamp = destinationStamps[celebrating as keyof typeof destinationStamps];
  const StampIcon = stamp?.icon;

  return <div ref={root} className="continuous-journey">
    <svg className="journey-trail" width={geometry.width} height={geometry.height} aria-hidden="true">
      <defs>
        <pattern id="journey-sand" width="36" height="32" patternUnits="userSpaceOnUse"><rect width="36" height="32" fill="#eddaa2" /><path d="M4 7h5v2H4zM24 24h4v2h-4z" fill="#d9bb7c" opacity=".5" /></pattern>
        <pattern id="journey-grass" width="62" height="54" patternUnits="userSpaceOnUse"><rect width="62" height="54" fill="#c0d88e" /><path d="M9 12h3v5h-3zM12 15h3v3h-3zM43 37h3v4h-3z" fill="#8db86b" opacity=".55" /><path d="M26 30h4v3h-4zM55 9h3v3h-3z" fill="#dfebaa" /></pattern>
      </defs>
      {[geometry.points,...geometry.branches].map((points,i)=><g key={i}>
        <path d={trailOutline(points, mobile ? 34 : 64,true)} fill="url(#journey-grass)" />
        <path d={trailOutline(points, mobile ? 19 : 35)} fill="#cbb586" />
        <path d={trailOutline(points, mobile ? 16 : 30)} fill="url(#journey-sand)" />
      </g>)}
    </svg>
    {children}
    <div ref={guide} className="journey-guide" aria-hidden="true" data-moving="false">
      <div className="journey-guide-shadow" />
      <div className="journey-guide-facing"><img src="/opaca.png" width="1204" height="1306" alt="" draggable="false" /></div>
      {StampIcon && <span key={celebrating} className="journey-arrival-stamp">
        <StampIcon size={28} strokeWidth={1.8} />
        <span className="journey-stamp-check"><Check size={13} strokeWidth={2.5} /></span>
      </span>}
      {(reaction || welcome) && <span className={`journey-reaction ${welcome && !reaction ? 'journey-welcome' : ''}`}>{reaction || "Hi, I'm Opaca. Let's go on an adventure!"}</span>}
    </div>
    <div className="journey-companion" aria-label="Opaca interactions">
      <span>Opaca</span>
      <button type="button" title="Pet Opaca" aria-label="Pet Opaca" disabled={moving} onClick={() => react('A happy little pause.')}><Heart size={18} /></button>
      <button type="button" title="Feed Opaca" aria-label="Feed Opaca" disabled={moving} onClick={() => react('A snack for the road.')}><Leaf size={18} /></button>
      <span className="sr-only" role="status">{reaction || (stamp ? `${stamp.label} reached. Passport stamped!` : '')}</span>
      <span className="sr-only">Hi, I'm Opaca. Let's go on an adventure!</span>
    </div>
  </div>;
}
