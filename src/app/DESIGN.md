---
name: BeeCee Medical
colors:
  surface: "#f8f9ff"
  surface-dim: "#cbdbf5"
  surface-bright: "#f8f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#eff4ff"
  surface-container: "#e5eeff"
  surface-container-high: "#dce9ff"
  surface-container-highest: "#d3e4fe"
  on-surface: "#0b1c30"
  on-surface-variant: "#434653"
  inverse-surface: "#213145"
  inverse-on-surface: "#eaf1ff"
  outline: "#737784"
  outline-variant: "#c3c6d5"
  surface-tint: "#385ba9"
  primary: "#003380"
  on-primary: "#ffffff"
  primary-container: "#264b98"
  on-primary-container: "#a8bfff"
  inverse-primary: "#b1c5ff"
  secondary: "#416900"
  on-secondary: "#ffffff"
  secondary-container: "#beef7e"
  on-secondary-container: "#456e06"
  tertiary: "#2b394c"
  on-tertiary: "#ffffff"
  tertiary-container: "#425064"
  on-tertiary-container: "#b4c2da"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#dae2ff"
  primary-fixed-dim: "#b1c5ff"
  on-primary-fixed: "#001946"
  on-primary-fixed-variant: "#1b4390"
  secondary-fixed: "#c0f281"
  secondary-fixed-dim: "#a5d568"
  on-secondary-fixed: "#102000"
  on-secondary-fixed-variant: "#304f00"
  tertiary-fixed: "#d5e3fc"
  tertiary-fixed-dim: "#b9c7df"
  on-tertiary-fixed: "#0d1c2e"
  on-tertiary-fixed-variant: "#3a485b"
  background: "#f8f9ff"
  on-background: "#0b1c30"
  surface-variant: "#d3e4fe"
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: "700"
    lineHeight: "1.3"
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "500"
    lineHeight: "1"
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

# Design System: BeeCee Medical (High-Fidelity UI Edition)

## 1. Visual Vibe & Aesthetics

- **Theme:** Ultra-premium, modern healthcare/biotech aesthetic (similar to Linear, Vercel, or 21st.dev showcases). High contrast, pristine cleanliness, and cutting-edge medical precision.

- **Layout Paradigm:** Asymmetrical layouts, Bento Grids, and layered depth. Avoid repetitive, boring card rows.

- **Visual Textures:** Use subtle background dot-grid patterns, soft radial glows (mesh gradients using brand colors), and crisp glassmorphic panels (`backdrop-blur`).

## 2. Color System & Gradients

- **Primary (Trust):** Vibrant Medical Blue (extracted from the logo).

- **Secondary (Vitality):** Bright Leaf/Lime Green (extracted from the logo).

- **Deep Neutrals:** Slate Blue-Grey for secondary sections to create premium contrast against pure white backgrounds.

- **Gradients:** Use text-gradients for main hero headings (e.g., transitioning from Deep Navy to Vibrant Medical Blue). Use ultra-soft, low-opacity blue and green ambient glows in the background surfaces.

## 3. Typography (Outfit + Inter)

- **Headings (H1, H2, H3):** `Outfit`, sans-serif
  - Weight: Bold (700) - strictly do not use serif fallbacks.
  - Letter Spacing: Normal to tight (`tracking-tight`).
  - Line Height: Balanced and crisp (`leading-tight`) to eliminate collisions.
- **Body Text:** `Inter`, sans-serif
  - Weight: Regular (400) or Medium (500).
  - Line Height: Editorial and clean (`leading-relaxed`).

## 4. Component Styling

- **Interactive Elements:** Buttons must have elegant transitions. Primary CTAs use a solid brand-blue with a crisp micro-shadow; secondary buttons should use a flawless glassmorphic outline style.

- **Bento Grid Panels:** Soft 12px or 16px border radius. Extremely fine, faint borders (e.g., 1px solid rgba(0,0,0,0.05)) paired with subtle, elegant lift shadows on hover.

## 5. Iconography

- **Preferred Library:** Use a modern, consistent, open-source icon set (e.g., Lucide Icons, Phosphor Icons, or Material Symbols).

- **Style:** Use line/stroke-based icons (not solid/filled) with a consistent stroke weight (1.5px or 2px) to maintain a precise, clean, and modern clinical aesthetic.

- **Color Rules:** Default to the Primary Medical Blue.

- **Specific Mappings:**
  - **Services Grid:** Use specific, distinct medical icons for each card (e.g., a microscope for screening, a clipboard for pre-employment, a heart/pulse for general health).

  - **Footer/Contact:** Use standard, instantly recognizable icons for location (map pin), phone, and email.
