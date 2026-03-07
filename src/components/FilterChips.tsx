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
    <div className="flex flex-wrap gap-2">
      {unique.map((chip) => {
        const isActive = chip === active;
        return (
          <motion.button
            key={chip}
            onClick={() => onChange(chip)}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all ${
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
