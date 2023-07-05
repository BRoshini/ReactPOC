import React, { useState } from "react";
import { Link } from "react-router-dom";
import validation from "./Loginvalidation/validation";
import { Toast } from "bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const[username, setUsername] = useState('');
  // const[password, setPassword] = useState('');

  const [values, setValues] = useState({
    name: "",
    password: "",
  });
  const [errors, setError] = useState({});
  const navigate = useNavigate();

  async function proceedLogin(e) {
    e.preventDefault();
    setError(validation(values));
    // fetch("http://localhost:8000/user")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data
    //       .find(
    //         (items) =>
    //           items.uname === values.name && items.password === values.password
    //       )
    //       .then((value) => {
    //         if (value) navigate("/home");
    //       });

    //     //console.log(data[0]);
    //   })
    //   .catch((error) => {
    //     toast.error("Login failed Enter valid Details");
    //     console.log(error);
    //   });
    const response = await fetch("http://localhost:8000/user");
    const userDetails = await response.json();
    const validUser = await userDetails.find(
      (user) => user.uname === values.name && user.password === values.password
    );
    if (validUser) {
      navigate("/home");
      toast.success("success");
    } else {
      toast.error("Login failed Enter valid Details");
    }
    console.log(userDetails);
  }

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setError(validation(values));
  }

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={proceedLogin} className="container">
          <div className="card" style={{ width: "41rem" }}>
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label style={{ display: "flex", fontWeight: "700" }}>
                  User Name<span className="errMsg">*</span>
                </label>
                <input
                  type="text"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  className="form-control"
                ></input>
                {errors.name && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                      paddingRight: "511px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label style={{ display: "flex", fontWeight: "700" }}>
                  Password<span className="errMsg">*</span>
                </label>
                <input
                  type="password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                ></input>
                {errors.password && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "13px",
                      paddingRight: "511px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="card-footer" style={{ marginTop: "22px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginLeft: "-141px", marginRight: "26px" }}
            >
              Login
            </button>
            {/* <Link className="btn btn-primary" to={"/home"}>
              Login
            </Link> */}
            <Link className="btn btn-success" to={"/register"}>
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
