'use client';

import { motion } from 'framer-motion';

const ALL_FILTERS = ['All', 'Community', 'Work', 'Product', 'Study', 'Hackathon', 'Mixer', 'Personal', 'Adventure', 'Joy', 'Creative', 'Love', 'Experiment', 'Builder Event', 'Startup', 'App', 'AI Product'];

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
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive
                ? 'bg-blush-400 text-white shadow-soft'
                : 'bg-white text-plum-500 border border-blush-200 hover:border-blush-400'
            }`}
          >
            {chip}
          </motion.button>
        );
      })}
    </div>
  );
}
