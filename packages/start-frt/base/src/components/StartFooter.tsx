'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import TelegramIcon from '@mui/icons-material/Telegram'
import EmailIcon from '@mui/icons-material/Email'
import ArticleIcon from '@mui/icons-material/Article'
import PolicyIcon from '@mui/icons-material/Policy'
import type React from 'react'

interface FooterItemProps {
    icon: React.ReactNode
    text: string
    href: string
    external?: boolean
    variant?: 'guest' | 'internal'
}

const FooterItem: React.FC<FooterItemProps> = ({ icon, text, href, external = false, variant = 'guest' }) => {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    const isGuest = variant === 'guest'

    return (
        <Link
            href={href}
            {...linkProps}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: isGuest ? '#fff' : 'text.secondary',
                textShadow: isGuest ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
                textDecoration: 'none',
                '& .MuiSvgIcon-root': {
                    filter: isGuest ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' : 'none'
                },
                '&:hover': {
                    transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s'
            }}
        >
            {icon}
            <Typography variant="body2">{text}</Typography>
        </Link>
    )
}

interface StartFooterProps {
    variant?: 'guest' | 'internal'
}

export const StartFooter: React.FC<StartFooterProps> = ({ variant = 'guest' }) => {
    const footerItems: Omit<FooterItemProps, 'variant'>[] = [
        {
            icon: <TelegramIcon fontSize="small" />,
            text: '@diverslaboristo',
            href: 'https://t.me/diverslaboristo',
            external: true
        },
        {
            icon: <EmailIcon fontSize="small" />,
            text: 'hello@universo.platformo',
            href: 'mailto:hello@universo.platformo',
            external: true
        },
        {
            icon: <ArticleIcon fontSize="small" />,
            text: 'Terms of Service',
            href: '/terms',
            external: false
        },
        {
            icon: <PolicyIcon fontSize="small" />,
            text: 'Privacy Policy',
            href: '/privacy',
            external: false
        }
    ]

    const isGuest = variant === 'guest'

    return (
        <Box
            component="footer"
            sx={{
                pt: isGuest ? { xs: 0, sm: 0 } : { xs: 1, sm: 1 },
                pb: { xs: 0.5, sm: 0.5 },
                backgroundColor: 'transparent'
            }}
        >
            <Container>
                <Grid container spacing={2}>
                    {footerItems.map((item, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <FooterItem {...item} variant={variant} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
