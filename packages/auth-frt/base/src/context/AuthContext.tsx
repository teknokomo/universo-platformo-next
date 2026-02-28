'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User, Session } from '@supabase/supabase-js'

export interface AuthUser {
    id: string
    email: string
}

export interface AuthContextValue {
    user: AuthUser | null
    session: Session | null
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

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = useMemo(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ), [])

    const mapUser = (supabaseUser: User | null): AuthUser | null => {
        if (!supabaseUser) return null
        return {
            id: supabaseUser.id,
            email: supabaseUser.email ?? ''
        }
    }

    useEffect(() => {
        // Get initial session
        const initSession = async () => {
            const { data: { session: initialSession } } = await supabase.auth.getSession()
            setSession(initialSession)
            setUser(mapUser(initialSession?.user ?? null))
            setLoading(false)
        }

        initSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession)
            setUser(mapUser(currentSession?.user ?? null))
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    const login = useCallback(async (email: string, password: string): Promise<void> => {
        setError(null)
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) {
            setError(loginError.message)
            throw new Error(loginError.message)
        }
    }, [supabase])

    const logout = useCallback(async (): Promise<void> => {
        setError(null)
        const { error: logoutError } = await supabase.auth.signOut()
        if (logoutError) {
            setError(logoutError.message)
            throw new Error(logoutError.message)
        }
        setUser(null)
        setSession(null)
    }, [supabase])

    const register = useCallback(async (email: string, password: string): Promise<{ message: string }> => {
        setError(null)
        const { error: registerError } = await supabase.auth.signUp({ email, password })
        if (registerError) {
            setError(registerError.message)
            throw new Error(registerError.message)
        }
        return { message: 'Please check your email to confirm your account' }
    }, [supabase])

    const refresh = useCallback(async (): Promise<AuthUser | null> => {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        const mappedUser = mapUser(currentUser)
        setUser(mappedUser)
        return mappedUser
    }, [supabase])

    return (
        <AuthContext.Provider value={{
            user,
            session,
            loading,
            error,
            isAuthenticated: !!user,
            login,
            logout,
            register,
            refresh
        }}>
            {children}
        </AuthContext.Provider>
    )
}
