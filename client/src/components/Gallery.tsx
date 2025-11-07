import * as React from 'react';
import Container from '@mui/material/Container';

import {RowsPhotoAlbum} from "react-photo-album"; // npm install yet-another-react-lightbox/plugins
import "react-photo-album/rows.css";
import LightBox, { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function Gallery(props: { photos: Array<{src: string, id: string, primaryType:string, secondaryType:string, occasion:string, color:string, width: number, height: number}> }) {
    const [index,setIndex] = React.useState(-1);

    return (
        <Container>
            <RowsPhotoAlbum
                photos={props.photos}
                targetRowHeight={150}
                onClick={({ index }) => setIndex(index)}
            />

            <Lightbox
                slides={props.photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                carousel={{
                    finite: true,
                    imageFit: "contain",
                    spacing: 0,

                }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                    slide: { maxWidth: "90%", maxHeight: "90%" }
                }}
            />
        </Container>
    );
}