# Setup Guide

## Initial Setup

### 1. Project Setup

```bash
cd pwa
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 3. Open in Browser

- **Desktop**: Open `http://localhost:8080` in your browser
- **Mobile**: Use ngrok or expose localhost to test on device
  ```bash
  ngrok http 8080
  # Then open the provided URL on your mobile device
  ```

## Configuration

### Environment Variables

Create `.env` file in the root:

```env
NODE_ENV=development
API_BASE_URL=http://localhost:3000/api
VAPID_PUBLIC_KEY=your_vapid_key_here
```

### Service Worker

The service worker is automatically registered in `src/index.js`. To customize:

1. Edit `public/service-worker.js`
2. Update cache strategy in `handleFetch`
3. Restart dev server

### Manifest

Edit `public/manifest.json` to customize:
- App name
- Start URL
- Theme colors
- Icons

## Component Development

### Create New Component

1. Create folder in `src/components/my-component/`
2. Create three files:
   - `my-component.html`
   - `my-component.css`
   - `my-component.js`

3. Import in `src/index.js`:
```javascript
import { initMyComponent } from './components/my-component/my-component.js';

function initApp() {
  // ...
  initMyComponent();
}
```

### Component Naming Convention

- Folder: `kebab-case`
- CSS Class: `.kebab-case`
- Data attribute: `data-component="kebab-case"`
- JavaScript Class: `PascalCase`
- Export function: `initKebabCase`

## Testing

### Manual Testing

1. **Desktop Testing**
   ```bash
   npm run dev
   # Open http://localhost:8080 in browsers
   ```

2. **Mobile Testing**
   ```bash
   # Use ngrok or similar
   ngrok http 8080
   # Open provided URL on mobile
   ```

3. **Offline Testing**
   - Open DevTools (F12)
   - Go to Application > Service Workers
   - Check "Offline" checkbox
   - Refresh page - app should still work

4. **Responsive Testing**
   - Open DevTools
   - Click Toggle Device Toolbar (Ctrl+Shift+M)
   - Test on various screen sizes

### Browser Testing Checklist

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Feature Testing Checklist

- [ ] Components render correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Service worker caches assets
- [ ] Works offline
- [ ] Dark mode toggles
- [ ] Notifications work
- [ ] LocalStorage persists
- [ ] API calls retry on failure

## Debugging

### Service Worker

1. Open DevTools
2. Application tab → Service Workers
3. See:
   - Registration status
   - Cache contents
   - Offline mode toggle

### Console Logging

The app logs to console:
- Component initialization
- Network state changes
- API calls
- Service worker events

View with `console.log()` calls or modify `src/index.js`.

### Network Throttling

To simulate slow connections:
1. DevTools → Network tab
2. Select throttle profile (Slow 3G, etc.)
3. Test app behavior

## Performance Optimization

### Code Splitting

Split components into separate files (already done):
```javascript
// Each component can be lazy loaded
const component = await import('./components/my-component/my-component.js');
```

### Image Optimization

1. Use WebP format
2. Include fallback (JPEG/PNG)
3. Compress with tools:
   - ImageOptim (Mac)
   - OptiPNG, MozJPEG (CLI)
   - TinyPNG (online)

### CSS/JS Minification

For production:
```bash
npm run build
```

### Caching Strategy

Edit `public/service-worker.js`:
- Cache-first: Good for images, fonts
- Network-first: Good for API calls
- Stale-while-revalidate: Good for data

## Deployment Preparation

### Pre-deployment Checklist

- [ ] Update version in `package.json`
- [ ] Update app name in `manifest.json`
- [ ] Set production API URL in `.env`
- [ ] Test all features on target devices
- [ ] Check accessibility with screen reader
- [ ] Run security check (CSP headers, etc.)
- [ ] Optimize images and assets
- [ ] Minify CSS/JS
- [ ] Test offline functionality
- [ ] Verify service worker caches correctly

### Hosting Options

1. **Static Hosting**
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting

2. **Requirements**
   - HTTPS (required for PWA)
   - Service worker support
   - CORS headers if needed
   - Cache headers configured

### Server Configuration

Add headers for PWA:

**Nginx:**
```nginx
add_header Cache-Control "public, max-age=31536000, immutable" ~* \.(js|css|png|jpg|jpeg|gif|ico|woff|woff2)$;
add_header Service-Worker-Allowed "/";
```

**Apache:**
```apache
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|woff|woff2)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

## Troubleshooting

### Service Worker won't register
- Check HTTPS (except localhost)
- Clear browser cache
- Check console for errors
- Verify file paths

### Service Worker won't update
- Hard refresh (Ctrl+Shift+R)
- Clear Service Workers in DevTools
- Delete browser cache

### Components not initializing
- Check data attributes match
- Verify imports in index.js
- Check console for errors

### Offline mode not working
- Verify service worker is registered
- Check network tab caching
- Test with DevTools offline mode

## Next Steps

1. Create additional components
2. Build pages using components
3. Add API integration
4. Implement authentication
5. Set up analytics
6. Deploy to production

## Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
