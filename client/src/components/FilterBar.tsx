import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

export default function FilterBar(props: { filters: any, setFilters: (f: any) => void }) {
    const { filters, setFilters } = props;

    const primaryOptions = ['', 'top', 'bottom', 'hat', 'shoes'];
    const occasionOptions = ['', 'formal', 'casual', 'athletic'];
    const colorOptions = ['', 'red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple', 'white', 'brown', 'gray', 'black'];
    const genderOptions = ['', 'mens', 'womens'];

    const secondaryMap: Record<string, string[]> = {
        top: ['', 'shortsleeves', 'longsleeves', 'jacket', 'collared'],
        bottom: ['', 'shorts', 'pants', 'leggings', 'skirt'],
        hat: ['', 'baseball', 'beanie'],
        shoes: ['', 'sneakers', 'flipflops', 'slides', 'dressshoes']
    };

    const handleChange = (key: string, value: string) => {
        // if primaryType changes, reset secondaryType
        if (key === 'primaryType') {
            setFilters({ ...filters, primaryType: value, secondaryType: '' });
        } else {
            setFilters({ ...filters, [key]: value });
        }
    };

    const resetFilters = () => {
        setFilters({ primaryType: '', secondaryType: '', occasion: '', color: '', gender: '' });
    };

    const secondaryOptions = filters.primaryType && filters.primaryType !== '' ? secondaryMap[filters.primaryType] || [''] : [''];

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120, 
                // label
                '& .MuiInputLabel-root': { color: '#6A4799' }, // gray-500
                '& .MuiInputLabel-root.Mui-focused': { color: '#5b84dcff' }, // gray-900

                // outlined border
                '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db', // gray-300
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9ca3af', // gray-400
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1', // indigo-500
                borderWidth: 2,
                },
                // dropdown icon
                '& .MuiSelect-icon': {
                color: '#6A4799',
                },
            }}>
            <InputLabel id="primary-label">Type</InputLabel>
            <Select 
                MenuProps={{
                    PaperProps: { sx: { bgcolor: '#fff', border: '1px solid #6A4799' } },
                    sx: {
                    '&& .MuiMenuItem-root.Mui-selected': {
                        backgroundColor: '#6A4799 !important', // selected fill
                        color: '#ffffffff',
                    },
                    '&& .MuiMenuItem-root.Mui-selected.Mui-focusVisible': {
                        backgroundColor: '#583e7dffff !important',
                    },
                    },
                }}
                labelId="primary-label"
                value={filters.primaryType || ''}
                label="Type"
                onChange={(e) => handleChange('primaryType', e.target.value as string)}
            >
                <MenuItem value="">None</MenuItem>
                {primaryOptions.filter(opt => opt).map(opt => <MenuItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>)}
            </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140, 
                // label
                '& .MuiInputLabel-root': { color: '#6A4799' }, // gray-500
                '& .MuiInputLabel-root.Mui-focused': { color: '#5b84dcff' }, // gray-900

                // outlined border
                '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db', // gray-300
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9ca3af', // gray-400
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1', // indigo-500
                borderWidth: 2,
                },
                // dropdown icon
                '& .MuiSelect-icon': {
                color: '#6A4799',
                },
            }}>
            <InputLabel id="secondary-label">Subtype</InputLabel>
            <Select
                MenuProps={{
                    PaperProps: { sx: { bgcolor: '#fff', border: '1px solid #6A4799' } },
                    sx: {
                    '&& .MuiMenuItem-root.Mui-selected': {
                        backgroundColor: '#6A4799 !important', // selected fill
                        color: '#ffffffff',
                    },
                    '&& .MuiMenuItem-root.Mui-selected.Mui-focusVisible': {
                        backgroundColor: '#583e7dffff !important',
                    },
                    },
                }}
                labelId="secondary-label"
                value={filters.secondaryType || ''}
                label="Subtype"
                onChange={(e) => handleChange('secondaryType', e.target.value as string)}
                disabled={filters.primaryType === ''}
            >
            <MenuItem value="">None</MenuItem>
            {secondaryOptions.filter(opt => opt).map(opt => <MenuItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>)}
            </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120, 
                // label
                '& .MuiInputLabel-root': { color: '#6A4799' }, // gray-500
                '& .MuiInputLabel-root.Mui-focused': { color: '#5b84dcff' }, // gray-900

                // outlined border
                '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db', // gray-300
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9ca3af', // gray-400
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1', // indigo-500
                borderWidth: 2,
                },
                // dropdown icon
                '& .MuiSelect-icon': {
                color: '#6A4799',
                },
            }}>
            <InputLabel id="occasion-label">Occasion</InputLabel>
            <Select 
                MenuProps={{
                    PaperProps: { sx: { bgcolor: '#fff', border: '1px solid #6A4799' } },
                    sx: {
                    '&& .MuiMenuItem-root.Mui-selected': {
                        backgroundColor: '#6A4799 !important', // selected fill
                        color: '#ffffffff',
                    },
                    '&& .MuiMenuItem-root.Mui-selected.Mui-focusVisible': {
                        backgroundColor: '#583e7dffff !important',
                    },
                    },
                }}
                labelId="occasion-label"
                value={filters.occasion || ''}
                label="Occasion"
                onChange={(e) => handleChange('occasion', e.target.value as string)}
            >
            <MenuItem value="">None</MenuItem>
            {occasionOptions.filter(opt => opt).map(opt => <MenuItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>)}
            </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120,
                // label
                '& .MuiInputLabel-root': { color: '#6A4799' }, // gray-500
                '& .MuiInputLabel-root.Mui-focused': { color: '#5b84dcff' }, // gray-900

                // outlined border
                '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db', // gray-300
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9ca3af', // gray-400
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1', // indigo-500
                borderWidth: 2,
                },
                // dropdown icon
                '& .MuiSelect-icon': {
                color: '#6A4799',
            },}}>
            <InputLabel id="color-label">Color</InputLabel>
            <Select
                MenuProps={{
                    PaperProps: { sx: { bgcolor: '#fff', border: '1px solid #6A4799' } },
                    sx: {
                    '&& .MuiMenuItem-root.Mui-selected': {
                        backgroundColor: '#6A4799 !important', // selected fill
                        color: '#ffffffff',
                    },
                    '&& .MuiMenuItem-root.Mui-selected.Mui-focusVisible': {
                        backgroundColor: '#583e7dffff !important',
                    },
                    },
                }}
                labelId="color-label"
                value={filters.color || ''}
                label="Color"
                onChange={(e) => handleChange('color', e.target.value as string)}
            >
            <MenuItem value="">None</MenuItem>
            {colorOptions.filter(opt => opt).map(opt => <MenuItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>)}
            </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120, 
                // label
                '& .MuiInputLabel-root': { color: '#6A4799' }, // gray-500
                '& .MuiInputLabel-root.Mui-focused': { color: '#5b84dcff' }, // gray-900

                // outlined border
                '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d1d5db', // gray-300
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#9ca3af', // gray-400
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6366f1', // indigo-500
                borderWidth: 2,
                },
                // dropdown icon
                '& .MuiSelect-icon': {
                color: '#6A4799',
                },
            }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
                MenuProps={{
                    PaperProps: { sx: { bgcolor: '#fff', border: '1px solid #6A4799' } },
                    sx: {
                    '&& .MuiMenuItem-root.Mui-selected': {
                        backgroundColor: '#6A4799 !important', // selected fill
                        color: '#ffffffff',
                    },
                    '&& .MuiMenuItem-root.Mui-selected.Mui-focusVisible': {
                        backgroundColor: '#583e7dffff !important',
                    },
                    },
                }}
                labelId="gender-label"
                value={filters.gender || ''}
                label="Gender"
                onChange={(e) => handleChange('gender', e.target.value as string)}
            >
            <MenuItem value="">None</MenuItem>
            {genderOptions.filter(opt => opt).map(opt => <MenuItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</MenuItem>)}
            </Select>
            </FormControl>
            <Button onClick={resetFilters} sx={{
                backgroundColor: '#7851A9',
                color: '#ffffffff',
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
                '&:hover': {
                backgroundColor: '#6A4799',
                boxShadow: 'none',
                },
            }} color="primary" variant="text" size="small">
                Clear
            </Button>
        </Box>
    );
}
