import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    let body: unknown
    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { email, password } = body as Record<string, unknown>

    if (typeof email !== 'string' || !email || typeof password !== 'string' || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 })
    }

    const user = data.user

    if (!user) {
        return NextResponse.json({ error: 'Unexpected authentication response' }, { status: 500 })
    }

    return NextResponse.json({ user: { id: user.id, email: user.email ?? '' } })
}
