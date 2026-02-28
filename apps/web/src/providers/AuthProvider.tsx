'use client'

import { AuthProvider as AuthFrtProvider } from '@universo/auth-frt'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <AuthFrtProvider>{children}</AuthFrtProvider>
}
