import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import AppAppBar from '../components/AppAppBar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home(props: { disableCustomTheme?: boolean }) {
  // Express backend stuff
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits); // store the fruits into the use state array
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <h1>Home</h1>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
      </Container>

      <Footer />

      <>
        <h3>Backend Data:</h3>
        {array.map((fruit, index) => (
          <div key={index}>
            <p>{fruit}</p>
            <br></br>
          </div>
        ))}
      </>

    </AppTheme>
  );
}
