import type { Metadata } from 'next';
import PortfolioHomepage from '@/components/PortfolioHomepage';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Courtney Ko | AI Partnerships & Community',
    description: 'AI partnerships and community programs at AI Valley. Courtney Ko connects builders through technical workshops, hackathons, and founder events.',
    url: '/',
    images: [{ url: '/courtney-opaca-thumbnail.png', width: 1254, height: 1254, alt: 'Courtney Ko with Opaca, her pixel-art alpaca companion' }],
    type: 'website',
  },
};

export default function Home() {
  return <PortfolioHomepage />;
}
