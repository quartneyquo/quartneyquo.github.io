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
    <div className="relative mb-6 flex min-h-[228px] flex-col justify-end overflow-hidden rounded-2xl shadow-soft-lg sm:min-h-[260px] md:mb-8">
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
        className="relative z-10 px-5 py-5 sm:px-7 sm:py-7"
      >
        {/* Eyebrow */}
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">
          ✈ Trip
        </p>

        {/* Title */}
        <h1 className="mb-3 text-[2rem] font-black leading-[0.98] text-white sm:text-4xl md:text-5xl">
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
        <p className="mb-4 max-w-sm text-[13px] leading-relaxed text-white/72 sm:mb-5 sm:text-sm">
          {trip.subtitle}
        </p>

        {/* Travel tags */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {trip.stats.map(({ label, value }) => (
            <div
              key={label}
              className="flex min-w-0 items-center justify-between gap-1.5 rounded-full border border-white/25 px-3 py-1 backdrop-blur-sm sm:justify-start"
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
