import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import AppAppBar from '../components/AppAppBar';
import NavbarLoggedIn from '../components/NavbarLoggedIn';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';

export default function Home(props: { disableCustomTheme?: boolean }) {
  const {userData} = React.useContext(AppContext);
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      {/* if there is userData, displayed the "logged in" navbar */}
      {userData ? <NavbarLoggedIn /> : <AppAppBar />}

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4, minHeight: '100vh',
        background: 'linear-gradient(180deg, #ffffff 0%, #000000 100%)',
        pb: 8,
        mt: 6,
     }}
        >
        <h1>Home</h1>
        <p>Hello, {userData ? userData.name : "Guest"}!</p>
        <MainContent />
      </Container>

      <Footer />
    </AppTheme>
  );
}
