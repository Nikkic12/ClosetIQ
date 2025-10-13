import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import NavbarLoggedIn from '../components/NavbarLoggedIn';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';

export default function TryOn(props: { disableCustomTheme?: boolean }) {
  const {userData} = React.useContext(AppContext);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <NavbarLoggedIn />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <h1>Try-On</h1>
        <p>Hello, {userData ? userData.name : "Guest"}, welcome to the Try-On page!</p>
      </Container>

      <Footer />
    </AppTheme>
  );
}