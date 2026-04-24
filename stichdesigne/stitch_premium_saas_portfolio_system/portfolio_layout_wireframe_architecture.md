# Modern Portfolio Layout System & Architecture

## 1. Global Layout Strategy
- **Framework:** Tailwind CSS
- **Max Width:** `max-w-[1200px]`
- **Container:** `mx-auto px-4 md:px-6 lg:px-8`
- **Section Spacing:** `py-16 md:py-24`
- **Transitions:** `transition-all duration-300 ease-in-out`

## 2. Design Tokens (Tailwind Suggestion)
- **Background:** `bg-slate-900` (#0f172a)
- **Surface/Card:** `bg-slate-800` (#1e293b)
- **Borders:** `border-slate-700/50`
- **Primary Text:** `text-slate-50`
- **Secondary Text:** `text-slate-400`
- **Accent:** `from-blue-500 to-purple-600`
- **Radius:** `rounded-2xl`

## 3. Component Breakdown

### Navbar (Sticky)
- `sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50`
- Logo: Bold typography or minimalist SVG icon.
- Nav Links: `hover:text-blue-400`
- CTA: Gradient button with `shadow-lg shadow-blue-500/20`

### Hero Section
- Grid: `grid-cols-1 lg:grid-cols-2 gap-12 items-center`
- Typography: `text-5xl md:text-7xl font-bold tracking-tight`
- Subtitle: `text-xl text-slate-400 max-w-lg`

### Project Cards
- Container: `group relative bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden hover:scale-[1.02]`
- Image: `aspect-video object-cover transition-transform duration-500 group-hover:scale-110`
- Overlay (Premium): `absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100`

### Dashboard Layout
- Sidebar: `w-64 border-r border-slate-700/50 h-screen hidden md:block`
- Content: `flex-1 p-8 bg-slate-900`

## 4. Interaction Guidelines
- **Hover:** Use `hover:scale-[1.02]` and `hover:shadow-2xl` instead of complex animations.
- **Loading:** Subtle shimmer/skeleton states for project images.
- **Modals:** Slide-up on mobile, fade-in center on desktop with `backdrop-blur-xl`.
