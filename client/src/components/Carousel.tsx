import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Carousel(props: { photos: Array<{image: string; title: string; subtitle: string}>, onIndexChange?: (index:number)=>void }) {
    const theme = useTheme();
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            dragFree: false,
            align: 'center',
            containScroll: 'trimSnaps',
        },
        []
    );
    
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        // notify parent of index change
        props.onIndexChange?.(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    React.useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    // reinitialize carousel when photos change
    React.useEffect(() => {
        if (emblaApi && props.photos.length > 0) {
            emblaApi.reInit();
            setSelectedIndex(0);
            props.onIndexChange?.(0);
        }
    }, [emblaApi, props.photos.length, props.onIndexChange]);

    const isImageCenter = React.useCallback((index: number) => {
        if (!emblaApi) return false;
        return index === selectedIndex;
    }, [emblaApi, selectedIndex]);

    // show empty message if no photos
    if (props.photos.length === 0) {
        return (
            <Box sx={{ width: '100%', py: 8, textAlign: 'center'}}>
                <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
                    You have not uploaded and clothing items of this type!
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary }}>
                    Go to Closet {'>'} Upload to add some!
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                py: 4,
            }}
        >
            {/* Previous button */}
            <IconButton
                onClick={scrollPrev}
                sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 3,
                    backgroundColor: theme.palette.background.paper,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    }
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>

            {/* Next button */}
            <IconButton
                onClick={scrollNext}
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 3,
                    backgroundColor: theme.palette.background.paper,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                    }
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>

            {/* Carousel container */}
            <Box
                ref={emblaRef}
                sx={{
                    overflow: 'hidden',
                    cursor: 'grab',
                    '&:active': {
                        cursor: 'grabbing',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        py: 2
                    }}
                >
                    {props.photos.map((photo, index) => {
                        const isCenter = isImageCenter(index);
                        return (
                            <Box
                                key={index}
                                sx={{
                                    flex: '0 0 auto',
                                    minWidth: 0,
                                    width: '300px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    px: 2,
                                    transition: 'all 0.3s ease',
                                    transform: isCenter ? 'scale(1.05)' : 'scale(0.95)',
                                    opacity: isCenter ? 1 : 0.7,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '400px',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        border: isCenter 
                                            ? `3px solid ${theme.palette.primary.main}` 
                                            : '3px solid transparent',
                                        boxShadow: isCenter 
                                            ? `0 8px 24px ${theme.palette.primary.main}40` 
                                            : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={photo.image}
                                        alt={photo.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                {isCenter && (
                                    <Box
                                        sx={{
                                            mt: 2,
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Box
                                            component="h3"
                                            sx={{
                                                m: 0,
                                                fontSize: '1.2rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {photo.title}
                                        </Box>
                                        <Box
                                            component="p"
                                            sx={{
                                                m: 0,
                                                mt: 0.5,
                                                fontSize: '0.9rem',
                                                color: theme.palette.text.secondary,
                                            }}
                                        >
                                            {photo.subtitle}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}