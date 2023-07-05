// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* <Link to={"/"}>Home</Link>
      <Link to={"/login"}>Logout</Link>
      <h1> welcome to home page</h1> */}

      <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Home
          </a>
          <a class="navbar-brand" href="#">
            Add Article
          </a>
          <a class="navbar-brand" href="#">
            View Article
          </a>
          <a class="navbar-brand" href="#">
            My articles
          </a>
          <a class="navbar-brand" href="/login">
            logout
          </a>
        </div>
      </nav>
    </div>
  );
};
export default Home;
