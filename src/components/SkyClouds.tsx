'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export function SkyClouds({ paused = false }: { paused?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const layer = ref.current;
    const parent = layer?.parentElement;
    if (!layer || !parent || !inView || !pageVisible || reduceMotion || paused) return;
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
    const reset = () => {
      layer.style.setProperty('--sky-x', '0px');
      layer.style.setProperty('--sky-y', '0px');
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== 'mouse') return;
      const bounds = layer.getBoundingClientRect();
      const x = Math.max(-8, Math.min(8, ((event.clientX - bounds.left) / bounds.width - 0.5) * 16));
      const y = Math.max(-8, Math.min(8, ((event.clientY - bounds.top) / bounds.height - 0.5) * 16));
      layer.style.setProperty('--sky-x', x + 'px');
      layer.style.setProperty('--sky-y', y + 'px');
    };
    parent.addEventListener('pointermove', move);
    parent.addEventListener('pointerleave', reset);
    return () => {
      parent.removeEventListener('pointermove', move);
      parent.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [inView, pageVisible, reduceMotion, paused]);

  return (
    <div ref={ref} className="sky-clouds" aria-hidden="true" data-running={inView && pageVisible && !reduceMotion && !paused}>
      <div className="sky-parallax">
        <img className="sky-cloud sky-cloud--one" src="/sky-cloud-soft.png" alt="" width="1672" height="941" draggable={false} />
        <img className="sky-cloud sky-cloud--two" src="/sky-cloud-wisp.png" alt="" width="1792" height="896" draggable={false} />
        <img className="sky-cloud sky-cloud--three" src="/sky-cloud-soft.png" alt="" width="1672" height="941" draggable={false} />
      </div>
    </div>
  );
}
