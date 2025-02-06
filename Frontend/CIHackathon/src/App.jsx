import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Home from "./Components/Home"; 
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Finance from './Components/Finance'
import Product from './Components/Product'
import { Toaster } from "react-hot-toast";
import Addproduct from './Components/Addproduct'

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  useEffect(() => {
    const userProfile = Cookies.get('user_profile');
    setIsAuthenticated(!!userProfile); 
  }, []);

  return (
    <>
      <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} /> 
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} /> 
      <Route path="/finance" element={isAuthenticated ? <Finance /> : <Navigate to="/" />} /> 
      <Route path="/market" element={isAuthenticated ? <Marketplace/> : <Navigate to="/" />} /> 
      <Route path="/product" element={isAuthenticated ? <Product/> : <Navigate to="/" />} /> 
      <Route path="/addproduct" element={isAuthenticated ? <Addproduct/> : <Navigate to="/" />} /> 
      <Route path="/register" element={<Registration />} />

    </Routes>
    <Toaster />
    </>
  
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

// Import Navigate
import { Navigate } from 'react-router-dom';
import Marketplace from "./Components/Marketplace";
