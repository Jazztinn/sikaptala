# Design System Guide

## Overview

This design system provides the foundation for building consistent, accessible user interfaces across the Sikaptala PWA.

## Design Tokens

All design decisions are encoded as CSS variables in `src/styles/variables.css`.

### Colors

#### Primary Colors
- `--color-primary`: #000000 (black)
- `--color-primary-light`: #333333 (dark gray)
- `--color-primary-dark`: #000000

#### Secondary Colors
- `--color-secondary`: #ffffff (white)
- `--color-secondary-light`: #f5f5f5 (light gray)
- `--color-secondary-dark`: #e0e0e0 (gray)

#### Semantic Colors
- `--color-success`: #10b981 (green)
- `--color-warning`: #f59e0b (amber)
- `--color-error`: #ef4444 (red)
- `--color-info`: #3b82f6 (blue)

#### Grayscale
- `--color-gray-50` through `--color-gray-900`

### Spacing

Consistent 4px-based scale:

```
4px   → var(--spacing-xs)
8px   → var(--spacing-sm)
16px  → var(--spacing-md)
24px  → var(--spacing-lg)
32px  → var(--spacing-xl)
48px  → var(--spacing-2xl)
64px  → var(--spacing-3xl)
```

### Typography

#### Font Sizes
```
12px → var(--font-size-xs)
14px → var(--font-size-sm)
16px → var(--font-size-base)
18px → var(--font-size-lg)
20px → var(--font-size-xl)
24px → var(--font-size-2xl)
32px → var(--font-size-3xl)
40px → var(--font-size-4xl)
```

#### Font Weights
```
300 → var(--font-weight-light)
400 → var(--font-weight-normal)
500 → var(--font-weight-medium)
600 → var(--font-weight-semibold)
700 → var(--font-weight-bold)
```

#### Line Heights
```
1.2  → var(--line-height-tight)
1.5  → var(--line-height-normal)
1.75 → var(--line-height-relaxed)
```

### Border Radius

```
0px    → var(--radius-none)
4px    → var(--radius-sm)
8px    → var(--radius-md)
12px   → var(--radius-lg)
16px   → var(--radius-xl)
20px   → var(--radius-2xl)
9999px → var(--radius-full)
```

### Shadows

Elevation system for depth:

```
0 1px 2px         → var(--shadow-sm)
0 4px 6px -1px    → var(--shadow-md)
0 10px 15px -3px  → var(--shadow-lg)
0 20px 25px -5px  → var(--shadow-xl)
0 25px 50px -12px → var(--shadow-2xl)
```

### Transitions

Animation durations:

```
150ms → var(--transition-fast)
250ms → var(--transition-base)
350ms → var(--transition-slow)
```

### Z-Index Scale

Layering priority:

```
1000  → var(--z-dropdown)
1020  → var(--z-sticky)
1030  → var(--z-fixed)
1040  → var(--z-modal-backdrop)
1050  → var(--z-modal)
1060  → var(--z-popover)
1070  → var(--z-tooltip)
```

## Using Design Tokens

Always use variables instead of hardcoded values:

### ❌ Don't
```css
.component {
  color: #000000;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### ✅ Do
```css
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}
```

## Responsive Design

### Breakpoints

Mobile-first approach with these breakpoints:

```javascript
const BREAKPOINTS = {
  MOBILE: 576,      // Small devices
  TABLET: 768,      // Tablets
  DESKTOP: 992,     // Desktops
  LARGE: 1200,      // Large desktops
  XLARGE: 1400      // Extra large screens
}
```

### Media Query Examples

```css
/* Mobile (320px) - default */
.component {
  font-size: var(--font-size-base);
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    font-size: var(--font-size-lg);
  }
}

/* Desktop and up */
@media (min-width: 992px) {
  .component {
    font-size: var(--font-size-xl);
  }
}
```

## Typography Scale

Heading hierarchy:

```html
<h1>Display Heading - 40px</h1>
<h2>Large Heading - 32px</h2>
<h3>Heading - 24px</h3>
<h4>Subheading - 20px</h4>
<h5>Label - 18px</h5>
<h6>Small Label - 16px</h6>
<p>Body Text - 16px</p>
<small>Small Text - 14px</small>
```

### Type Styles

```css
/* Display */
h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

/* Heading */
h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

/* Subheading */
h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
}

/* Body */
p {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}
```

## Component States

### Interactive States

```css
.component {
  /* Default state */
  background-color: var(--color-primary);
  transition: all var(--transition-base);
}

.component:hover {
  /* Hover state */
  background-color: var(--color-primary-light);
  box-shadow: var(--shadow-md);
}

.component:active {
  /* Active/pressed state */
  transform: scale(0.98);
  box-shadow: var(--shadow-sm);
}

.component:disabled {
  /* Disabled state */
  opacity: 0.6;
  cursor: not-allowed;
}

.component:focus {
  /* Focus state (keyboard navigation) */
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## Dark Mode

Components automatically adapt to light/dark mode via CSS variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #ffffff;
    --color-secondary: #000000;
    --color-gray-50: #1a1a1a;
    /* ... other dark mode variables */
  }
}
```

No component-specific dark mode logic needed—just use variables.

## Accessibility

### Color Contrast

Maintain WCAG AA standards:
- Text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

### Focus States

Always visible for keyboard navigation:

```css
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Touch Targets

Minimum 44px × 44px on touch devices:

```css
@media (hover: none) and (pointer: coarse) {
  button,
  a {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## Usage in Components

### Example: Card Component

```css
/* Use consistent spacing */
.card {
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background-color: var(--color-secondary);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.card-body {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  line-height: var(--line-height-normal);
}

@media (max-width: 576px) {
  .card {
    padding: var(--spacing-md);
  }
}
```

## Extending the Design System

### Adding New Colors

Edit `src/styles/variables.css`:

```css
:root {
  /* New color */
  --color-custom: #your-color;
}
```

### Adding New Sizes

Update relevant token in `variables.css`:

```css
:root {
  /* Extend spacing scale */
  --spacing-4xl: 80px;
  
  /* Extend font sizes */
  --font-size-5xl: 48px;
}
```

### Creating Type Styles

Define reusable type styles:

```css
.type-display {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.type-heading {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
}

.type-body {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}
```

## Best Practices

1. **Use variables** - Never hardcode values
2. **Consistent spacing** - Use spacing scale
3. **Semantic tokens** - Use intent-based names
4. **Test contrast** - Verify WCAG compliance
5. **Document changes** - Update this guide when adding tokens
6. **Consistent naming** - Follow kebab-case convention
7. **Logical organization** - Group related tokens
8. **Theme support** - Work with light/dark modes

## Resources

- [CSS Variables Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG Accessibility Standards](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Design Systems](https://www.designsystems.com/)
- [Typography Best Practices](https://www.smashingmagazine.com/2020/04/css-inspired-typography/)
