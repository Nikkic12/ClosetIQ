import * as React from 'react';
import Container from '@mui/material/Container';


import { RowsPhotoAlbum } from "react-photo-album"; // npm install yet-another-react-lightbox/plugins
import "react-photo-album/rows.css";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Button from '@mui/material/Button';



type photoItem = {
  src: string,
  id: string,
  userID?: string,
  primaryType: string,
  secondaryType: string,
  occasion: string,
  color: string,
  width: number,
  height: number
};

export default function Gallery(props: { user?: boolean, outfits?: boolean }) {
    const [index, setIndex] = React.useState(-1);
    const [photos, setPhotos] = useState<photoItem[]>([]);
    
    const { backendUrl } = React.useContext(AppContext);
    const { userData } = React.useContext(AppContext);

    useEffect(() => {
        const fetchPhotos = async () => {
              
            try {
                // if user prop is true, fill the gallery with user photos
                if (props.user) {
                    console.log("Fetching user photos");

                    const { data } = await axios.get(backendUrl + "/api/upload/getUserClothing");
                    
                    const items = data.items || data.data || data;

                    console.log('User items:', items);

                    

                    const formattedPhotos = (Array.isArray(items) ? items : []).map((item: any) => ({
                        src: item.imgUrl, // already full Cloudinary URL
                        id: item._id || item.id,     // prefer MongoDB _id, fallback to id
                        userID: item.user,
                        primaryType: item.primaryType,
                        secondaryType: item.secondaryType,
                        occasion: item.occasion,
                        color: item.color,
                        width: 800,
                        height: 600
                    }));

                    // setPhotos(formattedPhotos);

                    const userId = userData ? userData.userId : "testuserId";
                    
                    

                    const UserformattedPhotos = formattedPhotos.filter(photo => photo.userID === userId);
                    setPhotos(UserformattedPhotos);


                    // if outfits prop is true, fill the gallery with outfit photos
                    if (props.outfits) {
                        console.log("Fetching outfit photos");


                        // TODO fetch outfit photos


                    }
                }
                else {
                    // if no props given, default to catalogue photos
                    console.log("Fetching catalogue photos");

                    const { data } = await axios.get(backendUrl + "/api/upload/getCatalogueItems");
                    // server responds with { success: true, items: [...] }
                    // handle multiple possible shapes defensively
                    const items = data.items || data.data || data;

                    console.log('Catalogue items:', items);

                    const formattedPhotos = (Array.isArray(items) ? items : []).map((item: any) => ({
                        src: item.imgUrl, // already full Cloudinary URL
                        id: item._id || item.id,     // prefer MongoDB _id, fallback to id
                        userID: item.user,
                        primaryType: item.primaryType,
                        secondaryType: item.secondaryType,
                        occasion: item.occasion,
                        color: item.color,
                        width: 800,
                        height: 600
                    }));

                    setPhotos(formattedPhotos);
                }
            } 
            catch (error) {
                // failed to fetch photos
                console.error('Error fetching items:', error);

                // fallback placeholder in case of API error
                setPhotos([{
                    src: 'src/assets/step2.png', // local placeholder image
                    id: 'error-placeholder',
                    userID: 'error-placeholder',
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
}, [props.user, props.outfits, backendUrl, userData]);

    return (
        <Container>
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
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                    slide: { maxWidth: "90%", maxHeight: "90%" }
                }}
            />
        </Container>
    );
}