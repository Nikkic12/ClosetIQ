import * as React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';



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
    const [openLightbox, setOpenLightbox] = useState<{ outfitIndex: number; photoIndex: number } | null>(null);

    const [photos, setPhotos] = useState<photoItem[]>([]);
    const [outfits, setOutfits] = useState<photoItem[][]>([]);

    const { userData, backendUrl } = React.useContext(AppContext);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
           
            await axios.post(backendUrl + "/api/upload/uploadFromCatalogue", {
                objectId: photos[index].id
            }, {
                withCredentials: true
            });

            console.log("File upload success with clothing details!");
            toast.success("Upload successful!");
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // if user prop is true, fill the gallery with user photos
                if (props.user) {
                    // if outfits prop is true, fill the gallery with outfit photos
                    if (props.outfits) {
                        console.log("Fetching outfit photos");

                        const { data } = await axios.get(backendUrl + "/api/upload/getUserOutfits");
                        const items = data.items || data.data || data;

                        console.log('User outfits:', items);

                        // filter to the logged in user's outfits only
                        const userId = userData ? userData.userId : "testuserId";
                        const userOutfits = (Array.isArray(items) ? items : []).filter((outfit: any) => {
                            // outfit.user can be an ObjectId or a populated user object
                            const outfitUserId = outfit.user?._id || outfit.user;
                            return outfitUserId === userId || outfitUserId?.toString() === userId;
                        });

                        // transform outfits data into 2D array
                        const formattedOutfits = userOutfits.map((outfit: any) => {
                            const outfitItems: photoItem[] = [];

                            // add each clothing item if it exists
                            if (outfit.hat) {
                                outfitItems.push({
                                    src: outfit.hat.imgUrl,
                                    id: outfit.hat._id || outfit.hat.id,
                                    userID: outfit.hat.user,
                                    primaryType: outfit.hat.primaryType,
                                    secondaryType: outfit.hat.secondaryType,
                                    occasion: outfit.hat.occasion,
                                    color: outfit.hat.color,
                                    width: 800,
                                    height: 600
                                });
                            }

                            if (outfit.top) {
                                outfitItems.push({
                                    src: outfit.top.imgUrl,
                                    id: outfit.top._id || outfit.top.id,
                                    userID: outfit.top.user,
                                    primaryType: outfit.top.primaryType,
                                    secondaryType: outfit.top.secondaryType,
                                    occasion: outfit.top.occasion,
                                    color: outfit.top.color,
                                    width: 800,
                                    height: 600
                                });
                            }

                            if (outfit.bottom) {
                                outfitItems.push({
                                    src: outfit.bottom.imgUrl,
                                    id: outfit.bottom._id || outfit.bottom.id,
                                    userID: outfit.bottom.user,
                                    primaryType: outfit.bottom.primaryType,
                                    secondaryType: outfit.bottom.secondaryType,
                                    occasion: outfit.bottom.occasion,
                                    color: outfit.bottom.color,
                                    width: 800,
                                    height: 600
                                });
                            }

                            if (outfit.shoes) {
                                outfitItems.push({
                                    src: outfit.shoes.imgUrl,
                                    id: outfit.shoes._id || outfit.shoes.id,
                                    userID: outfit.shoes.user,
                                    primaryType: outfit.shoes.primaryType,
                                    secondaryType: outfit.shoes.secondaryType,
                                    occasion: outfit.shoes.occasion,
                                    color: outfit.shoes.color,
                                    width: 800,
                                    height: 600
                                });
                            }

                            return outfitItems;
                        });

                        // set the outfits array here
                        setOutfits(formattedOutfits);
                    }

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
                }
                else {
                    // if no props given, default to catalogue photos
                    console.log("Fetching catalogue photos");

                    const { data } = await axios.get(backendUrl + "/api/upload/getCatalogueItems");
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
            {/* display catalogue */}
            {!props.user && !props.outfits && (
                <>
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
                        toolbar={{
                            buttons: [
                                <Button key="my-button" onClick={handleSubmit} type="button" className="yarl__button" sx={{
                                    background: '#7851A9',
                                    backgroundImage: 'none',
                                    color: '#fff',
                                }}>
                                    Add To Closet 
                                </Button>,
                                "close",
                                
                            ],
                        }}
                        styles={{
                            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                            slide: { maxWidth: "90%", maxHeight: "90%" }
                        }}

                    />

                </>
            )}

            {/* display user uploads */}
            {props.user && !props.outfits && (
                <>
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

                </>
            )}

            {/* loop through outfits array and make a separate gallery for each outfit */}
            {props.outfits && outfits.map((outfit, i) => (
                <React.Fragment key={i}>
                    <h3>Outfit #{i + 1}:</h3>

                    <RowsPhotoAlbum
                        photos={outfit}
                        targetRowHeight={150}
                        onClick={({ index }) => setOpenLightbox({ outfitIndex: i, photoIndex: index })}
                    />

                    <Lightbox
                        slides={outfit}
                        open={openLightbox?.outfitIndex === i && openLightbox.photoIndex >= 0}
                        index={openLightbox?.outfitIndex === i ? openLightbox.photoIndex : 0}
                        close={() => setOpenLightbox(null)}
                        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                        carousel={{
                            finite: true,
                            imageFit: "contain",
                            spacing: 0
                        }}
                        styles={{
                            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
                            slide: { maxWidth: "90%", maxHeight: "90%" }
                        }}
                    />
                </React.Fragment>
            ))}
        </Container>
    );
}