# Research: Next.js Foundation Setup

**Feature**: 001-nextjs-foundation-setup  
**Date**: 2025-11-17  
**Status**: In Progress

## Research Objectives

This document consolidates research findings for all "NEEDS CLARIFICATION" items identified in the Technical Context. Each research task investigates best practices, patterns, and implementation strategies for the foundation setup.

---

## Research Task 1: Turborepo Task Configuration for Next.js + Shared Packages

**Question**: What are the best practices for configuring Turborepo tasks in a monorepo with Next.js applications and shared TypeScript packages?

**Research Approach**:
- Review official Turborepo documentation for Next.js integration
- Examine Vercel's example repositories with Next.js + Turborepo
- Investigate caching strategies for Next.js builds
- Study dependency ordering between packages and apps

**Decision**: 

Use Turborepo with the following task pipeline configuration:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

**Rationale**:
- **`"dependsOn": ["^build"]`**: Ensures packages build before apps that depend on them
- **`outputs`**: Turborepo caches `.next/` (excluding cache directory) and `dist/` for faster rebuilds
- **`dev` task**: Not cached and marked persistent for long-running dev servers
- **`globalDependencies`**: Changes to environment files invalidate all caches
- **Incremental builds**: Turborepo only rebuilds changed packages and their dependents

**Alternatives Considered**:
- **NX**: More complex setup with more features, but Turborepo is simpler and officially supported by Vercel for Next.js
- **Lerna**: Older tool without built-in caching, Turborepo offers better performance

**References**:
- [Turborepo Next.js Example](https://github.com/vercel/turbo/tree/main/examples/with-nextjs)
- [Turborepo Pipeline Configuration](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)

---

## Research Task 2: MUI v6 + Next.js 14 App Router Integration

**Question**: What are the best practices for integrating Material UI v6 with Next.js 14 App Router, particularly regarding Server Components vs Client Components and SSR?

**Research Approach**:
- Review MUI's Next.js App Router documentation
- Investigate Emotion cache configuration for SSR
- Study ColorScheme API for theme management
- Examine when MUI components can be Server Components vs requiring Client Components

**Decision**:

Use MUI v6 with the following integration pattern:

1. **Theme Provider in Root Layout**:
   - Create `src/theme/ThemeRegistry.tsx` as a Client Component
   - Wrap app with Emotion cache and MUI theme
   - Use ColorScheme API for theme configuration

2. **Component Usage Patterns**:
   - **Server Components**: MUI Typography, Box, Stack, Container (non-interactive layout components)
   - **Client Components**: All interactive components (Button, TextField, Dialog, etc.) - mark with `"use client"`
   - **Hybrid**: Compose Server Components that import Client Components for interactive parts

3. **SSR Configuration**:
   ```typescript
   // app/ThemeRegistry.tsx
   'use client';
   import { CacheProvider } from '@emotion/react';
   import { ThemeProvider } from '@mui/material/styles';
   import CssBaseline from '@mui/material/CssBaseline';
   import createEmotionCache from './createEmotionCache';
   
   const cache = createEmotionCache();
   
   export default function ThemeRegistry({ children }) {
     return (
       <CacheProvider value={cache}>
         <ThemeProvider theme={theme}>
           <CssBaseline />
           {children}
         </ThemeProvider>
       </CacheProvider>
     );
   }
   ```

**Rationale**:
- **Emotion Cache**: Required for Next.js App Router to prevent style flash on SSR
- **ColorScheme API**: Modern theming with better dark mode support
- **Selective Client Components**: Minimizes JavaScript bundle by keeping layout Server Components
- **Root Layout Pattern**: Single theme provider at top level prevents duplication

**Alternatives Considered**:
- **MUI v5**: Lacks ColorScheme API, older theming patterns
- **Styled Components**: Would require different configuration, Emotion is MUI's default
- **CSS Modules**: Would lose MUI's theming capabilities

**References**:
- [MUI Next.js App Router Guide](https://mui.com/material-ui/integrations/nextjs/)
- [MUI ColorScheme API](https://mui.com/material-ui/experimental-api/css-theme-variables/)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## Research Task 3: Next.js Middleware Patterns for Authentication with App Router

**Question**: What are the best practices for implementing authentication middleware in Next.js 14 App Router using Supabase Auth Helpers?

**Research Approach**:
- Review Supabase Auth Helpers for Next.js documentation
- Study Next.js middleware patterns for route protection
- Investigate session management with Server Components
- Examine cookie-based authentication in App Router

**Decision**:

Use Supabase Auth Helpers with Next.js middleware pattern:

1. **Middleware Configuration** (`middleware.ts`):
   ```typescript
   import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
   import { NextResponse } from 'next/server';
   import type { NextRequest } from 'next/server';
   
   export async function middleware(req: NextRequest) {
     const res = NextResponse.next();
     const supabase = createMiddlewareClient({ req, res });
     await supabase.auth.getSession(); // Refreshes session
     return res;
   }
   ```

2. **Protected Routes Pattern**:
   - Use middleware matcher to protect specific routes
   - Server Components can access session with `createServerComponentClient`
   - Client Components use `createClientComponentClient`

3. **Route Protection**:
   ```typescript
   export const config = {
     matcher: [
       '/dashboard/:path*',
       '/api/protected/:path*',
     ],
   };
   ```

**Rationale**:
- **Supabase Auth Helpers**: Official library for Next.js integration, handles cookie management
- **Middleware Pattern**: Runs before request, efficient for route protection
- **Session Refresh**: Middleware automatically refreshes auth tokens
- **Type Safety**: Full TypeScript support with Supabase types

**Alternatives Considered**:
- **Passport.js**: Express-centric, not ideal for Next.js middleware
- **NextAuth.js**: Adds abstraction layer, Supabase Auth Helpers more direct
- **Custom JWT Handling**: More complex, reinvents the wheel

**References**:
- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

## Research Task 4: ORM Selection for Next.js App Router

**Question**: Which ORM (Prisma, Drizzle ORM, or TypeORM) is most compatible with Next.js 14 App Router patterns, particularly Server Actions and Server Components?

**Research Approach**:
- Compare ORMs for Next.js compatibility
- Evaluate type generation and TypeScript integration
- Assess Server Actions compatibility
- Review migration systems and schema management

**Decision**:

**Recommended: Prisma**

Use Prisma ORM with database abstraction layer:

```typescript
// packages/db-srv/base/src/client.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Export abstract interfaces for database operations
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  create(data: CreateUserInput): Promise<User>;
  // ...
}
```

**Rationale**:
- **Type Safety**: Excellent TypeScript support with auto-generated types
- **Server Actions**: Works seamlessly with Server Actions (no edge runtime issues in most cases)
- **Developer Experience**: Best-in-class schema definition and migrations
- **Community**: Largest ecosystem and Vercel backing
- **Abstraction Ready**: Easy to wrap in repository pattern for database abstraction

**Comparison**:

| Feature | Prisma | Drizzle | TypeORM |
|---------|--------|---------|---------|
| TypeScript Support | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Next.js App Router | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Server Actions | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Migrations | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Learning Curve | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Edge Runtime | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |

**Note**: Drizzle ORM is also excellent and has better edge runtime support. Consider for Phase 2 evaluation if edge deployment becomes priority.

**Alternatives Considered**:
- **Drizzle ORM**: More lightweight, better edge support, but smaller ecosystem
- **TypeORM**: Older patterns (decorators), less Next.js focused
- **Raw SQL**: Maximum control but loses type safety and productivity

**References**:
- [Prisma with Next.js](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-monorepo)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Next.js Server Actions with Database](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

## Research Task 5: Internationalization Library for Next.js App Router

**Question**: Which internationalization library (next-intl or i18next) is best suited for Next.js 14 App Router with bilingual documentation strategy?

**Research Approach**:
- Compare next-intl vs i18next for App Router compatibility
- Evaluate Server Component support
- Assess routing patterns for locale switching
- Review translation management and developer experience

**Decision**:

**Recommended: next-intl**

Use next-intl for runtime internationalization:

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Rationale**:
- **App Router Native**: Built specifically for Next.js App Router
- **Server Component Support**: Can use translations in Server Components
- **Type Safety**: TypeScript integration with message keys
- **Routing**: Integrates with Next.js routing for locale-based URLs (`/en/...`, `/ru/...`)
- **Performance**: Minimal client-side JavaScript, server-renders translations

**Note on Bilingual Documentation**:
- **Markdown docs** (README, specs): Separate files (README.md, README-RU.md) - no i18n library needed
- **UI strings**: next-intl handles in-app translations
- **Consistency**: Translation keys reference the same concepts in both systems

**Alternatives Considered**:
- **i18next**: More mature, larger ecosystem, but requires more configuration for App Router
- **react-intl**: Lacks Next.js-specific optimizations
- **Manual context**: Too much boilerplate, loses type safety

**References**:
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

---

## Research Task 6: Client State Management Strategy

**Question**: When should we use Zustand or Jotai for client state management vs relying on Next.js Server Components?

**Research Approach**:
- Define state categories (server, URL, client)
- Evaluate when Server Components suffice vs when client state is needed
- Compare Zustand and Jotai for Next.js patterns
- Study state persistence strategies

**Decision**:

**State Management Strategy**:

1. **Server State** (Primary Pattern):
   - Use Server Components + Server Actions for data fetching and mutations
   - Cache with Next.js native caching (`fetch` with cache, `revalidateTag`)
   - No client state library needed

2. **URL State**:
   - Use `searchParams` and `useRouter` for shareable state
   - Good for filters, pagination, tabs

3. **Client State** (Use When Necessary):
   - Use **Zustand** for global client state (user preferences, UI state, optimistic updates)
   - Reserve for: theme toggle, sidebar state, form wizards, WebSocket data

**Zustand Pattern**:
```typescript
// stores/useUIStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    { name: 'ui-storage' }
  )
);
```

**Rationale**:
- **Server First**: Minimize client JavaScript by defaulting to Server Components
- **Zustand for Client State**: Lightweight (1KB), simple API, good TypeScript support
- **Avoid Over-fetching**: Server Components eliminate many client state management needs
- **Performance**: Less JavaScript to the client improves load times

**When to Use Client State**:
- ✅ UI toggles (sidebar, modals, theme)
- ✅ Form state across multiple steps
- ✅ Optimistic updates
- ✅ Real-time data from WebSockets
- ❌ Data from database (use Server Components)
- ❌ Authentication state (use Supabase auth)

**Alternatives Considered**:
- **Jotai**: Atomic state, good for complex dependencies, but slightly more complex API
- **Redux**: Overkill for most use cases, too much boilerplate
- **Context API**: Works but verbose, Zustand is cleaner

**References**:
- [Zustand with Next.js](https://github.com/pmndrs/zustand)
- [Next.js Data Fetching Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns)

---

## Research Task 7: Docker Compose Setup for Next.js + Supabase

**Question**: What is the best Docker Compose configuration for local development with Next.js and Supabase?

**Research Approach**:
- Review Supabase self-hosting documentation
- Study Docker Compose patterns for Next.js development
- Investigate hot reload in containers
- Evaluate local Supabase vs cloud Supabase for development

**Decision**:

**Two-Tier Docker Strategy**:

1. **Local Supabase (Docker Compose)**:
   ```yaml
   # docker/docker-compose.supabase.yml
   services:
     postgres:
       image: supabase/postgres:15
       environment:
         POSTGRES_PASSWORD: your-super-secret-password
       volumes:
         - postgres-data:/var/lib/postgresql/data
       ports:
         - "5432:5432"
     
     studio:
       image: supabase/studio:latest
       environment:
         SUPABASE_URL: http://localhost:54321
       ports:
         - "54323:3000"
     
     # Additional Supabase services: Kong, GoTrue, PostgREST, etc.
   ```

2. **Next.js Development** (Option A: Host machine, Option B: Container):

   **Option A - Recommended for Development**: Run Next.js on host machine
   - Pros: Faster hot reload, easier debugging, native IDE integration
   - Cons: Requires Node.js installed locally
   - Use: `pnpm dev` on host, connect to containerized Supabase

   **Option B - Containerized Next.js**:
   ```yaml
   # docker/docker-compose.dev.yml
   services:
     web:
       build:
         context: ..
         dockerfile: docker/Dockerfile.dev
       volumes:
         - ../:/app
         - /app/node_modules  # Anonymous volume for node_modules
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=development
   ```

**Rationale**:
- **Supabase in Docker**: Provides full local stack (Postgres, Auth, Storage, Studio)
- **Next.js on Host**: Better DX during development (faster hot reload)
- **Production**: Both containerized with multi-stage builds
- **Flexibility**: Developers can choose host or container for Next.js

**Alternative: Supabase Cloud**:
For initial setup, can use Supabase cloud project:
- Pros: No local container overhead, always available
- Cons: Requires internet, shared dev database
- Recommendation: Use cloud for Phase 1, Docker for Phase 2+

**Dockerfile.dev Pattern**:
```dockerfile
FROM node:18-alpine
RUN corepack enable && corepack prepare pnpm@8 --activate
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm install --offline
CMD ["pnpm", "dev"]
```

**Production Docker** (Multi-stage):
```dockerfile
FROM node:18-alpine AS builder
# Build stage
FROM node:18-alpine AS runner
# Runtime stage with minimal dependencies
```

**Alternatives Considered**:
- **No Docker**: Requires all dependencies locally, inconsistent environments
- **Full Docker Dev**: Slower hot reload, more complex debugging
- **Hosted Supabase Only**: No offline development capability

**References**:
- [Supabase Self-Hosting](https://supabase.com/docs/guides/self-hosting/docker)
- [Next.js Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

---

## Research Summary

All "NEEDS CLARIFICATION" items from Technical Context have been resolved:

✅ **Turborepo Configuration**: Pipeline with proper dependency ordering and caching  
✅ **MUI v6 + Next.js**: Emotion cache pattern with Server/Client Component guidance  
✅ **Next.js Auth Middleware**: Supabase Auth Helpers with middleware pattern  
✅ **ORM Selection**: Prisma recommended for TypeScript and Next.js compatibility  
✅ **Internationalization**: next-intl for runtime i18n, separate files for documentation  
✅ **State Management**: Server Components first, Zustand for necessary client state  
✅ **Docker Setup**: Containerized Supabase, flexible Next.js (host or container)

**Next Steps**: Proceed to Phase 1 - Design & Contracts
- Create data-model.md for foundational entities
- Generate API contracts
- Create quickstart.md
- Update agent context
