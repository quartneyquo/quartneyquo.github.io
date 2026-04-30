import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const GA_ID = 'G-NCMQCSCFZP';

export const metadata: Metadata = {
  title: 'Courtney Ko | AI Product & Automation Builder',
  description:
    'Product-minded builder across AI, automation, internal tools, and community-led growth. Case studies in NVIDIA automation, Pearle, and AI Valley.',
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
