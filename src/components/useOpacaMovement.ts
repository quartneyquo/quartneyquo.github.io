'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, RefObject } from 'react';
import { createNavigation, keyboardStep, SPAWN, worldDistance, type WorldPoint } from './opacaNavigation';

const DIRECTIONS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0],
  ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1],
};

export function useOpacaMovement(map: RefObject<HTMLDivElement>, onMove: () => void) {
  const navigation = useRef<ReturnType<typeof createNavigation>>();
  const point = useRef(SPAWN);
  const [position, setPosition] = useState(SPAWN);
  const [moving, setMoving] = useState(false);
  const [facing, setFacing] = useState(1);
  const [target, setTarget] = useState<WorldPoint | null>(null);
  const keys = useRef(new Set<string>());
  const path = useRef<WorldPoint[]>([]);
  const arrival = useRef<(() => void) | undefined>();
  const frame = useRef<number | null>(null);
  const lastTime = useRef(0);
  const gesture = useRef<{ id: number; x: number; y: number; scroll: number; cancelled: boolean } | null>(null);
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const stop = useCallback(() => {
    keys.current.clear();
    path.current = [];
    arrival.current = undefined;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setMoving(false);
    setTarget(null);
  }, []);

  const start = () => {
    if (frame.current !== null) return;
    navigation.current ??= createNavigation();
    lastTime.current = performance.now();
    const tick = (time: number) => {
      const seconds = Math.min((time - lastTime.current) / 1000, 0.032);
      lastTime.current = time;
      const before = point.current;
      let next = before;
      if (keys.current.size) {
        let dx = 0, dy = 0;
        keys.current.forEach(key => { dx += DIRECTIONS[key][0]; dy += DIRECTIONS[key][1]; });
        next = keyboardStep(before, Math.sign(dx), Math.sign(dy), seconds, navigation.current!);
      } else if (path.current.length) {
        let budget = 22 * seconds;
        while (path.current.length && budget > 0) {
          const waypoint = path.current[0];
          const distance = worldDistance(next, waypoint);
          if (distance <= budget) { next = waypoint; path.current.shift(); budget -= distance; }
          else {
            next = { x: next.x + (waypoint.x - next.x) * budget / distance, y: next.y + (waypoint.y - next.y) * budget / distance };
            budget = 0;
          }
        }
      }
      const changed = worldDistance(before, next) > 0.0001;
      if (changed) {
        if (Math.abs(next.x - before.x) > 0.001) setFacing(next.x < before.x ? -1 : 1);
        point.current = next;
        setPosition(next);
      }
      setMoving(changed);
      if (keys.current.size || path.current.length) frame.current = requestAnimationFrame(tick);
      else {
        frame.current = null;
        setMoving(false);
        setTarget(null);
        const complete = arrival.current;
        arrival.current = undefined;
        complete?.();
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  const moveTo = (destination: WorldPoint, onArrival?: () => void) => {
    stop();
    navigation.current ??= createNavigation();
    path.current = navigation.current.route(point.current, destination);
    arrival.current = path.current.length ? onArrival : undefined;
    setTarget(path.current.at(-1) ?? null);
    onMoveRef.current();
    start();
  };

  useEffect(() => {
    const keyup = (event: globalThis.KeyboardEvent) => keys.current.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
    const hidden = () => { if (document.hidden) stop(); };
    window.addEventListener('keyup', keyup);
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', hidden);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      window.removeEventListener('keyup', keyup);
      window.removeEventListener('blur', stop);
      document.removeEventListener('visibilitychange', hidden);
    };
  }, [stop]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (!DIRECTIONS[key]) return;
    event.preventDefault();
    path.current = [];
    arrival.current = undefined;
    setTarget(null);
    // A quick key tap can begin and end between animation frames.
    if (!keys.current.size && !event.repeat) {
      navigation.current ??= createNavigation();
      const [dx, dy] = DIRECTIONS[key];
      const next = keyboardStep(point.current, dx, dy, 0.016, navigation.current);
      point.current = next;
      setPosition(next);
      if (dx) setFacing(dx < 0 ? -1 : 1);
    }
    keys.current.add(key);
    onMoveRef.current();
    start();
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || (event.target as Element).closest('button, a, details')) { gesture.current = null; return; }
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, scroll: window.scrollY, cancelled: false };
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (current && Math.hypot(event.clientX - current.x, event.clientY - current.y) > 8) current.cancelled = true;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    gesture.current = null;
    if (!current || current.cancelled || current.id !== event.pointerId || Math.abs(window.scrollY - current.scroll) > 4
      || Math.hypot(event.clientX - current.x, event.clientY - current.y) > 8) return;
    const bounds = map.current!.getBoundingClientRect();
    map.current?.focus({ preventScroll: true });
    moveTo({ x: (event.clientX - bounds.left) / bounds.width * 100, y: (event.clientY - bounds.top) / bounds.height * 100 });
  };
  return { position, moving, facing, target, stop, moveTo, onKeyDown, onPointerDown, onPointerMove, onPointerUp,
    onPointerCancel: () => { gesture.current = null; } };
}
