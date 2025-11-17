/**
 * TypeScript schema for environment variable validation
 * Use with zod or similar validation library
 */

export interface EnvironmentVariable {
  key: string;
  description: string;
  required: boolean;
  default?: string;
  example: string;
  isPublic: boolean;
  category: 'database' | 'auth' | 'api' | 'app' | 'build';
}

export interface EnvironmentSchema {
  development: EnvironmentVariable[];
  production: EnvironmentVariable[];
  test: EnvironmentVariable[];
}

/**
 * Phase 1 Foundation Environment Variables
 */
export const foundationEnvSchema: EnvironmentSchema = {
  development: [
    // Database (Supabase)
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      description: 'Supabase project URL',
      required: true,
      example: 'https://xxxxx.supabase.co',
      isPublic: true,
      category: 'database'
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      description: 'Supabase anonymous/public key',
      required: true,
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      isPublic: true,
      category: 'auth'
    },
    {
      key: 'SUPABASE_SERVICE_ROLE_KEY',
      description: 'Supabase service role key (server-side only)',
      required: false,
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      isPublic: false,
      category: 'auth'
    },
    // Application
    {
      key: 'NEXT_PUBLIC_APP_URL',
      description: 'Public URL of the application',
      required: true,
      example: 'http://localhost:3000',
      isPublic: true,
      category: 'app'
    },
    {
      key: 'NODE_ENV',
      description: 'Node environment',
      required: true,
      default: 'development',
      example: 'development',
      isPublic: false,
      category: 'app'
    },
    // Build (Optional - for Turborepo Remote Caching)
    {
      key: 'TURBO_TOKEN',
      description: 'Turborepo remote cache token',
      required: false,
      example: '',
      isPublic: false,
      category: 'build'
    },
    {
      key: 'TURBO_TEAM',
      description: 'Turborepo team identifier',
      required: false,
      example: '',
      isPublic: false,
      category: 'build'
    }
  ],
  production: [
    // Same as development but with production values
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      description: 'Supabase project URL',
      required: true,
      example: 'https://xxxxx.supabase.co',
      isPublic: true,
      category: 'database'
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      description: 'Supabase anonymous/public key',
      required: true,
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      isPublic: true,
      category: 'auth'
    },
    {
      key: 'SUPABASE_SERVICE_ROLE_KEY',
      description: 'Supabase service role key (server-side only)',
      required: true,
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      isPublic: false,
      category: 'auth'
    },
    {
      key: 'NEXT_PUBLIC_APP_URL',
      description: 'Public URL of the application',
      required: true,
      example: 'https://universo-platformo.com',
      isPublic: true,
      category: 'app'
    },
    {
      key: 'NODE_ENV',
      description: 'Node environment',
      required: true,
      default: 'production',
      example: 'production',
      isPublic: false,
      category: 'app'
    }
  ],
  test: [
    // Minimal config for testing
    {
      key: 'NODE_ENV',
      description: 'Node environment',
      required: true,
      default: 'test',
      example: 'test',
      isPublic: false,
      category: 'app'
    },
    {
      key: 'NEXT_PUBLIC_APP_URL',
      description: 'Public URL of the application',
      required: true,
      default: 'http://localhost:3000',
      example: 'http://localhost:3000',
      isPublic: true,
      category: 'app'
    }
  ]
};

/**
 * Runtime environment validation using zod
 * Example usage:
 * 
 * import { z } from 'zod';
 * 
 * const envSchema = z.object({
 *   NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
 *   // ... other variables
 * });
 * 
 * export const env = envSchema.parse(process.env);
 */
