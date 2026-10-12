import type { Metadata } from 'next';
import PacaVillage from '@/components/PacaVillage';

export const metadata: Metadata = {
  title: 'Paca Village | Courtney Ko',
  description: 'Five little houses for five useful products. Explore PacaPlate, PacaLife, PacaMoney, PacaJob, and Paca中文.',
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
