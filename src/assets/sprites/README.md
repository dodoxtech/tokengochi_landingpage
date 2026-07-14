# Sprites

Copied from the main Tokengochi app repo, not generated here. To refresh, re-copy
from source rather than hand-editing.

Source: `../tokengochi/ui/assets/sprites/`

- `hatchling/` — the pet sprite + gag expressions, with their sprite-sheet metadata (`.json`)
- `items/food-*` — food item sprites used for the token-glow / feeding visuals
- `effects/` — particle/glow effect sheet + metadata

All sprites are pixel art — render with the `.pixelated` utility (`image-rendering: pixelated`)
and scale at 2–4x integer factors only.
