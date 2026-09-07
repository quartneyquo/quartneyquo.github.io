import type { Metadata } from 'next';
import PortfolioHomepage from '@/components/PortfolioHomepage';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Courtney Ko | AI Community, Partnerships & Product',
    description: 'Building communities, partnerships, and product experiences for AI.',
    url: '/',
    images: [{ url: '/profile.jpeg', alt: 'Courtney Ko' }],
    type: 'website',
  },
};

export default function Home() {
  return <PortfolioHomepage />;
}
