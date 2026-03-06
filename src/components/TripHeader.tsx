'use client';

import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { Trip } from '@/types';

interface TripHeaderProps {
  trip: Trip;
}

export default function TripHeader({ trip }: TripHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-6 shadow-soft-lg bg-blush-400">
      {/* Cover photo overlay */}
      {trip.coverImage && (
        <div className="absolute inset-0">
          <img
            src={trip.coverImage}
            alt={trip.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.55) saturate(0.9)', objectPosition: trip.coverImagePosition ?? 'center' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-2">
            ✈ Trip
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-1 leading-tight">
            {trip.title}
          </h1>
          <p className="text-white/85 font-medium mb-4 text-sm md:text-base">{trip.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 text-white/70 text-xs mb-6">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              <span>{trip.dateRange}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} />
              <span>{trip.days.reduce((acc, d) => acc + d.stops.length, 0)} stops</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            {trip.stats.map(({ label, value }) => (
              <div
                key={label}
                className="bg-white/40 border border-white/40 rounded-xl px-4 py-2.5 text-white"
              >
                <div className="text-lg font-black leading-none">{value}</div>
                <div className="text-[10px] font-medium opacity-80 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
