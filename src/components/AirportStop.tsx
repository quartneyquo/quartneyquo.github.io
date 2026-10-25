import { Plane } from 'lucide-react';
import { JourneyStop } from './ContinuousJourney';

export default function AirportStop({ village = false }: { village?: boolean }) {
  return <JourneyStop
    id="airport"
    tile={5}
    title="Panchita Airport"
    className={village ? 'village-stop journey-airport' : 'journey-airport'}
    placement="travel"
    doorPosition={53}
    destination="https://travel.courtneyko.com/"
    visitOnEnter
    art={<img className="journey-art" src="/panchita-airport.png" alt="" width="1254" height="1254" loading="lazy" />}
  >
    <p className="editorial-eyebrow">{village ? '08 / The village airport' : 'A little departure from the everyday'}</p>
    <h2>Panchita’s Little Passport</h2>
    <p>Every trip has a story. Step into my little airport and explore a collection of places, memories, and adventures with Panchita.</p>
    <div className="project-links">
      <a className="editorial-button" href="https://travel.courtneyko.com/">Take off with Panchita <Plane size={16} aria-hidden="true" /></a>
    </div>
  </JourneyStop>;
}
