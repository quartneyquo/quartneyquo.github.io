import type { Metadata } from 'next';
import PortfolioHomepage from '@/components/PortfolioHomepage';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Courtney Ko | AI Community, Partnerships & Product',
    description: 'Building communities, partnerships, and product experiences for AI.',
    url: '/',
    images: [{ url: '/courtney-opaca-thumbnail.png', width: 1254, height: 1254, alt: 'Courtney Ko with Opaca, her pixel-art alpaca companion' }],
    type: 'website',
  },
};

export default function Home() {
  return <PortfolioHomepage />;
}
