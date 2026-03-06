export interface BulletsBlock {
  type: 'bullets';
  title?: string;
  items: string[];
}

export interface MetricsBlock {
  type: 'metrics';
  title?: string;
  items: { label: string; value: string }[];
}

export interface TextBlock {
  type: 'text';
  title?: string;
  text: string;
}

export interface LinksBlock {
  type: 'links';
  title?: string;
  items: { label: string; href: string }[];
}

export type ContentBlock = BulletsBlock | MetricsBlock | TextBlock | LinksBlock;

export interface Stop {
  id: string;
  timeLabel?: string;
  title: string;
  locationLabel?: string;
  tag: string;
  blurb: string;
  image?: string;
  content: ContentBlock[];
}

export interface Day {
  id: string;
  title: string;
  dateLabel?: string;
  stops: Stop[];
}

export interface Trip {
  id: string;
  title: string;
  subtitle: string;
  dateRange: string;
  coverImage?: string;
  coverImagePosition?: string;
  themeColor: string;
  description: string;
  stats: { label: string; value: string }[];
  days: Day[];
}
