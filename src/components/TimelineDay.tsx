'use client';

import { motion } from 'framer-motion';
import { Day, Stop } from '@/types';
import StopCard from './StopCard';

interface TimelineDayProps {
  day: Day;
  dayNumber: number;
  selectedStopId: string | null;
  onSelectStop: (stop: Stop) => void;
  filteredStopIds: Set<string> | null;
}

export default function TimelineDay({
  day,
  dayNumber,
  selectedStopId,
  onSelectStop,
  filteredStopIds,
}: TimelineDayProps) {
  const visibleStops = filteredStopIds
    ? day.stops.filter((s) => filteredStopIds.has(s.id))
    : day.stops;

  if (visibleStops.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: dayNumber * 0.06 }}
      className="mb-10"
    >
      {/* Section header */}
      <div className="mb-5">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blush-400 mb-0.5">
          Stop {String(dayNumber).padStart(2, '0')}
        </p>
        <div className="flex items-center gap-3">
          <h2 className="font-black text-plum-800 text-base leading-none whitespace-nowrap">
            {day.title}
          </h2>
          {day.dateLabel && (
            <span className="text-[10px] text-plum-500 font-medium">{day.dateLabel}</span>
          )}
          <div className="flex-1 h-px bg-blush-100" />
          <span className="text-[10px] text-plum-300 font-medium whitespace-nowrap">
            {visibleStops.length} {visibleStops.length === 1 ? 'stop' : 'stops'}
          </span>
        </div>
      </div>

      <div className="pl-2">
        {visibleStops.map((stop, i) => (
          <StopCard
            key={stop.id}
            stop={stop}
            index={i}
            isSelected={selectedStopId === stop.id}
            isLast={i === visibleStops.length - 1}
            onClick={() => onSelectStop(stop)}
          />
        ))}
      </div>
    </motion.div>
  );
}
