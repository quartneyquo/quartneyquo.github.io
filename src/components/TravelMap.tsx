'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface TravelMapProps {
  countries: string[];
}

export default function TravelMap({ countries }: TravelMapProps) {
  const visited = new Set(countries);

  return (
    <div className="rounded-xl overflow-hidden border border-blush-100 bg-lavender-50">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 110, center: [20, 20] }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const isVisited = visited.has(String(geo.id));
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isVisited ? '#AD8690' : '#DDD5FF'}
                  stroke="#fff"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: isVisited ? '#926070' : '#C9BCFF' },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="px-3 py-2 flex items-center gap-2 border-t border-blush-100">
        <span className="inline-block w-3 h-3 rounded-sm bg-blush-400 flex-shrink-0" />
        <span className="text-[10px] text-plum-500 font-medium">{countries.length} countries visited</span>
      </div>
    </div>
  );
}
