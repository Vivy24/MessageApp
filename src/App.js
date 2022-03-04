import "./App.css";
import NavBar from "./components/NavBar";
import "./services/firebase";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App ">
      <div className="flex flex-col h-screen">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
