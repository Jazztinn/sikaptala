# Component Library Documentation

## Overview

This PWA uses a component-based architecture. Each component is self-contained with its own HTML, CSS, and JavaScript files.

## Component Structure

```
src/components/
├── buttons/
│   ├── button.html
│   ├── button.css
│   └── button.js
├── cards/
│   ├── card.html
│   ├── card.css
│   └── card.js
└── [other components]
```

## Creating a New Component

### 1. Create Component Folder
```bash
mkdir src/components/component-name
```

### 2. Create HTML File
`component-name.html`:
```html
<div class="component-name" data-component="component-name">
  <!-- Component content -->
</div>
```

### 3. Create CSS File
`component-name.css`:
```css
.component-name {
  /* Styles */
}

/* Mobile-first: responsive styles */
@media (min-width: 768px) {
  .component-name {
    /* Tablet+ styles */
  }
}
```

### 4. Create JavaScript File
`component-name.js`:
```javascript
export class ComponentName {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    // Setup
  }
}

export function initComponentName() {
  const components = document.querySelectorAll('[data-component="component-name"]');
  components.forEach((comp) => new ComponentName(comp));
}
```

### 5. Register in Main App
Update `src/index.js`:
```javascript
import { initComponentName } from './components/component-name/component-name.js';

function initApp() {
  // ...
  initComponentName();
}
```

## Available Components

### Button (`buttons/`)
Basic button component with variants (primary, secondary, success, warning, error, info), sizes (sm, md, lg), and shapes (rounded, outline).

**Usage:**
```html
<button class="btn btn-primary">Click Me</button>
<button class="btn btn-secondary btn-lg">Large Button</button>
<button class="btn btn-outline btn-rounded">Rounded</button>
```

### Card (`cards/`)
Container component with header, body, and footer sections.

**Usage:**
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-body">
    Content goes here
  </div>
  <div class="card-footer">
    <button class="btn">Action</button>
  </div>
</div>
```

## Styling Guidelines

### Use Design Tokens
Always use CSS variables for consistency:

```css
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}
```

### Mobile-First Approach
Define mobile styles first, then add media queries for larger screens:

```css
.component {
  /* Mobile styles (320px) */
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1200px) {
  .component {
    /* Desktop styles */
  }
}
```

### Responsive Breakpoints
- Mobile: < 576px
- Small devices: 576px
- Tablet: 768px
- Desktop: 992px
- Large: 1200px
- XL: 1400px

## Component Examples

### Button with Click Handler
```html
<!-- HTML -->
<button class="btn" data-component="button">Click</button>
```

```javascript
// JavaScript
const btn = new Button(document.querySelector('[data-component="button"]'));
btn.element.addEventListener('btn:click', (e) => {
  console.log('Button clicked!');
});
```

### Modifying Component Text
```javascript
const btn = new Button(element);
btn.setText('New Text');
```

## Best Practices

1. **Keep components isolated** - No dependencies between components
2. **Use data attributes** - Use `data-component` to identify components
3. **Emit custom events** - Let parent handle interactions
4. **Provide APIs** - Export methods for programmatic control
5. **Test responsiveness** - Ensure components work on all breakpoints
6. **Use semantic HTML** - Maintain accessibility
7. **Document variants** - Show all component variations

## Accessibility

All components should:
- Use semantic HTML (`<button>`, `<nav>`, etc.)
- Include ARIA attributes where needed
- Support keyboard navigation
- Have proper focus states
- Maintain sufficient color contrast
- Be testable with screen readers

## Theming

Components support light/dark modes via CSS variables. No component-specific theme logic needed—just use the global theme variables.

```css
/* Automatically adapts to light/dark mode */
.component {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}
```
