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
  const [imageContent, setImageContent] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.files[0]);
    setName(event.target.files[0].name);
    console.log(event.target.files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImageContent(base64String);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [videoFile, setVideoFile] = useState("");

  const [likes, setLikes] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setVideoFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length === 0 || description.length === 0) {
      setError(true);
    }
    let articleObj = {
      id,
      title,
      description,
      selected,
      name,
      likes,
      userId,
      imageContent,
      videoFile,
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
    }
  };

  return (
    <div>
      <div
        class="container"
        style={{
          backgroundColor: " beige",
          marginTop: "81px",
          marginBottom: "64px",
        }}
      >
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="card-header">
                <h3 style={{ color: "blue", paddingTop: "37px" }}>
                  {" "}
                  Upload Article
                </h3>
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
                        marginBottom: "-22px",
                      }}
                    >
                      <b>Images: </b>
                    </label>
                    <input
                      type="file"
                      style={{ paddingRight: "91px" }}
                      onChange={handleChange}
                    />

                    <br />
                    <div className="col-lg-12" style={{ marginTop: "24px" }}>
                      <label
                        style={{
                          display: "flex",
                          fontSize: "27px",
                          color: "blue",
                          marginBottom: "-22px",
                          paddingRight: "91px",
                        }}
                      >
                        <b>Videos: </b>
                      </label>
                      <div>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleFileChange}
                          style={{ paddingRight: "91px" }}
                        />
                      </div>
                    </div>
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
