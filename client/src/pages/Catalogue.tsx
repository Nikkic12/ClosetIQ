import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../themes/AppTheme';
import NavbarLoggedIn from '../components/NavbarLoggedIn';
import Footer from '../components/Footer';

import { AppContext } from '../context/AppContext';
import {RowsPhotoAlbum} from "react-photo-album"; // npm install yet-another-react-lightbox/plugins
import "react-photo-album/rows.css";

import LightBox, { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const photos = [
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/step3.png", width: 800, height: 600},
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/step3.png", width: 800, height: 600},
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/step3.png", width: 800, height: 600},
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/step3.png", width: 800, height: 600},
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/step3.png", width: 800, height: 600},
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/jersey.png", width: 800, height: 600},
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/step3.png", width: 800, height: 600},
  {src: "src/assets/step1.png", width: 800, height: 600},
  {src: "src/assets/step2.png", width: 800, height: 600},
  {src: "src/assets/jacket.png", width: 800, height: 600},
  
  
];

export default function Catalogue(props: { disableCustomTheme?: boolean }) {
  const {userData} = React.useContext(AppContext);
  const [index,setIndex] = React.useState(-1);

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

       <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={150}
          onClick={({ index }) => setIndex(index)}
        />

        <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
          carousel={{
            finite: true,
            imageFit: "contain",
            spacing: 0,

          }}
          styles = {{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
            slide: {maxWidth: "90%", maxHeight: "90%"}
          }}
        />




      </Container>

      <Footer />
    </AppTheme>
  );
}