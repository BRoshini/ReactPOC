import { NavLink } from "react-router-dom";
import "./home.css";
const Home = () => {
  return (
    <div>
      <nav>
        <div style={{ marginBottom: "21px" }}>
          <ul>
            <li>
              <NavLink
                style={{ fontSize: "21px" }}
                class="navbar-brand"
                to="/articlehomepage"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                style={{ fontSize: "21px", whiteSpace: "nowrap" }}
                class="navbar-brand"
                to="/addarticle"
              >
                Add Article
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{ fontSize: "21px", whiteSpace: "nowrap" }}
                class="navbar-brand"
                to="/myarticle"
              >
                My articles
              </NavLink>
            </li>
            <li>
              <NavLink
                class="navbar-brand"
                to="/login"
                style={{ paddingLeft: "1089px", fontSize: "21px" }}
              >
                Logout
                <i
                  class="fas fa-power-off"
                  style={{
                    paddingLeft: "9px",
                    display: "contents",
                    color: "white;",
                    fontSize: "21px",
                  }}
                ></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Home;
