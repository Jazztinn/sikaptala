# Documentation Index

Welcome to the Sikaptala PWA documentation. Here's a guide to what's available:

## Getting Started

- **[README.md](../README.md)** - Project overview and features
- **[SETUP.md](SETUP.md)** - Initial setup and configuration

## Development Guides

- **[COMPONENTS.md](COMPONENTS.md)** - Creating and using UI components
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Design tokens and styling guidelines

## Quick Navigation

### I want to...

#### Start developing
1. Read [SETUP.md](SETUP.md) for initial setup
2. Check [COMPONENTS.md](COMPONENTS.md) to understand the architecture
3. Start building components!

#### Create a new component
1. Follow the structure in [COMPONENTS.md](COMPONENTS.md#creating-a-new-component)
2. Use design tokens from [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
3. Test on multiple devices

#### Style a component
1. Review [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for available tokens
2. Follow the mobile-first approach
3. Test dark mode support

#### Deploy the app
1. Complete the checklist in [SETUP.md](SETUP.md#deployment-preparation)
2. Configure server headers
3. Test on staging environment

#### Debug an issue
1. Check [SETUP.md#debugging](SETUP.md#debugging) section
2. Review browser console
3. Check Service Worker status

## File Structure Reference

```
pwa/
├── README.md                  # Start here!
├── public/
│   ├── index.html            # Main HTML entry
│   ├── manifest.json         # PWA configuration
│   ├── service-worker.js     # Offline support
│   └── assets/               # Icons and images
├── src/
│   ├── components/           # UI components (modify these)
│   ├── pages/                # Page layouts
│   ├── styles/               # Global CSS
│   ├── utilities/            # Helper functions
│   ├── config/               # Configuration
│   └── index.js              # App entry point
├── docs/                     # Documentation (you are here)
│   ├── INDEX.md             # This file
│   ├── SETUP.md             # Setup and deployment
│   ├── COMPONENTS.md        # Component guide
│   └── DESIGN_SYSTEM.md     # Design tokens
└── package.json             # Dependencies
```

## Key Concepts

### Components
Self-contained UI elements with HTML, CSS, and JavaScript. Each component lives in its own folder.

Example structure:
```
src/components/button/
├── button.html
├── button.css
└── button.js
```

### Design Tokens
CSS variables that define the visual identity. All colors, spacing, and typography are tokens.

Located in: `src/styles/variables.css`

### Responsive Design
Mobile-first approach using media queries. Components adapt to different screen sizes.

Breakpoints: 576px, 768px, 992px, 1200px, 1400px

### Offline Support
Service Worker caches assets and handles offline mode.

File: `public/service-worker.js`

## Common Tasks

### Add a button to a page
```html
<button class="btn btn-primary">Click Me</button>
```

### Access design color
```css
.my-element {
  color: var(--color-primary);
  background: var(--color-secondary);
}
```

### Make responsive
```css
.my-element {
  /* Mobile first */
  font-size: var(--font-size-base);
}

@media (min-width: 768px) {
  .my-element {
    /* Tablet and larger */
    font-size: var(--font-size-lg);
  }
}
```

### Get data from API
```javascript
import { apiGet } from './utilities/api.js';

const result = await apiGet('/api/data');
if (result.success) {
  console.log(result.data);
}
```

### Store data locally
```javascript
import { localStorage_ } from './utilities/storage.js';

localStorage_.set('myKey', { data: 'value' });
const stored = localStorage_.get('myKey');
```

## Useful Links

- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Can I Use](https://caniuse.com/)

## Getting Help

1. Check the relevant documentation file
2. Review example code in existing components
3. Check browser console for errors
4. Test with DevTools offline mode
5. Review the source code comments

## Version History

- **v1.0.0** - Initial release
  - Component architecture
  - PWA support
  - Offline functionality
  - Design system

## Contributing

When adding new features:
1. Create feature in a new component
2. Update relevant documentation
3. Test on mobile and desktop
4. Follow design system guidelines

---

**Last Updated**: 2026-05-13
**Version**: 1.0.0
