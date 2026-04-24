---
name: Electric Portfolio System
colors:
  surface: '#0e1416'
  surface-dim: '#0e1416'
  surface-bright: '#343a3c'
  surface-container-lowest: '#090f11'
  surface-container-low: '#161d1e'
  surface-container: '#1a2122'
  surface-container-high: '#242b2d'
  surface-container-highest: '#2f3638'
  on-surface: '#dde4e5'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#dde4e5'
  inverse-on-surface: '#2b3233'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#ffd6a3'
  on-tertiary: '#462b00'
  tertiary-container: '#ffb13b'
  on-tertiary-container: '#6e4600'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffddb5'
  tertiary-fixed-dim: '#ffb957'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#0e1416'
  on-background: '#dde4e5'
  surface-variant: '#2f3638'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-page: 48px
  section-gap: 120px
---

## Brand & Style

This design system is engineered for elite creators and tech-forward professionals who require a high-impact digital presence. The brand personality is aggressive, energetic, and unapologetically premium. It avoids the clinical nature of traditional SaaS by embracing a "Midnight Cyber" aesthetic—pairing deep, infinite blacks with high-velocity neon accents.

The visual style leverages **Glassmorphism** and **Neon Glow** to create a sense of depth and luminosity. Elements should appear as if they are floating light-sources or etched glass panels suspended in a dark vacuum. The emotional response is one of sophistication, cutting-edge innovation, and prestige.

## Colors

The palette is anchored by **Deep Obsidian** to ensure maximum contrast for the electric accents. 
- **Electric Cyan (#22d3ee)** serves as the primary action color, used for high-priority CTAs and critical status indicators.
- **Neon Purple (#a855f7)** provides a sophisticated secondary layer, used for gradients, hover states, and creative flourishes.
- **Deep Navy Surface (#0f172a)** creates a secondary elevation layer that remains grounded within the dark theme.
- **High-Contrast White** is reserved strictly for legibility, while **Slate Grey** is used for de-emphasized metadata.

Gradients should primarily flow from Cyan to Purple at a 135-degree angle to simulate dynamic light movement.

## Typography

This design system utilizes **Manrope** across all levels to maintain a cohesive, modern tech feel. The typographic hierarchy relies on extreme weight variance. Headlines are set to ExtraBold or Bold with tight letter-spacing to feel impactful and "industrial-chic." Body text is kept clean and spacious for readability against the dark background. Uppercase labels with slight tracking are used for navigational elements and small categorizations to reinforce the premium, structured feel of a high-end portfolio.

## Layout & Spacing

The system follows a **12-column fixed grid** for desktop, centering the content to maintain a sense of focus and exclusivity. A generous 8px base unit drives all spatial decisions. 

To emphasize the "premium" nature, the layout uses aggressive vertical whitespace (Section Gaps) to allow high-quality portfolio imagery to breathe. Margin and padding within cards should be "airy," preventing the high-energy neon elements from feeling cluttered. Alignment should be precise and razor-sharp, mirroring the technical precision of the cyan/purple accents.

## Elevation & Depth

Depth is conveyed through **Glassmorphism** rather than traditional drop shadows. Surfaces use a background blur (12px to 20px) and a semi-transparent fill of the Surface color (#0f172a at 60-80% opacity).

**Glow Borders:** Visual hierarchy is reinforced by 1px solid borders. High-priority cards use a "glowing border" effect—a subtle linear gradient stroke (Cyan to Purple) combined with a faint outer neon glow (4px blur, 20% opacity) of the same color. 

**Tonal Stacking:**
1. **Level 0 (Base):** Deep Obsidian (#020617).
2. **Level 1 (Cards/Sections):** Deep Navy (#0f172a) with subtle border.
3. **Level 2 (Popovers/Modals):** Glassmorphic panels with increased blur and higher border luminosity.

## Shapes

The design system employs a **Rounded (0.5rem base)** shape language. This creates a "squircle" aesthetic that feels engineered and sophisticated, avoiding the playfulness of pill-shapes or the harshness of sharp corners. 

Large containers and image carousels should use **rounded-xl (1.5rem)** to create a soft frame for the portfolio content, contrasting against the sharp, thin glowing borders. Interactive elements like checkboxes and small tags follow the base 0.5rem radius for consistency.

## Components

**Buttons:** 
- *Primary:* Solid Electric Cyan with black text. On hover, apply a cyan box-shadow "glow."
- *Secondary:* Ghost style with a gradient border (Cyan to Purple) and white text.

**Cards:** 
Glassmorphic backgrounds with a 1px border. On hover, the border opacity increases from 20% to 100%, and the background blur intensifies.

**Inputs:** 
Dark navy fills with a bottom-only Cyan border that "lights up" (glows) when focused. Placeholders use the secondary text color.

**Chips/Tags:** 
Small, semi-transparent purple backgrounds with bright purple text and a 1px border.

**Specialty Components:** 
- *Project Showcase:* A full-width glass container with a "frosted" overlay that clears on hover to reveal high-resolution work.
- *Status Indicator:* A pulsing neon dot (Cyan for active, Purple for archived).
- *Cursor Follower:* A soft, low-opacity Cyan radial gradient that follows the mouse to simulate a spotlight on the dark canvas.