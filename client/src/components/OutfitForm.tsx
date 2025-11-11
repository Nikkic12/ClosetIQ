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

export default function UploadForm() {
    const backendUrl = "http://localhost:4000"; //import.meta.env.VITE_BACKEND_URL;

    const [img, setImg] = React.useState<File | null>(null); // needs to not be null (another TypeScript error)
    const [loading, setLoading] = React.useState(false);
    const [dragOver, setDragOver] = React.useState(false);

    // separate preview for each of the four selection fields: [hat, top, bottom, shoes]
    const [previews, setPreviews] = React.useState<Array<string | null>>([null, null, null, null]);
    
    // store full clothing item data for each field
    const [selectedItems, setSelectedItems] = React.useState<Array<{
        _id: string;
        imgUrl: string;
        primaryType: string;
        secondaryType: string;
        occasion: string;
        color: string;
        gender: string;
    } | null>>([null, null, null, null]);

    // carousel modal state
    const [carouselOpen, setCarouselOpen] = React.useState(false);
    const [carouselFieldIndex, setCarouselFieldIndex] = React.useState<number>(0);
    const [carouselSelectedIndex, setCarouselSelectedIndex] = React.useState<number>(0);

    // user's clothing items
    const [userClothingItems, setUserClothingItems] = React.useState<Array<{
        _id: string;
        imgUrl: string;
        primaryType: string;
        secondaryType: string;
        occasion: string;
        color: string;
        gender: string;
    }>>([]);

    // Map field index to primaryType
    const fieldIndexToPrimaryType = (index: number): string => {
        const mapping: { [key: number]: string } = {
            0: 'hat',
            1: 'top',
            2: 'bottom',
            3: 'shoes'
        };
        return mapping[index] || '';
    };

    // Map field index to display name
    const fieldIndexToDisplayName = (index: number): string => {
        const mapping: { [key: number]: string } = {
            0: 'Hats',
            1: 'Tops',
            2: 'Bottoms',
            3: 'Shoes'
        };
        return mapping[index] || 'Items';
    };

    // Fetch user's clothing items
    React.useEffect(() => {
        const fetchUserClothing = async () => {
            try {
                const { data } = await axios.get(backendUrl + "/api/upload/getUserClothing", {
                    withCredentials: true
                });
                const items = data.items || data.data || data;
                setUserClothingItems(Array.isArray(items) ? items : []);
            } catch (error) {
                console.error('Error fetching user clothing:', error);
                setUserClothingItems([]);
            }
        };
        fetchUserClothing();
    }, [backendUrl]);

    // Get filtered photo options based on field index
    const getFilteredPhotoOptions = (fieldIndex: number) => {
        const primaryType = fieldIndexToPrimaryType(fieldIndex);
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

    const uploadOutfit = async () => {
        

        // TODO implement outfit upload functionality


    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);


            // TODO implement outfit upload functionality
            

            toast.success("Upload successful!");
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: dragOver ? '#bd94eeff' : '#7851A9',
                padding: 3,
                borderRadius: 2
            }}
        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} style={{ marginTop: 16 }}>
                    {/* left column */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Hat
                        </Typography>
                    </Grid>

                    {/* middle column */}
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
                                            backgroundColor: '#f5f5f5',  // slightly darker white on hover
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => {
                                        setPreviews(prev => { const copy = [...prev]; copy[0] = null; return copy; });
                                        setSelectedItems(prev => { const copy = [...prev]; copy[0] = null; return copy; });
                                    }}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    {/* right column */}
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
                    {/* left column */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Top
                        </Typography>
                    </Grid>

                    {/* middle column */}
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
                                            backgroundColor: '#f5f5f5',  // slightly darker white on hover
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => {
                                        setPreviews(prev => { const copy = [...prev]; copy[1] = null; return copy; });
                                        setSelectedItems(prev => { const copy = [...prev]; copy[1] = null; return copy; });
                                    }}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    {/* right column */}
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
                    {/* left column */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Bottom
                        </Typography>
                    </Grid>

                    {/* middle column */}
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
                                            backgroundColor: '#f5f5f5',  // slightly darker white on hover
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => {
                                        setPreviews(prev => { const copy = [...prev]; copy[2] = null; return copy; });
                                        setSelectedItems(prev => { const copy = [...prev]; copy[2] = null; return copy; });
                                    }}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    {/* right column */}
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
                    {/* left column */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                            Shoes
                        </Typography>
                    </Grid>

                    {/* middle column */}
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
                                            backgroundColor: '#f5f5f5',  // slightly darker white on hover
                                            color: '#7851A9'
                                        }
                                    }}
                                    onClick={() => {
                                        setPreviews(prev => { const copy = [...prev]; copy[3] = null; return copy; });
                                        setSelectedItems(prev => { const copy = [...prev]; copy[3] = null; return copy; });
                                    }}
                                >
                                    Change Item
                                </Button>
                            </Box>
                        )}
                    </Grid>

                    {/* right column */}
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
                            backgroundColor: '#f5f5f5',  // slightly darker white on hover
                            color: '#7851A9'
                        }
                    }}
                >
                    Upload
                </Button>

                <Button
                    variant="contained"
                    sx = {{ marginLeft: 2 }}
                    onClick={() => {
                        setPreviews(prev => { const copy = [...prev]; copy[0] = null;copy[1] = null;copy[2] = null; copy[3] = null; return copy; });
                        setSelectedItems(prev => { const copy = [...prev]; copy[0] = null;copy[1] = null;copy[2] = null; copy[3] = null; return copy; });
                    }}
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
                    <Button 
                        onClick={handleConfirmCarouselSelection} 
                        variant="contained"
                        disabled={getFilteredPhotoOptions(carouselFieldIndex).length === 0}
                    >
                        Select
                    </Button>
                    <Button onClick={() => setCarouselOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}