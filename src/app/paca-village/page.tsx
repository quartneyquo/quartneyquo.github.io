import type { Metadata } from 'next';
import PacaVillage from '@/components/PacaVillage';

export const metadata: Metadata = {
  title: 'Paca Village | Courtney Ko',
  description: 'Seven little houses, including a cozy arcade. Explore Courtney’s apps, then stop by Paca Arcade for a game.',
  alternates: { canonical: 'https://courtneyko.com/paca-village/' },
  openGraph: {
    title: 'Paca Village | Courtney Ko',
    description: 'Small ideas. Shipped products. Step inside Courtney’s village of playful apps.',
    url: 'https://courtneyko.com/paca-village/',
  },
};

export default function Page() {
  return <PacaVillage />;
}
