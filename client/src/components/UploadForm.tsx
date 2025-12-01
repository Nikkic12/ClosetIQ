import * as React from 'react';
import Container from '@mui/material/Container';

import { AppContext } from '../context/AppContext';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CloudUpload } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';

import { toast } from 'react-toastify';

export default function UploadForm() {
    const { backendUrl } = React.useContext(AppContext);

    const [primaryType, setPrimaryType] = React.useState('top');
    const [secondaryType, setSecondaryType] = React.useState('shortsleeves');
    const [occasion, setOccasion] = React.useState('formal');
    const [color, setColor] = React.useState('red');
    const [gender, setGender] = React.useState('mens');

    const [img, setImg] = React.useState<File | null>(null); // needs to not be null (another TypeScript error)
    const [loading, setLoading] = React.useState(false);

    const [dragOver, setDragOver] = React.useState(false);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const handleDragOver = async (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = async (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragOver(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            handleFileChange(event.dataTransfer.files[0]);
        }
    };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleFileChange(event.target.files[0]);
        }
    };

    const handleFileChange = (file: File) => {
        setLoading(true);
        setImg(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setLoading(false);
            setImagePreview(reader.result as string | null);
        };
        reader.readAsDataURL(file);
    };

    const uploadFile = async () => {
        // need a null check so img won't be appended if its null in data.append("file", img)
        if (!img) {
            console.error("No file selected");
            return;
        }

        const folder = "image";

        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "clothing_preset");
        data.append("folder", folder);

        try {
            let cloudName = "dwuugri6p"; // process.env.CLOUDINARY_CLOUD_NAME;
            let resourceType = "image";
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data, {
                withCredentials: false, // need this here because need cookies turned off when sending to cloudinary
            });
            const { secure_url } = res.data;
            console.log(secure_url);
            return secure_url;
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);

            const imgUrl = await uploadFile();

            // send backend api request with all form values
            await axios.post(backendUrl + "/api/upload", {
                imgUrl,
                primaryType,
                secondaryType,
                occasion,  
                color,
                gender
            }, {
                withCredentials: true
            });

            setImg(null);
            setImagePreview(null); // disable image preview after upload
            console.log("File upload success with clothing details!");
            setLoading(false);
            toast.success("Upload successful!");

            window.location.reload();

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
            <Paper
                variant="outlined"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    border: '5px dashed #ffffffff',
                    padding: 4,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: "transparent",
                    position: 'relative',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleChange}
                    />

                    <label htmlFor="raised-button-file">
                        <Box display="flex" flexDirection="column" alignItems="center"padding={4}>
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
                            <Typography sx={{ color: "#ffffff", padding: 2, paddingBottom: 0 }}>
                                Drag and drop files here or click to select files
                            </Typography>
                        </Box>
                    </label>
                </form>
            </Paper>

            {imagePreview && (
                <Box
                    sx={{
                        color: 'white',
                        '& .MuiFormControlLabel-label': { color: 'white' },
                        '& .MuiRadio-root': { color: 'white' },
                        '& .Mui-checked': { color: '#1976d2' }
                    }}
                >
                    <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1, color: '#ffffff' }}>
                        Add Clothing Details:
                    </Typography>
                    <Grid container spacing={4} style={{ marginTop: 16 }}>
                        {/* left column: image preview */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box
                                component="img"
                                src={imagePreview}
                                alt="Image Preview"
                                sx={{ width: '100%', height: 'auto' }}
                            />
                        </Grid>

                        {/* right column: clothing details */}
                        <Grid size={{ xs: 12, sm: 6, md: 8 }}>

                            <form onSubmit={handleSubmit}>
                                <Typography>Primary Type</Typography>
                                <RadioGroup row name="row-radio-buttons-group" value={primaryType} onChange={(e) => setPrimaryType(e.target.value)}>
                                    <FormControlLabel value="top" control={<Radio />} label="Top" />
                                    <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
                                    <FormControlLabel value="hat" control={<Radio />} label="Hat" />
                                    <FormControlLabel value="shoes" control={<Radio />} label="Shoes" />
                                </RadioGroup>

                                <Divider sx={{ borderWidth: 1, my: 2}} />

                                <Typography>Secondary Type</Typography>
                                {primaryType === 'top' && (
                                    <RadioGroup row name="secondary-type" value={secondaryType} onChange={(e) => setSecondaryType(e.target.value)}>
                                        <FormControlLabel value="shortsleeves" control={<Radio />} label="Shortsleeves" />
                                        <FormControlLabel value="longsleeves" control={<Radio />} label="Longsleeves" />
                                        <FormControlLabel value="jacket" control={<Radio />} label="Jacket" />
                                        <FormControlLabel value="collared" control={<Radio />} label="Collared" />
                                    </RadioGroup>
                                )}
                                {primaryType === 'bottom' && (
                                    <RadioGroup row name="secondary-type" value={secondaryType} onChange={(e) => setSecondaryType(e.target.value)}>
                                        <FormControlLabel value="shorts" control={<Radio />} label="Shorts" />
                                        <FormControlLabel value="pants" control={<Radio />} label="Pants" />
                                        <FormControlLabel value="leggings" control={<Radio />} label="Leggings" />
                                        <FormControlLabel value="skirt" control={<Radio />} label="Skirt" />
                                    </RadioGroup>
                                )}
                                {primaryType === 'hat' && (
                                    <RadioGroup row name="secondary-type" value={secondaryType} onChange={(e) => setSecondaryType(e.target.value)}>
                                        <FormControlLabel value="baseball" control={<Radio />} label="Baseball Cap" />
                                        <FormControlLabel value="beanie" control={<Radio />} label="Beanie" />
                                    </RadioGroup>
                                )}
                                {primaryType === 'shoes' && (
                                    <RadioGroup row name="secondary-type" value={secondaryType} onChange={(e) => setSecondaryType(e.target.value)}>
                                        <FormControlLabel value="sneakers" control={<Radio />} label="Sneakers" />
                                        <FormControlLabel value="flipflops" control={<Radio />} label="Flip-flops" />
                                        <FormControlLabel value="slides" control={<Radio />} label="Slides" />
                                        <FormControlLabel value="dressshoes" control={<Radio />} label="Dress Shoes" />
                                    </RadioGroup>
                                )}

                                <Divider sx={{ borderWidth: 1, my: 2}} />

                                <Typography>Occasion</Typography>
                                <RadioGroup row name="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                                    <FormControlLabel value="formal" control={<Radio />} label="Formal" />
                                    <FormControlLabel value="casual" control={<Radio />} label="Casual" />
                                    <FormControlLabel value="athletic" control={<Radio />} label="Athletic" />
                                </RadioGroup>

                                <Divider sx={{ borderWidth: 1, my: 2}} />

                                <Typography>Color</Typography>
                                <RadioGroup row name="color" value={color} onChange={(e) => setColor(e.target.value)}>
                                    <FormControlLabel value="red" control={<Radio />} label="Red" />
                                    <FormControlLabel value="orange" control={<Radio />} label="Orange" />
                                    <FormControlLabel value="yellow" control={<Radio />} label="Yellow" />
                                    <FormControlLabel value="green" control={<Radio />} label="Green" />
                                    <FormControlLabel value="blue" control={<Radio />} label="Blue" />
                                    <FormControlLabel value="pink" control={<Radio />} label="Pink" />
                                    <FormControlLabel value="purple" control={<Radio />} label="Purple" />
                                    <FormControlLabel value="white" control={<Radio />} label="White" />
                                    <FormControlLabel value="brown" control={<Radio />} label="Brown" />
                                    <FormControlLabel value="gray" control={<Radio />} label="Gray" />
                                    <FormControlLabel value="black" control={<Radio />} label="Black" />
                                </RadioGroup>

                                <Divider sx={{ borderWidth: 1, my: 2}} />

                                <Typography>Mens / Womens</Typography>
                                <RadioGroup row name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <FormControlLabel value="mens" control={<Radio />} label="Mens" />
                                    <FormControlLabel value="womens" control={<Radio />} label="Womens" />
                                </RadioGroup>

                                <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center', // center horizontally
                                    gap: 2,                   // space between buttons
                                    mt: 3                     // margin-top for breathing room
                                }}
                                >
                                    <Button
                                        loading={loading}
                                        type='submit'
                                        sx={{
                                            backgroundColor: '#0e0909ff',
                                            color: '#faf9fbff',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',  // slightly darker white on hover
                                                color: '#7851A9'
                                            }
                                        }}
                                    >
                                        Upload
                                    </Button>
                                </Box>
                            </form>

                        </Grid>
                    </Grid>
                </Box>
                
            )}

        </Box>
    );
}