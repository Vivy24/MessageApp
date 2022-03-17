import "./App.css";
import NavBar from "./components/NavBar";
import "./services/firebase";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPass from "./pages/ForgerPass";
function App() {
  return (
    <div className="App bg-slate-200">
      <div className="flex flex-col ">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/fPassword" element={<ForgetPass />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/chat/:chatID/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
