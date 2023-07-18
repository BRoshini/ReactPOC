import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./Validation";

const Registration = () => {
  // const [uname, setuname] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [country, setCountry] = useState("india");
  // const [address, setAddress] = useState("");
  // const [gender, setGender] = useState("male");
  const [errors, setErrors] = useState("");
  const [values, setValues] = useState({
    uname: "",
    name: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    gender: "male",
    country: "india",
  });

  const navigate = useNavigate();
  const [id, setId] = useState(0);

  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    console.log(newObj);
    setValues(newObj);
    setErrors(Validation(values));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    const newObj = { ...values, [event.target.name]: event.target.value };
    const { uname, name, password, email, phone, country, address, gender } =
      newObj;
    console.log(errors);
    if (errors) {
      let regObj = {
        uname,
        name,
        password,
        email,
        phone,
        country,
        address,
        gender,
      };
      await fetch(" http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registered successfully");
          navigate("/login");
          return res.json();
        })
        .then((res) => {
          console.log(res.id);
          setId(res.id);
        })

        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };
  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card" style={{ marginTop: "71px" }}>
            <div className="card-header" style={{ backgroundColor: "beige" }}>
              <h1> User Registration</h1>
            </div>
            <div className="card-body" style={{ backgroundColor: "beige" }}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>User name</b>
                      <span className="errMsg">*</span>
                    </label>
                    <input
                      name="uname"
                      onChange={handleInput}
                      className="form-control"
                      style={{ border: errors.uname ? "1px solid red" : null }}
                    ></input>
                    {errors.uname && (
                      <p style={{ color: "red" }}>{errors.uname}</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Password</b>
                      <span className="errMsg">*</span>
                    </label>
                    <input
                      name="password"
                      onChange={handleInput}
                      type="password"
                      className="form-control"
                      style={{
                        border: errors.password ? "1px solid red" : null,
                      }}
                    ></input>
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Full Name</b>
                      <span className="errMsg">*</span>
                    </label>
                    <input
                      name="name"
                      onChange={handleInput}
                      className="form-control"
                      style={{ border: errors.name ? "1px solid red" : null }}
                    ></input>
                    {errors.name && (
                      <p style={{ color: "red" }}>{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Email</b>
                      <span className="errMsg">*</span>
                    </label>
                    <input
                      name="email"
                      onChange={handleInput}
                      className="form-control"
                      style={{ border: errors.email ? "1px solid red" : null }}
                    ></input>
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Phone</b>
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      maxlength="10"
                      name="phone"
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Country</b>
                      <span className="errMsg">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="country"
                      onChange={handleInput}
                    >
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="singapore">Singapore</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Address</b>
                    </label>
                    <input
                      className="form-control"
                      name="address"
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Gender </b>
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      checked={values.gender === "male"}
                      onChange={handleInput}
                      value="male"
                      className="app-check"
                    ></input>
                    <label>Male</label>
                    <input
                      type="radio"
                      value="female"
                      checked={values.gender === "female"}
                      name="gender"
                      onChange={handleInput}
                      className="app-check"
                    ></input>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              {/* <a className="btn btn-danger">Back</a> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Registration;
