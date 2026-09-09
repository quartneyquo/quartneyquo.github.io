'use client';

import { useEffect, useRef } from 'react';
import { clearExteriorPaper } from './watercolorMatte';

const sheets = new Map<string, Promise<HTMLCanvasElement>>();
function loadSheet(url: string) {
  let sheet = sheets.get(url);
  if (!sheet) {
    sheet = new Promise<HTMLCanvasElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) { reject(new Error('Canvas unavailable')); return; }
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      clearExteriorPaper(pixels.data, canvas.width, canvas.height);
      context.putImageData(pixels, 0, 0);
      resolve(canvas);
    };
    image.onerror = () => { sheets.delete(url); reject(new Error('Meadow artwork unavailable')); };
    image.src = url;
  });
    sheets.set(url, sheet);
  }
  return sheet;
}

export function MeadowGallop({ row, grazing = false }: { row: number; grazing?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    loadSheet(grazing ? '/meadow-eating.png' : '/meadow-gallop-white.png').then(source => {
      if (cancelled || !ref.current) return;
      const context = ref.current.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, 512, 128);
      if (grazing) {
        context.drawImage(source, 0, (row - 1) * source.height / 2, source.width, source.height / 2, 0, 0, 512, 128);
      } else {
        context.drawImage(source, 0, row * source.height / 3, source.width, source.height / 3, 0, 0, 512, 128);
      }
      ref.current.dataset.ready = 'true';
    }).catch(() => { if (ref.current) ref.current.dataset.ready = 'error'; });
    return () => { cancelled = true; };
  }, [row, grazing]);
  return <span className="meadow-alpaca-sprite"><canvas ref={ref} width={512} height={128} className={grazing ? 'meadow-grazing-pose' : 'meadow-gallop-frames'} /></span>;
}
