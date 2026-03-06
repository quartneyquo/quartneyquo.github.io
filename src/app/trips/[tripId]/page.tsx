import { trips } from '@/data/trips';
import { notFound } from 'next/navigation';
import TripPageClient from '@/components/TripPageClient';

export async function generateStaticParams() {
  return trips.map((trip) => ({ tripId: trip.id }));
}

export default async function TripPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;
  const trip = trips.find((t) => t.id === tripId);
  if (!trip) notFound();
  return <TripPageClient trip={trip!} allTrips={trips} />;
}
