import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import all the website's pages
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Closet from './pages/Closet'
import TryOn from './pages/TryOn'
import Catalogue from './pages/Catalogue'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// login system
import { AppContextProvider } from './context/AppContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      
      {/* Set up react router dom */}
      <BrowserRouter>
        <AppContextProvider>
          <ToastContainer />
          <Routes>
            <Route>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/closet" element={<Closet />} />
              <Route path="/tryon" element={<TryOn />} />
              <Route path="/catalogue" element={<Catalogue/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </BrowserRouter>

    </>
  )
}

export default App
