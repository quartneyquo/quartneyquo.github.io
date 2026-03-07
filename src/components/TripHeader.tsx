'use client';

import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { Trip } from '@/types';

interface TripHeaderProps {
  trip: Trip;
}

export default function TripHeader({ trip }: TripHeaderProps) {
  const totalStops = trip.days.reduce((acc, d) => acc + d.stops.length, 0);

  return (
    <div className="relative overflow-hidden rounded-2xl mb-8 shadow-soft-lg min-h-[260px] flex flex-col justify-end">
      {/* Base fallback */}
      <div className="absolute inset-0 bg-plum-800" />

      {/* Cover photo */}
      {trip.coverImage && (
        <div className="absolute inset-0">
          <img
            src={trip.coverImage}
            alt={trip.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: trip.coverImagePosition ?? 'center' }}
          />
        </div>
      )}

      {/* Gradient overlay — stronger at bottom for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 px-7 py-7"
      >
        {/* Eyebrow */}
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">
          ✈ Trip
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-white leading-none mb-3">
          {trip.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2.5 text-white/65 text-xs mb-3">
          <div className="flex items-center gap-1.5">
            <CalendarDays size={11} />
            <span>{trip.dateRange}</span>
          </div>
          <span className="text-white/30">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin size={11} />
            <span>{totalStops} stops</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-sm">
          {trip.subtitle}
        </p>

        {/* Travel tags */}
        <div className="flex flex-wrap gap-2">
          {trip.stats.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-white/20 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <span className="text-[9px] uppercase tracking-wide text-white/45 font-semibold">
                {label}
              </span>
              <span className="text-white/85 text-[11px] font-bold">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
