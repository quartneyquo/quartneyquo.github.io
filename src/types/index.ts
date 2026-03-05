export interface ContentSection {
  title: string;
  items?: string[];
  text?: string;
  stats?: { label: string; value: string }[];
}

export interface Track {
  id: string;
  title: string;
  type: string;
  year?: number;
  description: string;
  contentSections: ContentSection[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverGradient: [string, string];
  tracks: Track[];
}
