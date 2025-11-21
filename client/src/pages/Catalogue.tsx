import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Box, Typography, useTheme } from '@mui/material';
import AppTheme from '../themes/AppTheme';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';
import Gallery from '../components/Gallery';
import FilterBar from '../components/FilterBar';

export default function Catalogue(props: { disableCustomTheme?: boolean }) {
  const { userData } = React.useContext(AppContext);
  const theme = useTheme();
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
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 1.5, mb: 0 }}
      >
        <Typography variant="h1" color="#673ab7" gutterBottom
          sx={{
            fontSize: '2.0rem', fontWeight: 700,
            color: '#7851A9',
          }}>
          Catalogue
        </Typography>
        <p>Hello, {userData ? userData.name : "Guest"}, welcome to the Catalogue page!</p>

 
        <FilterBar filters={filters} setFilters={setFilters} />
        <Gallery filters={filters} />
      </Container>
      <Footer />
      </Box>
    </AppTheme>
  );
}