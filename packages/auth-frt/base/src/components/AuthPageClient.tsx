'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuth } from '../context/AuthContext'

export function AuthPageClient() {
    const { login, register, isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const [tab, setTab] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, loading, router])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)
        setSubmitting(true)

        try {
            if (tab === 0) {
                await login(email, password)
                router.push('/')
            } else {
                const result = await register(email, password)
                setSuccessMessage(result.message)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))'
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 400, mx: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" component="h1" textAlign="center" gutterBottom sx={{ mb: 3 }}>
                        Universo Platformo
                    </Typography>

                    <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" sx={{ mb: 3 }}>
                        <Tab label="Sign In" />
                        <Tab label="Sign Up" />
                    </Tabs>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {successMessage && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMessage}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            autoComplete="email"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            autoComplete={tab === 0 ? 'current-password' : 'new-password'}
                            inputProps={{ minLength: 6 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={submitting}
                            sx={{ mt: 1 }}
                        >
                            {submitting ? <CircularProgress size={24} /> : (tab === 0 ? 'Sign In' : 'Sign Up')}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}
