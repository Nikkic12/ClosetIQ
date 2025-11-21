import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';
import { Box, useTheme } from '@mui/material';
import DemoOutfitForm from '../components/DemoOutfitForm';


export default function Home(props: { disableCustomTheme?: boolean }) {
  const {userData} = React.useContext(AppContext);
  const theme = useTheme(); 

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}${theme.palette.mode === 'dark' ? '1A' : '14'} 55%)`,
          pb: 8,
          mt: 6,
          pt: '5px'
        }}
      >
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 
        
        }}
      >
        <MainContent />

        <DemoOutfitForm />
        
      </Container>

      <Footer />
      </Box>
    </AppTheme>
  );
}
