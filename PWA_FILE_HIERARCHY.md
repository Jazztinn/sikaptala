## Progressive Web App (PWA) - File Hierarchy

```
pwa/
├── public/
│   ├── index.html                      # Main entry point
│   ├── manifest.json                   # PWA manifest
│   ├── service-worker.js               # Service worker for offline support
│   └── assets/
│       ├── icons/                      # App icons (multiple sizes)
│       │   ├── icon-192x192.png
│       │   ├── icon-512x512.png
│       │   └── favicon.ico
│       └── images/
│           └── [static images]
│
├── src/
│   ├── index.js                        # App entry point
│   ├── styles/
│   │   ├── global.css                  # Global styles & variables
│   │   ├── variables.css               # Design tokens (colors, spacing, etc.)
│   │   ├── reset.css                   # CSS reset
│   │   └── responsive.css              # Media queries & responsive utilities
│   │
│   ├── components/                     # Reusable component library
│   │   ├── badges/
│   │   │   ├── badge.html
│   │   │   ├── badge.css
│   │   │   └── badge.js
│   │   ├── buttons/
│   │   │   ├── button.html
│   │   │   ├── button.css
│   │   │   └── button.js
│   │   ├── cards/
│   │   │   ├── card.html
│   │   │   ├── card.css
│   │   │   └── card.js
│   │   ├── forms/
│   │   │   ├── form.html
│   │   │   ├── form.css
│   │   │   └── form.js
│   │   ├── navigation/
│   │   │   ├── nav.html
│   │   │   ├── nav.css
│   │   │   └── nav.js
│   │   ├── typography/
│   │   │   ├── typography.html
│   │   │   ├── typography.css
│   │   │   └── typography.js
│   │   ├── layout/
│   │   │   ├── header.html
│   │   │   ├── header.css
│   │   │   ├── footer.html
│   │   │   ├── footer.css
│   │   │   ├── sidebar.html
│   │   │   └── sidebar.css
│   │   └── [other components]
│   │
│   ├── pages/                          # Page-specific layouts
│   │   ├── home.html
│   │   ├── home.css
│   │   ├── home.js
│   │   ├── about.html
│   │   ├── dashboard.html
│   │   └── [other pages]
│   │
│   ├── layouts/                        # Responsive layouts (mobile/web)
│   │   ├── mobile.css                  # Mobile-first styles
│   │   ├── tablet.css                  # Tablet optimizations
│   │   ├── desktop.css                 # Desktop optimizations
│   │   └── breakpoints.css             # Breakpoint definitions
│   │
│   ├── utilities/
│   │   ├── helpers.js                  # Helper functions
│   │   ├── api.js                      # API calls
│   │   ├── storage.js                  # LocalStorage/IndexedDB
│   │   ├── notifications.js            # Push notifications
│   │   ├── offline.js                  # Offline handling
│   │   └── analytics.js                # Analytics tracking
│   │
│   ├── hooks/                          # Reusable logic (if using framework)
│   │   ├── useLocalStorage.js
│   │   ├── useOnline.js
│   │   └── useNotification.js
│   │
│   └── config/
│       ├── routes.js                   # Route definitions
│       ├── constants.js                # App constants
│       └── theme.js                    # Theme configuration
│
├── docs/
│   ├── COMPONENTS.md                   # Component documentation
│   ├── DESIGN_SYSTEM.md                # Design system guide
│   ├── SETUP.md                        # Setup instructions
│   └── DEPLOYMENT.md                   # Deployment guide
│
├── tests/
│   ├── components/                     # Component tests
│   ├── pages/                          # Page tests
│   └── utilities/                      # Utility tests
│
├── build/
│   ├── index.html                      # Built HTML
│   ├── app.css                         # Bundled CSS
│   ├── app.js                          # Bundled JS
│   ├── service-worker.js               # Service worker
│   └── assets/
│
├── .env                                # Environment variables
├── .env.example                        # Environment template
├── package.json                        # Dependencies
├── webpack.config.js                   # Build config (optional)
├── tailwind.config.js                  # Tailwind config (optional)
└── README.md                           # Project overview
```

## Usage Examples

### Adding a New Component
1. Create folder: `src/components/match-card/`
2. Add three files:
   - `match-card.html` - Structure
   - `match-card.css` - Styles (with mobile/desktop variants)
   - `match-card.js` - Behavior

### Component Template
```html
<!-- src/components/match-card/match-card.html -->
<div class="match-card" data-component="match-card">
  <!-- Component markup -->
</div>
```

```css
/* src/components/match-card/match-card.css */
.match-card {
  /* Styles */
}

/* Mobile-first: adjust for larger screens */
@media (min-width: 768px) {
  .match-card {
    /* Desktop adjustments */
  }
}
```

### Importing Components
```js
// In a page or another component
import { initMatchCard } from './components/match-card/match-card.js';

initMatchCard();
```

## Key Benefits
✅ **Modular** - Each component is self-contained and reusable  
✅ **Scalable** - Easy to add new components without breaking existing ones  
✅ **Responsive** - Mobile-first approach with clear breakpoint structure  
✅ **Maintainable** - Clear separation of concerns (HTML/CSS/JS)  
✅ **PWA-Ready** - Built-in service worker and offline support  
✅ **Component Library** - Organized similar to your reference files
