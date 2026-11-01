import type { Metadata } from 'next';
import Link from 'next/link';
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
      <main className={styles.main}>
        <Link href="/" className={styles.wordmark}>courtney ko<span aria-hidden="true">✳</span></Link>
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
