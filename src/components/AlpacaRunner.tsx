'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUp, Pause, Play, RotateCcw } from 'lucide-react';
import { advanceRun, BEST_SCORE_KEY, createRun, drawRun, GAME_HEIGHT, jump, type RunStatus } from './alpacaRunnerEngine';
import styles from './notFound.module.css';

const formatScore = (score: number) => String(score).padStart(5, '0');

export default function AlpacaRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const runRef = useRef(createRun());
  const drawRef = useRef<() => void>(() => {});
  const bestRef = useRef(0);
  const [status, setStatus] = useState<RunStatus>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [available, setAvailable] = useState(true);

  const changeStatus = useCallback((next: RunStatus) => {
    runRef.current.status = next;
    setStatus(next);
  }, []);

  const play = useCallback(() => {
    const current = runRef.current.status;
    if (current === 'ready' || current === 'over') {
      runRef.current = createRun();
      setScore(0);
      changeStatus('running');
    } else if (current === 'paused') {
      changeStatus('running');
    } else {
      jump(runRef.current);
    }
    stageRef.current?.focus({ preventScroll: true });
  }, [changeStatus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) { setAvailable(false); return; }
    try {
      const saved = Number(localStorage.getItem(BEST_SCORE_KEY));
      if (Number.isSafeInteger(saved) && saved > 0) {
        bestRef.current = saved;
        setBest(saved);
      }
    } catch { /* The game also works when browser storage is unavailable. */ }

    let width = 720;
    let frame = 0;
    let lastTime = 0;
    let accumulated = 0;
    let lastScore = 0;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const draw = () => drawRun(ctx, runRef.current, width, motion.matches);
    drawRef.current = draw;
    const resize = () => {
      const previousWidth = width;
      width = Math.max(280, Math.round(canvas.getBoundingClientRect().width));
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(GAME_HEIGHT * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.imageSmoothingEnabled = false;
      if (runRef.current.status === 'running' && Math.abs(previousWidth - width) > 30) changeStatus('paused');
      draw();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const tick = (time: number) => {
      const run = runRef.current;
      if (run.status === 'running') {
        accumulated += lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
        while (accumulated >= 1 / 120 && run.status === 'running') {
          advanceRun(run, 1 / 120, width);
          accumulated -= 1 / 120;
        }
        if (run.score !== lastScore) { lastScore = run.score; setScore(run.score); }
        if (runRef.current.status === 'over') {
          changeStatus('over');
          if (run.score > bestRef.current) {
            bestRef.current = run.score;
            setBest(run.score);
            try { localStorage.setItem(BEST_SCORE_KEY, String(run.score)); } catch { /* Optional persistence. */ }
          }
        }
        draw();
      } else {
        accumulated = 0;
      }
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const pause = () => { if (runRef.current.status === 'running') changeStatus('paused'); };
    const onVisibility = () => { if (document.hidden) pause(); };
    window.addEventListener('blur', pause);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('blur', pause);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', draw);
      drawRef.current = () => {};
    };
  }, [changeStatus]);

  useEffect(() => { drawRef.current(); }, [status]);

  // Space starts the runner without first clicking the canvas.
  // Links and buttons retain their usual keyboard behavior.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!available || event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target;
      if (target instanceof Element && target.closest('a, button, input, textarea, select, [contenteditable="true"], [role="group"]')) return;
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault();
        play();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [available, play]);

  const overlayTitle = status === 'over' ? 'GAME OVER' : 'PAUSED';
  const announcement = status === 'over' ? `Run finished. Your score is ${score}. Best score ${best}. Play again?` : status === 'paused' ? 'Game paused.' : status === 'running' ? 'Let’s go! Press Space or the up arrow to jump. Press P or Escape to pause.' : 'Ready when you are. Start a game to help Opaca jump over mushrooms and logs.';

  return (
    <section className={styles.game} aria-labelledby="runner-title" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget) && runRef.current.status === 'running') changeStatus('paused');
    }}>
      <div className={styles.gameHeader}>
        <h2 id="runner-title" className={styles.srOnly}>Opaca’s little detour</h2>
        <div className={styles.scores} aria-label={`Score ${score}. Best ${best}.`}>
          <span>HI <b>{formatScore(best)}</b></span>
          <span className={styles.currentScore}>{formatScore(score)}</span>
        </div>
      </div>
      <div
        ref={stageRef}
        className={styles.stage}
        role="group"
        aria-label="Alpaca jumping game"
        aria-describedby="runner-instructions"
        tabIndex={available ? 0 : -1}
        data-status={status}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (['Space', 'ArrowUp', 'KeyP', 'Escape'].includes(event.code)) {
            event.preventDefault();
            if (event.repeat) return;
            if (event.code === 'Space' || event.code === 'ArrowUp') play();
            else if (runRef.current.status === 'running') changeStatus('paused');
            else if (runRef.current.status === 'paused') play();
          }
        }}
        onPointerDown={event => {
          if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
          event.preventDefault();
          if (available) play();
        }}
      >
        <canvas ref={canvasRef} width={720} height={GAME_HEIGHT} className={styles.canvas} aria-hidden="true" />
        {status !== 'running' && <div className={styles.overlay}>
          {(status !== 'ready' || !available) && <p>{available ? overlayTitle : 'Opaca is taking a little nap.'}</p>}
          {available ? <button type="button" className={styles.playButton} onClick={play}>
            {status === 'over' ? <RotateCcw size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            {status === 'over' ? 'Try again' : status === 'paused' ? 'Resume' : 'Press Space to play'}
          </button> : <span>Your browser can’t display the game, but you can still head home.</span>}
        </div>}
        {status === 'running' && <button type="button" className={styles.pauseButton} aria-label="Pause game" onClick={() => changeStatus('paused')}><Pause size={16} aria-hidden="true" /></button>}
      </div>
      <div className={styles.gameFooter}>
        <p id="runner-instructions"><kbd>Space</kbd> / <kbd>↑</kbd> or tap to jump<span> · P to pause</span></p>
        <button type="button" className={styles.jumpButton} onClick={play} disabled={!available}><ArrowUp size={14} aria-hidden="true" /> {status === 'running' ? 'Jump' : status === 'paused' ? 'Resume' : 'Play'}</button>
      </div>
      <p role="status" aria-live="polite" className={styles.srOnly}>{announcement}</p>
    </section>
  );
}
