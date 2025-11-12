import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import { AppContext } from '../context/AppContext';
import Box from '@mui/material/Box';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

import { Avatar, Typography } from "@mui/material";

export default function TryOn(props: { disableCustomTheme?: boolean }) {
  // const {userData} = React.useContext(AppContext);
  const navigate = useNavigate(); 
  const {userData, backendUrl, setUserData, setIsLoggedIn} = React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  // logout function
  const logout = async () => {
      try {
          axios.defaults.withCredentials = true;
          // call logout API endpoint to logout the current user
          const {data} = await axios.post(backendUrl + "/api/auth/logout");

          data.success && setIsLoggedIn(false);
          data.success && setUserData(true);
          navigate("/");
          window.location.reload(); // refresh the page
      }
      catch(error) {
        const err = error as any;
        toast.error(err.message);
      }
  }
  const Card = styled(MuiCard)(({ theme }) => ({
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      width: '100%',
      padding: theme.spacing(4),
      gap: theme.spacing(2),
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
          maxWidth: '450px',
      },
      boxShadow:
          'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
      ...theme.applyStyles('dark', {
          boxShadow:
              'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
      }),
  }));
  
  const fullName = userData?.name || "guest";
  const nameParts = fullName.split(" ");
  const initials = nameParts.map((n: any[]) => n[0]).join("").toUpperCase();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Navbar />

      <Container 
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
       <Card>
          <Box sx={{display: "flex", justifyContent: 'center'}}>
            <Avatar sx={{height: 100, width: 100, fontSize: 40, bgcolor: '#7851A9', color: '#ffffffff'}}>{initials}</Avatar>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center', m: 0}}>     
            <Typography variant="h5" sx={{ m: 0, lineHeight: 1.2 }}>
              {userData ? userData.name : "Guest"}
            </Typography>
          </Box>
          
          <Box sx={{display: 'flex', justifyContent: 'center', mt: 0, mb: 5}}>        
            <Typography variant="body2" color="text.secondary" sx={{ m: 0, lineHeight: 1 }}>
              {userData ? userData.email : "No Email"}
            </Typography>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 0}}>
            <Button onClick={logout} sx={{
                  backgroundColor: '#7851A9',
                  width: 450,
                  color: '#ffffffff',
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                  '&:hover': {
                    backgroundColor: '#6A4799',
                    boxShadow: 'none',
                  },
                }}color="primary" variant="text" size="small">
                    Update Profile Photo
            </Button>
          </Box>

          <Box 
            sx={{display: 'flex', justifyContent: 'center', marginBottom: 0}}>
            <Button onClick={logout} sx={{
                  backgroundColor: '#7851A9',
                  width: 450,
                  color: '#fffefeff',
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                  '&:hover': {
                    backgroundColor: '#6A4799',
                    boxShadow: 'none',
                  },
                }}color="primary" variant="text" size="small">
                    Delete account
            </Button>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 0}}>
            <Button onClick={logout} sx={{
                  backgroundColor: '#7851A9',
                  width: 450,
                  color: '#ffffffff',
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                  '&:hover': {
                    backgroundColor: '#6A4799',
                    boxShadow: 'none',
                  },
                }}color="primary" variant="text" size="small">
                    Log out
            </Button>
          </Box>

          {/* <Box 
            sx={{display: 'flex', justifyContent: 'center', marginTop: 0, marginBottom: 5}}>
            
          </Box> */}
       </Card>
      </Container>

      
      
      <Footer />
    </AppTheme>
  );
}