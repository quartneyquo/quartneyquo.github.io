'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Stop, Trip, ContentBlock } from '@/types';
import TravelMap from './TravelMap';

interface StopDrawerProps {
  stop: Stop | null;
  trip: Trip;
  allStops: Stop[];
  onClose: () => void;
  onNavigate: (stop: Stop) => void;
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === 'text') {
    return (
      <div className="mb-5">
        {block.title && (
          <h4 className="text-[10px] font-black uppercase tracking-widest text-plum-300 mb-2">
            {block.title}
          </h4>
        )}
        <p className="text-sm text-plum-700 leading-relaxed">{block.text}</p>
      </div>
    );
  }

  if (block.type === 'bullets') {
    return (
      <div className="mb-5">
        {block.title && (
          <h4 className="text-[10px] font-black uppercase tracking-widest text-plum-300 mb-2">
            {block.title}
          </h4>
        )}
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-plum-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blush-400 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === 'metrics') {
    return (
      <div className="mb-5">
        {block.title && (
          <h4 className="text-[10px] font-black uppercase tracking-widest text-plum-300 mb-2">
            {block.title}
          </h4>
        )}
        <div className="grid grid-cols-2 gap-2">
          {block.items.map(({ label, value }, i) => (
            <div key={i} className="bg-blush-50 border border-blush-100 rounded-xl p-3">
              <div className="text-xl font-black text-plum-800 leading-none">{value}</div>
              <div className="text-[10px] text-plum-400 mt-1 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'links') {
    return (
      <div className="mb-5">
        {block.title && (
          <h4 className="text-[10px] font-black uppercase tracking-widest text-plum-300 mb-2">
            {block.title}
          </h4>
        )}
        <div className="space-y-2">
          {block.items.map(({ label, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blush-500 hover:text-blush-600 font-semibold transition-colors"
            >
              <ExternalLink size={13} />
              {label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'gallery') {
    return (
      <div className="mb-5">
        {block.title && (
          <h4 className="text-[10px] font-black uppercase tracking-widest text-plum-300 mb-2">
            {block.title}
          </h4>
        )}
        <div className={`grid gap-2 ${block.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {block.photos.map(({ src, caption }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ scale: 1.015 }}
              className={`relative rounded-xl overflow-hidden bg-blush-100 group ${
                block.photos.length === 1 ? 'aspect-[4/3]' : 'aspect-square'
              }`}
            >
              <img
                src={src}
                alt={caption ?? ''}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-plum-900/70 to-transparent px-3 pb-2 pt-5">
                  <span className="text-[10px] font-bold text-white/95 leading-tight">{caption}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'map') {
    return (
      <div className="mb-5">
        {block.title && (
          <h4 className="text-[10px] font-black uppercase tracking-widest text-plum-300 mb-2">
            {block.title}
          </h4>
        )}
        <TravelMap countries={block.countries} />
      </div>
    );
  }

  return null;
}

export default function StopDrawer({ stop, trip, allStops, onClose, onNavigate }: StopDrawerProps) {
  const currentIndex = allStops.findIndex((s) => s.id === stop?.id);
  const prevStop = currentIndex > 0 ? allStops[currentIndex - 1] : null;
  const nextStop = currentIndex < allStops.length - 1 ? allStops[currentIndex + 1] : null;

  return (
    <AnimatePresence>
      {stop && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-plum-900/20 backdrop-blur-sm z-40 md:hidden"
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[380px] bg-white shadow-soft-lg z-50 flex flex-col border-l border-blush-100"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-5 py-5 border-b border-blush-100 bg-blush-50">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blush-500">
                      {stop.tag}
                    </span>
                    {stop.timeLabel && (
                      <div className="flex items-center gap-1 text-[10px] text-plum-300">
                        <Clock size={9} />
                        <span>{stop.timeLabel}</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-plum-900 leading-tight">{stop.title}</h2>
                  {stop.locationLabel && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-plum-400">
                      <MapPin size={11} />
                      <span>{stop.locationLabel}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-blush-200 flex items-center justify-center text-plum-400 hover:text-plum-700 hover:border-blush-400 transition-all shadow-soft"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {stop.image && (
                <div className="rounded-xl overflow-hidden mb-5 -mx-1">
                  <img src={stop.image} alt={stop.title} className="w-full h-40 object-cover" />
                </div>
              )}
              <p className="text-sm text-plum-500 leading-relaxed mb-6 pb-5 border-b border-blush-50">
                {stop.blurb}
              </p>

              {stop.content.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {i > 0 && <div className="border-t border-blush-50 mb-5" />}
                  <ContentBlockRenderer block={block} />
                </motion.div>
              ))}

              <div className="mt-4 flex items-center gap-2 text-[11px] text-plum-300 bg-blush-50 rounded-xl p-3">
                <span>✈</span>
                <span>
                  From trip <span className="font-semibold text-plum-500">{trip.title}</span>
                </span>
              </div>
            </div>

            {/* Footer nav */}
            <div className="flex-shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-t border-blush-100 bg-white">
              <button
                disabled={!prevStop}
                onClick={() => prevStop && onNavigate(prevStop)}
                className="flex items-center gap-1.5 text-xs font-semibold text-plum-400 disabled:opacity-30 hover:text-blush-500 transition-colors disabled:cursor-not-allowed"
              >
                <ChevronLeft size={15} />
                {prevStop?.title ?? 'Start'}
              </button>
              <div className="text-[10px] text-plum-200 font-medium">
                {currentIndex + 1} / {allStops.length}
              </div>
              <button
                disabled={!nextStop}
                onClick={() => nextStop && onNavigate(nextStop)}
                className="flex items-center gap-1.5 text-xs font-semibold text-plum-400 disabled:opacity-30 hover:text-blush-500 transition-colors disabled:cursor-not-allowed"
              >
                {nextStop?.title ?? 'End'}
                <ChevronRight size={15} />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
