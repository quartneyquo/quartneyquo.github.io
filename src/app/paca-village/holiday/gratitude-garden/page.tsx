import type { Metadata } from 'next';
import GratitudeGarden from '@/components/holiday/GratitudeGarden';

export const metadata: Metadata = {
  title: 'Paca’s Gratitude Garden | Paca’s Holiday Village',
  description: 'Little thanks make a big garden. Plant a little gratitude, discover kindness, and take home a keepsake in Paca’s cozy autumn garden.',
  alternates: { canonical: 'https://courtneyko.com/paca-village/holiday/gratitude-garden/' },
  openGraph: {
    title: 'Paca’s Gratitude Garden',
    description: 'Little thanks make a big garden. A cozy corner of the Pacaverse.',
    url: 'https://courtneyko.com/paca-village/holiday/gratitude-garden/',
    images: [{ url: '/holiday/gratitude-garden.png', width: 1536, height: 1024, alt: 'Paca’s watercolor autumn gratitude garden' }],
  },
  twitter: { card: 'summary_large_image', title: 'Paca’s Gratitude Garden', description: 'Little thanks make a big garden.', images: ['/holiday/gratitude-garden.png'] },
};

export default function Page() { return <GratitudeGarden />; }
