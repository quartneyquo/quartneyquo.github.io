import type { Metadata } from 'next';
import PacaArcade from '@/components/PacaArcade';

export const metadata: Metadata = {
  title: 'Paca Arcade | Courtney Ko',
  description: 'A cozy little game room in Paca Village. Stop by and play Courtney’s browser games.',
  alternates: { canonical: 'https://courtneyko.com/paca-village/arcade/' },
};

export default function Page() { return <PacaArcade />; }
