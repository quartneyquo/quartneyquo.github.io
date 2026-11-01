import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AlpacaRunner from '@/components/AlpacaRunner';
import styles from '@/components/notFound.module.css';

export const metadata: Metadata = {
  title: '404 · Page not found · Courtney Ko',
  description: 'This page wandered off. Take a little break with Opaca, then find your way home.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className={styles.headerBand}>
        <header className={`portfolio-header ${styles.header}`} data-placement="header">
          <Link href="/" className={`wordmark ${styles.wordmark}`} aria-label="Courtney Ko home">Courtney Ko</Link>
          <nav aria-label="Main navigation">
            <Link href="/#work">Work</Link>
            <Link href="/paca-village/">Paca Village</Link>
            <Link href="/#contact" className={`header-email ${styles.contactLink}`}>Let’s work together <ArrowRight size={14} aria-hidden="true" /></Link>
          </nav>
        </header>
      </div>
      <main id="main" className={styles.main}>
        <AlpacaRunner />
        <div className={styles.intro}>
          <h1>This page wandered off.</h1>
          <p className={styles.description}>The link may be broken, or the page may have moved.<br />Opaca’s here to keep you company.</p>
          <p className={styles.errorCode}>404 · PAGE_NOT_FOUND</p>
        </div>
        <nav className={styles.actions} aria-label="Find your way back">
          <Link className={styles.homeLink} href="/">Back to home</Link>
          <Link className={styles.arcadeLink} href="/paca-village/arcade/">More games</Link>
        </nav>
        <footer className={styles.footer}>a little lost, still in good company.</footer>
      </main>
    </div>
  );
}
