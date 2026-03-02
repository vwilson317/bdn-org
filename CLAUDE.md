# Claude Memory — Brazil Digital Nomads (bdn-org)

This file is read by Claude Code at the start of every session. It captures
project-specific rules that are easy to forget.

---

## Header transparency rules

**TL;DR: every page without a full-bleed hero graphic must have a solid header.**

### Why this matters
The `Header` component and custom page-level header sections can appear
translucent if an explicit background colour is not set. This looks fine when
a hero image sits directly beneath the header (the graphic fills the space),
but looks broken on pages that have plain content below the header.

### Rule

| Page has a full-bleed graphic directly below the header? | Header style |
|---|---|
| **No** (most pages — landing, services, carnival, etc.) | **Solid** (`backgroundColor: theme.bgPrimary`) |
| **Yes** (intentional floating/overlay design) | Transparent / no background |

### How to apply it

**Pages using the shared `<Header>` component** (see `App.tsx`):

```tsx
// ✅ Correct — solid background, no graphic below
<Header solid={true} ... />

// Only omit solid (or pass solid={false}) when a hero image intentionally
// sits beneath the header and the design calls for overlap.
```

`solid` defaults to `true`, so the safe path requires no extra thought.
Only opt out deliberately.

**Pages with a custom header section** (see `ServicesPage.tsx`, `Carnival.tsx`,
`LandingPage.tsx`):

```tsx
// ✅ Correct
header: {
  backgroundColor: theme.bgPrimary,  // ← always include this
  ...
},

// ❌ Broken — inheriting from a parent is not enough; add it explicitly.
header: {
  alignItems: 'center',
  // missing backgroundColor → appears translucent on some platforms
},
```

### Checklist when adding a new page

- [ ] Does the page use `<Header>`?
  - Pass `solid={true}` (or rely on the default — but being explicit is better).
- [ ] Does the page have a custom header `View`?
  - Add `backgroundColor: theme.bgPrimary` to that View's style.
- [ ] Is there a full-bleed hero graphic the header is meant to float over?
  - Only then is `solid={false}` / no background appropriate.
