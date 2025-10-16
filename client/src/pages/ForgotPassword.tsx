import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../themes/AppTheme';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

export default function ForgotPassword(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <ForgotPasswordForm />
    </AppTheme>
  );
}
