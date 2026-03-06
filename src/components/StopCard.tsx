'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { Stop } from '@/types';

const TAG_STYLES: Record<string, string> = {
  Community: 'bg-lavender-100 text-lavender-600',
  Work: 'bg-plum-100 text-plum-600',
  Product: 'bg-blush-100 text-blush-600',
  Study: 'bg-lavender-100 text-lavender-500',
  Hackathon: 'bg-blush-100 text-blush-600',
  Mixer: 'bg-lavender-100 text-lavender-600',
  Personal: 'bg-plum-50 text-plum-400',
  Adventure: 'bg-lavender-100 text-lavender-600',
  Joy: 'bg-blush-100 text-blush-500',
  Creative: 'bg-lavender-100 text-lavender-500',
  Love: 'bg-blush-100 text-blush-600',
  Experiment: 'bg-plum-100 text-plum-500',
  'Builder Event': 'bg-blush-100 text-blush-500',
  Startup: 'bg-lavender-100 text-lavender-600',
  App: 'bg-blush-50 text-blush-500',
  'AI Product': 'bg-lavender-100 text-lavender-600',
};

interface StopCardProps {
  stop: Stop;
  index: number;
  isSelected: boolean;
  isLast: boolean;
  onClick: () => void;
}

export default function StopCard({ stop, index, isSelected, isLast, onClick }: StopCardProps) {
  const tagStyle = TAG_STYLES[stop.tag] || 'bg-blush-50 text-blush-500';

  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-6">
        <motion.div
          animate={{
            scale: isSelected ? 1.2 : 1,
            backgroundColor: isSelected ? '#F7A8B8' : '#ffffff',
          }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 rounded-full border-2 border-blush-300 flex-shrink-0 shadow-sm mt-4 z-10"
        />
        {!isLast && <div className="w-0.5 flex-1 bg-blush-100 mt-1" />}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ y: -2, boxShadow: '0 6px 30px rgba(43,27,46,0.10)' }}
        onClick={onClick}
        className={`flex-1 mb-4 bg-white rounded-2xl border cursor-pointer transition-all overflow-hidden ${
          isSelected
            ? 'border-blush-300 shadow-soft-lg ring-2 ring-blush-200'
            : 'border-blush-100 shadow-card hover:border-blush-200'
        }`}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tagStyle}`}>
                {stop.tag}
              </span>
              {stop.timeLabel && (
                <div className="flex items-center gap-1 text-xs font-medium text-plum-600">
                  <Clock size={11} />
                  <span>{stop.timeLabel}</span>
                </div>
              )}
            </div>
            <ChevronRight
              size={15}
              className={`flex-shrink-0 mt-0.5 transition-colors ${isSelected ? 'text-blush-400' : 'text-plum-200'}`}
            />
          </div>

          <h3 className={`font-bold text-base leading-snug mb-1 ${isSelected ? 'text-blush-600' : 'text-plum-800'}`}>
            {stop.title}
          </h3>

          {stop.locationLabel && (
            <div className="flex items-center gap-1 text-[11px] text-plum-500 mb-2">
              <MapPin size={10} />
              <span>{stop.locationLabel}</span>
            </div>
          )}

          <p className="text-xs text-plum-400 leading-relaxed line-clamp-2">{stop.blurb}</p>
        </div>

        {isSelected && <div className="h-0.5 bg-blush-400" />}
      </motion.div>
    </div>
  );
}
