'use client';

import { type CSSProperties, useEffect, useRef } from 'react';
import { clearExteriorPaper } from './watercolorMatte';

let artwork: Promise<HTMLCanvasElement> | undefined;

function clearLeftEdgeBleed(context: CanvasRenderingContext2D, width: number, height: number) {
  const image = context.getImageData(0, 0, width, height);
  const visited = new Uint8Array(width * height);
  const stack: number[] = [];
  for (let y = 0; y < height; y++) {
    const pixel = y * width;
    if (image.data[pixel * 4 + 3] > 0) stack.push(pixel);
  }
  while (stack.length) {
    const pixel = stack.pop()!;
    if (visited[pixel] || image.data[pixel * 4 + 3] === 0) continue;
    visited[pixel] = 1;
    image.data[pixel * 4 + 3] = 0;
    const x = pixel % width;
    if (x > 0) stack.push(pixel - 1);
    if (x < width - 1) stack.push(pixel + 1);
    if (pixel >= width) stack.push(pixel - width);
    if (pixel < width * (height - 1)) stack.push(pixel + width);
  }
  context.putImageData(image, 0, 0);
}

function loadArtwork() {
  if (!artwork) artwork = new Promise<HTMLCanvasElement>((resolve, reject) => {
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
    image.onerror = () => { artwork = undefined; reject(new Error('Watercolor artwork unavailable')); };
    image.src = '/watercolor-atlas.webp';
  });
  return artwork;
}

export function WatercolorSprite({ tile, className, style, collected }: {
  tile: number; className?: string; style?: CSSProperties; collected?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    loadArtwork().then(source => {
      if (cancelled || !ref.current) return;
      const canvas = ref.current;
      const context = canvas.getContext('2d');
      if (!context) return;
      const cell = source.width / 3;
      canvas.width = cell;
      canvas.height = cell;
      if (tile === 7) {
        // Opaca's ears extend above the nominal grid cell; include that headroom.
        context.drawImage(source, cell * 1.2, cell * 1.96, cell * .72, cell * .96,
          cell * .14, cell * .04, cell * .72, cell * .96);
      } else if (tile === 4) {
        // Keep the village's full trees while removing the port artwork that crosses the cell edge.
        const top = 38;
        canvas.height = cell - 54;
        context.drawImage(source, tile % 3 * cell, Math.floor(tile / 3) * cell + top,
          cell, canvas.height, 0, 0, cell, canvas.height);
        clearLeftEdgeBleed(context, canvas.width, canvas.height);
      } else {
        const top = tile >= 3 ? 12 : 0;
        context.drawImage(source, tile % 3 * cell, Math.floor(tile / 3) * cell + top,
          cell, cell - top, 0, top, cell, cell - top);
      }
      canvas.dataset.ready = 'true';
    }).catch(() => { if (ref.current) ref.current.dataset.ready = 'error'; });
    return () => { cancelled = true; };
  }, [tile]);
  return <canvas ref={ref} width="418" height="418" className={className} style={style}
    data-collected={collected} aria-hidden="true" />;
}
