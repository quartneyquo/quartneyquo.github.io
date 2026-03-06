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
      className="mb-8"
    >
      {/* Day header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blush-400 flex items-center justify-center shadow-soft flex-shrink-0">
            <span className="text-[10px] font-black text-white">{dayNumber}</span>
          </div>
          <div>
            <h2 className="font-bold text-plum-800 text-sm leading-none">{day.title}</h2>
            {day.dateLabel && (
              <span className="text-[10px] text-plum-500 font-medium">{day.dateLabel}</span>
            )}
          </div>
        </div>
        <div className="flex-1 h-px bg-blush-100" />
        <span className="text-[10px] text-plum-200 font-medium">{visibleStops.length} stops</span>
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
