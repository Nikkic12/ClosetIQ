import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Typography, useTheme } from '@mui/material';
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';
import OutfitForm from '../components/OutfitForm';
import Gallery from '../components/Gallery';

export default function TryOn(props: { disableCustomTheme?: boolean }) {
  const {userData} = React.useContext(AppContext);
  const theme = useTheme();
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleOutfitCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

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
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 1.5 }}
      >
        <Typography variant="h1" color="#673ab7" gutterBottom
          sx={{
            fontSize: '2.0rem', fontWeight: 700,
            color: '#7851A9',
          }}>
          Try-On
        </Typography>
        <p>Hello, {userData ? userData.name : "Guest"}, welcome to the Try-On page!</p>

        <h2>Make an Outfit:</h2>
        <OutfitForm onOutfitCreated={handleOutfitCreated} />

        <h2>Your Outfits:</h2>
        <Gallery user={true} outfits={true} key={refreshKey} /> 

      </Container>

      <Footer />
      </Box>
    </AppTheme>
  );
}