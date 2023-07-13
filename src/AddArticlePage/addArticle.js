import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Addartcile = (props) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.files[0]);
    setName(event.target.files[0].name);
    console.log(event.target.files[0]);
  };

  const [commentMesage, setCommentMessage] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:8000/user";
    const formData = new FormData();

    formData.append("image", selected, name);
    //console.log(formData);
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [likes, setLikes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || description.length === 0) {
      setError(true);
    }
    let articleObj = {
      title,
      description,
      selected,
      name,
      id,
      likes: 0,
    };
    if (title && description) {
      fetch("http://localhost:8000/articlecreate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(articleObj),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          setId(res.id);
          navigate(`/articleview/${res.id}`);
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
      //     axios.get('http://localhost:8000/user')
      // .then((response) => {
      //   return axios.get(...); // using response.data
      // })
      // .then((response) => {
      //   console.log('Response', response);
      // });
    }
  };

  return (
    <div>
      <div
        class="container"
        style={{ backgroundColor: " beige", marginTop: "81px" }}
      >
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="card-header">
                <h3> Upload Article</h3>
              </div>
              <div className="row">
                <div className="col-lg-12" style={{ marginTop: "54px" }}>
                  <div className="form-group">
                    <label
                      style={{
                        display: "flex",
                        fontSize: "27px",
                        color: "blue",
                      }}
                    >
                      <b>Title: </b>
                    </label>
                    <input
                      style={{
                        borderWidth: "thin",
                        borderColor: "black",
                        // border: error.title ? "1px solid red" : null,
                      }}
                      className="form-control"
                      value={title}
                      id="id"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your title"
                    ></input>
                    {error && title.length <= 5 ? (
                      <label style={{ color: "red" }}>
                        Title should be 5 characters long
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12" style={{ marginTop: "24px" }}>
                  <div className="form-group">
                    <label
                      style={{
                        display: "flex",
                        fontSize: "27px",
                        color: "blue",
                      }}
                    >
                      <b>Description: </b>
                    </label>
                    <textarea
                      value={description}
                      id="id"
                      onChange={(e) => setDescription(e.target.value)}
                      style={{
                        borderWidth: "thin",
                        borderRadius: "10px",
                      }}
                      rows="5"
                      cols="80"
                      placeholder="Enter your description"
                    ></textarea>
                    {error && description.length <= 5 ? (
                      <label style={{ color: "red" }}>
                        Description should be 5 characters long
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12" style={{ marginTop: "24px" }}>
                  <div className="form-group">
                    <label
                      style={{
                        display: "flex",
                        fontSize: "27px",
                        color: "blue",
                      }}
                    >
                      <b>Images: </b>
                    </label>
                    <input type="file" onChange={handleChange} />
                    <button type="submit" onClick={handleFormSubmit}>
                      upload
                    </button>
                    <br />
                    <div className="card-footer" style={{ marginTop: "68px" }}>
                      <button
                        style={{ marginBottom: "14px" }}
                        className="btn btn-success btn-lg"
                        to={"/articleview"}
                      >
                        create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addartcile;
