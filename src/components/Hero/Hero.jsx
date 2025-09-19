import React from 'react'
import { Typography, Box, Stack, Button, Container } from '@mui/material'
import Landscape from '../../assets/images/landscape.jpg'

const Hero = () => {
    return (
        <Container id="home">
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '85vh',
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" }, // Ensure this Box takes 50% of the width
                        padding: '3rem 0',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>ClosetIQ</Typography>
                    <Typography variant='h4' sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
                        All your outfits, all in one place.
                    </Typography>
                    <Button variant="contained" color='secondary' href="#coffee">Get Started</Button>
                </Box>

                <Box
                sx={{
                    width: "50%", // Ensure this Box takes 50% of the width
                    padding: 2,
                    textAlign: 'center',
                }}
                >
                    <img src={Landscape} alt="sunset picture on a wooden walkway" 
                    style={{width: '100%'}}
                    />
                </Box>

            </Stack>
        </Container>
    )
}

export default Hero