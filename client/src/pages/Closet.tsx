import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';
import UploadForm from '../components/UploadForm';
import Gallery from '../components/Gallery';
import FilterBar from '../components/FilterBar';

export default function Closet(props: { disableCustomTheme?: boolean }) {
  const {userData} = React.useContext(AppContext);
  const [filters, setFilters] = React.useState({
    primaryType: '',
    secondaryType: '',
    occasion: '',
    color: '',
    gender: ''
  });

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Navbar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 1.5 }}
      >
        <h1>Closet</h1>
        <p>Hello, {userData ? userData.name : "Guest"}, welcome to your Closet page!</p>

        <h2>Upload a Clothing Item:</h2>
        <UploadForm />

        <h2>Your Closet:</h2>
        <FilterBar filters={filters} setFilters={setFilters} />
        <Gallery user={true} filters={filters} />
      </Container>
      <Footer />
    </AppTheme>
  );
}