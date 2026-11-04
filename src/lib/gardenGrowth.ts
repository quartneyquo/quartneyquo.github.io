/** Growth is derived only from the server's approved community total. */
export const GARDEN_MILESTONES = [
  { count: 10, title: "Pumpkin patch", icon: "🎃", key: "pumpkins" },
  { count: 50, title: "Cozy bench", icon: "🪑", key: "bench" },
  { count: 100, title: "Fairy lights", icon: "✨", key: "lights" },
  { count: 250, title: "Paca friends", icon: "🦙", key: "friends" },
  { count: 500, title: "Wishing fountain", icon: "⛲", key: "fountain" },
  { count: 1000, title: "Golden tree", icon: "🌳", key: "golden" },
] as const;

export function gardenGrowth(approvedTotal: number | null) {
  const total = Number.isFinite(approvedTotal) ? Math.max(0, Math.floor(approvedTotal as number)) : 0;
  // Early contributions are visible; large communities stay inside the scene.
  const fullness = Math.log1p(Math.min(total, 1000)) / Math.log1p(1000);
  const unlocked = GARDEN_MILESTONES.filter(m => total >= m.count);
  const next = GARDEN_MILESTONES.find(m => total < m.count);
  return {
    total,
    fullness,
    canopyScale: 1 + fullness * 0.075,
    extraLeaves: Math.min(total, 72),
    unlocked,
    next,
    remaining: next ? next.count - total : 0,
    stage: total >= 1000 ? "A golden garden" : total >= 500 ? "Full of wonder" : total >= 250 ? "A garden of friends" : total >= 100 ? "Glowing with gratitude" : total >= 50 ? "Growing together" : total >= 10 ? "Taking root" : "Little beginnings",
  };
}

// Deterministic positions prevent leaves from jumping around during refreshes.
export function canopyLeafPosition(index: number) {
  const angle = index * 2.399963229728653;
  const radius = Math.sqrt((index + 0.5) / 72);
  return { x: 50 + Math.cos(angle) * radius * 34, y: 30 + Math.sin(angle) * radius * 20, rotation: ((index * 47) % 100) - 50 };
}
