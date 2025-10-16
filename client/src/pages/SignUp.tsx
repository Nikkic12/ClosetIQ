import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../themes/AppTheme';
import SignUpForm from '../components/SignUpForm';

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <SignUpForm />
    </AppTheme>
  );
}