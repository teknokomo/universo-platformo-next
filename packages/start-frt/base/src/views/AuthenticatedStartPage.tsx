'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { StartFooter } from '../components/StartFooter'
import { useAuth } from '@universo/auth-frt'

export default function AuthenticatedStartPage() {
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{ flex: 1 }}>
                <Container maxWidth="md" sx={{ pt: { xs: 14, sm: 14 }, pb: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3 } }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Welcome to Universo Platformo
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            You are signed in as <strong>{user?.email}</strong>
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 4 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Universo Kiberplano
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Strategic planning and execution system for managing your projects and goals.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Universo Kompendio
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Knowledge management system for organizing and sharing information.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </Box>
                </Container>
            </Box>
            <StartFooter variant="internal" />
        </Box>
    )
}
