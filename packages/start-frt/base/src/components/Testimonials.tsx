'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

const universoProducts = [
    {
        title: 'Kompendio',
        description: 'Knowledge management system for organizing and sharing information across your universe.'
    },
    {
        title: 'Platformo',
        description: 'Abstract management layer providing unified access to all platform resources and services.'
    },
    {
        title: 'Kiberplano',
        description: 'Strategic planning and execution system for managing complex multi-dimensional projects.'
    },
    {
        title: 'Grandaringo',
        description: 'Creative and media tools for building immersive experiences and digital content.'
    }
]

export default function Testimonials() {
    return (
        <Container
            id="testimonials"
            sx={{
                pt: { xs: 2, sm: 2 },
                pb: { xs: 0.8, sm: 0.8 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 2, sm: 2 }
            }}
        >
            <Grid container spacing={2}>
                {universoProducts.map((product, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ display: 'flex' }}>
                        <Card
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    <Typography
                                        component="span"
                                        sx={(theme) => ({
                                            color: 'primary.main',
                                            fontWeight: 'bold',
                                            fontSize: 'inherit',
                                            ...theme.applyStyles('dark', {
                                                color: 'primary.light'
                                            })
                                        })}
                                    >
                                        Universo
                                    </Typography>{' '}
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
