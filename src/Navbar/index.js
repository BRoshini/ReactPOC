import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  return (
    <div>
      <nav>
        <div style={{ marginBottom: "6px", width: "100%" }}>
          <ul>
            <li>
              <Link
                style={{ fontSize: "21px", marginTop: "19px", color: "white" }}
                class="navbar-brand"
                to="/articlehomepage"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                style={{
                  fontSize: "21px",
                  whiteSpace: "nowrap",
                  marginTop: "19px",
                  color: "white",
                }}
                class="navbar-brand"
                to="/addarticle"
              >
                Add Article
              </Link>
            </li>
            <li>
              <Link
                style={{
                  fontSize: "21px",
                  whiteSpace: "nowrap",
                  marginTop: "19px",
                  color: "white",
                }}
                class="navbar-brand"
                to="/myarticle"
              >
                My articles
              </Link>
            </li>

            <li style={{ flex: "1", textAlign: "end", paddingRight: "67px" }}>
              <Link
                class="navbar-brand"
                to="/login"
                style={{ fontSize: "21px", marginTop: "19px", color: "white" }}
              >
                Logout
                <i
                  class="fas fa-power-off"
                  style={{
                    paddingLeft: "9px",

                    color: "white;",
                    fontSize: "19px",
                  }}
                ></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Home;
