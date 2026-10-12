import type { Metadata } from 'next';
import PacaVillage from '@/components/PacaVillage';

export const metadata: Metadata = {
  title: 'Paca Village | Courtney Ko',
  description: 'Six little houses for six useful products. Explore PacaPlate, PacaLife, PacaMoney, PacaJob, Paca中文, and PacaChef.',
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
