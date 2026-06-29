# CLAUDE.md

> This project is a Next.js 16 admin dashboard starter built with App Router, shadcn/ui, and Tailwind CSS v4. Authentication is currently mocked via localStorage with a planned migration to Clerk/NextAuth.

## Quick Commands

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint check (disabled during builds per next.config.js)
```

## Architecture Overview

### Project Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── layout.tsx          # Root layout: ThemeProvider → AuthProvider → Toaster
│   ├── (auth)/             # Auth route group (login page + redirect root)
│   │   ├── layout.tsx      # Split-screen auth layout with interactive grid
│   │   ├── login/page.tsx  # Sign-in form
│   │   └── page.tsx        # Redirects to /login
│   └── dashboard/          # Protected admin area
│       ├── layout.tsx      # Auth guard + AppLayout wrapper
│       ├── page.tsx        # Main dashboard (KPI cards, charts, orders)
│       ├── overview/page   # Duplicate of dashboard page (consider removing)
│       ├── users/page      # Placeholder
│       ├── content/page    # Placeholder
│       └── settings/page   # Placeholder
├── components/
│   ├── layout/             # AppLayout, Sidebar, Header
│   ├── dashboard/          # KpiCards, SalesChart, RevenueChart, RecentOrders, CalendarWidget
│   ├── ui/                 # shadcn/ui primitives (button, card, table, etc.)
│   ├── theme-provider.tsx  # next-themes wrapper
│   └── theme-toggle.tsx    # Light/dark switch button
├── features/
│   └── auth/               # SignInView, SignForm, InteractiveGridPattern
├── lib/
│   ├── auth-context.tsx    # Auth state (Context + localStorage persistence)
│   ├── nav-config.ts       # Static sidebar navigation items
│   └── utils.ts            # cn() helper + formatBytes()
├── types/index.ts          # NavItem, KpiCard, Order interfaces
└── middleware.ts           # Route guard (currently mock-pass-through)
```

### Key Patterns

**Authentication Flow**
- `lib/auth-context.tsx` — React Context stores `{ user, token }` persisted to `localStorage`.
- `app/dashboard/layout.tsx` — Checks `isAuthenticated` before rendering `AppLayout`; shows loading spinner if not authenticated.
- `middleware.ts` — Currently passes all requests (mock dev mode). Replace with real token validation for production.
- `Sidebar.tsx` — Logout button calls `setAuth({ user: null, token: null })` and redirects to `/login`.

**Navigation System**
- `lib/nav-config.ts` — Centralized `NavItem[]` array with title, URL, and Lucide icon.
- `Sidebar.tsx` — Maps nav items, highlights active route via `usePathname()`, supports collapse/expand.
- `Header.tsx` — Auto-generates breadcrumb from nav config based on current pathname.

**Dashboard Layout**
- `AppLayout.tsx` — Flex row: collapsible sidebar (desktop) + drawer (mobile) + main content area.
- Sidebar width: 256px expanded / 64px collapsed. Responsive breakpoint at 768px.

**Styling & Theming**
- Tailwind CSS v4 with `@theme inline` in `globals.css` — CSS custom properties for all design tokens.
- `next-themes` for dark/light mode. `suppressHydrationWarning` on `<html>` to prevent SSR mismatch.
- Color scheme uses OKLCH colorspace.

**UI Components**
- shadcn/ui primitives in `components/ui/` — built on Radix UI + CVA + clsx/tailwind-merge.
- Charts use Recharts with OKLCH CSS variable colors (`var(--chart-1)`, etc.).
- Data tables use `@tanstack/react-table` (installed but not yet used in code).

### Data Layer (Current)

All dashboard data is hardcoded mock data:
- `KpiCards.tsx` — 4 KPI cards with static values and mock percentages
- `SalesChart.tsx` — 12-month sales line chart
- `RevenueChart.tsx` — 12-month revenue bar chart
- `RecentOrders.tsx` — 10 mock orders with status badges
- `CalendarWidget.tsx` — Static June 2026 calendar with marked active days

### Planned Migrations

Per `docs/auth.md`, the mock auth should be replaced with a real provider (Clerk/NextAuth.js). The migration path is documented — only `lib/auth-context.tsx`, `middleware.ts`, and login form need changes.

## Important Notes

- **No test framework configured** — Add Vitest/Jest when tests are needed.
- **`/dashboard/overview` duplicates `/dashboard`** — Consider consolidating.
- **ESLint ignores unused vars during builds** (`next.config.js`) — may mask real issues.
- **Zod v4** is installed (`"zod": "^4.3.6"`) but not yet integrated into forms.
- **`@clerk/nextjs`** is installed but not wired up — auth is localStorage-mocked.
- **`date-fns`** and **`react-day-picker`** are installed but unused — planned for calendar widget.
- **`vaul`** (drawer) and **`sonner`** (toast) are installed but not used in current code.
- **OpenSpec** workflow is configured in `openspec/` for change management.
- **GitNexus** code intelligence is indexed — use `npx gitnexus analyze` to refresh.
