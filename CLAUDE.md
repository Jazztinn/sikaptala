# Sikaptala Project Guide

## Project Overview

Sikaptala is a health tracking application for families, built with Next.js 14+ and TypeScript. It allows caregivers to log health observations for their children, invite family members to collaborate on health tracking, and interact with an AI assistant (Dampi) for health insights.

**Tech Stack:**
- **Frontend:** Next.js 14+, React 18+, TypeScript
- **Styling:** Custom CSS (per-component), TailwindCSS ready
- **Backend:** Next.js Server Actions, Supabase for database and authentication
- **Database:** PostgreSQL (via Supabase)
- **AI Integration:** Claude API (via lib/dampiApi.js)
- **Icons:** Lucide React

---

## Project Structure

```
/
├── app/                            # Next.js app directory (routes)
│   ├── layout.tsx                  # Root layout with AiWrapper provider
│   ├── page.tsx                    # Home page
│   ├── globals.css                 # Global styles
│   ├── dampi.css                   # AI modal specific styles
│   ├── onboarding/
│   │   └── page.tsx                # Onboarding flow entry point
│   ├── (auth)/                     # Auth route group (public)
│   │   ├── login/page.tsx          # Login page
│   │   ├── signup/page.tsx         # Signup/landing page
│   │   └── callback/route.ts       # OAuth callback handler
│   ├── (legal)/                    # Legal route group (public)
│   │   └── tos/page.tsx            # Terms of Service
│   └── (app)/                      # Protected routes
│       └── layout.tsx              # App layout with auth check
│
├── components/                     # React components
│   ├── onboarding/                 # Onboarding flow components
│   │   ├── OnboardingFlow.jsx      # Main orchestrator
│   │   ├── OnboardingShell.jsx     # Wrapper with navigation
│   │   ├── OnboardingStepLayout.jsx # Individual step layout
│   │   ├── OnboardingProgress.jsx  # Progress indicator
│   │   ├── OnboardingPendingConfirmation.jsx # Email confirmation
│   │   ├── WelcomeScreen.jsx       # Step 0: Welcome/intro
│   │   ├── TryDampiScreen.jsx      # Step 1: Try Dampi demo
│   │   ├── CreateAccountScreen.jsx # Step 2: Email/password signup
│   │   ├── AddChildScreen.jsx      # Step 3: Add first child
│   │   ├── HMOCoverageScreen.jsx   # Step 4: HMO coverage info
│   │   ├── InviteFamilyScreen.jsx  # Step 5: Invite family members
│   │   ├── onboarding.css          # Onboarding styles
│   │   └── index.ts                # Exports
│   │
│   ├── auth/                       # Authentication screens
│   │   ├── AuthLandingScreen.jsx   # Landing/choice page
│   │   ├── LoginScreen.jsx         # Login form
│   │   ├── SocialAuthButtons.jsx   # OAuth buttons (Google, GitHub, etc)
│   │   ├── auth.css                # Auth styles
│   │   └── index.js                # Exports
│   │
│   ├── ai/                         # AI chat modal components
│   │   ├── AiWrapper.tsx           # Provider wrapper for chat context
│   │   ├── DampiChatModal.jsx      # Full chat interface
│   │   ├── DampiFab.jsx            # Floating action button to open chat
│   │   ├── QuickSymptomLogPanel.jsx # Quick symptom logging panel
│   │   └── quickSymptomLog.js      # Symptom log UI utilities
│   │
│   ├── navigation/                 # Navigation components
│   │   ├── AppNavbar.jsx           # Header bar with back button
│   │   ├── top-nav-bar.css         # Navigation styles
│   │   └── index.js                # Exports
│   │
│   ├── layout/
│   │   └── app-shell.tsx           # Main app layout wrapper
│   │
│   ├── forms/                      # Form components
│   │   ├── profile-form.tsx
│   │   ├── settings-form.tsx
│   │   └── support-form.tsx
│   │
│   └── ui/                         # Reusable UI components (buttons, inputs, etc)
│
├── lib/                            # Utilities and helpers
│   ├── supabase/
│   │   ├── browser.ts              # Browser-side Supabase client (createSupabaseBrowserClient)
│   │   ├── server.ts               # Server-side Supabase client
│   │   └── middleware.ts           # Auth middleware
│   ├── supabase-compat.ts          # Compatibility wrapper (getSupabaseBrowserClient)
│   ├── dampiApi.js                 # Claude/Dampi API calls for chat
│   ├── dobValidation.js            # Date of birth validation
│   ├── authRedirect.ts             # Auth redirect logic
│   └── env.ts                      # Environment variables validation
│
├── services/                       # Business logic services
│   ├── profile-service.ts          # User profile operations
│   ├── account-service.ts          # Account management
│   ├── settings-service.ts         # User settings
│   ├── notification-service.ts     # Notifications
│   ├── ai/
│   │   ├── chatPersistence.js      # Chat history storage/retrieval
│   │   ├── dampiApi.js             # AI service integration (Claude)
│   │   └── geminiApi.js            # Gemini API integration (optional)
│   └── symptomLog/
│       └── symptomLogPersistence.js # Symptom log persistence
│
├── constants/                      # App-wide constants
│   ├── dampiAi.js                  # Dampi chat system prompts
│   └── symptomLogAi.js             # Symptom log AI prompts
│
├── types/                          # TypeScript type definitions
│   └── index.ts                    # Shared types
│
├── public/                         # Static assets
│   └── ...
│
├── supabase/                       # Supabase configuration
│   ├── schema.sql                  # Database schema
│   └── functions/                  # Edge functions (if any)
│
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.js                  # Next.js config
└── .env.example                    # Environment variables template
```

---

## Key Components

### **Onboarding Flow** (`/components/onboarding/`)

The onboarding system guides new users through account creation and profile setup in 6 steps:

1. **WelcomeScreen** — App intro with features (Log Essentials, Family Together, Health & Wellness)
2. **TryDampiScreen** — Demo of the AI assistant
3. **CreateAccountScreen** — Email/password signup (triggers Supabase email confirmation)
4. **AddChildScreen** — Add first child's name, DOB, gender
5. **HMOCoverageScreen** — Collect insurance/HMO info
6. **InviteFamilyScreen** — Invite caregivers via email

**Component Hierarchy:**
- `OnboardingFlow.jsx` — State management, validation, Supabase persistence
  - Maintains step state, form data, authentication state
  - Persists progress to localStorage
  - Handles email confirmation flow
  - Saves profiles, children, HMO coverage, and caregiver invites to Supabase
- `OnboardingShell.jsx` — Layout wrapper (nav + progress + content)
- `OnboardingStepLayout.jsx` — Individual step styling
- `OnboardingProgress.jsx` — Step indicators (dots)
- `OnboardingPendingConfirmation.jsx` — Email confirmation UI

**State Management:**
- localStorage: onboarding progress, form data (password never persisted)
- Supabase: user profiles, children, HMO coverage, caregiver invites

**Flow:**
```
signup → onboarding/page.tsx → OnboardingFlow
  → WelcomeScreen → TryDampi → CreateAccount (email verification) 
  → AddChild → HMOCoverage → InviteFamily → Complete
```

---

### **Authentication** (`/components/auth/`)

**Components:**
- `AuthLandingScreen.jsx` — Choice page (New account vs Existing)
- `LoginScreen.jsx` — Email/password login
- `SocialAuthButtons.jsx` — OAuth buttons (Google, GitHub, etc)

**Flow:**
```
/ (redirects to /signup if logged out)
  ↓
/signup → AuthLandingScreen
  ├─→ "New account" → /onboarding (OnboardingFlow)
  └─→ "Existing account" → /login (LoginScreen)
```

**Authentication:**
- Uses Supabase Auth with email/password and OAuth
- Email verification required for signup
- Auth state managed via Next.js middleware and Supabase session

---

### **AI Chat Modal** (`/components/ai/`)

**Components:**
- `AiWrapper.tsx` — React Context provider for chat state
- `DampiChatModal.jsx` — Full chat interface
  - Message history
  - Voice recording (browser API)
  - Task creation from messages
  - Quick symptom log integration
  - Markdown rendering (react-markdown)
  - Snap points (collapsible modal behavior)
- `DampiFab.jsx` — Floating Action Button to open/close chat
- `QuickSymptomLogPanel.jsx` — Quick symptom logging within chat

**Services:**
- `lib/dampiApi.js` — API calls to Claude (chat messages)
- `services/ai/chatPersistence.js` — Chat history persistence (localStorage/DB)
- `constants/dampiAi.js` — System prompts for chat behavior

**Features:**
- Streaming responses from Claude API
- Chat history stored per user
- Can create health logs from chat interactions
- Voice-to-text (browser Web Speech API)
- Task extraction and creation
- Integration with symptom log

---

### **Navigation** (`/components/navigation/`)

- `AppNavbar.jsx` — Header bar with variants
  - `variant="inner"` — Onboarding/modal header (back button, centered title)
  - Default — App header (logo, extra content)
- Styling in `top-nav-bar.css`

---

## Data Flow & State Management

### **State Hierarchy:**
```
Root Layout (app/layout.tsx)
  ├─→ AiWrapper (AI context provider)
  ├─→ Route-specific layouts
  │   └─→ Pages with components
  │
Components:
  ├─→ OnboardingFlow (localStorage + Supabase)
  ├─→ DampiChatModal (AiWrapper context + localStorage)
  └─→ Forms (React state + Server Actions)
```

### **Data Persistence:**
- **Client-side:** localStorage (onboarding progress, chat drafts)
- **Server-side:** Supabase PostgreSQL
  - Tables: users, profiles, children, hmo_coverage, caregiver_invites, conversations, messages

### **API Integration:**
- **Supabase:** Auth, database, real-time (subscriptions)
- **Claude API:** Chat responses (via `lib/dampiApi.js`)
- **Browser APIs:** localStorage, Web Speech API

---

## Styling Strategy

### **CSS Organization:**
- **Per-component:** Each component has its own CSS file
  - `/components/onboarding/onboarding.css`
  - `/components/auth/auth.css`
  - `/components/navigation/top-nav-bar.css`
  - `/app/dampi.css` (AI modal overrides)
- **Global:** `/app/globals.css`
- **Component-specific:** Can be imported at component level

### **Design System:**
- Colors: Pulled from imported CSS (see `/impor/DESIGN.md` for reference)
- Typography: "brand-font" class for display fonts
- Spacing: Component-relative sizing (no hardcoded pixels in many cases)
- Icons: Lucide React 32px default size

---

## Environment Variables

Required:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_CLAUDE_API_KEY=your-claude-api-key (or proxy URL)
```

See `.env.example` for all variables.

---

## Development Setup

### **Install Dependencies:**
```bash
npm install
```

### **Run Development Server:**
```bash
npm run dev
```
Opens at `http://localhost:3000`

### **Build for Production:**
```bash
npm run build
npm start
```

### **Type Check:**
```bash
npm run type-check
```

### **Lint:**
```bash
npm run lint
```

---

## Database Schema (Supabase)

Key tables:
- `auth.users` — Supabase Auth users
- `profiles` — User profiles (full_name, email, phone, onboarding_completed)
- `children` — Child records (full_name, date_of_birth, gender, primary_guardian_id)
- `hmo_coverage` — Insurance info (provider, benefits tier, notes)
- `caregiver_invites` — Pending invitations for family members
- `conversations` — Chat history (user_id, created_at)
- `messages` — Chat messages (conversation_id, content, role, timestamp)

See `/supabase/schema.sql` for full details.

---

## Deployment

### **Vercel (Recommended):**
```bash
vercel deploy
```
- Environment variables configured in Vercel dashboard
- Auto-deploys from git push
- Serverless functions and Edge Functions

### **Docker/Self-hosted:**
```bash
docker build -t sikaptala .
docker run -p 3000:3000 sikaptala
```

---

## Common Tasks

### **Add a New Onboarding Step:**
1. Create `NewScreen.jsx` in `/components/onboarding/`
2. Add to `OnboardingFlow.jsx` screens array
3. Update CSS in `onboarding.css`
4. Test flow in browser

### **Update AI System Prompts:**
Edit `/constants/dampiAi.js` and `/constants/symptomLogAi.js`

### **Add a New Page:**
Create file in `/app/` or `/app/(auth)/` or `/app/(app)/` depending on routing

### **Modify Database Schema:**
1. Update `/supabase/schema.sql`
2. Run migrations: `supabase db push`
3. Update TypeScript types in `/types/`

---

## Troubleshooting

### **Email confirmation not working:**
- Check Supabase SMTP settings
- Verify `emailRedirectTo` in onboarding (should match domain)
- Check spam folders

### **Chat not showing:**
- Verify `NEXT_PUBLIC_CLAUDE_API_KEY` in `.env.local`
- Check browser console for errors
- Ensure DampiFab is rendered in layout

### **Database errors:**
- Check Supabase dashboard for policy errors
- Verify table existence in SQL editor
- Check RLS (Row Level Security) policies

---

## Code Patterns

### **Server Actions for Database:**
```typescript
// lib/actions/profile.ts
'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function updateProfile(data: any) {
  const supabase = await createSupabaseServerClient();
  // ... database operation
}
```

### **Client Components with Supabase:**
```typescript
// components/MyComponent.tsx
'use client'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function MyComponent() {
  const supabase = createSupabaseBrowserClient();
  // ... use in useEffect hooks
}
```

### **Using AI Chat:**
```typescript
// Inside an onboarding screen
const { onNext } = props;

const handleContinue = async (message: string) => {
  onNext({ someData: 'value' });
};
```

---

## Migration Notes

This codebase was migrated from a Vite + React app (`/impor/`) to Next.js in May 2026. Key changes:
- Vite build → Next.js server-side rendering
- Custom router → Next.js file-based routing
- Webpack → SWC (Next.js default)
- Manual Supabase client → Supabase SSR package

Old files remain in `/impor/` for reference.

---

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Claude API:** https://docs.anthropic.com/
- **React:** https://react.dev
- **Lucide Icons:** https://lucide.dev

---

**Last Updated:** May 12, 2026
**Maintained by:** Kira-Ace
