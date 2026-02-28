'use client'

import { useAuth } from '@universo/auth-frt'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import GuestStartPage from './GuestStartPage'
import AuthenticatedStartPage from './AuthenticatedStartPage'

function Loader() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default function StartPage() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <Loader />
    }

    return isAuthenticated ? <AuthenticatedStartPage /> : <GuestStartPage />
}
