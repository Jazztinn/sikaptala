# Dampi — Pediatric Health Assistant for Filipino Families

Dampi is a warm, accessible pediatric health app that empowers Filipino caregivers to document symptoms, prepare for doctor visits, and navigate their children's health with confidence. Built with AI guidance and designed specifically for the Filipino healthcare context.

## 🎯 Core Mission

Help worried parents **prepare structured symptom summaries** for their children's doctor visits, with cultural sensitivity, multilingual support (English + Tagalog), and data integrity for both registered users and guest assessments.

## 🌍 Key Features

### 1. **Smart Symptom Logging**
- Step-by-step guided interview with Dampi (AI assistant)
- Context-aware physical examination instructions generated based on child's age and symptom category
- Real-time severity tracking and vital signs collection
- Photo and voice note capture for documentation
- Red flag detection with emergency guidance

### 2. **AI-Powered Assessment Flow**
- **Step 1: Describe** — Parent describes what they're observing with their child
- **Step 2: Physical Examination** — AI generates age-specific, symptom-specific exam instructions
- **Step 3: Findings Checklist** — Parent documents findings with Yes/No toggles
- **Step 4: Summary** — Structured medical summary for physician or HMO provider

### 3. **Onboarding & Family Management**
- Seamless account creation with email/social auth options
- Add multiple children with full registration (DOB, name, allergies, HMO coverage)
- Invite caregivers to family circle for shared access
- Guest mode for quick assessments without registration

### 4. **Data Integrity & Privacy**
- **Registered profiles**: Automatic merge of session data with stored medical history
- **Guest assessments**: Limited to Name, Age, and Session Findings only
- Supabase-backed secure storage with row-level security
- HIPAA-friendly export formats for physicians

### 5. **HMO & Provider Integration**
- Track HMO coverage and claim information
- Export summaries in formats ready for submission to healthcare providers
- Integration ready for caregiver invites and family discovery

---

## 📦 Tech Stack

- **Frontend**: React 18 + Vite (fast, optimized builds)
- **Styling**: Custom CSS with design system tokens
- **Backend**: Node.js + Express (for API layer)
- **Database**: Supabase (PostgreSQL + real-time updates)
- **AI**: Claude API for conversational guidance
- **Icons**: Lucide React (accessible, consistent iconography)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (for local development)
- GitHub account (for Pages deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/Jazztinn/dampi.git
cd dampi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and AI credentials

# Start Supabase (local development)
npm run supabase:start

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

Create a `.env.local` file with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_DAMPI_API_BASE=http://127.0.0.1:3001
```

---

## 📁 Project Structure

```
dampi/
├── src/
│   ├── components/
│   │   └── ai/                 # Dampi chat modal and quick symptom log
│   ├── screens/
│   │   ├── Auth/               # Login, signup, social auth
│   │   ├── Onboarding/         # Account creation and child registration
│   │   └── [other screens]/
│   ├── constants/
│   │   ├── dampiAi.js          # Chat system prompts
│   │   └── symptomLogAi.js     # Quick symptom log prompts
│   ├── lib/
│   │   └── supabase.js         # Supabase client setup
│   ├── services/
│   │   ├── ai/                 # Chat and AI transport logic
│   │   └── symptomLog/         # Symptom log persistence
│   └── App.jsx                 # Main app component
├── supabase/
│   ├── migrations/             # Database schema evolution
│   ├── functions/              # Edge functions (RPC logic)
│   └── config.toml             # Supabase local config
├── vite.config.js              # Vite build configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

---

## 🤖 AI & Prompts

### Dampi Chat System Prompt
Located in `src/constants/dampiAi.js`:
- Professional, warm, practical tone
- Red flag detection with emergency guidance
- Task automation (reminders, appointments)
- Structured response protocol (JSON schema)

### Quick Symptom Log Prompts
Located in `src/constants/symptomLogAi.js`:
- Extract symptom facts from chat
- Generate a structured quick-log summary
- Surface red flags and next-step guidance

---

## 🌐 Deployment

For the deployed application to function correctly, the AI backend must be available through either the Supabase `ai-chat` function or a configured `VITE_AI_PROXY_URL`.

Before building the frontend for production, you must set the `VITE_AI_PROXY_URL` environment variable to the public URL of your deployed backend.

Example `.env.production` file:
```
VITE_AI_PROXY_URL=https://your-deployed-ai-server.com
```

### GitHub Pages

The app is automatically deployed to GitHub Pages on every push to `main`.

**Important**: Before your GitHub Actions workflow runs, ensure you have configured the `VITE_AI_PROXY_URL` in your repository's secrets so the build process can create a production-ready application that points to your live backend.

See the main [Deployment](#-deployment) section for more details.

**Configuration**:
- `vite.config.js` includes `base: '/dampi/'` for correct asset paths
- `.github/workflows/deploy.yml` handles build & deployment

### Local Preview

```bash
npm run build
npm run preview
```

---

## 📱 Screens & Navigation

- **Auth** — Login, signup, social authentication
- **Onboarding** → Welcome → Create Account → Add Child → HMO Coverage → Invite Family
- **Home** — Dashboard with child cards, recent symptoms, metrics carousel
- **Symptom Log** — 4-step assessment flow (Describe → Examine → Findings → Summary)
- **Symptom Guide** — Reference for common childhood conditions
- **Family** — Caregiver invites, family circle management
- **Onboarding Assessment** → Quick symptom capture with Dampi FAB

---

## 🎨 Design System

See [DESIGN.md](DESIGN.md) for complete design guidelines including:
- Color palette (sage, teal, warm, emergency coral)
- Typography (Work Sans family, semantic scales)
- Component patterns and spacing rules
- Accessibility standards

### Brand Colors
- **Teal (Primary)**: `#4D736C`
- **Sage (Supporting)**: `#92BBB3`
- **Warm (Call-to-Action)**: `#EDA16D`
- **Coral (Emergency)**: `#E8897A`

---

## 🔐 Security & Privacy

- Row-level security (RLS) policies in Supabase
- User authentication via email or OAuth
- Session data never persisted without explicit user consent
- Guest assessments stored separately from user profiles
- GDPR & HIPAA considerations for healthcare data

---

## 🚦 Development Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run supabase:start   # Start local Supabase
npm run supabase:stop    # Stop local Supabase
npm run supabase:status  # Check Supabase status
npm run supabase:reset   # Reset database to seed state
```

---

## 📚 Database Schema

Key tables:
- `auth.users` — Caregiver accounts
- `onboarding_profiles` — Caregiver profile data
- `profiles` — Extended profile info (name, avatar, etc.)
- `child_registrations` — Child profiles (name, DOB, allergies, HMO)
- `symptom_logs` — Symptom assessment sessions
- `ai_chat_conversations` — Chat history with Dampi
- `caregiver_invites` — Family circle invitations
- `hmo_coverage` — HMO and insurance information

See `supabase/migrations/` for full schema.

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit with clear messages: `git commit -m "Add: context-aware assessment"`
4. Push to GitHub: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

MIT License — See LICENSE file for details.

---

## 💬 Support & Feedback

For issues, questions, or feature requests, please open a GitHub issue or reach out to the team.

---

**Dampi** — Empowering Filipino families with confident, informed pediatric care. 🏥❤️
