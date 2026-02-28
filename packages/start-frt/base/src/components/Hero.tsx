'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function Hero() {
    return (
        <Box
            id="hero"
            sx={{
                width: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Container
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    pt: { xs: 14, sm: 8 },
                    pb: { xs: 6, sm: 8 }
                }}
            >
                <Stack spacing={4} useFlexGap sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            fontSize: 'clamp(3rem, 10vw, 3.5rem)'
                        }}
                    >
                        Explore&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={(theme) => ({
                                fontSize: 'inherit',
                                color: 'primary.main',
                                ...theme.applyStyles('dark', {
                                    color: 'primary.light'
                                })
                            })}
                        >
                            all worlds
                        </Typography>
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'text.primary',
                            width: { sm: '100%', md: '80%' },
                            fontSize: '1.15rem',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                    >
                        Universo Platformo is a modular platform for building and managing digital universes, metaverses, and collaborative workspaces.
                    </Typography>
                    <Stack direction="row" spacing={1} useFlexGap sx={{ pt: 4, justifyContent: 'center' }}>
                        <Button
                            component={Link}
                            href="/auth"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                minWidth: 'fit-content',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
                            }}
                        >
                            Get Started
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}
