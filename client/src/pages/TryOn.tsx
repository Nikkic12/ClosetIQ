import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';
import OutfitForm from '../components/OutfitForm';
import Gallery from '../components/Gallery';

export default function TryOn(props: { disableCustomTheme?: boolean }) {
  const {userData} = React.useContext(AppContext);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleOutfitCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Navbar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 1.5 }}
      >
        <h1>Try-On</h1>
        <p>Hello, {userData ? userData.name : "Guest"}, welcome to the Try-On page!</p>

        <h2>Make an Outfit:</h2>
        <OutfitForm onOutfitCreated={handleOutfitCreated} />

        <h2>Your Outfits:</h2>
        <Gallery user={true} outfits={true} key={refreshKey} /> 

      </Container>

      <Footer />
    </AppTheme>
  );
}