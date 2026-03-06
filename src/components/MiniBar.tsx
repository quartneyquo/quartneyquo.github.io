'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Stop } from '@/types';

interface MiniBarProps {
  currentStop: Stop | null;
  prevStop: Stop | null;
  nextStop: Stop | null;
  onNavigate: (stop: Stop) => void;
}

export default function MiniBar({ currentStop, prevStop, nextStop, onNavigate }: MiniBarProps) {
  if (!currentStop) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-md"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-soft-lg border border-blush-100 flex items-center gap-3 px-4 py-3">
        {/* Dot */}
        <div className="w-2 h-2 rounded-full bg-blush-400 flex-shrink-0 animate-pulse" />

        {/* Current stop */}
        <div className="flex-1 min-w-0">
          <div className="text-[9px] text-plum-300 font-semibold uppercase tracking-wider flex items-center gap-1">
            <MapPin size={8} />
            Currently viewing
          </div>
          <div className="text-xs font-bold text-plum-800 truncate">{currentStop.title}</div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            disabled={!prevStop}
            onClick={() => prevStop && onNavigate(prevStop)}
            className="w-7 h-7 rounded-xl bg-blush-50 flex items-center justify-center text-plum-400 disabled:opacity-30 hover:bg-blush-100 hover:text-blush-600 transition-all disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            disabled={!nextStop}
            onClick={() => nextStop && onNavigate(nextStop)}
            className="w-7 h-7 rounded-xl bg-blush-50 flex items-center justify-center text-plum-400 disabled:opacity-30 hover:bg-blush-100 hover:text-blush-600 transition-all disabled:cursor-not-allowed"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
