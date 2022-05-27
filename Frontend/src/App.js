import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Voilin from "./Components/Voilin";
import Trumpet from "./Components/Trumpet";
import Flute from "./Components/Flute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/voilin" element={<Voilin />} />
            <Route path="/trumpet" element={<Trumpet />} />
            <Route path="/flute" element={<Flute />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
