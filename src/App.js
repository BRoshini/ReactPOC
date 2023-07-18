import logo from "./logo.svg";
import "./App.css";
import Login from "./login";
// import Registration from './RegistrationForm/registration';
import Registration from "./RegistrationForm/Registartion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Articlehomepage from "./ArticleHomePage/articlehomepage";
import Addartcile from "./AddArticlePage/addArticle";
import Articleview from "./Articleview/articleview";
import MyArticle from "./MyArticlePage/MyArticle";
import Home from "./Navbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function CustomApp({ Component }) {
  return (
    <>
      <Navbar />
      <Component />
    </>
  );
}
function App() {
  const routes = [
    {
      component: Articlehomepage,
      path: "/articlehomepage",
    },
    {
      component: Addartcile,
      path: "/addarticle",
    },
    {
      component: Articleview,
      path: "/articleview/:id",
    },
    {
      component: MyArticle,
      path: "/myarticle",
    },
  ];

  return (
    <div className="App">
      <ToastContainer theme="colored"></ToastContainer>
      {/* <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router> */}

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {routes.map((route) => (
            <Route
              path={route.path}
              element={<CustomApp Component={route.component} />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
