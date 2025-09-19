import '@fontsource/roboto';
// import MaterialUI component Container
import { Container } from "@mui/material"

import Navbar from "./components/Navbar/Navbar.jsx"
import Hero from "./components/Hero/Hero.jsx"
import theme from "./assets/theme.js"
import { ThemeProvider } from '@mui/material'

import './App.css'

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Hero />
      </ThemeProvider>
    </>
  )
}

export default App
