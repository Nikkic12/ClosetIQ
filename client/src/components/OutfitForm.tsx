import * as React from 'react';

import { AppContext } from '../context/AppContext';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CloudUpload } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Carousel from './Carousel';

// type photoItem = {
//     src: string,
//     id: string,
//     userID?: string,
//     primaryType: string,
//     secondaryType: string,
//     occasion: string,
//     color: string,
//     width: number,
//     height: number
// };

type photoItem = {
    _id: string;
    userID?: string,
    imgUrl: string;
    primaryType: string;
    secondaryType: string;
    occasion: string;
    color: string;
    gender: string;
};

export default function OutfitForm({ onOutfitCreated }: { onOutfitCreated?: () => void }) {
    const { userData, backendUrl } = React.useContext(AppContext);

    const [loading, setLoading] = React.useState(false);
    const [previews, setPreviews] = React.useState<Array<string | null>>([null, null, null, null]);
    
    // all of the user's clothing items
    const [userClothingItems, setUserClothingItems] = React.useState<Array<photoItem>>([]);

    // data for currently selected clothing item in each field
    const [selectedItems, setSelectedItems] = React.useState<Array<photoItem | null>>([null, null, null, null]);

    const [carouselOpen, setCarouselOpen] = React.useState(false);
    const [carouselFieldIndex, setCarouselFieldIndex] = React.useState<number>(0);
    const [carouselSelectedIndex, setCarouselSelectedIndex] = React.useState<number>(0);
    
    // to keep track of which field is being edited by the user, use fieldIndex variable
    const fieldIndexToPrimaryType = (index: number): string => {
        const mapping: { [key: number]: string } = {
            0: 'hat',
            1: 'top',
            2: 'bottom',
            3: 'shoes'
        };
        return mapping[index] || '';
    };

    // clear previews and selected items
    const clearFields = async (hatField: boolean, topField: boolean, bottomField: boolean, shoesField: boolean) => {
        setPreviews(prev => { 
            const copy = [...prev]; 
            if(hatField) { copy[0] = null; }
            if(topField) { copy[1] = null; }
            if(bottomField) { copy[2] = null; } 
            if(shoesField) { copy[3] = null; } 
            return copy; 
        });
        setSelectedItems(prev => { 
            const copy = [...prev]; 
            if(hatField) { copy[0] = null; }
            if(topField) { copy[1] = null; }
            if(bottomField) { copy[2] = null; } 
            if(shoesField) { copy[3] = null; }
            return copy; 
        });
    }

    // fetch user clothing items
    React.useEffect(() => {
        const fetchUserClothing = async () => {
            try {
                const { data } = await axios.get(backendUrl + "/api/upload/getUserClothing", {
                    withCredentials: true
                });
                const items = data.items || data.data || data;
                
                const formattedPhotos = (Array.isArray(items) ? items : []).map((item: any) => ({
                    _id: item._id || item.id,
                    userID: item.user,
                    imgUrl: item.imgUrl,
                    primaryType: item.primaryType,
                    secondaryType: item.secondaryType,
                    occasion: item.occasion,
                    color: item.color,
                    gender: item.gender
                }));

                // filter to the logged in user's items only
                const userId = userData ? userData.userId : "testuserId";
                const userFiltered = formattedPhotos.filter(item => 
                    item.userID === userId
                );

                setUserClothingItems(userFiltered);
            } 
            catch (error) {
                console.error('Error fetching user clothing:', error);
                setUserClothingItems([]);
            }
        };
        fetchUserClothing();
    }, [backendUrl, userData]);

    // get photos of a certain primaryType based on what field in OutfitForm the user is editing
    const getFilteredPhotoOptions = (fieldIndex: number) => {
        const primaryType = fieldIndexToPrimaryType(fieldIndex);

        // filter by correct primaryType
        const filtered = userClothingItems.filter(item => 
            item.primaryType?.toLowerCase() === primaryType.toLowerCase()
        );
        
        return filtered.map(item => ({
            image: item.imgUrl,
            title: item.secondaryType || 'Clothing Item',
            subtitle: `${item.color} • ${item.occasion}`,
            itemData: item // include full item data
        }));
    };

    const openCarouselFor = (fieldIndex: number) => {
        setCarouselFieldIndex(fieldIndex);
        setCarouselSelectedIndex(0);
        setCarouselOpen(true);
    };

    const handleConfirmCarouselSelection = () => {
        const filteredOptions = getFilteredPhotoOptions(carouselFieldIndex);
        if (filteredOptions.length > 0 && carouselSelectedIndex < filteredOptions.length) {
            const chosen = filteredOptions[carouselSelectedIndex];
            setPreviews(prev => {
                const copy = [...prev];
                copy[carouselFieldIndex] = chosen.image;
                return copy;
            });
            // Store the full item data
            if (chosen.itemData) {
                setSelectedItems(prev => {
                    const copy = [...prev];
                    copy[carouselFieldIndex] = chosen.itemData;
                    return copy;
                });
            }
        }
        setCarouselOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(selectedItems.every(item => item === null)) {
            toast.error("You need at least one item for your outfit!");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // extract ids, allowing null values since making outfits of all fields is optional
            const hat = selectedItems[0]?._id || null;
            const top = selectedItems[1]?._id || null;
            const bottom = selectedItems[2]?._id || null;
            const shoes = selectedItems[3]?._id || null;

            // send backend api request to create an outfit
            await axios.post(backendUrl + "/api/upload/createOutfit", {
                top,
                bottom,
                hat,
                shoes
            }, {
                withCredentials: true
            });
            
            clearFields(true, true, true, true); // clear all fields after outfit upload            
            toast.success("Outfit created successfully!");
            setLoading(false);
            
            // Trigger refresh of outfit gallery
            if (onOutfitCreated) {
                onOutfitCreated();
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: '#7851A9',
                padding: 3,
                borderRadius: 2
            }}
        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} style={{ marginTop: 16 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Hat
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        {!previews[0] && (
                            <Paper
                                variant="outlined"
                                onClick={() => openCarouselFor(0)}
                                sx={{
                                    border: '5px dashed #ffffffff',
                                    padding: 5,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: "transparent",
                                    position: 'relative',
                                }}
                            >

                                <input style={{ display: 'none' }} id="raised-button-file-3" />

                                <label htmlFor="raised-button-file-0" onClick={(e) => e.stopPropagation()}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <IconButton
                                            sx={{
                                                color: "transparent",
                                                backgroundColor: "transparent",
                                                "&:hover": { backgroundColor: "transparent" },
                                                "& .MuiTouchRipple-root": { display: "none" }
                                            }}
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <CloudUpload sx={{ fontSize: 80, color: "white" }} />
                                        </IconButton>
                                        <Typography sx={{ color: "#ffffff", padding: 2 }}>
                                            Click to select clothing item
                                        </Typography>
                                    </Box>
                                </label>
                            </Paper>
                        )}

                        {previews[0] && (
                            <Box
                                sx={{
                                    color: 'white',
                                    '& .MuiFormControlLabel-label': { color: 'white' },
                                    '& .MuiRadio-root': { color: 'white' },
                                    '& .Mui-checked': { color: '#1976d2' }
                                }}
                            >
                                <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                                    Selected Item:
                                </Typography>

                                <Box
                                    component="img"
                                    src={previews[0]}
                                    alt="Image Preview"
                                    sx={{ width: '100%', height: '100' }}
                                />

                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        color: '#7851A9',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => clearFields(true, false, false, false)}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Clothing Info
                        </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Primary Type: {selectedItems[0]?.primaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Secondary Type: {selectedItems[0]?.secondaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Occasion: {selectedItems[0]?.occasion} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Color: {selectedItems[0]?.color} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Gender: {selectedItems[0]?.gender} </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ borderWidth: 1, my: 2}} />

                <Grid container spacing={4} style={{ marginTop: 16 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Top
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        {!previews[1] && (
                            <Paper
                                variant="outlined"
                                onClick={() => openCarouselFor(1)}
                                sx={{
                                    border: '5px dashed #ffffffff',
                                    padding: 5,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: "transparent",
                                    position: 'relative',
                                }}
                            >

                                <input style={{ display: 'none' }} id="raised-button-file-3" />

                                <label htmlFor="raised-button-file-1" onClick={(e) => e.stopPropagation()}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <IconButton
                                            sx={{
                                                color: "transparent",
                                                backgroundColor: "transparent",
                                                "&:hover": { backgroundColor: "transparent" },
                                                "& .MuiTouchRipple-root": { display: "none" }
                                            }}
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <CloudUpload sx={{ fontSize: 80, color: "white" }} />
                                        </IconButton>
                                        <Typography sx={{ color: "#ffffff", padding: 2 }}>
                                            Click to select clothing item
                                        </Typography>
                                    </Box>
                                </label>
                            </Paper>
                        )}

                        {previews[1] && (
                            <Box
                                sx={{
                                    color: 'white',
                                    '& .MuiFormControlLabel-label': { color: 'white' },
                                    '& .MuiRadio-root': { color: 'white' },
                                    '& .Mui-checked': { color: '#1976d2' }
                                }}
                            >
                                <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                                    Selected Item:
                                </Typography>

                                <Box
                                    component="img"
                                    src={previews[1]}
                                    alt="Image Preview"
                                    sx={{ width: '100%', height: 'auto' }}
                                />

                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        color: '#7851A9',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => clearFields(false, true, false, false)}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Clothing Info
                        </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Primary Type: {selectedItems[1]?.primaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Secondary Type: {selectedItems[1]?.secondaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Occasion: {selectedItems[1]?.occasion} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Color: {selectedItems[1]?.color} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Gender: {selectedItems[1]?.gender} </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ borderWidth: 1, my: 2}} />

                <Grid container spacing={4} style={{ marginTop: 16 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Bottom
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        {!previews[2] && (
                            <Paper
                                variant="outlined"
                                onClick={() => openCarouselFor(2)}
                                sx={{
                                    border: '5px dashed #ffffffff',
                                    padding: 5,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: "transparent",
                                    position: 'relative',
                                }}
                            >

                                <input style={{ display: 'none' }} id="raised-button-file-3" />

                                <label htmlFor="raised-button-file-2" onClick={(e) => e.stopPropagation()}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <IconButton
                                            sx={{
                                                color: "transparent",
                                                backgroundColor: "transparent",
                                                "&:hover": { backgroundColor: "transparent" },
                                                "& .MuiTouchRipple-root": { display: "none" }
                                            }}
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <CloudUpload sx={{ fontSize: 80, color: "white" }} />
                                        </IconButton>
                                        <Typography sx={{ color: "#ffffff", padding: 2 }}>
                                            Click to select clothing item
                                        </Typography>
                                    </Box>
                                </label>
                            </Paper>
                        )}

                        {previews[2] && (
                            <Box
                                sx={{
                                    color: 'white',
                                    '& .MuiFormControlLabel-label': { color: 'white' },
                                    '& .MuiRadio-root': { color: 'white' },
                                    '& .Mui-checked': { color: '#1976d2' }
                                }}
                            >
                                <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                                    Selected Item:
                                </Typography>

                                <Box
                                    component="img"
                                    src={previews[2]}
                                    alt="Image Preview"
                                    sx={{ width: '100%', height: 'auto' }}
                                />

                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        color: '#7851A9',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => clearFields(false, false, true, false)}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Clothing Info
                        </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Primary Type: {selectedItems[2]?.primaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Secondary Type: {selectedItems[2]?.secondaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Occasion: {selectedItems[2]?.occasion} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Color: {selectedItems[2]?.color} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Gender: {selectedItems[2]?.gender} </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ borderWidth: 1, my: 2}} />

                <Grid container spacing={4} style={{ marginTop: 16 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Shoes
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        {!previews[3] && (
                            <Paper
                                variant="outlined"
                                onClick={() => openCarouselFor(3)}
                                sx={{
                                    border: '5px dashed #ffffffff',
                                    padding: 5,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: "transparent",
                                    position: 'relative',
                                }}
                            >

                                <input style={{ display: 'none' }} id="raised-button-file-3" />

                                <label htmlFor="raised-button-file-3" onClick={(e) => e.stopPropagation()}>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <IconButton
                                            sx={{
                                                color: "transparent",
                                                backgroundColor: "transparent",
                                                "&:hover": { backgroundColor: "transparent" },
                                                "& .MuiTouchRipple-root": { display: "none" }
                                            }}
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <CloudUpload sx={{ fontSize: 80, color: "white" }} />
                                        </IconButton>
                                        <Typography sx={{ color: "#ffffff", padding: 2 }}>
                                            Click to select clothing item
                                        </Typography>
                                    </Box>
                                </label>
                            </Paper>
                        )}

                        {previews[3] && (
                            <Box
                                sx={{
                                    color: 'white',
                                    '& .MuiFormControlLabel-label': { color: 'white' },
                                    '& .MuiRadio-root': { color: 'white' },
                                    '& .Mui-checked': { color: '#1976d2' }
                                }}
                            >
                                <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                                    Selected Item:
                                </Typography>

                                <Box
                                    component="img"
                                    src={previews[3]}
                                    alt="Image Preview"
                                    sx={{ width: '100%', height: 'auto' }}
                                />

                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        color: '#7851A9',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => clearFields(false, false, false, true)}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Clothing Info
                        </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Primary Type: {selectedItems[3]?.primaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Secondary Type: {selectedItems[3]?.secondaryType} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Occasion: {selectedItems[3]?.occasion} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Color: {selectedItems[3]?.color} </Typography>
                        <Typography sx={{ color: "#ffffff" }}> Gender: {selectedItems[3]?.gender} </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ borderWidth: 1, my: 2}} />

                <Button
                    variant="outlined"
                    loading={loading}
                    type='submit'
                    sx={{
                        backgroundColor: '#ffffff',
                        color: '#7851A9',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                            color: '#7851A9'
                        }
                    }}
                >
                    Upload
                </Button>

                <Button
                    variant="contained"
                    sx = {{ marginLeft: 2 }}
                    onClick={() => clearFields(true, true, true, true)}
                >
                    Clear All
                </Button>
            </form>

            <Dialog open={carouselOpen} onClose={() => setCarouselOpen(false)} maxWidth="lg" fullWidth>
                <DialogContent>
                    <Carousel 
                        photos={getFilteredPhotoOptions(carouselFieldIndex)} 
                        onIndexChange={(i) => setCarouselSelectedIndex(i)}
                    />
                </DialogContent>
                <DialogActions>
                    {getFilteredPhotoOptions(carouselFieldIndex).length != 0 && (
                        <Button 
                            onClick={handleConfirmCarouselSelection} 
                            variant="contained"
                        >
                            Select
                        </Button>
                    )}
                    <Button onClick={() => setCarouselOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}