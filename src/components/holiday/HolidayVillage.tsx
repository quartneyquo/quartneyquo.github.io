import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Leaf, Sparkles } from 'lucide-react';
import styles from './holidayVillage.module.css';

export default function HolidayVillage() {
  return <div className={styles.page}>
    <a className={styles.skip} href="#holiday-garden">Skip to the garden</a>
    <header className={styles.header}>
      <Link href="/paca-village/#holiday-village"><ArrowLeft size={16} aria-hidden="true" /> Back to Paca Village</Link>
      <span className={styles.headerNote}><Heart size={14} aria-hidden="true" /> A cozy corner of the Pacaverse</span>
    </header>

    <main className={styles.main}>
      <section className={styles.intro} aria-labelledby="holiday-title">
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}><Sparkles size={15} aria-hidden="true" /> COME IN, IT’S COZY HERE</p>
          <h1 id="holiday-title">Paca’s <em>Holiday Village</em></h1>
          <p className={styles.tagline}>A little magic for every season.</p>
          <p className={styles.description}>A place for small joys, warm wishes, and the lovely things we grow together. Wander over to the garden and stay awhile.</p>
          <a className={styles.explore} href="#holiday-garden">Explore the garden <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
        <img className={styles.house} src="/holiday/gingerbread-house.png" alt="A little gingerbread cottage with snowy icing, a sage-green door, and glowing windows" width="1254" height="1254" fetchPriority="high" />
      </section>

      <section id="holiday-garden" className={styles.garden} aria-labelledby="holiday-garden-title">
        <div className={styles.sectionLabel}><span /> A LITTLE KINDNESS GROWS HERE <span /></div>
        <Link className={styles.gardenLink} href="/paca-village/holiday/gratitude-garden/" aria-labelledby="holiday-garden-title" aria-describedby="holiday-garden-description">
          <div className={styles.gardenArt}>
            <img src="/holiday/gratitude-garden.png" alt="A watercolor autumn garden with a golden gratitude tree, two alpacas, and an open garden gate" width="1536" height="1024" />
            <span className={styles.gardenSign}>Visit the garden <ArrowRight size={14} aria-hidden="true" /></span>
          </div>
          <div className={styles.gardenCopy}>
            <p className={styles.eyebrow}><Leaf size={15} aria-hidden="true" /> AUTUMN, WITH LOVE</p>
            <h2 id="holiday-garden-title">Paca’s <em>Gratitude Garden</em></h2>
            <p id="holiday-garden-description">Little thanks make a big garden. Plant a gratitude leaf, discover a kind thought, and help our tree grow.</p>
            <span className={styles.enter}>Enter the garden <ArrowRight size={16} aria-hidden="true" /></span>
          </div>
        </Link>
      </section>
    </main>

    <footer className={styles.footer}>
      <Link href="/paca-village/#holiday-village"><ArrowLeft size={15} aria-hidden="true" /> Back to the village trail</Link>
      <span>Made with a little holiday heart. <Heart size={13} aria-hidden="true" /></span>
    </footer>
  </div>;
}
