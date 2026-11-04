import type { Metadata } from 'next';
import HolidayVillage from '@/components/holiday/HolidayVillage';
export const metadata: Metadata = {
  title: 'Paca’s Holiday Village | Courtney Ko',
  description: 'Step inside the gingerbread cottage and find a little magic for every season. Visit Paca’s Gratitude Garden and plant a little kindness.',
  alternates: { canonical: 'https://courtneyko.com/paca-village/holiday/' },
  openGraph: {
    title: 'Paca’s Holiday Village',
    description: 'A cozy corner of the village, with a little magic for every season.',
    url: 'https://courtneyko.com/paca-village/holiday/',
    images: [{ url: '/holiday/gingerbread-house.png', width: 1254, height: 1254, alt: 'Paca’s watercolor gingerbread cottage' }],
  },
  twitter: { card: 'summary_large_image', title: 'Paca’s Holiday Village', description: 'A little magic for every season.', images: ['/holiday/gingerbread-house.png'] },
};
export default function Page() { return <HolidayVillage />; }
