import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ColorModeSelect from '../themes/ColorModeSelect';

import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const VerifyEmailFormContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function OtpForm() {
    // setup navigate, get app context
    const navigate = useNavigate();
    axios.defaults.withCredentials = true; // send API req with cookies
    const { backendUrl, isLoggedIn, userData, getUserData } = React.useContext(AppContext);
    
    const [otp, setOtp] = React.useState('');

    const [otpError, setOtpError] = React.useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const { data } = await axios.post(backendUrl + "/api/auth/verify-account", { otp });

            if (data.success) {
                toast.success(data.message);
                getUserData();
                navigate("/profile");
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            const err = error as any;
            toast.error(err.message);
        }
    };

    // navigate back to profile if a user goes to the verify email page and their account is already verified
    React.useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/profile")
    }, [isLoggedIn, userData]);

    const validateInputs = () => {
        const otp1 = document.getElementById('otp-1') as HTMLInputElement;
        const otp2 = document.getElementById('otp-2') as HTMLInputElement;
        const otp3 = document.getElementById('otp-3') as HTMLInputElement;
        const otp4 = document.getElementById('otp-4') as HTMLInputElement;
        const otp5 = document.getElementById('otp-5') as HTMLInputElement;
        const otp6 = document.getElementById('otp-6') as HTMLInputElement;

        const otpValue = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;

        let isValid = true;

        // check if otp exists / is just made of numbers
        if (otpValue.length != 6) {
            setOtpError(true);
            setOtpErrorMessage('One or more fields are empty');
            isValid = false;
        }
        else if (!/^\d+$/.test(otpValue)) {
            setOtpError(true);
            setOtpErrorMessage('One or more fields contains something other than a number');
            isValid = false;
        }
        else {
            setOtpError(false);
            setOtpErrorMessage('');
            setOtp(otpValue); // store value of otp in this useState so you can access it in handleSubmit
        }

        return isValid;
    };

    // move cursor to the next box
    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>, nextFieldId: string | null) => {
        const value = event.target.value;
        if (value.length === 1 && nextFieldId) {
            const nextField = document.getElementById(nextFieldId) as HTMLInputElement;
            if (nextField) {
                nextField.focus();
            }
        }
    };

    // move cursor to previous box if backspace pressed
    const handleOtpKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, prevFieldId: string | null) => {
        if (event.key === 'Backspace') {
            const currentField = event.target as HTMLInputElement;
            // if the current field is empty and backspace is pressed, go to previous field
            if (currentField.value === '' && prevFieldId) {
                const prevField = document.getElementById(prevFieldId) as HTMLInputElement;
                if (prevField) {
                    prevField.focus();
                }
            }
        }
    };

    // allow pasting across boxes
    const handleOtpPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text').trim();

        // only paste if you have 6 characters on clipboard
        if (pastedData.length === 6) {
            for (let i = 0; i < 6; i++) {
                const field = document.getElementById(`otp-${i + 1}`) as HTMLInputElement;
                if (field) {
                    field.value = pastedData[i];
                }
            }
            // Focus the last field after pasting
            const lastField = document.getElementById('otp-6') as HTMLInputElement;
            if (lastField) {
                lastField.focus();
            }
        }
    };

    return (
        <VerifyEmailFormContainer direction="column" justifyContent="space-between">
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <Card variant="outlined">
            <img 
              src="/src/assets/closetiq_logo.png"
              alt="ClosetIQ Logo"
              style={{ width: 150, marginLeft: -6 }} //16 
            />
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Verify Email
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="otp">Input the One-Time Password sent to your email</FormLabel>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}
                            onPaste={handleOtpPaste}
                        >
                            <TextField
                                id="otp-1"
                                type="text"
                                name="otp-1"
                                placeholder="•"
                                autoFocus
                                required
                                variant="outlined"
                                onChange={(e) => handleOtpChange(e as React.ChangeEvent<HTMLInputElement>, 'otp-2')}
                                onKeyDown={(e) => handleOtpKeyDown(e as React.KeyboardEvent<HTMLInputElement>, null)}
                                inputProps={{ maxLength: 1 }}
                                sx={{ width: '56px', '& input': { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' } }}
                            />
                            <TextField
                                id="otp-2"
                                type="text"
                                name="otp-2"
                                placeholder="•"
                                required
                                variant="outlined"
                                onChange={(e) => handleOtpChange(e as React.ChangeEvent<HTMLInputElement>, 'otp-3')}
                                onKeyDown={(e) => handleOtpKeyDown(e as React.KeyboardEvent<HTMLInputElement>, 'otp-1')}
                                inputProps={{ maxLength: 1 }}
                                sx={{ width: '56px', '& input': { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' } }}
                            />
                            <TextField
                                id="otp-3"
                                type="text"
                                name="otp-3"
                                placeholder="•"
                                required
                                variant="outlined"
                                onChange={(e) => handleOtpChange(e as React.ChangeEvent<HTMLInputElement>, 'otp-4')}
                                onKeyDown={(e) => handleOtpKeyDown(e as React.KeyboardEvent<HTMLInputElement>, 'otp-2')}
                                inputProps={{ maxLength: 1 }}
                                sx={{ width: '56px', '& input': { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' } }}
                            />
                            <TextField
                                id="otp-4"
                                type="text"
                                name="otp-4"
                                placeholder="•"
                                required
                                variant="outlined"
                                onChange={(e) => handleOtpChange(e as React.ChangeEvent<HTMLInputElement>, 'otp-5')}
                                onKeyDown={(e) => handleOtpKeyDown(e as React.KeyboardEvent<HTMLInputElement>, 'otp-3')}
                                inputProps={{ maxLength: 1 }}
                                sx={{ width: '56px', '& input': { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' } }}
                            />
                            <TextField
                                id="otp-5"
                                type="text"
                                name="otp-5"
                                placeholder="•"
                                required
                                variant="outlined"
                                onChange={(e) => handleOtpChange(e as React.ChangeEvent<HTMLInputElement>, 'otp-6')}
                                onKeyDown={(e) => handleOtpKeyDown(e as React.KeyboardEvent<HTMLInputElement>, 'otp-4')}
                                inputProps={{ maxLength: 1 }}
                                sx={{ width: '56px', '& input': { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' } }}
                            />
                            <TextField
                                id="otp-6"
                                type="text"
                                name="otp-6"
                                placeholder="•"
                                required
                                variant="outlined"
                                onChange={(e) => handleOtpChange(e as React.ChangeEvent<HTMLInputElement>, null)}
                                onKeyDown={(e) => handleOtpKeyDown(e as React.KeyboardEvent<HTMLInputElement>, 'otp-5')}
                                inputProps={{ maxLength: 1 }}
                                sx={{ width: '56px', '& input': { textAlign: 'center', fontSize: '24px', fontWeight: 'bold' } }}
                            />
                        </Box>
                        {otpError && (
                            <Typography color="error" sx={{ mt: 1, fontSize: '0.875rem' }}>
                                {otpErrorMessage}
                            </Typography>
                        )}
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth 
                        onClick={validateInputs}
                        sx={{
                            backgroundColor: '#7851A9',
                            color: '#fff',
                            border: 'none',
                            boxShadow: 'none',
                            outline: 'none',
                            '&:hover': {
                              backgroundColor: '#6A4799',
                              boxShadow: 'none',
                            },
                          }}
                    >
                        Submit
                    </Button>
                </Box>
            </Card>
        </VerifyEmailFormContainer>
    );
}