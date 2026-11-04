import type { Metadata } from 'next';
import PacaVillage from '@/components/PacaVillage';

export const metadata: Metadata = {
  title: 'Paca Village | Courtney Ko',
  description: 'Nine little stops for Courtney’s apps, a cozy arcade, Panchita Airport, and Paca’s Holiday Village. Follow the trail to something lovely.',
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
