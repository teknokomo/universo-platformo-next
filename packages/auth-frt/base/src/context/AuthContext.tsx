'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from 'react'

export interface AuthUser {
    id: string
    email: string
}

export interface AuthContextValue {
    user: AuthUser | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (email: string, password: string) => Promise<{ message: string }>
    refresh: () => Promise<AuthUser | null>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

/**
 * All auth operations go through the project's own backend API routes.
 * The frontend never communicates with Supabase directly.
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refresh = useCallback(async (): Promise<AuthUser | null> => {
        try {
            const response = await fetch('/api/v1/auth/me', { credentials: 'same-origin' })
            if (!response.ok) {
                setUser(null)
                return null
            }
            const data = (await response.json()) as AuthUser
            setUser(data)
            return data
        } catch {
            setUser(null)
            return null
        }
    }, [])

    // Check session on mount via backend
    useEffect(() => {
        refresh().finally(() => setLoading(false))
    }, [refresh])

    const login = useCallback(async (email: string, password: string): Promise<void> => {
        setError(null)
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({ email, password })
        })
        if (!response.ok) {
            const data = (await response.json()) as { error?: string }
            const message = data.error ?? 'Login failed'
            setError(message)
            throw new Error(message)
        }
        const data = (await response.json()) as { user: AuthUser }
        setUser(data.user)
    }, [])

    const logout = useCallback(async (): Promise<void> => {
        setError(null)
        await fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'same-origin' })
        setUser(null)
    }, [])

    const register = useCallback(async (email: string, password: string): Promise<{ message: string }> => {
        setError(null)
        const response = await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({ email, password })
        })
        if (!response.ok) {
            const data = (await response.json()) as { error?: string }
            const message = data.error ?? 'Registration failed'
            setError(message)
            throw new Error(message)
        }
        const data = (await response.json()) as { message: string }
        return { message: data.message }
    }, [])

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            loading,
            error,
            isAuthenticated: !!user,
            login,
            logout,
            register,
            refresh
        }),
        [user, loading, error, login, logout, register, refresh]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
