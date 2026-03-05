import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Courtney Ko',
  description: 'COO of AI Valley · Builder · Community Architect',
  icons: {
    icon: '/logo2.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#121212] text-white antialiased overflow-hidden h-screen">
        {children}
      </body>
    </html>
  );
}
