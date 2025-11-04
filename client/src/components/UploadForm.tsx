import * as React from 'react';
import Container from '@mui/material/Container';

import { AppContext } from '../context/AppContext';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { BorderClear, CloudUpload } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function UploadForm() {
    const backendUrl = "http://localhost:4000"; //import.meta.env.VITE_BACKEND_URL;

    const [img, setImg] = React.useState<File | null>(null); // keep first file for existing upload flow
    const [loading, setLoading] = React.useState(false);

    const [dragOver, setDragOver] = React.useState(false);
    // support multiple files and previews
    const [files, setFiles] = React.useState<File[]>([]);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [previews, setPreviews] = React.useState<Array<{src: string; name: string}>>([]);

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
        if (event.dataTransfer.files && event.dataTransfer.files.length) {
            const arr = Array.from(event.dataTransfer.files);
            handleFileChange(arr);
        }
    };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const arr = Array.from(event.target.files);
            handleFileChange(arr);
        }
    };

    const handleFileChange = (fileOrFiles: File | File[]) => {
        setLoading(true);
        const arr = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
        setFiles(arr);
        // keep previous single-file upload behaviour by setting img to first file
        setImg(arr[0] ?? null);

        // read all files as data URLs for previews
        const readers = arr.map((file) => {
            return new Promise<{src: string; name: string}>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({ src: reader.result as string, name: file.name });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers)
            .then((results) => {
                setPreviews(results);
            })
            .catch((err) => {
                console.error('Error reading files for preview', err);
            })
            .finally(() => setLoading(false));
    };

    const uploadFile = async (type: string, timestamp: string, signature: string) => {
        // need a null check so img won't be appended if its null in data.append("file", img)
        if (!img) {
            console.error("No file selected");
            return;
        }

        const folder = "image";

        const data = new FormData();
        data.append("file", img);
        // only use upload preset if using unsigned uploads
        data.append("upload_preset", "clothing_preset"); // import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        // data.append("timestamp", timestamp);
        // data.append("signature", signature);
        // data.append("api_key", "152168132218584"); // process.env.CLOUDINARY_API_KEY
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

    const getSignatureForUpload = async (folder: string) => {
        try {
            const res = await axios.post(backendUrl + "/api/sign-upload", { folder });
            return res.data;
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);

            // get signature for image upload
            const { timestamp: imgTimestamp, signature: imgSignature } = await getSignatureForUpload("images");

            const imgUrl = await uploadFile("image", imgTimestamp, imgSignature);

            // send backend api request
            await axios.post(backendUrl + "/api/upload", { imgUrl });

            setImg(null);
            console.log("File upload success!");
            setLoading(false);
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
                borderRadius: 2,
                boxShadow: 6,
            }}
        >
            <Paper
                variant="outlined"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    border: '5px dashed #ffffffff',
                    padding: 5,
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
                                Drag and drop files here or click to select files
                            </Typography>
                        </Box>
                    </label>

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
                </form>
            </Paper>

            {previews.length > 0 && (
                <Box>
                    <Typography variant="h4" sx={{ color: '#ffffff', marginTop: 2 }}> Staged Files: </Typography>
                    <Box display="flex" flexWrap="wrap" gap={2} style={{ marginTop: 24 }}>
                        {previews.map((p, idx) => (
                            <Box key={idx} sx={{ width: '20%' }}>
                                <Box
                                    component="img"
                                    src={p.src}
                                    alt={`Preview ${idx}`}
                                    sx={{ border: '1px solid #ffffffff', padding: 0.5, width: '100%', height: 'auto' }}
                                />
                                <Typography sx={{ color: '#ffffff'}}>{p.name}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

        </Box>
    );
}