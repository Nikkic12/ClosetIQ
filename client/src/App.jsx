import { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './website/pages/Home'
import About from './website/pages/About'
import Login from './website/pages/Login'
import NotFound from './website/pages/NotFound'

function App() {
  // Express backend stuff
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits); // store the fruits into the use state array
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <h3>Backend Data:</h3>
      {array.map((fruit, index) => (
        <div key={index}>
          <p>{fruit}</p>
          <br></br>
        </div>
      ))}

    </>
  )
}

export default App
