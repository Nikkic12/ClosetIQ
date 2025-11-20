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

const ForgotPasswordFormContainer = styled(Stack)(({ theme }) => ({
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

export default function ForgotPasswordForm() {
    // setup navigate, get app context
    const navigate = useNavigate();
    axios.defaults.withCredentials = true; // send API req with cookies
    const { backendUrl } = React.useContext(AppContext);

    const [email, setEmail] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [otpError, setOtpError] = React.useState(false);
    const [otpErrorMessage, setOtpErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    const [isEmailSent, setIsEmailSent] = React.useState(false);
    const [isOtpSubmitted, setIsOtpSubmitted] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if(!isEmailSent) {
                // user is on the email form
                const { data } = await axios.post(backendUrl + "/api/auth/send-reset-otp", { email });
                if (data.success) {
                    toast.success(data.message);
                    setIsEmailSent(true);
                }
                else {
                    toast.error(data.message);
                }
            }
            else if(isEmailSent && !isOtpSubmitted) {
                // user is on the otp form
                const { data } = await axios.post(backendUrl + "/api/auth/verify-account-reset-password", { email, otp });
                if (data.success) {
                    toast.success(data.message);
                    setIsOtpSubmitted(true);
                }
                else {
                    toast.error(data.message);
                }
                setIsOtpSubmitted(true);
            }
            else if(isEmailSent && isOtpSubmitted) {
                // user is on the new password form
                // password is undefined, so I added these two lines:
                const passwordInput = document.getElementById('password') as HTMLInputElement;
                const passwordValue = passwordInput.value;

                // fix for the error where new password form does not work
                const { data } = await axios.post(backendUrl + "/api/auth/reset-password", { 
                    email, 
                    otp, 
                    newPassword: passwordValue 
                });
                if (data.success) {
                    toast.success(data.message);
                    // reset flow after successful password reset
                    setIsOtpSubmitted(false);
                    setIsEmailSent(false);
                    navigate('/signin');
                }
                else {
                    toast.error(data.message);
                }
            }
            else {
                toast.error("In handleSubmit(), isEmailSent and isOtpSubmitted booleans are incorrect");
            }
        }
        catch(error) {
            const err = error as any;
            toast.error(err.message);
        }
    };

    const validateInputs = () => {
        let isValid = true;

        if(!isEmailSent) {
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const emailValue = emailInput.value;

            if (!emailInput.value || !/\S+@\S+\.\S+/.test(emailInput.value)) {
                setEmailError(true);
                setEmailErrorMessage('Please enter a valid email address.');
                isValid = false;
            } 
            else {
                setEmailError(false);
                setEmailErrorMessage('');
                setEmail(emailValue);
            }
        }
        else if(isEmailSent && !isOtpSubmitted) {
            const otp1 = document.getElementById('otp-1') as HTMLInputElement;
            const otp2 = document.getElementById('otp-2') as HTMLInputElement;
            const otp3 = document.getElementById('otp-3') as HTMLInputElement;
            const otp4 = document.getElementById('otp-4') as HTMLInputElement;
            const otp5 = document.getElementById('otp-5') as HTMLInputElement;
            const otp6 = document.getElementById('otp-6') as HTMLInputElement;
            const otpValue = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
            
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
                setOtp(otpValue);
            }
        }
        else if(isEmailSent && isOtpSubmitted) {
            const passwordInput = document.getElementById('password') as HTMLInputElement;
            const passwordValue = passwordInput.value;

            if (!passwordInput.value || passwordInput.value.length < 6) {
                setPasswordError(true);
                setPasswordErrorMessage('Password must be at least 6 characters long.');
                isValid = false;
            } 
            else {
                setPasswordError(false);
                setPasswordErrorMessage('');
                setPassword(passwordValue);
            }
        }
        else {
            toast.error("In validateInputs(), isEmailSent and isOtpSubmitted booleans are incorrect");
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
        <ForgotPasswordFormContainer direction="column" justifyContent="space-between">
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            {!isEmailSent && (
                <Card variant="outlined">
                    <img 
                        src="./public/closetiq_logo.png"
                        alt="ClosetIQ Logo"
                        style={{ width: 150, marginLeft: -9, marginRight: -1 }} //16 
                        />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Reset Password 
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
                            <FormLabel htmlFor="email">Enter your registered email address</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                            />
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
            )}
            {isEmailSent && !isOtpSubmitted && (
                <Card variant="outlined">
                    <img 
                        src="./public/closetiq_logo.png"
                        alt="ClosetIQ Logo"
                        style={{ height: 55, marginLeft: 5, marginRight: -1 }} //16 
                        />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Reset Password OTP
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
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Submit
                        </Button>
                    </Box>
                </Card>
            )}
            {isEmailSent && isOtpSubmitted && (
                <Card variant="outlined">
                    <img 
                        src="./public/closetiq_logo.png"
                        alt="ClosetIQ Logo"
                        style={{ height: 55, marginLeft: 5, marginRight: -1 }} //16 
                        />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        New Password
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
                            <FormLabel htmlFor="password">Enter a new password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                type="password"
                                id="password"
                                placeholder="••••••"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs} 
                        >
                            Submit
                        </Button>
                    </Box>
                </Card>
            )}
        </ForgotPasswordFormContainer>
    );
}