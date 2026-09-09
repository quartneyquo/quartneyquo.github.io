'use client';

import { type CSSProperties, type ReactNode, createContext, useContext, useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Cpu, Globe, Heart, House, Leaf, Mail, Shell, Sprout, Users, X } from 'lucide-react';
import { buildTrail, caseAnchor, closestStation, passedStops, pointOnTrail, trailOutline, type TrailPoint, type TrailStation } from './journeyPath';
import './continuousJourney.css';
import { WatercolorSprite } from './WatercolorSprite';

const StopDialogContext = createContext<{ id: string; target: HTMLDivElement | null }>({ id: '', target: null });

const destinationStamps = {
  basecamp: { icon: House, label: 'Basecamp' },
  work: { icon: Users, label: 'AI Valley' },
  'nvidia-lab': { icon: Cpu, label: 'NVIDIA Lab' },
  'pearle-port': { icon: Shell, label: 'Pearle Port' },
  'paca-village': { icon: Sprout, label: 'Paca Village' },
  about: { icon: Globe, label: 'Travel Atlas' },
  contact: { icon: Mail, label: 'Contact' },
};

function GrowingFlowers({ variant }: { variant: number }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className="journey-garden" aria-hidden="true" initial="seed" whileInView="bloomed" viewport={{ once: true, amount: 0.5 }} style={{ '--garden-facing': variant % 2 ? '-1' : '1' } as CSSProperties}>
    <motion.div className="journey-garden-growth"
      variants={{ seed: { opacity: 0, scaleY: 0.4, clipPath: 'inset(100% 0% 0% 0%)' }, bloomed: { opacity: 1, scaleY: 1, clipPath: 'inset(0% 0% 0% 0%)' } }}
      animate={reducedMotion ? 'bloomed' : undefined}
      style={reducedMotion ? { opacity: 1, scaleY: 1, clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      transition={{ duration: reducedMotion ? 0 : 1.1, ease: [0.22, 0.61, 0.36, 1] }}>
      <WatercolorSprite tile={8} className="watercolor-flowers" />
    </motion.div>
  </motion.div>;
}

export function JourneyScene({ tile, title }: { tile: number; title: string }) {
  const style = { '--tile-x': `${tile % 3 * 50}%`, '--tile-y': `${Math.floor(tile / 3) * 50}%`,
    '--atlas-size': '300% 300%', '--art-ratio': '1 / 1', '--foot-x': '50%' } as CSSProperties;
  const href = ['#about', '#ai-valley', '#nvidia', '#pearle', '#products-title', '#toolkit', 'mailto:courtneythko@gmail.com'][tile];
  return <div className="journey-scene" style={style}>
    <a className="journey-building-link" href={href} aria-label={`Enter ${title}`}><WatercolorSprite tile={tile} className="journey-art" /></a>
    <div className="journey-arrival-row">
      <span className="journey-landing" aria-hidden="true" />
      <GrowingFlowers variant={tile} />
      <a className="journey-sign" href={href} aria-label={tile === 6 ? 'Contact Post Office: email Courtney' : undefined}>{title}<ArrowRight size={12} /></a>
    </div>
  </div>;
}

export function JourneyStop({ id, tile, title, children, className = '', placement }: {
  id: string; tile: number; title: string; children: ReactNode; className?: string; placement?: string;
}) {
  const dialog = useContext(StopDialogContext);
  const content = useRef<HTMLDivElement>(null);
  const height = useRef(0);
  const active = dialog.id === id && dialog.target;
  useLayoutEffect(() => { if (!active && content.current) height.current = content.current.getBoundingClientRect().height; });
  return <section id={id} className={`journey-stop ${className}`} data-journey-stop={id} data-placement={placement ?? id} aria-label={title}>
    <JourneyScene tile={tile} title={title} />
    <div ref={content} className="journey-content" style={active ? { height: height.current } : undefined}>{active ? createPortal(<div className={className}><div className="journey-content">{children}</div></div>, active) : children}</div>
  </section>;
}

export function JourneyDisclosure({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <details id={id} className="journey-disclosure">
    <summary data-case-study={id}><span>Explore the work</span><span className="sr-only">: {title}</span><ChevronDown size={16} className="disclosure-symbol" aria-hidden="true" /></summary>
    <div className="journey-case-content">{children}</div>
  </details>;
}

export function ContinuousJourney({ children }: { children: ReactNode }) {
  const [activeStop, setActiveStop] = useState('');
  const [dialogTarget, setDialogTarget] = useState<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const exitStop = useRef<() => void>(() => {});
  const closeStop = () => { setActiveStop(''); exitStop.current(); };
  useEffect(() => {
    if (!activeStop || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.querySelectorAll('details').forEach(details => { details.open = true; });
    return () => { dialog.close(); document.body.style.overflow = overflow; };
  }, [activeStop]);
  const root = useRef<HTMLDivElement>(null);
  const guide = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [geometry, setGeometry] = useState<{ width: number; height: number; rail: boolean; points: TrailPoint[]; branches: TrailPoint[][] }>({ width: 1, height: 1, rail: true, points: [], branches: [] });
  const [reaction, setReaction] = useState('');
  const [moving, setMoving] = useState(false);
  const visitedRef = useRef(new Set<string>());
  const [celebrating, setCelebrating] = useState('');
  const reactionTimer = useRef<ReturnType<typeof setTimeout>>();
  const [grazed, setGrazed] = useState<number[]>([]);
  const collectedGrass = useRef(new Set<number>());

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
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let stopTimer: ReturnType<typeof setTimeout>;
    let disposed = false;
    let previousY: number | undefined;
    let celebrationTimer: ReturnType<typeof setTimeout>;
    let entering = false;
    let entryFrame = 0;
    let arrivalTimer: ReturnType<typeof setTimeout>;
    let branchRoutes: TrailPoint[][] = [];
    const held = new Set<string>();
    let keyboardFrame = 0;
    let keyboardMode = false;
    let keyboardY = 0;
    let branchIndex = -1;
    let branchDistance = 0;
    let lastTick = 0;
    let openedByMovement: HTMLDetailsElement | null = null;
    const collectGrass = (point: TrailPoint) => {
      if (!previous || Math.abs(point.y - previous.y) > 250) return;
      stations.slice(0, -1).forEach((station, index) => {
        [0.32, 0.66].forEach((fraction, offset) => {
          const id = index * 2 + offset;
          const y = station.y + (stations[index + 1].y - station.y) * fraction;
          if (!collectedGrass.current.has(id) && y >= Math.min(previous!.y, point.y) - 18 && y <= Math.max(previous!.y, point.y) + 18 && Math.abs(point.x - pointOnTrail(points, point.y).x) < 35) {
            collectedGrass.current.add(id);
            setGrazed([...collectedGrass.current]);
            setReaction('Nom nom!');
            clearTimeout(reactionTimer.current);
            reactionTimer.current = setTimeout(() => setReaction(''), 900);
          }
        });
      });
    };

    const stop = () => {
      character.dataset.moving = 'false';
      setMoving(false);
      clearTimeout(stopTimer);
    };
    const draw = (animate: boolean) => {
      if (entering || keyboardMode) return;
      // Keep the companion in the reader's viewport even when sections expand.
      const y = Math.max(stations[0]?.y ?? 0, Math.min(stations[stations.length - 1]?.y ?? 0,
        viewportHeight * 0.72 - container.getBoundingClientRect().top));
      const point = reduceMotion ? closestStation(stations, y) : pointOnTrail(points, y);
      if (!point) return;
      if (animate && previousY !== undefined) {
        const passed = passedStops(stations, previousY, y).filter(station => !visitedRef.current.has(station.id));
        if (passed.length) {
          passed.forEach(station => visitedRef.current.add(station.id));
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
      if (animate) collectGrass(point);
      previous = point;
    };
    const measure = () => {
      if (disposed) return;
      const rect = container.getBoundingClientRect();
      const rail = getComputedStyle(container).getPropertyValue('--trail-layout').trim() === 'rail';
      const branches: TrailPoint[][] = [];
      stations = Array.from(container.querySelectorAll<HTMLElement>('[data-journey-stop]')).map(section => {
        const landing = section.querySelector<HTMLElement>('.journey-landing')!.getBoundingClientRect();
        const scene = section.querySelector<HTMLElement>('.journey-scene')!.getBoundingClientRect();
        const art = section.querySelector<HTMLElement>('.journey-art')!.getBoundingClientRect();
        const approachX = rail ? undefined :
          (scene.left + scene.width/2 > rect.left + rect.width/2 ? scene.left-35 : scene.right+35)-rect.left;
        const destination = {x:landing.left-rect.left,y:landing.top-rect.top};
        const door = {x:art.left-rect.left + art.width * parseFloat(getComputedStyle(section.querySelector('.journey-scene')!).getPropertyValue('--foot-x'))/100, y:art.top-rect.top + art.height * 0.82};
        branches.push(Array.from({length:17},(_,i)=> {
          const t=i/16, ease=t*t*(3-2*t);
          return {x:door.x+(destination.x-door.x)*ease,y:door.y+(destination.y-door.y)*t};
        }));
        return { id: section.dataset.journeyStop!, x: landing.left + landing.width / 2 - rect.left,
          y: landing.top - rect.top, exitY: section.getBoundingClientRect().bottom - rect.top, approachX };
      });
      points = buildTrail(stations);
      branchRoutes = branches;
      setGeometry({ width: rect.width, height: rect.height, rail, points, branches });
      draw(false);
    };
    const scheduleMeasure = () => {
      cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(measure);
    };
    const onResize = () => {
      // Mobile browser chrome changes height while scrolling, not the trail layout.
      if (window.innerWidth === viewportWidth) return;
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      cancelEntry();
      releaseKeyboard();
      scheduleMeasure();
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const changed = window.scrollY !== lastScroll;
        lastScroll = window.scrollY;
        draw(changed);
      });
    };
    const onVisibility = () => { if (document.hidden) { cancelEntry(); stop(); } else { lastScroll = window.scrollY; measure(); } };
    const onHash = () => {
      releaseKeyboard();
      const id = caseAnchor(window.location.hash);
      if (!id) return;
      const details = document.getElementById(id) as HTMLDetailsElement | null;
      if (!details) return;
      requestAnimationFrame(() => {
        if (disposed) return;
        measure();
        details.querySelector('summary')?.focus({ preventScroll: true });
        details.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      });
    };
    const cancelEntry = () => {
      if (!entering) return;
      entering = false;
      character.dataset.grazing = 'false';
      cancelAnimationFrame(entryFrame);
      clearTimeout(arrivalTimer);
      character.style.opacity = '';
      character.style.removeProperty('--entry-scale');
      stop();
      draw(false);
    };
    const onEntryKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (['Escape', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End', ' '].includes(event.key)) { cancelEntry(); releaseKeyboard(); }
    };
    const clearKeys = () => {
      held.clear();
      cancelAnimationFrame(keyboardFrame);
      keyboardFrame = 0;
      stop();
    };
    const releaseKeyboard = () => {
      clearKeys();
      keyboardMode = false;
      branchIndex = -1;
      branchDistance = 0;
      character.style.opacity = '';
    };
    const keyDirection = (key: string) => ({ ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' }[key]);
    const keyboardTick = (now: number) => {
      if (!held.size || disposed) { clearKeys(); return; }
      const step = Math.min(0.04, (now - lastTick) / 1000) * 260;
      lastTick = now;
      const vertical = Number(held.has('down')) - Number(held.has('up'));
      const horizontal = Number(held.has('right')) - Number(held.has('left'));
      let point = pointOnTrail(points, keyboardY);
      const nearest = closestStation(stations, keyboardY);
      let approaching = false;
      if (branchIndex < 0 && horizontal && nearest) {
        const index = stations.indexOf(nearest);
        const toward = Math.sign(branchRoutes[index][0].x - nearest.x) || 1;
        if (horizontal === toward) {
          const remaining = nearest.y - keyboardY;
          if (Math.abs(remaining) <= step) { branchIndex = index; keyboardY = nearest.y; }
          else { keyboardY += Math.sign(remaining) * step; approaching = true; }
        }
      }
      if (branchIndex >= 0) {
        const route = [...branchRoutes[branchIndex]].reverse();
        const section = container.querySelectorAll<HTMLElement>('[data-journey-stop]')[branchIndex];
        const art = section.querySelector('.journey-art')!.getBoundingClientRect();
        route.push({ x: route[route.length - 1].x, y: art.top - container.getBoundingClientRect().top + art.height * 0.7 });
        const lengths = route.slice(1).map((p, i) => Math.hypot(p.x - route[i].x, p.y - route[i].y));
        const total = lengths.reduce((a, b) => a + b, 0);
        const toward = Math.sign(route[route.length - 1].x - route[0].x) || 1;
        branchDistance = Math.max(0, Math.min(total, branchDistance + horizontal * toward * step));
        let distance = branchDistance;
        point = route[route.length - 1];
        for (let i = 0; i < lengths.length; i++) {
          if (distance <= lengths[i]) {
            const t = lengths[i] ? distance / lengths[i] : 0;
            point = { x: route[i].x + (route[i+1].x - route[i].x) * t, y: route[i].y + (route[i+1].y - route[i].y) * t };
            break;
          }
          distance -= lengths[i];
        }
        character.style.opacity = `${1 - Math.max(0, (branchDistance / total - 0.85) / 0.15)}`;
        character.dataset.inside = String(branchDistance >= total);
        if (branchDistance >= total && horizontal === toward) {
          held.delete('left'); held.delete('right');
          setActiveStop(section.id);
        }
        if (branchDistance === 0 && horizontal === -toward) {
          branchIndex = -1;
          held.delete('left'); held.delete('right');
          if (openedByMovement?.open) openedByMovement.querySelector('summary')?.click();
          openedByMovement = null;
        }
      } else {
        if (!approaching) { held.delete('left'); held.delete('right'); }
        keyboardY = Math.max(stations[0].y, Math.min(stations[stations.length - 1].y, keyboardY + vertical * step));
        point = pointOnTrail(points, keyboardY);
        character.style.opacity = '';
        character.dataset.inside = 'false';
      }
      const delta = previous ? Math.hypot(point.x - previous.x, point.y - previous.y) : 0;
      const direction = previous && Math.abs(point.x - previous.x) > 0.1 ? point.x - previous.x : vertical;
      if (direction) character.style.setProperty('--opaca-facing', direction > 0 ? '-1' : '1');
      character.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      character.dataset.moving = String(delta > 0.1 && !reduceMotion);
      setMoving(delta > 0.1);
      collectGrass(point);
      previous = point;
      const screenY = container.getBoundingClientRect().top + point.y;
      if (character.dataset.inside !== 'true' && (screenY < 150 || screenY > window.innerHeight - 120)) window.scrollBy({ top: screenY - window.innerHeight * 0.55, behavior: 'instant' as ScrollBehavior });
      keyboardFrame = requestAnimationFrame(keyboardTick);
    };
    const onMoveKey = (event: KeyboardEvent) => {
      if (dialogRef.current?.open) return;
      const shortcut = event.target instanceof Element ? event.target.closest('summary, .journey-sign, .journey-building-link') : null;
      const target = event.target instanceof Element ? event.target : null;
      const horizontalKey = ['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(event.key);
      const reading = !target?.closest('input, textarea, select, button, a, summary, [contenteditable="true"], [role="tablist"], [role="dialog"]');
      const bounds = container.getBoundingClientRect();
      const visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if ((event.target !== container && !shortcut && !(horizontalKey && reading && visible)) || event.altKey || event.metaKey || event.ctrlKey) return;
      if (event.key === 'Escape') { releaseKeyboard(); return; }
      const direction = keyDirection(event.key.length === 1 ? event.key.toLowerCase() : event.key);
      if (!direction || !stations.length) return;
      if (shortcut && direction !== 'left' && direction !== 'right') return;
      event.preventDefault();
      cancelEntry();
      if (!keyboardMode || shortcut) {
        const section = shortcut?.closest<HTMLElement>('[data-journey-stop]');
        const visibleSection = !section && horizontalKey ? Array.from(container.querySelectorAll<HTMLElement>('[data-journey-stop]')).find(s => {
          const r = s.getBoundingClientRect();
          return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
        }) : null;
        const station = stations.find(s => s.id === (section?.id ?? visibleSection?.id));
        if (shortcut) { branchIndex = -1; branchDistance = 0; }
        keyboardY = station?.y ?? previous?.y ?? stations[0].y;
        keyboardMode = true;
      }
      if (direction === 'left' || direction === 'right') {
        held.clear();
        container.focus({ preventScroll: true });
      }
      held.add(direction);
      if (!keyboardFrame) { lastTick = performance.now(); keyboardFrame = requestAnimationFrame(keyboardTick); }
    };
    const onMoveUp = (event: KeyboardEvent) => {
      const direction = keyDirection(event.key.length === 1 ? event.key.toLowerCase() : event.key);
      if ((direction === 'left' || direction === 'right') && keyboardMode) return;
      if (direction) held.delete(direction);
      if (!held.size) clearKeys();
    };
    const onKeyboardVisibility = () => { if (document.hidden) clearKeys(); };
    const onLink = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (link) releaseKeyboard();
      if (link && container.contains(link) && link.matches('.journey-sign, .journey-building-link') && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        const section = link.closest<HTMLElement>('[data-journey-stop]');
        const index = stations.findIndex(station => station.id === section?.id);
        const href = link.getAttribute('href');
        if (index < 0 || !href || !section) return;
        event.preventDefault();
        releaseKeyboard();
        cancelEntry();
        measure();
        if (reduceMotion) { setActiveStop(section.id); return; }
        const station = stations[index];
        const route = [...branchRoutes[index]].reverse();
        const art = section.querySelector('.journey-art')!.getBoundingClientRect();
        route.push({ x: route[route.length - 1].x, y: art.top - container.getBoundingClientRect().top + art.height * 0.7 });
        const startY = previous?.y ?? station.y;
        const travelTime = Math.min(900, Math.abs(startY - station.y) * 0.6);
        const entryTime = 1000;
        const started = performance.now();
        entering = true;
        setReaction('');
        setCelebrating('');
        clearTimeout(celebrationTimer);
        clearTimeout(stopTimer);
        character.dataset.moving = 'true';
        setMoving(true);
        section.querySelector('.journey-scene')!.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
        const tick = (now: number) => {
          if (!entering || disposed) return;
          const elapsed = now - started;
          const progress = Math.max(0, Math.min(1, (elapsed - travelTime) / entryTime));
          let point: TrailPoint;
          if (elapsed < travelTime) point = pointOnTrail(points, startY + (station.y - startY) * elapsed / travelTime);
          else {
            const part = progress * (route.length - 1);
            const i = Math.min(route.length - 2, Math.floor(part));
            const t = part - i;
            point = { x: route[i].x + (route[i+1].x-route[i].x)*t, y: route[i].y + (route[i+1].y-route[i].y)*t };
          }
          const dx = point.x - (previous?.x ?? point.x);
          if (Math.abs(dx) > 0.1) character.style.setProperty('--opaca-facing', dx > 0 ? '-1' : '1');
          character.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
          character.style.opacity = `${1 - Math.max(0, (progress - 0.8) / 0.2)}`;
          character.style.setProperty('--entry-scale', `${1 - Math.max(0, progress - 0.8) * 2}`);
          collectGrass(point);
          previous = point;
          if (progress < 1) entryFrame = requestAnimationFrame(tick);
          else {
            stop();
            arrivalTimer = setTimeout(() => {
              if (!entering || disposed) return;
              setActiveStop(section.id);
            }, 180);
          }
        };
        entryFrame = requestAnimationFrame(tick);
        return;
      }
      if (link?.getAttribute('href') === window.location.hash) onHash();
    };
    const observer = new ResizeObserver(scheduleMeasure);
    exitStop.current = () => {
      const index = branchIndex >= 0 ? branchIndex : stations.findIndex(s => s.id === activeSectionId());
      cancelEntry();
      releaseKeyboard();
      if (index >= 0) {
        keyboardMode = true;
        keyboardY = stations[index].y;
        previous = stations[index];
        character.style.transform = `translate3d(${previous.x}px, ${previous.y}px, 0)`;
      }
      character.dataset.inside = 'false';
      container.focus({ preventScroll: true });
    };
    function activeSectionId() {
      return closestStation(stations, previous?.y ?? 0)?.id;
    }
    observer.observe(container);
    container.querySelectorAll('[data-journey-stop]').forEach(section => observer.observe(section));
    measure();
    onHash();
    document.fonts.ready.then(() => { if (!disposed) scheduleMeasure(); });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onLink);
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('wheel', cancelEntry, { passive: true });
    window.addEventListener('touchstart', cancelEntry, { passive: true });
    window.addEventListener('blur', cancelEntry);
    document.addEventListener('keydown', onEntryKey);
    document.addEventListener('keydown', onMoveKey, true);
    container.addEventListener('blur', clearKeys);
    window.addEventListener('keyup', onMoveUp);
    window.addEventListener('blur', clearKeys);
    window.addEventListener('wheel', releaseKeyboard, { passive: true });
    window.addEventListener('touchstart', releaseKeyboard, { passive: true });
    document.addEventListener('visibilitychange', onKeyboardVisibility);
    return () => {
      disposed = true;
      clearKeys();
      document.removeEventListener('keydown', onMoveKey, true);
      container.removeEventListener('blur', clearKeys);
      window.removeEventListener('keyup', onMoveUp);
      window.removeEventListener('blur', clearKeys);
      window.removeEventListener('wheel', releaseKeyboard);
      window.removeEventListener('touchstart', releaseKeyboard);
      document.removeEventListener('visibilitychange', onKeyboardVisibility);
      observer.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(measureFrame);
      clearTimeout(stopTimer);
      clearTimeout(celebrationTimer);
      cancelEntry();
      window.removeEventListener('wheel', cancelEntry);
      window.removeEventListener('touchstart', cancelEntry);
      window.removeEventListener('blur', cancelEntry);
      document.removeEventListener('keydown', onEntryKey);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
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
  const mobile = geometry.rail;
  const trails = [geometry.points, ...geometry.branches];
  const line = (points: TrailPoint[]) => points.map((point, i) => `${i ? 'L' : 'M'}${point.x},${point.y}`).join(' ');
  const stamp = destinationStamps[celebrating as keyof typeof destinationStamps];

  return <StopDialogContext.Provider value={{ id: activeStop, target: dialogTarget }}><div ref={root} className={`continuous-journey${geometry.width > 1 ? ' journey-compact' : ''}`} tabIndex={0} aria-label="Move Opaca" aria-describedby="opaca-keyboard-help">
    <span id="opaca-keyboard-help" className="sr-only">Use Up and Down or W and S to travel along the trail. Near a building, use Left and Right or A and D to enter and exit along its path. Escape releases movement. Tab reaches portfolio links.</span>
    <svg className="journey-trail" data-layout={mobile ? 'rail' : 'alternating'} width={geometry.width} height={geometry.height} aria-hidden="true">
      <defs>
        <filter id="watercolor-paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".18" numOctaves="3" seed="12" result="grain" />
          <feColorMatrix in="grain" type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope=".18" /></feComponentTransfer>
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <pattern id="journey-sand" width="128" height="128" patternUnits="userSpaceOnUse"><rect width="128" height="128" fill="#efdfc5" filter="url(#watercolor-paper)" /></pattern>
        <pattern id="journey-grass" width="128" height="128" patternUnits="userSpaceOnUse"><rect width="128" height="128" fill="#e0ebd5" filter="url(#watercolor-paper)" /></pattern>
        <filter id="watercolor-bleed" x="-20%" y="-10%" width="140%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="5" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="7" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation=".65" />
        </filter>
      </defs>
      <g data-trail-verge="true" opacity=".48" filter={mobile ? undefined : 'url(#watercolor-bleed)'}>{trails.map((points,i)=><path key={i} d={trailOutline(points, mobile ? 46 : 76,true)} fill={mobile ? '#e0ebd5' : 'url(#journey-grass)'} />)}</g>
      {/* Rounded caps overlap at shared endpoints, including Basecamp's first join. */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter={mobile ? undefined : 'url(#watercolor-bleed)'}>
        <g stroke={mobile ? '#e0ebd5' : 'url(#journey-grass)'} opacity=".4" strokeWidth={mobile ? 38 : 60}>{trails.map((points,i)=><path key={i} d={line(points)} />)}</g>
        <g stroke={mobile ? '#e7d3b4' : 'url(#journey-sand)'} strokeWidth={mobile ? 26 : 36}>{trails.map((points,i)=><path key={i} d={line(points)} />)}</g>
        <g stroke="#fffaf0" opacity=".18" strokeWidth={mobile ? 10 : 19}>{trails.map((points,i)=><path key={i} d={line(points)} />)}</g>
      </g>
    </svg>
    {children}
    {geometry.branches.slice(0, -1).flatMap((route, index) => [0.32, 0.66].map((fraction, offset) => {
      const start = route[route.length - 1];
      const next = geometry.branches[index + 1];
      const point = pointOnTrail(geometry.points, start.y + (next[next.length - 1].y - start.y) * fraction);
      const id = index * 2 + offset;
      return <WatercolorSprite key={id} tile={8} className="journey-grass-pickup watercolor-flowers" collected={grazed.includes(id)} style={{ left: point.x - 16, top: point.y - 20 }} />;
    }))}
    <div ref={guide} className="journey-guide" aria-hidden="true" data-moving="false">
      <div className="journey-guide-shadow" />
      <div className="journey-guide-facing"><WatercolorSprite tile={7} className="watercolor-opaca" /></div>
      {reaction && <span className="journey-reaction">{reaction}</span>}
    </div>
    <div className="journey-companion" aria-label="Opaca interactions">
      <span>Opaca</span>
      <button type="button" title="Pet Opaca" aria-label="Pet Opaca" disabled={moving} onClick={() => react('A happy little pause.')}><Heart size={18} /></button>
      <button type="button" title="Feed Opaca" aria-label="Feed Opaca" disabled={moving} onClick={() => react('A snack for the road.')}><Leaf size={18} /></button>
      <span className="sr-only" role="status">{reaction || (stamp ? `${stamp.label} reached. Passport stamped!` : '')}</span>
      <span className="sr-only">Hi, I'm Opaca. Let's go on an adventure!</span>
    </div>
    <dialog ref={dialogRef} className="journey-stop-dialog" aria-label="Destination details" onCancel={event => { event.preventDefault(); closeStop(); }}>
      <div className="journey-dialog-header"><span>{destinationStamps[activeStop as keyof typeof destinationStamps]?.label}</span><button type="button" onClick={closeStop} aria-label="Close destination" title="Close destination"><X size={22} /></button></div>
      <div ref={setDialogTarget} className="journey-dialog-body" />
    </dialog>
  </div></StopDialogContext.Provider>;
}
