# Sikaptala Progressive Web App

A modern Progressive Web App (PWA) with a component-based architecture, offline support, and responsive design.

## Features

✅ **Progressive Web App** - Installable on mobile and desktop
✅ **Offline Support** - Works offline with service worker caching
✅ **Component Library** - Reusable, isolated UI components
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **Dark Mode** - Automatic light/dark theme support
✅ **Push Notifications** - Web-based push notifications
✅ **Modern JavaScript** - ES6+ modules, async/await
✅ **Type Safe** - Clean, maintainable code

## Project Structure

```
pwa/
├── public/                 # Static assets and PWA manifest
│   ├── index.html         # Main entry point
│   ├── manifest.json      # PWA manifest
│   ├── service-worker.js  # Offline support
│   └── assets/            # Icons and images
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-specific layouts
│   ├── styles/            # Global CSS and variables
│   ├── utilities/         # Helper functions
│   ├── config/            # Configuration
│   └── index.js           # Main entry point
├── docs/                  # Documentation
├── tests/                 # Test files
└── package.json           # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 14+ (optional, for development)
- A modern web browser

### Installation

1. Clone the repository:
```bash
cd pwa
```

2. Install dependencies (optional):
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open in browser:
```
http://localhost:8080
```

## Usage

### Creating Components

See [COMPONENTS.md](docs/COMPONENTS.md) for detailed guide on creating new components.

Quick example:
```javascript
// src/components/my-component/my-component.js
export class MyComponent {
  constructor(element) {
    this.element = element;
  }
}

export function initMyComponent() {
  const components = document.querySelectorAll('[data-component="my-component"]');
  components.forEach(comp => new MyComponent(comp));
}
```

### Using Components

```html
<!-- HTML -->
<button class="btn btn-primary">Click Me</button>
```

```javascript
// JavaScript
import { initButtons } from './components/buttons/button.js';
initButtons();
```

### Utilities

#### Storage
```javascript
import { localStorage_ } from './utilities/storage.js';

localStorage_.set('key', { data: 'value' });
const data = localStorage_.get('key');
localStorage_.remove('key');
```

#### API
```javascript
import { apiGet, apiPost } from './utilities/api.js';

const result = await apiGet('/api/data', { cache: true });
const response = await apiPost('/api/data', { name: 'John' });
```

#### Notifications
```javascript
import { showSuccess, showError } from './utilities/notifications.js';

showSuccess('Saved successfully!');
showError('An error occurred');
```

#### Offline Support
```javascript
import { isOnline } from './utilities/offline.js';

if (isOnline()) {
  // Make API call
}
```

## Development

### Design System

The app uses CSS variables for theming and design tokens. See `src/styles/variables.css`:

- **Colors** - Primary, secondary, semantic colors
- **Spacing** - Consistent spacing scale (4px to 64px)
- **Typography** - Font sizes, weights, line heights
- **Shadows** - Elevation levels
- **Transitions** - Animation durations
- **Z-index** - Layering system

### Responsive Breakpoints

```javascript
// From src/config/constants.js
{
  MOBILE: 576,
  TABLET: 768,
  DESKTOP: 992,
  LARGE: 1200,
  XLARGE: 1400
}
```

### Mobile-First CSS

Always start with mobile styles, then add media queries:

```css
.component {
  /* Mobile (320px) */
}

@media (min-width: 768px) {
  .component {
    /* Tablet */
  }
}

@media (min-width: 1200px) {
  .component {
    /* Desktop */
  }
}
```

## PWA Features

### Service Worker
The service worker (`public/service-worker.js`) handles:
- Offline caching
- Request queue for offline actions
- Cache management

### Manifest
The PWA manifest (`public/manifest.json`) defines:
- App name and icons
- Start URL and display mode
- Theme colors
- Screenshots

### Installation
Users can install the app on:
- iOS (Add to Home Screen)
- Android (Install App)
- Desktop (Windows, Mac, Linux)

## Browser Support

| Feature | Support |
|---------|---------|
| PWA | Chrome, Edge, Firefox, Safari |
| Service Workers | All modern browsers |
| Push Notifications | Chrome, Edge, Firefox |
| IndexedDB | All modern browsers |
| LocalStorage | All browsers |

## Performance

- **Lightweight** - < 50KB JS (minified + gzipped)
- **Fast** - Service worker caching
- **Offline** - Works without internet
- **Responsive** - Mobile-optimized

## Accessibility

All components follow WCAG 2.1 AA standards:
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Color contrast
- Focus management

## Production Deployment

### Build
```bash
npm run build
```

### Optimize
1. Minify CSS/JS
2. Compress images
3. Enable gzip compression
4. Set cache headers
5. Use CDN for static assets

### Testing
```bash
npm test
```

## Troubleshooting

### Service Worker not registering
- Check browser console for errors
- Ensure HTTPS (except localhost)
- Check manifest.json validity

### App not offline
- Verify service worker is registered
- Check cache strategy in service-worker.js
- Clear browser cache and reload

### Push notifications not working
- Request permission first
- Ensure service worker is active
- Check VAPID keys are set

## Contributing

1. Create a feature branch
2. Make changes
3. Test on mobile and desktop
4. Submit pull request

## License

MIT License - feel free to use this project however you like.

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

## Support

For issues or questions, please check the documentation or create an issue in the repository.
