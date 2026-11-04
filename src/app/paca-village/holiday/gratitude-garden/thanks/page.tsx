import type { Metadata } from "next";
import PersonalGratitude from "@/components/holiday/PersonalGratitude";

export const metadata: Metadata = {
  title: "A Little Thanks for You | Paca’s Gratitude Garden",
  description: "Someone is thankful for you. Open a little watercolor gratitude card from the Pacaverse.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  alternates: { canonical: "https://courtneyko.com/paca-village/holiday/gratitude-garden/thanks/" },
  openGraph: {
    title: "A little thanks for you 🍂",
    description: "Someone is thankful for you. A little card, a whole lot of love.",
    url: "https://courtneyko.com/paca-village/holiday/gratitude-garden/thanks/",
    images: [{ url: "/holiday/gratitude-garden-flourishing.png", width: 1536, height: 1024, alt: "Paca’s autumn gratitude garden" }],
  },
  twitter: { card: "summary_large_image", title: "A little thanks for you", description: "Someone is thankful for you.", images: ["/holiday/gratitude-garden-flourishing.png"] },
};

export default function Page() { return <PersonalGratitude />; }
