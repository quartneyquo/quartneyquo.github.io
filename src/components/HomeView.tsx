'use client';

import { motion } from 'framer-motion';
import { Play, Music2 } from 'lucide-react';
import { Playlist } from '@/types';

interface HomeViewProps {
  playlists: Playlist[];
  onSelectPlaylist: (id: string) => void;
  isLibrary?: boolean;
}

function AnimatedCover({ gradient }: { gradient: [string, string] }) {
  return (
    <div
      className="w-full aspect-square rounded-md mb-4 flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 bg-black/20 rounded-full flex items-center justify-center"
      >
        <Music2 size={28} className="text-white/60" />
      </motion.div>
      {/* Vinyl ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 h-20 border-2 border-white/10 rounded-full" />
        <div className="absolute w-12 h-12 border border-white/10 rounded-full" />
        <div className="absolute w-4 h-4 bg-black/30 rounded-full" />
      </div>
    </div>
  );
}

function PlaylistCard({
  playlist,
  onClick,
}: {
  playlist: Playlist;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      className="bg-[#181818] rounded-lg p-4 cursor-pointer group hover:bg-[#282828] transition-colors relative"
    >
      <AnimatedCover gradient={playlist.coverGradient} />

      {/* Hover play button */}
      <motion.button
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-[88px] right-6 w-12 h-12 bg-purple-500 rounded-full items-center justify-center shadow-xl hidden group-hover:flex transition-all"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <Play size={20} fill="white" className="text-white ml-0.5" />
      </motion.button>

      <h3 className="font-bold text-white text-sm mb-1 truncate">{playlist.title}</h3>
      <p className="text-[#a3a3a3] text-xs leading-relaxed line-clamp-2">{playlist.description}</p>
      <div className="mt-2 text-[10px] font-semibold text-purple-400 uppercase tracking-wide">
        {playlist.tracks.length} tracks
      </div>
    </motion.div>
  );
}

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function HomeView({ playlists, onSelectPlaylist, isLibrary = false }: HomeViewProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="p-6 pb-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">
          {isLibrary ? 'Your Library' : greeting}
        </h1>
        {!isLibrary && (
          <p className="text-[#a3a3a3] text-sm">
            Welcome to Courtney&apos;s world — pick a playlist to explore
          </p>
        )}
      </motion.div>

      {/* Quick access grid */}
      {!isLibrary && (
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {playlists.map((playlist) => (
              <motion.button
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist.id)}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                className="flex items-center gap-3 bg-white/10 rounded-md overflow-hidden text-left transition-colors"
              >
                <div
                  className="w-14 h-14 flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${playlist.coverGradient[0]}, ${playlist.coverGradient[1]})`,
                  }}
                >
                  <Music2 size={18} className="text-white opacity-80" />
                </div>
                <span className="font-semibold text-sm text-white pr-3 truncate">
                  {playlist.title}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Playlist cards */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-white mb-4">
          {isLibrary ? 'All Playlists' : 'Featured Playlists'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onClick={() => onSelectPlaylist(playlist.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* About / Profile section */}
      {!isLibrary && (
        <motion.div
          variants={itemVariants}
          className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-xl">
              <span className="text-2xl font-black text-white">CK</span>
            </div>
            <div>
              <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-1">
                Profile
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Courtney Ko</h2>
              <p className="text-[#a3a3a3] leading-relaxed text-sm max-w-lg">
                COO of AI Valley · Builder · Community architect. Exploring the frontier of AI,
                developer tools, and what it means to build in public. Based in San Francisco.
              </p>
              <div className="flex gap-6 mt-5">
                {[
                  { label: 'Events Hosted', value: '10+' },
                  { label: 'Builders Connected', value: '500+' },
                  { label: 'Projects Built', value: '3+' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-2xl font-black text-white">{value}</div>
                    <div className="text-xs text-[#a3a3a3] mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Keyboard shortcuts hint */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex flex-wrap gap-3 text-xs text-[#a3a3a3]"
      >
        {[
          { key: 'J / K', label: 'Navigate tracks' },
          { key: 'Enter', label: 'Open detail' },
          { key: 'Esc', label: 'Close' },
          { key: '/', label: 'Search' },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center gap-1.5">
            <kbd className="bg-white/10 border border-white/20 rounded px-1.5 py-0.5 text-[10px] font-mono text-white">
              {key}
            </kbd>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
