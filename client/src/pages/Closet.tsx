import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';
import UploadForm from '../components/UploadForm';
import Gallery from '../components/Gallery';

export default function Closet(props: { disableCustomTheme?: boolean }) {

  const {userData} = React.useContext(AppContext);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Navbar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <h1>Closet</h1>
        <p>Hello, {userData ? userData.name : "Guest"}, welcome to your Closet page!</p>

        <h2>Upload a Clothing Item:</h2>
        <UploadForm />

        <h2>Your Closet:</h2>
        <Gallery user={true} />

      </Container>

      <Footer />
    </AppTheme>
  );
}