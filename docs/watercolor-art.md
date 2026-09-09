# Watercolor Journey Artwork

Created with the built-in image-generation tool. These are production assets;
the moving companion, destination links, text, and walking trail remain live UI.

## Files

- `public/watercolor-atlas.webp`: nine watercolor illustrations in a 3 by 3 grid,
  1254 by 1254 pixels, optimized to 380 KB. In reading order: Basecamp, AI Valley,
  NVIDIA, Pearle, Paca Village, Travel Atlas, Contact, Opaca, flowers.
- `public/watercolor-landscape.webp`: 1536 by 1024 background, optimized to 180 KB.

The source atlas has a white paper background. `WatercolorSprite` removes only
border-connected neutral paper once when loading it into a shared canvas. Its
rendered cutouts preserve opaque interiors without CSS multiply compositing.
Opaca has a dedicated source crop with extra headroom above the grid boundary.
The original pixel assets remain
available for other pages. The portrait and travel photographs are the existing
original files, not generated replacements.

## Art Prompts

The atlas was first generated from `opaca.png` and `journey-atlas.png`, retaining
the recognizable character, building subjects, and a strict 3 by 3 cell order.
The final refinement prompt was:

> Edit this production sprite sheet. MUST replace the entire gray checkerboard background with PURE SOLID WHITE #ffffff, absolutely no checkerboard anywhere. Keep exactly same 3x3 placement, same building subjects and Opaca identity, entire objects fit in respective equal cells with generous white padding. Change art style significantly to MUCH lighter delicate translucent WATERCOLOR washes and fine sketchy pencil outlines, very pale sage and sky blue and blush/peach, like illustrations in a beautifully published watercolor travel journal. Remove thick brown outlines, replace with delicate light pencil lines, less saturation, softer edges. White paper showing through paint. Overall half the visual weight. Opaca retains cream fur, green scarf, orange green satchel, big dark eyes but drawn softly. Each asset ISOLATED ON PURE WHITE. No text no grid no borders, square canvas.

Landscape prompt:

> Create a production background illustration for a website, not a mockup. Very wide landscape 3:2 aspect. Airy pale handpainted watercolor on pure white paper, contemporary storybook travel journal style, elegant and light with delicate pencil details and translucent washes. Upper 45% mostly near-white pale sky blue with 3 small soft white clouds; upper left especially empty and light for dark headline to be overlaid later. Lower 55% a quiet beautiful landscape of soft sage-green rolling meadow hills, pale blue distant hills at right, a slender blue river meandering from right distance to lower left, small simple wooden footbridge near far lower left, a few slim green trees, restrained tiny blush flowers at edges. A very subtle suggestion of San Francisco red bridge far left on distant horizon. Plenty of open meadow space in middle and right foreground for independently positioned website building illustrations. Absolutely NO buildings, NO paths or trails (the trail will be drawn by code), NO animals, NO people, NO text, NO logos, NO UI, NO paper border, NO hard edges or frames. Do not add giant flowers or foreground objects. Soft green meadow washes fade gently into pure WHITE #ffffff at bottom edge and left and right lower edges, natural watercolor pigment feathering. Top edge near-white icy blue. A genuinely exquisite professionally painted commissioned watercolor panorama. Fresh natural light, pale blue green pink palette, not beige, not dense, not saturated pixel art, not anime, no gradients or abstract blobs.

## Path and Motion

`ContinuousJourney.tsx` measures live section and doorway coordinates. The visible
watercolor trail and the moving Opaca use the same sampled route. Layered washes,
paper grain, and softly displaced edges keep the responsive path consistent with
the raster illustrations. Scrolling keeps Opaca near the lower part of the
viewport; keyboard movement and destination entry use the existing route logic.
Reduced-motion mode retains station snapping and disables the walking bounce.
