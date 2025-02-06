import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"; 
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
