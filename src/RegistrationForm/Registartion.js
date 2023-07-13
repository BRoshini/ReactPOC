import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [uname, setuname] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("india");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");

  const navigate = useNavigate();

  const isValidate = () => {
    const fields = [uname, name, email, password, country];
    const fieldNames = ["Username", "Fullname", "Email", "Password", "country"];

    let isProceed = true;
    let errorMessage = "Please enter the valid ";

    fields.forEach((field, index) => {
      if (!field?.trim()) {
        isProceed = false;
        errorMessage += `${fieldNames[index]}, `;
      }
    });

    // console.log(errorMessage);

    // if (name === null || name === "") {
    //   isProceed = false;
    //   errorMessage += " Username ";
    // }
    // if (uname === null || uname === "") {
    //   isProceed = false;
    //   errorMessage += " Fullname ";
    // }
    // if (uname === null || uname === "") {
    //   isProceed = false;
    //   errorMessage += " Password ";
    // }
    // if (uname === null || uname === "") {
    //   isProceed = false;
    //   errorMessage += " Email ";
    // }
    if (!isProceed) {
      toast.warning(errorMessage);
    }
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidate()) {
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
      fetch(" http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          // console.log(res);
          toast.success("Registered successfully");
          navigate("/login");
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
                      value={uname}
                      onChange={(e) => setuname(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Password</b>
                      <span className="errMsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Full Name</b>
                      <span className="errMsg">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ display: "flex" }}>
                      <b>Email</b>
                      <span className="errMsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    ></input>
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      value="male"
                      className="app-check"
                    ></input>
                    <label>Male</label>
                    <input
                      type="radio"
                      value="female"
                      checked={gender === "female"}
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
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
