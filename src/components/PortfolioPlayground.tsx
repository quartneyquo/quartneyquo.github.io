'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Expand, ExternalLink, X } from 'lucide-react';

const eventPhotos = [
  { src: '/aivalley-lounge-event.jpg', label: 'Builder lounge' },
  { src: '/aivalley-workshop-room.jpg', label: 'Technical workshop' },
  { src: '/aivalley-builder-table.jpg', label: 'Builder conversations' },
  { src: '/aivalley-audience.jpg', label: 'Packed AI room' },
  { src: '/aivalley-founder-talk.jpg', label: 'Founder talk' },
  { src: '/fembrunch.jpg', label: 'Female Founder Brunch' },
];

export function EventGallery() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const photo = eventPhotos[selected];
  const step = (direction: number) => setSelected((index) => (index + direction + eventPhotos.length) % eventPhotos.length);

  useEffect(() => () => { document.body.style.removeProperty('overflow'); }, []);
  const close = () => {
    dialog.current?.close();
    document.body.style.removeProperty('overflow');
    opener.current?.focus({ preventScroll: true });
  };

  return (
    <div className="event-gallery">
      <button className="gallery-cover" ref={opener} type="button" aria-label={`Enlarge event photo: ${photo.label}`} onClick={() => {
        dialog.current?.showModal();
        document.body.style.overflow = 'hidden';
      }}>
        <motion.img key={photo.src} src={photo.src} alt={photo.label} width="1200" height="800"
          initial={reduceMotion ? false : { opacity: 0.5, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} />
        <span className="gallery-expand"><Expand size={18} /> <span>View photos</span></span>
      </button>
      <div className="gallery-caption"><span>{photo.label}</span><span>{String(selected + 1).padStart(2, '0')} / 06</span></div>
      <div className="gallery-filmstrip" aria-label="Event photos">
        {eventPhotos.map((item, index) => (
          <button key={item.src} type="button" aria-label={`Show ${item.label}`} aria-pressed={index === selected} onClick={() => setSelected(index)}>
            <img src={item.src} alt="" width="160" height="120" loading="lazy" />
          </button>
        ))}
      </div>
      <dialog className="event-lightbox" ref={dialog} aria-label="AI Valley event photos" onCancel={(event) => { event.preventDefault(); close(); }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
        }}>
        <div className="lightbox-toolbar"><span>AI Valley / In the room</span><button type="button" aria-label="Close photos" onClick={close}><X size={22} /></button></div>
        <motion.img key={photo.src} src={photo.src} alt={photo.label} initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
        <div className="lightbox-navigation">
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)}><ArrowLeft size={22} /></button>
          <p aria-live="polite">{photo.label}<span>{selected + 1} / {eventPhotos.length}</span></p>
          <button type="button" aria-label="Next photo" onClick={() => step(1)}><ArrowRight size={22} /></button>
        </div>
      </dialog>
    </div>
  );
}

type Product = { title: string; image: string; summary: string; href: string; eyebrow: string };

export function ProductShelf({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState(0);
  const reduceMotion = useReducedMotion();
  const product = products[selected];
  return (
    <div className="product-shelf">
      <div className="product-picker" role="tablist" aria-label="Paca products">
        {products.map((item, index) => (
          <button key={item.title} type="button" role="tab" id={`product-tab-${index}`} aria-controls="product-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              const next = event.key === 'ArrowRight' ? (index + 1) % products.length : event.key === 'ArrowLeft' ? (index - 1 + products.length) % products.length : event.key === 'Home' ? 0 : event.key === 'End' ? products.length - 1 : null;
              if (next === null) return;
              event.preventDefault();
              setSelected(next);
              document.getElementById(`product-tab-${next}`)?.focus();
            }}>
            <motion.img src={item.image} alt="" width="600" height="600" loading="lazy"
              animate={{ y: selected === index && !reduceMotion ? -12 : 0, rotate: selected === index || reduceMotion ? 0 : index === 0 ? -4 : 4, scale: selected === index ? 1 : 0.9 }}
              whileHover={reduceMotion ? undefined : { y: -12, rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 230, damping: 23 }} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${selected}`} tabIndex={0} className="product-panel">
        <motion.div key={product.title} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <p className="editorial-eyebrow">{product.eyebrow}</p>
          <h3>{product.title}</h3>
          <p>{product.summary}</p>
          <a href={product.href} className="editorial-button" target="_blank" rel="noopener noreferrer">Visit {product.title}<ExternalLink size={16} /></a>
        </motion.div>
      </div>
    </div>
  );
}
