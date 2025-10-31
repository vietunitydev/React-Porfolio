# Portfolio Website Style Guide

## Color System

### Dark Theme
- **Background**:
    - Primary: `bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900`
    - Secondary: `bg-gray-800/50` (with backdrop-blur-sm)
    - Tertiary: `bg-gray-900/30`
- **Text**:
    - Primary: `text-white`
    - Secondary: `text-gray-300`
    - Tertiary: `text-gray-400`
    - Muted: `text-gray-500`
- **Borders**: `border-gray-700/50`, `border-gray-800`
- **Accent Colors**:
    - Purple: `text-purple-400`, `bg-purple-600`, `border-purple-500/50`
    - Blue: `text-blue-400`, `bg-blue-600`
    - Cyan: `text-cyan-400`, `bg-cyan-600`
    - Gradient: `from-purple-400 to-cyan-400`, `from-purple-500 to-blue-500`

### Light Theme
- **Background**:
    - Primary: `bg-gradient-to-br from-gray-50 via-white to-gray-50`
    - Secondary: `bg-white`
    - Tertiary: `bg-gray-50`
- **Text**:
    - Primary: `text-gray-900`
    - Secondary: `text-gray-700`
    - Tertiary: `text-gray-600`
    - Muted: `text-gray-500`
- **Borders**: `border-gray-200`, `border-gray-300`
- **Accent Colors**:
    - Purple: `text-purple-600`, `bg-purple-600`, `border-purple-400`
    - Blue: `text-blue-600`, `bg-blue-600`
    - Cyan: `text-cyan-600`

## Typography

### Desktop (≥768px)
| Element | Class |
|---------|-------|
| H1 (Page Title) | `text-4xl font-bold` |
| H2 (Section Title) | `text-3xl lg:text-4xl font-bold` |
| H3 (Subsection) | `text-xl sm:text-2xl font-bold` |
| H4 (Card Title) | `text-lg lg:text-xl font-bold` |
| Body Text | `text-base md:text-lg` |
| Small Text | `text-sm` |
| Tiny Text | `text-xs` |

### Mobile (<768px)
| Element | Class |
|---------|-------|
| H1 (Page Title) | `text-2xl sm:text-3xl font-bold` |
| H2 (Section Title) | `text-xl sm:text-2xl font-bold` |
| H3 (Subsection) | `text-base sm:text-lg font-bold` |
| H4 (Card Title) | `text-sm sm:text-base font-bold` |
| Body Text | `text-sm sm:text-base` |
| Small Text | `text-xs sm:text-sm` |
| Tiny Text | `text-xs` |

## Spacing

### Desktop
- **Container Max Width**: `max-w-4xl`, `max-w-6xl`, `max-w-7xl`
- **Section Padding**: `px-12 lg:px-20 py-10`
- **Card Padding**: `p-6 md:p-8`
- **Grid Gap**: `gap-6 sm:gap-8`
- **Margin Bottom**: `mb-12 md:mb-16`

### Mobile
- **Container Padding**: `px-4 sm:px-6`
- **Section Padding**: `py-6 sm:py-8`
- **Card Padding**: `p-3 sm:p-4 md:p-6`
- **Grid Gap**: `gap-3 sm:gap-4 md:gap-6`
- **Margin Bottom**: `mb-6 sm:mb-8 md:mb-12`

## Components

### Cards

#### Desktop
```
bg-gray-800/50 (dark) / bg-white (light)
backdrop-blur-sm
rounded-2xl
border border-gray-700/50 (dark) / border-gray-200 (light)
hover:border-gray-600 (dark) / hover:border-gray-300 (light)
p-6 md:p-8
shadow-xl
transition-all duration-300
hover:scale-105
```

#### Mobile
```
Same as desktop but:
rounded-xl
p-4
shadow-lg
hover:scale-101 (subtle)
```

### Buttons

#### Primary Button (Desktop)
```
bg-purple-600 hover:bg-purple-700
text-white
px-6 py-3
rounded-lg
transition-colors
text-base
font-semibold
```

#### Primary Button (Mobile)
```
bg-purple-600 hover:bg-purple-700
text-white
px-4 sm:px-6 py-2 sm:py-3
rounded-lg
transition-colors
text-sm sm:text-base
font-semibold
```

#### Outlined Button (Desktop)
```
border-2 border-purple-600
text-purple-400
px-6 py-2
rounded-full
hover:bg-purple-600 hover:text-white
transition-all
transform hover:scale-105
```

#### Outlined Button (Mobile)
```
border-2 border-purple-600
text-purple-400
px-4 sm:px-6 py-1.5 sm:py-2
rounded-full
hover:bg-purple-600 hover:text-white
transition-all
transform hover:scale-105
text-sm
```

### Navigation

#### Desktop Sidebar
```
width: fixed (full sidebar visible)
height: h-full
padding: p-8
border-right: border-r border-gray-800 (dark) / border-gray-200 (light)
```

#### Mobile Menu
```
width: full width overlay
position: fixed with transform
transition: translate-x (slide-in/out)
z-index: z-40
backdrop: bg-black/50 overlay (z-30)
toggle button: fixed top-4 left-4 z-50
```

### Avatar

#### Desktop
```
width/height: w-32 h-32 (profile), w-40 h-40 (hero)
gradient border: p-1 bg-gradient-to-r from-purple-500 to-blue-500
rounded-full
inner: bg-gray-800 (dark) / bg-white (light)
```

#### Mobile
```
width/height: w-24 h-24 sm:w-32 sm:h-32
gradient border: p-1 bg-gradient-to-r from-purple-500 to-blue-500
rounded-full
inner: bg-gray-800 (dark) / bg-white (light)
```

### Icons

#### Desktop
- Default: `w-5 h-5` or `w-6 h-6`
- Small: `w-4 h-4`
- Large: `w-8 h-8` or `w-12 h-12`

#### Mobile
- Default: `w-4 h-4 sm:w-5 sm:h-5`
- Small: `w-3 h-3 sm:w-4 sm:h-4`
- Large: `w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12`

### Badges/Tags

#### Desktop
```
px-3 py-1
bg-purple-500/20 (dark) / bg-purple-100 (light)
text-purple-400 (dark) / text-purple-600 (light)
rounded-full
text-sm
font-semibold
```

#### Mobile
```
px-2 sm:px-3 py-1
bg-purple-500/20 (dark) / bg-purple-100 (light)
text-purple-400 (dark) / text-purple-600 (light)
rounded-full
text-xs sm:text-sm
font-semibold
```

## Layout Patterns

### Grid System

#### Desktop
- 2 columns: `grid-cols-1 md:grid-cols-2`
- 3 columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Sidebar layout: `grid-cols-1 lg:grid-cols-3` (content span 2)

#### Mobile
- Always single column: `grid-cols-1`
- Use swipeable carousels instead of grid for featured items
- Snap scrolling: `overflow-x-auto snap-x snap-mandatory`

### Carousel/Slider (Mobile Only)

```
Container:
- flex overflow-x-auto snap-x snap-mandatory
- scrollbar-hide (hide scrollbar)
- ref for programmatic scrolling

Items:
- flex-shrink-0 w-full snap-center
- px-2 (gap between items)

Indicators:
- flex justify-center gap-2 mt-4
- dots: w-2 h-2 rounded-full
- active: bg-cyan-400 w-6
- inactive: bg-gray-600 (dark) / bg-gray-300 (light)
```

### Text Clamping

#### Desktop
- Title: `line-clamp-2`
- Description: `line-clamp-3`
- Preview: `line-clamp-3` to `line-clamp-5`

#### Mobile
- Title: `line-clamp-2`
- Description: `line-clamp-2` to `line-clamp-3`
- Reduce lines for smaller screens

## Transitions & Animations

### Standard Transitions
```
transition-all duration-300
transition-colors duration-300
transition-transform duration-300
```

### Hover Effects

#### Desktop
```
hover:scale-105 (cards)
hover:scale-110 (small icons/buttons)
hover:-translate-x-1 (back arrows)
hover:translate-x-1 (forward arrows)
group-hover:gap-3 (from gap-2)
```

#### Mobile
```
hover:scale-101 (subtle scale for cards)
hover:scale-105 (buttons)
Remove complex hover effects to improve touch interaction
```

### Shadow Effects
```
shadow-lg (default)
shadow-xl (prominent cards)
shadow-2xl (featured items on hover)
hover:shadow-2xl (desktop only)
```

## Responsive Breakpoints

```
sm: 640px   - Small mobile/large mobile
md: 768px   - Tablet
lg: 1024px  - Desktop
xl: 1280px  - Large desktop
```

### Common Patterns
```
Mobile-first approach:
- Base: mobile styles
- sm: larger mobile
- md: tablet and up
- lg: desktop

Example:
text-sm sm:text-base md:text-lg
px-4 sm:px-6 md:px-12 lg:px-20
```

## Special Effects

### Gradient Text
```
bg-gradient-to-r from-purple-400 to-cyan-400
bg-clip-text text-transparent
```

### Glass Morphism
```
bg-gray-800/50 (dark) / bg-white (light)
backdrop-blur-sm
border border-gray-700/50 (dark) / border-gray-200 (light)
```

### Status Indicator (Online/Available)
```
Outer: bg-green-500 w-10 h-10 rounded-full
Inner: bg-white w-4 h-4 rounded-full animate-pulse
Position: absolute -bottom-2 -right-2
```

## Accessibility

### Focus States
```
focus:outline-none
focus:ring-2 focus:ring-purple-500
focus:ring-offset-2
```

### Touch Targets (Mobile)
- Minimum size: `w-10 h-10` or `w-12 h-12`
- Adequate spacing between interactive elements: `gap-3` or more
- Larger padding for buttons: `px-4 py-2` minimum

### Text Contrast
- Ensure minimum contrast ratio 4.5:1 for normal text
- Use semantic color combinations:
    - Dark theme: white/gray-300 on gray-800/900
    - Light theme: gray-900/700 on white/gray-50

## Best Practices

### Desktop
1. Use fixed sidebar navigation (`w-80` sidebar, rest for content)
2. Grid layouts with 2-3 columns
3. Hover effects for interactivity
4. Larger text and spacing for readability
5. Show all content (no carousels unless specifically needed)

### Mobile
1. Collapsible hamburger menu with overlay
2. Single column layouts
3. Swipeable carousels for featured content
4. Dot indicators for carousel position
5. Larger touch targets (min 44x44px)
6. Reduce text size gracefully with responsive classes
7. Stack elements vertically
8. Use `min-w-0` and `truncate`/`line-clamp` to prevent text overflow
9. Hide less critical information or use accordions
10. Sticky/fixed positioning for important navigation

### Both
1. Use theme context for consistent dark/light mode
2. Backdrop blur for depth: `backdrop-blur-sm`
3. Border opacity for subtle separation: `border-gray-700/50`
4. Smooth transitions: `transition-all duration-300`
5. Gradient accents for visual interest
6. Consistent spacing scale: 4, 6, 8, 12, 16, 20, 24
7. Use semantic HTML and ARIA labels
8. Optimize images and use appropriate formats
9. Lazy load content where appropriate
10. Test on real devices for both themes