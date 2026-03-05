'use client';

import { motion } from 'framer-motion';
import { Play, Clock, Music2 } from 'lucide-react';
import { Playlist, Track } from '@/types';
import CoverImage from './CoverImage';

interface PlaylistViewProps {
  playlist: Playlist;
  selectedTrack: Track | null;
  currentTrackIndex: number;
  onSelectTrack: (track: Track, index: number) => void;
}

function NowPlayingDots() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-purple-400 rounded-full"
          animate={{ height: ['4px', '14px', '4px'] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function PlaylistView({
  playlist,
  selectedTrack,
  currentTrackIndex,
  onSelectTrack,
}: PlaylistViewProps) {
  return (
    <div>
      {/* Hero header */}
      <div
        className="px-6 pb-6 pt-12"
        style={{
          background: `linear-gradient(180deg, ${playlist.coverGradient[0]}55 0%, transparent 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
          {/* Cover art */}
          <div className="w-40 h-40 rounded-xl flex-shrink-0 shadow-2xl overflow-hidden">
            {playlist.coverImage ? (
              <CoverImage
                src={playlist.coverImage}
                alt={playlist.title}
                className="w-full h-full rounded-xl"
                overlay
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${playlist.coverGradient[0]}, ${playlist.coverGradient[1]})`,
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <Music2 size={52} className="text-white/50" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-28 h-28 border-2 border-white/15 rounded-full" />
                  <div className="absolute w-16 h-16 border border-white/10 rounded-full" />
                  <div className="absolute w-5 h-5 bg-black/40 rounded-full" />
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase text-[#a3a3a3] tracking-widest mb-2">
              Playlist
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-none">
              {playlist.title}
            </h1>
            <p className="text-[#a3a3a3] text-sm mb-4 max-w-lg">{playlist.description}</p>
            <div className="text-sm text-[#a3a3a3]">
              <span className="text-white font-semibold">Courtney Ko</span>
              {' · '}
              <span>{playlist.tracks.length} tracks</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-400 transition-colors"
            onClick={() => onSelectTrack(playlist.tracks[0], 0)}
          >
            <Play size={24} fill="white" className="text-white ml-1" />
          </motion.button>
        </div>
      </div>

      {/* Track table */}
      <div className="px-6 pb-10">
        {/* Table header */}
        <div className="grid grid-cols-[2.5rem_1fr_140px_60px] gap-4 px-4 py-2 text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider border-b border-white/10 mb-1">
          <span className="text-center">#</span>
          <span>Title</span>
          <span>Type</span>
          <span className="flex justify-end">
            <Clock size={13} />
          </span>
        </div>

        {playlist.tracks.map((track, index) => {
          const isSelected = selectedTrack?.id === track.id;

          return (
            <motion.div
              key={track.id}
              onClick={() => onSelectTrack(track, index)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
              style={{
                backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.12)' : undefined,
              }}
              className="grid grid-cols-[2.5rem_1fr_140px_60px] gap-4 px-4 py-3 rounded-md cursor-pointer group"
            >
              {/* Index / playing indicator */}
              <div className="flex items-center justify-center h-full">
                {isSelected ? (
                  <NowPlayingDots />
                ) : (
                  <>
                    <span className="text-[#a3a3a3] text-sm group-hover:hidden">
                      {index + 1}
                    </span>
                    <Play
                      size={14}
                      fill="white"
                      className="text-white hidden group-hover:block"
                    />
                  </>
                )}
              </div>

              {/* Title + description */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Track thumbnail */}
                <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden">
                  {track.coverImage ? (
                    <CoverImage
                      src={track.coverImage}
                      alt={track.title}
                      className="w-full h-full"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${playlist.coverGradient[0]}99, ${playlist.coverGradient[1]}99)`,
                      }}
                    >
                      <Music2 size={12} className="text-white/70" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div
                    className={`text-sm font-semibold truncate ${
                      isSelected ? 'text-purple-400' : 'text-white'
                    }`}
                  >
                    {track.title}
                  </div>
                  <div className="text-xs text-[#a3a3a3] truncate max-w-[200px]">
                    {track.description.slice(0, 55)}
                    {track.description.length > 55 ? '…' : ''}
                  </div>
                </div>
              </div>

              {/* Type badge */}
              <div className="flex items-center">
                <span className="text-xs text-[#a3a3a3] bg-white/10 px-2.5 py-1 rounded-full truncate">
                  {track.type}
                </span>
              </div>

              {/* Year */}
              <div className="flex items-center justify-end">
                <span className="text-xs text-[#a3a3a3]">{track.year ?? 2024}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
