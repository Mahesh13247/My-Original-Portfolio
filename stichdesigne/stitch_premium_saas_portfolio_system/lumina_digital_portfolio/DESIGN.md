---
name: Lumina Digital Portfolio
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-page: 64px
  container-max: 1200px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 96px
---

## Brand & Style

This design system is built on the principles of **SaaS-inspired minimalism**, blending the structured efficiency of a high-end software product with the refined elegance of a personal portfolio. The brand personality is professional, forward-thinking, and meticulously organized. 

The aesthetic draws heavily from **Modern Minimalism** and **Glassmorphism**, emphasizing negative space to allow content to breathe. The emotional response is one of calm authority—achieved through a "less but better" approach to visual elements. Every interaction should feel lightweight and intentional, mirroring the precision of Apple’s hardware and software integration.

## Colors

The palette is anchored in deep, cinematic navy tones to provide a sophisticated "Dark Mode" foundation. 

- **Foundation:** The primary background uses a deep slate to reduce eye strain, while cards utilize a slightly lighter value to create natural depth without heavy shadows.
- **Accents:** A signature gradient—transitioning from a crisp blue to a soft purple—is used sparingly for high-impact elements like primary buttons, active states, and focus indicators.
- **Utility:** Borders are kept subtle using a muted slate to maintain structure without breaking the visual flow. Typography leverages a hierarchy of whites and grays to ensure readability against the dark backdrop.

## Typography

This design system utilizes a dual-font approach to balance character with functionality. **Manrope** is reserved for headlines, providing a modern, geometric feel that remains legible at massive scales. **Inter** handles all body and UI text, ensuring technical precision and high readability.

Large display headings should use tighter letter spacing to create a high-fashion, editorial look. Body text requires generous line height to maintain the "lightweight" feel and improve scanning speed on long-form content.

## Layout & Spacing

The layout philosophy follows a **Fixed-Width Grid** within a fluid container. This ensures that content remains centered and readable on ultra-wide displays while maintaining consistent internal alignment.

- **The Grid:** A 12-column grid with a 24px gutter provides the structural framework.
- **Rhythm:** An 8px linear scale drives all padding and margin decisions. 
- **White Space:** Intentional "over-spacing" is encouraged. Use the `stack-xl` (96px) to separate major sections, creating the "Apple-style" airy feel where each piece of content feels like a featured exhibit.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Soft Ambient Shadows** rather than traditional high-contrast separation.

1.  **Level 0 (Background):** #0f172a. The deepest layer.
2.  **Level 1 (Cards/Surfaces):** #1e293b. These should appear to float slightly above the background with a 1px subtle border (#334155).
3.  **Depth Effects:** Use extremely soft, large-radius shadows (e.g., `blur: 40px`, `opacity: 20%`, `color: #000`) to lift active cards.
4.  **Glassmorphism:** For navigation bars or overlays, use a backdrop blur of 12px combined with a 60% opacity version of the card color to create a sophisticated frosted-glass effect.

## Shapes

The shape language is defined by **Large, Soft Radii**. Square corners are entirely avoided to maintain a friendly, modern SaaS vibe. 

- **Standard Elements:** Buttons and small inputs use `rounded-md` (0.5rem).
- **Containers:** Content cards and feature blocks use `rounded-lg` (1rem).
- **Hero/Major Sections:** Largest containers and image wrappers use `rounded-2xl` (1.5rem) to create a distinct, premium "pod" look.

## Components

### Buttons
Primary buttons should feature the blue-to-purple gradient with white text. Secondary buttons are "Ghost" style: a subtle slate border that gains a soft glow on hover. All buttons use high horizontal padding (2x the vertical padding) to emphasize the minimalist aesthetic.

### Cards
Portfolio items and service blocks are housed in cards with `rounded-2xl` corners. Borders should be almost invisible until hover, where they transition to a slightly brighter slate or the primary accent color.

### Chips & Tags
Used for skills or categories, these should be semi-transparent versions of the primary color with `rounded-full` (pill) shapes. Keep text small and uppercase to act as secondary metadata.

### Inputs
Search and contact fields should use the card background color (#1e293b). The focus state should not change the background color, but instead apply a 2px gradient border or a soft blue outer glow.

### Additional Components
- **Progress Stepper:** A minimalist vertical line with gradient nodes for "Process" sections.
- **Glass Nav:** A sticky top navigation bar with a heavy backdrop blur and 1px bottom border.