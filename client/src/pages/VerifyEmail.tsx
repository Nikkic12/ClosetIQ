import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../themes/AppTheme';
import VerifyEmailForm from '../components/VerifyEmailForm';

export default function VerifyEmail(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <VerifyEmailForm />
    </AppTheme>
  );
}
