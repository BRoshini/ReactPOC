import logo from "./logo.svg";
import "./App.css";
import Login from "./login";
// import Registration from './RegistrationForm/registration';
import Registration from "./RegistrationForm/Registartion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./HomePage/home";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored"></ToastContainer>
      {/* <Login />
      <Registration/> */}

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
