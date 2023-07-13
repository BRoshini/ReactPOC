import logo from "./logo.svg";
import "./App.css";
import Login from "./login";
// import Registration from './RegistrationForm/registration';
import Registration from "./RegistrationForm/Registartion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./HomePage/home";
import Articlehomepage from "./ArticleHomePage/articlehomepage";
import Addartcile from "./AddArticlePage/addArticle";
import Articleview from "./Articleview/articleview";
import MyArticle from "./MyArticlePage/MyArticle";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored"></ToastContainer>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articlehomepage" element={<Articlehomepage />} />
        <Route path="/addarticle" element={<Addartcile />} />
        <Route path="/articleview/:id" element={<Articleview />} />
        <Route path="/myarticle" element={<MyArticle />} />
      </Routes>
    </div>
  );
}

export default App;
