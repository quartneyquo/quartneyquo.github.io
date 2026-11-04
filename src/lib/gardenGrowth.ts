/** Growth comes from the server's public notes plus uniquely opened personal cards. */
export const GARDEN_MILESTONES = [
  { count: 3, title: "Pumpkin patch", icon: "🎃", key: "pumpkins", stage: "Taking root" },
  { count: 10, title: "Cozy bench", icon: "🪑", key: "bench", stage: "Growing together" },
  { count: 25, title: "Fairy lights", icon: "✨", key: "lights", stage: "Glowing with gratitude" },
  { count: 50, title: "Paca friends", icon: "🦙", key: "friends", stage: "A garden of friends" },
  { count: 100, title: "Wishing fountain", icon: "⛲", key: "fountain", stage: "Full of wonder" },
  { count: 250, title: "Golden tree", icon: "🌳", key: "golden", stage: "A golden garden" },
] as const;
export const GARDEN_MATURITY_COUNT = GARDEN_MILESTONES[GARDEN_MILESTONES.length - 1].count;

export function gardenGrowth(contributionTotal: number | null) {
  const total = Number.isFinite(contributionTotal) ? Math.max(0, Math.floor(contributionTotal as number)) : 0;
  // Leave room for the garden to fill in, with a genuinely sparse beginning.
  const fullness = Math.pow(Math.min(total, GARDEN_MATURITY_COUNT) / GARDEN_MATURITY_COUNT, 0.65);
  const unlocked = GARDEN_MILESTONES.filter(m => total >= m.count);
  const next = GARDEN_MILESTONES.find(m => total < m.count);
  return {
    total,
    fullness,
    canopyScale: 1 + fullness * 0.075,
    unlocked,
    next,
    remaining: next ? next.count - total : 0,
    stage: unlocked[unlocked.length - 1]?.stage ?? "Little beginnings",
  };
}

// Deterministic positions prevent leaves from jumping around during refreshes.
export function canopyLeafPosition(index: number) {
  const angle = index * 2.399963229728653;
  const radius = Math.sqrt((index + 0.5) / 72);
  return { x: 50 + Math.cos(angle) * radius * 34, y: 30 + Math.sin(angle) * radius * 20, rotation: ((index * 47) % 100) - 50 };
}
