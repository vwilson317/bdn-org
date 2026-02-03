# Brazil Digital Nomads — Community Website

A React Native (Expo) PWA for the **Brazil Digital Nomads** community. A modern, clean website showcasing the community, its benefits, team members, and ways to connect. Built with TypeScript and designed to match the style of Portimão Digital Nomads.

## Features

- **Hero Section**: Eye-catching introduction with logo, tagline, and call-to-action buttons
- **Why Join Section**: Benefits cards explaining the value of joining the community
- **Connect Section**: Social media links and platform connections
- **Team Section**: Meet the passionate people behind the community
- **Contact Form**: Get in touch with feedback, suggestions, or partnership opportunities
- **Clean Design**: White background with yellow accents, modern and professional
- **PWA**: Web manifest and theme color for "Add to Home Screen" and standalone install

## Tech stack

- **Expo** (React Native) + **TypeScript**
- **React Native Web** for web compatibility
- **ScrollView** for smooth scrolling experience
- **Supabase** client available (configure with env vars for backend integration)

## Setup

```bash
npm install
npx expo install react-dom react-native-web   # for web/PWA
```

### Run

- **Web (PWA):** `npm run web`
- **iOS:** `npm run ios`
- **Android:** `npm run android`

### Supabase (optional)

To integrate with Supabase for contact form submissions or other backend features:

1. Create a project at [supabase.com](https://supabase.com).
2. Add env vars (e.g. in `.env` or Expo config):
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
3. Use `src/lib/supabase.ts` to connect to your backend.

## Project structure

- `App.tsx` — Root component with ScrollView and all sections
- `src/components/` — `Header`, `Hero`, `WhyJoin`, `Connect`, `Team`, `Contact`, `Footer`
- `src/theme.ts` — Clean white/yellow color scheme
- `public/manifest.json` — PWA manifest (name, icons, theme)

## Sections

- **Header**: Navigation bar with logo and menu items
- **Hero**: Main introduction with logo, title, description, and CTA buttons
- **Why Join**: Five benefit cards explaining community value
- **Connect**: Social media platform links (WhatsApp, Instagram, Facebook, etc.)
- **Team**: Team member profiles with descriptions
- **Contact**: Contact form for user inquiries
- **Footer**: Copyright and legal links
