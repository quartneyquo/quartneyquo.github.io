'use client';

import { motion } from 'framer-motion';
import { X, Music2, ChevronRight } from 'lucide-react';
import { Track, Playlist, ContentSection } from '@/types';

interface DetailDrawerProps {
  track: Track;
  playlist: Playlist | null;
  onClose: () => void;
}

function SectionRenderer({ section }: { section: ContentSection }) {
  return (
    <div className="mb-5">
      <h3 className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
        <ChevronRight size={10} className="text-purple-400" />
        {section.title}
      </h3>

      {section.text && (
        <p className="text-[#d4d4d4] text-sm leading-relaxed">{section.text}</p>
      )}

      {section.items && (
        <ul className="space-y-2">
          {section.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-sm text-[#d4d4d4]">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.stats && (
        <div className="grid grid-cols-2 gap-2">
          {section.stats.map(({ label, value }, j) => (
            <div key={j} className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="text-xl font-black text-white">{value}</div>
              <div className="text-xs text-[#a3a3a3] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DetailDrawer({ track, playlist, onClose }: DetailDrawerProps) {
  const g0 = playlist?.coverGradient[0] ?? '#7c3aed';
  const g1 = playlist?.coverGradient[1] ?? '#c084fc';

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className="fixed right-0 top-0 w-[360px] xl:w-[400px] bg-[#0f0f0f] border-l border-white/10 overflow-y-auto z-50"
      style={{ bottom: '90px' }}
    >
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 p-4 flex items-center justify-between gap-3"
        style={{
          background: `linear-gradient(135deg, ${g0}33, ${g1}22)`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ background: `linear-gradient(135deg, ${g0}, ${g1})` }}
          >
            <Music2 size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-semibold text-[#a3a3a3] uppercase tracking-wide">
              {track.type}
            </div>
            <div className="text-sm font-bold text-white truncate">{track.title}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#a3a3a3] hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X size={15} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Description */}
        <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6 pb-5 border-b border-white/10">
          {track.description}
        </p>

        {/* Sections */}
        <div>
          {track.contentSections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <SectionRenderer section={section} />
              {i < track.contentSections.length - 1 && (
                <div className="border-t border-white/5 mb-5" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Playlist label */}
        {playlist && (
          <div
            className="mt-6 flex items-center gap-2 text-xs text-[#a3a3a3] p-3 rounded-lg"
            style={{ background: `${g0}15` }}
          >
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${g0}, ${g1})` }}
            >
              <Music2 size={10} className="text-white" />
            </div>
            <span>
              From <span className="text-white font-medium">{playlist.title}</span>
            </span>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
