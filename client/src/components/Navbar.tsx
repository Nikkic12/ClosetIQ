import * as React from 'react';

import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../themes/ColorModeIconDropdown';

import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PurpleButton = styled(Button)(({ theme }) => ({
    '&.MuiButton-contained': {
        background: '#7851A9',
        backgroundImage: 'none',
        color: '#fff',
    },
    '&.MuiButton-contained:hover': {
        background: '#6A4799',
        backgroundImage: 'none',
    },
    '&.MuiButton-contained:active': {
        background: '#5A3E8E',
    },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: '65px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function Navbar() {
    const navigate = useNavigate(); 
    const { userData, backendUrl } = React.useContext(AppContext);

    const [open, setOpen] = React.useState(false);

    // verify email function
    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            // call logout API endpoint to logout the current user
            const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");

            if (data.success) {
                navigate("/verifyemail");
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            const err = error as any;
            toast.error(err.message);
        }
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'background.default',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                top: -3,
                left: -9,
                right: 0,
                width: '101.1%',
                margin: 0,
                padding: 0,
            }}
        >
            <Box sx={{ width: '100%' }}>
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <img
                            src="./public/closetiq_logo.png"
                            alt="ClosetIQ Logo"
                            style={{ height: 55, marginLeft: 5, marginRight: -1 }} //16 
                        />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button component={Link} to="/" variant="text" color="info" size="large">
                                Home
                            </Button>
                            <Button component={Link} to="/about" variant="text" color="info" size="large">
                                About
                            </Button>

                            {userData && (
                                <>
                                    <Button component={Link} to="/closet" variant="text" color="info" size="large">
                                        Closet
                                    </Button>
                                    <Button component={Link} to="/tryon" variant="text" color="info" size="large">
                                        Try-on
                                    </Button>
                                    <Button component={Link} to="/catalogue" variant="text" color="info" size="large">
                                        Catalogue
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {/* only display this button if user hasn't verified */}
                        {userData && !userData.isAccountVerified && (
                            <Button onClick={sendVerificationOtp} color="primary" fullWidth
                                sx={{
                                    backgroundColor: '#7851A9',
                                    color: '#fff',
                                    border: 'none',
                                    boxShadow: 'none',
                                    outline: 'none',
                                    '&:hover': {
                                        backgroundColor: '#6A4799',
                                        boxShadow: 'none',
                                    },
                                }}>
                                Verify email
                            </Button>
                        )}
                        {userData && (
                            <Button component={Link} to="/profile" variant="text" color="info" size="large">
                                Profile
                            </Button>
                        )}
                        {!userData && (
                            <>
                                <Button component={Link} to="/signin" color="primary" variant="text" size="medium">
                                    Sign in
                                </Button>
                                <Link to="/signup">
                                    <PurpleButton color="primary" size="medium" sx={{
                                        backgroundColor: '#7851A9',
                                        color: '#fff',
                                        border: 'none',
                                        boxShadow: 'none',
                                        outline: 'none',
                                        '&:hover': {
                                            backgroundColor: '#6A4799',
                                            boxShadow: 'none',
                                        },
                                    }}>
                                        Sign up
                                    </PurpleButton>
                                </Link>
                            </>
                        )}
                        <ColorModeIconDropdown />
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ColorModeIconDropdown size="medium" />
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                },
                            }}
                        >
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem>
                                    <Button component={Link} to="/">
                                        Home
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button component={Link} to="/about">
                                        About
                                    </Button>
                                </MenuItem>
                                {userData && (
                                    <>
                                        <MenuItem>
                                            <Button component={Link} to="/closet">
                                                Closet
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button component={Link} to="/tryon">
                                                Try-on
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button component={Link} to="/catalogue">
                                                Catalogue
                                            </Button>
                                        </MenuItem>
                                    </>
                                )}

                                <Divider sx={{ my: 3 }} />
                                {/* only display this button if user hasn't verified */}
                                {userData && !userData.isAccountVerified && (
                                    <MenuItem>
                                        <Button onClick={sendVerificationOtp} color="primary" variant="contained" fullWidth>
                                            Verify email
                                        </Button>
                                    </MenuItem>
                                )}
                                {userData && (
                                    <MenuItem>
                                        <Button component={Link} to="/profile" variant="text" color="info" size="large">
                                            Profile
                                        </Button>
                                    </MenuItem>
                                )}
                                {!userData && (
                                    <>
                                        <MenuItem>
                                            <Button component={Link} to="/signin" color="primary" variant="outlined" fullWidth>
                                                Sign in
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button component={Link} to="/signup" color="primary" variant="contained" fullWidth>
                                                Sign up
                                            </Button>
                                        </MenuItem>
                                    </>
                                )}
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Box>
        </AppBar>
    );
}
