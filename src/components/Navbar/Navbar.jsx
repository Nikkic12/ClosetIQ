import React, {useState} from 'react'

// MaterialUI components
import { AppBar, Toolbar, Typography, Container, Button, Box, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material'
import { useMediaQuery, useTheme, Drawer } from '@mui/material'

// Icons
import CheckroomIcon from '@mui/icons-material/Checkroom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open)
    }

    const drawerLinks = [
        {
            text: "Home",
            link: "#home"
        },
        {
            text: "Add Clothes",
            link: "#addClothes"
        },
        {
            text: "Try-On",
            link: "#tryOn"
        },
        {
            text: "Closet",
            link: "#closet"
        }
    ]

    return (
        <>
            <AppBar position="sticky" color="primary">
                <Container>
                    <Toolbar>
                        <CheckroomIcon/>
                        <Typography variant="h5" sx={{ flexGrow: 1 }}>
                            ClosetIQ
                        </Typography>

                        {/* Display menu icon when the window is small*/}
                        {isMobile && (
                            <IconButton color="inherit" onClick={toggleDrawer(true)}>
                                <MenuIcon/>
                            </IconButton>
                        )}
                        {!isMobile && (
                            <>
                                {/* Links to other pages */}
                                <Button color="inherit" href="#home">
                                    Home
                                </Button>
                                <Button color="inherit" href="#addClothes">
                                    Add Clothes
                                </Button>
                                <Button color="inherit" href="#tryOn">
                                    Try-On
                                </Button>
                                <Button color="inherit" href="#closet">
                                    Closet
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Loop through array and add links to drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        {drawerLinks.map((linkItem, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton component="a"
                                    href={linkItem.link}
                                    onClick={toggleDrawer(false)}
                                    aria-label={`Navigate to ${linkItem.text}`}
                                >
                                    <ListItemText primary={linkItem.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Navbar