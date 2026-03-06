'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plane, ArrowRight } from 'lucide-react';
import { Trip } from '@/types';

interface BoardingPassProps {
  trip: Trip;
}

export default function BoardingPass({ trip }: BoardingPassProps) {
  return (
    <Link href={`/trips/${trip.id}`}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(247,168,184,0.30)' }}
        transition={{ duration: 0.25 }}
        className="relative overflow-hidden rounded-3xl bg-blush-400 cursor-pointer"
      >
        {/* Decorative circles — subtle, no gradient */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-12 -left-6 w-32 h-32 bg-white/10 rounded-full" />

        {/* Main content */}
        <div className="relative z-10 p-6">
          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Passenger</div>
              <div className="text-lg font-black text-white">Courtney Ko</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Status</div>
              <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                <Plane size={14} className="animate-pulse" />
                In flight
              </div>
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center gap-3 mb-6">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">From</div>
              <div className="text-2xl font-black text-white">SF</div>
              <div className="text-[10px] text-white/70">San Francisco</div>
            </div>
            <div className="flex-1 flex items-center gap-2 px-2">
              <div className="flex-1 h-px border-t-2 border-dashed border-white/40" />
              <Plane size={18} className="text-white/70" />
              <div className="flex-1 h-px border-t-2 border-dashed border-white/40" />
            </div>
            <div className="text-right">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">To</div>
              <div className="text-2xl font-black text-white">∞</div>
              <div className="text-[10px] text-white/70">Greatness</div>
            </div>
          </div>

          {/* Perforation */}
          <div className="relative flex items-center my-4">
            <div className="absolute -left-6 w-5 h-5 rounded-full bg-blush-50" />
            <div className="flex-1 border-t-2 border-dashed border-white/30" />
            <div className="absolute -right-6 w-5 h-5 rounded-full bg-blush-50" />
          </div>

          {/* Bottom info */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Trip</div>
              <div className="text-sm font-black text-white">{trip.title}</div>
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Season</div>
              <div className="text-sm font-black text-white">{trip.dateRange}</div>
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-0.5">Gate</div>
              <div className="text-sm font-black text-white">AI</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-end gap-1.5 px-6 pb-5 text-white/70 text-xs font-semibold">
          View itinerary <ArrowRight size={13} />
        </div>
      </motion.div>
    </Link>
  );
}
