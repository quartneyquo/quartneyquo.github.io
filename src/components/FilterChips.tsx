'use client';

import { motion } from 'framer-motion';

const ALL_FILTERS = [
  'All', 'Community', 'Work', 'Product', 'Study', 'Hackathon', 'Mixer',
  'Personal', 'Adventure', 'Joy', 'Creative', 'Love', 'Experiment',
  'Builder Event', 'Startup', 'App', 'AI Product',
];

const DISPLAY_LABELS: Record<string, string> = {
  All: 'All Stops',
  Study: 'Learning',
  Personal: 'Life',
  Experiment: 'Experiments',
  'Builder Event': 'Events',
};

function label(chip: string) {
  return DISPLAY_LABELS[chip] ?? chip;
}

interface FilterChipsProps {
  available: string[];
  active: string;
  onChange: (f: string) => void;
}

export default function FilterChips({ available, active, onChange }: FilterChipsProps) {
  const chips = ['All', ...available.filter((t) => ALL_FILTERS.includes(t))];
  const unique = Array.from(new Set(chips));

  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
      {unique.map((chip) => {
        const isActive = chip === active;
        return (
          <motion.button
            key={chip}
            onClick={() => onChange(chip)}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className={`shrink-0 snap-start rounded-full px-4 py-2 text-[11px] font-semibold tracking-wide transition-all md:py-1.5 ${
              isActive
                ? 'bg-plum-700 text-white shadow-soft border border-plum-700'
                : 'bg-white text-plum-500 border border-blush-100 hover:border-blush-300 hover:text-plum-700 shadow-card'
            }`}
          >
            {label(chip)}
          </motion.button>
        );
      })}
    </div>
  );
}
