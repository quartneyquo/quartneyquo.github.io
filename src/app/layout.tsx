import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const GA_ID = 'G-NCMQCSCFZP';

export const metadata: Metadata = {
  metadataBase: new URL('https://quartneyquo.github.io'),
  title: 'Courtney Ko | AI Community, Partnerships & Product',
  description:
    'Community and partnerships at AI Valley, connecting 11K+ builders through technical programming. Experience in NVIDIA automation and founding AI products.',
  openGraph: {
    title: 'Courtney Ko | AI Community, Partnerships & Product',
    description: 'Building communities, partnerships, and product experiences for AI.',
    images: [{ url: '/courtney-opaca-thumbnail.png', width: 1254, height: 1254, alt: 'Courtney Ko with Opaca, her pixel-art alpaca companion' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Courtney Ko | AI Community, Partnerships & Product',
    description: 'Building communities, partnerships, and product experiences for AI.',
    images: [{ url: '/courtney-opaca-thumbnail.png', alt: 'Courtney Ko with Opaca, her pixel-art alpaca companion' }],
  },
  icons: { icon: '/favicon2.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blush-50 text-plum-900 antialiased">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
