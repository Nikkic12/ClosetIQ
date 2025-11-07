import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import NavbarLoggedIn from '../components/NavbarLoggedIn';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { AppContext } from '../context/AppContext';
import Gallery from '../components/Gallery';

type photoItem = {
    src: string,
    id: string,
    primaryType : string,
    secondaryType : string,
    occasion : string,
    color : string,
    width: number,
    height: number

  };

  // todo create a button for people to filter by type, occasion, color, etc.
  // filterPhotos function

export default function Catalogue(props: { disableCustomTheme?: boolean }) {
  const {userData,backendUrl} = React.useContext(AppContext);
  const [photos,setPhotos] = useState<photoItem[]>([]);
    useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/upload/getCatalogueItems");
        // server responds with { success: true, items: [...] }
        // handle multiple possible shapes defensively
        const items = data.items || data.data || data;

        console.log('Catalogue items:', items);

        const formattedPhotos = (Array.isArray(items) ? items : []).map((item: any) => ({
          src: item.imgUrl, // already full Cloudinary URL
          id: item._id || item.id,     // prefer MongoDB _id, fallback to id
          primaryType: item.primaryType,
          secondaryType: item.secondaryType,
          occasion: item.occasion,
          color: item.color,
          width: 800,
          height: 600
        }));

        setPhotos(formattedPhotos);

      } catch (error) {
                console.error('Error fetching catalogue items:', error);
                // fallback placeholder in case of API error
                setPhotos([{
                    src: 'src/assets/step2.png', // local placeholder image
                    id: 'error-placeholder',
                    primaryType: 'error',
                    secondaryType: 'error',
                    occasion: 'error',
                    color: 'gray',
                    width: 800,
                    height: 600
                }]);
            }
        };

        fetchPhotos();
    }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <NavbarLoggedIn />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <h1>Catalogue</h1>
        <p>Hello, {userData ? userData.name : "Guest"}, welcome to the Catalogue!</p>

        <Gallery photos={photos} />

      </Container>

      <Footer />
    </AppTheme>
  );
}