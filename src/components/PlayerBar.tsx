'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  Heart,
  Music2,
  Mic2,
} from 'lucide-react';
import { Track, Playlist } from '@/types';

interface PlayerBarProps {
  currentTrack: Track | null;
  nextTrack: Track | null;
  currentPlaylist: Playlist | null;
  currentTrackIndex: number;
  totalTracks: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PlayerBar({
  currentTrack,
  nextTrack,
  currentPlaylist,
  currentTrackIndex,
  totalTracks,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
}: PlayerBarProps) {
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(75);

  const progress = totalTracks > 0 ? ((currentTrackIndex + 1) / totalTracks) * 100 : 0;
  const g0 = currentPlaylist?.coverGradient[0] ?? '#7c3aed';
  const g1 = currentPlaylist?.coverGradient[1] ?? '#c084fc';

  return (
    <footer className="h-[90px] bg-[#181818] border-t border-white/10 flex items-center px-4 gap-4 flex-shrink-0 z-20">
      {/* Now playing */}
      <div className="flex items-center gap-3 w-[240px] min-w-0 flex-shrink-0">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={
            isPlaying
              ? { duration: 8, repeat: Infinity, ease: 'linear' }
              : { duration: 0 }
          }
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
          style={{ background: `linear-gradient(135deg, ${g0}, ${g1})` }}
        >
          <Music2 size={18} className="text-white" />
        </motion.div>

        <div className="min-w-0 flex-1">
          {currentTrack ? (
            <>
              <div className="text-sm font-semibold text-white truncate">
                {currentTrack.title}
              </div>
              <div className="text-xs text-[#a3a3a3] truncate">{currentTrack.type}</div>
            </>
          ) : (
            <div className="text-xs text-[#a3a3a3]">Select a track to begin</div>
          )}
        </div>

        <button
          onClick={() => setLiked((l) => !l)}
          className={`flex-shrink-0 transition-colors ${
            liked ? 'text-purple-400' : 'text-[#a3a3a3] hover:text-white'
          }`}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Center controls */}
      <div className="flex-1 flex flex-col items-center gap-2 max-w-lg mx-auto">
        {/* Buttons */}
        <div className="flex items-center gap-5">
          <button className="text-[#a3a3a3] hover:text-white transition-colors hidden sm:block">
            <Shuffle size={16} />
          </button>
          <button
            onClick={onPrev}
            className="text-[#a3a3a3] hover:text-white transition-colors"
          >
            <SkipBack size={20} />
          </button>
          <motion.button
            onClick={onTogglePlay}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause size={18} className="text-black" fill="black" />
            ) : (
              <Play size={18} className="text-black ml-0.5" fill="black" />
            )}
          </motion.button>
          <button
            onClick={onNext}
            className="text-[#a3a3a3] hover:text-white transition-colors"
          >
            <SkipForward size={20} />
          </button>
          <button className="text-[#a3a3a3] hover:text-white transition-colors hidden sm:block">
            <Repeat size={16} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full flex items-center gap-2">
          <span className="text-[10px] text-[#a3a3a3] w-6 text-right tabular-nums">
            {currentTrack ? currentTrackIndex + 1 : 0}
          </span>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer">
            <motion.div
              className="h-full bg-white group-hover:bg-purple-400 rounded-full transition-colors"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px] text-[#a3a3a3] w-6 tabular-nums">{totalTracks}</span>
        </div>

        {/* Next up label */}
        {nextTrack && (
          <div className="text-[10px] text-[#a3a3a3] hidden sm:block">
            Next:{' '}
            <span className="text-white font-medium">{nextTrack.title}</span>
          </div>
        )}
      </div>

      {/* Right side controls */}
      <div className="hidden sm:flex items-center gap-3 w-[180px] justify-end flex-shrink-0">
        <Mic2 size={15} className="text-[#a3a3a3] hover:text-white cursor-pointer transition-colors" />
        <Volume2 size={16} className="text-[#a3a3a3]" />
        <div className="w-24 relative">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${volume}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          />
        </div>
      </div>
    </footer>
  );
}
