'use client';

import { motion } from 'framer-motion';
import { Search, Music2 } from 'lucide-react';
import { Playlist, Track } from '@/types';

interface SearchResult {
  track: Track;
  playlist: Playlist;
  trackIndex: number;
}

interface SearchViewProps {
  playlists: Playlist[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectTrack: (track: Track, index: number) => void;
  onSelectPlaylist: (id: string) => void;
}

export default function SearchView({
  playlists,
  searchQuery,
  setSearchQuery,
  onSelectTrack,
  onSelectPlaylist,
}: SearchViewProps) {
  const q = searchQuery.toLowerCase().trim();

  const results: SearchResult[] =
    q.length > 0
      ? playlists.flatMap((playlist) =>
          playlist.tracks
            .map((track, trackIndex) => ({ track, playlist, trackIndex }))
            .filter(
              ({ track }) =>
                track.title.toLowerCase().includes(q) ||
                track.type.toLowerCase().includes(q) ||
                track.description.toLowerCase().includes(q) ||
                track.contentSections.some(
                  (s) =>
                    s.title.toLowerCase().includes(q) ||
                    s.text?.toLowerCase().includes(q) ||
                    s.items?.some((item) => item.toLowerCase().includes(q))
                )
            )
        )
      : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black text-white mb-6">Search</h1>

      {/* Search input */}
      <div className="relative mb-8 max-w-xl">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What do you want to explore?"
          autoComplete="off"
          className="w-full bg-white text-black placeholder-neutral-400 pl-11 pr-4 py-3 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-lg"
        />
      </div>

      {/* Browse grid (when empty query) */}
      {q.length === 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Browse All</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectPlaylist(playlist.id)}
                className="rounded-xl p-5 cursor-pointer relative overflow-hidden h-28 flex items-end shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${playlist.coverGradient[0]}, ${playlist.coverGradient[1]})`,
                }}
              >
                <Music2
                  size={52}
                  className="absolute -right-2 -top-2 text-white/20 rotate-12"
                />
                <span className="text-white font-bold text-sm relative z-10">
                  {playlist.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {q.length > 0 && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-5xl mb-4">🎵</div>
          <p className="text-white font-semibold mb-1">No results found for &quot;{searchQuery}&quot;</p>
          <p className="text-[#a3a3a3] text-sm">Try searching for a different term.</p>
        </motion.div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            Results for &quot;{searchQuery}&quot;
          </h2>
          <div className="space-y-1">
            {results.map(({ track, playlist, trackIndex }, i) => (
              <motion.div
                key={`${playlist.id}-${track.id}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
                onClick={() => {
                  onSelectPlaylist(playlist.id);
                  // Small delay so playlist is selected before track
                  setTimeout(() => onSelectTrack(track, trackIndex), 50);
                }}
                className="flex items-center gap-4 p-3 rounded-md cursor-pointer"
              >
                <div
                  className="w-11 h-11 rounded flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${playlist.coverGradient[0]}, ${playlist.coverGradient[1]})`,
                  }}
                >
                  <Music2 size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{track.title}</div>
                  <div className="text-xs text-[#a3a3a3]">
                    {track.type} · {playlist.title}
                  </div>
                </div>
                <span className="text-xs text-[#a3a3a3] bg-white/10 px-2 py-0.5 rounded-full flex-shrink-0">
                  {track.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
