import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Home from "./Components/Home"; 
import Login from "./Components/Login";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = Cookies.get('user_profile');
    if (userProfile) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
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
