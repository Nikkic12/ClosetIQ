import { createTheme } from "@mui/material";

// Override primary and secondary color defaults
const theme = createTheme({
    palette: {
        primary: {
            main: '#1f274eff'
        },
        secondary: {
            main: '#242424'
        }
    }
})

export default theme