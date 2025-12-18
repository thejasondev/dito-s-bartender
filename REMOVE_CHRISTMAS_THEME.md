# How to Remove Christmas Theme 🎄 -> 🧹

Follow these steps to completely remove the Christmas theme from the project when the season is over.

## 1. Remove Styles

- **Delete** the file: `src/styles/christmas.css`

## 2. Remove Components

- **Delete** the entire directory: `src/components/christmas/`
  - This effectively removes:
    - `ChristmasToggle.astro`
    - `Snowfall.astro`
    - `HeaderDecoration.astro`
    - `FooterLights.astro`

## 3. Clean up Layout (`src/layouts/Layout.astro`)

Open `src/layouts/Layout.astro` and remove the following lines:

**Imports (top of file):**

```astro
// ============ CHRISTMAS THEME IMPORTS (Remove after season) ============
import Snowfall from '../components/christmas/Snowfall.astro';
import ChristmasToggle from '../components/christmas/ChristmasToggle.astro';
import '../styles/christmas.css';
// ========================================================================
```

**Component Usage (near bottom of file):**

```astro
<!-- ============ CHRISTMAS THEME COMPONENTS (Remove after season) ============ -->
<Snowfall density="medium" />
<ChristmasToggle />
<!-- ========================================================================== -->
```

## 4. Clean up Hero Section

You will need to checking both English and Spanish versions of the Hero component.

**Files:**

- `src/components/home/Hero.astro`
- `src/components/home/es/Hero.astro`

**Action:**
Remove the overlay div:

```astro
<!-- ============ CHRISTMAS OVERLAY (Remove after season) ============ -->
<div class="hero-christmas-overlay"></div>
<!-- ================================================================== -->
```

## 5. Verify

- Run the project (`npm run dev`) and ensure the site loads correctly without the floating toggle or any red festive styling.
- Check the WhatsApp button returns to its default gold styling.
