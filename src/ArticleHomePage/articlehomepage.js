import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./articlehomepage.css";

const Articlehomepage = ({ myArticles }) => {
  const [data, setData] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [count, setCount] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const [likes, setLikes] = useState([]);
  const [articleData, setArticleData] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/articlecreate`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setCount(response.data.likes);
        setImageURL(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      axios
        .get(`http://localhost:8000/comments`)
        .then((response) => {
          console.log(response.data);
          setCommentTxts(response.data);
          setLikes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/articlecreate?userId=${userId}`)
      .then((response) => {
        console.log(response.data);
        setArticleData(response.data);
        console.log(setArticleData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [modal, setModal] = useState(false);
  const [commentTxts, setCommentTxts] = useState([]);
  const navigate = useNavigate();

  if (myArticles) {
    console.log(myArticles);
    return (
      <>
        <div>
          {articleData &&
            articleData?.map((x) => {
              return (
                <div
                  className="container"
                  key={x.id}
                  onClick={() => {
                    navigate(`/articleview/${x.id}`);
                  }}
                >
                  <div
                    className="row"
                    style={{
                      marginTop: "112px",
                      borderWidth: "thick",
                      borderColor: "cornflowerblue",
                    }}
                  >
                    <div className="container" style={{ marginTop: "55px" }}>
                      <div className="container-fluid p-0 card text-white bg-primary mb-3">
                        <div className="col-12">
                          <div className="row">
                            <label style={{ fontWeight: "700" }}>
                              <h3>Title: &nbsp;</h3>
                              <p style={{ fontSize: "21px" }}>{x.title}</p>
                            </label>
                          </div>
                          <div className="row">
                            <label style={{ fontWeight: "700" }}>
                              <h3>Description: &nbsp;</h3>
                            </label>
                            <p style={{ fontSize: "21px" }}>{x.description}</p>
                          </div>
                          <div className="row">
                            <label style={{ fontWeight: "700" }}>
                              <h3>Article created by: &nbsp;</h3>
                            </label>
                            <h6 style={{ fontSize: "21px" }}>
                              {x.articleCreatedBy}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        {data.map((x) => {
          return (
            <div>
              <div
                class="card text-white bg-primary mb-3"
                className="container"
                style={{ marginTop: "55px" }}
                key={x.id}
                onClick={() => {
                  navigate(`/articleview/${x.id}`);
                }}
              >
                <div className="container-fluid p-0 card text-white bg-primary mb-3">
                  <div className="row">
                    <div className="col-1" style={{ color: "white" }}>
                      <button
                        style={{
                          paddingLeft: "38px",
                          marginTop: "15px",
                          paddingRight: "11px",
                          backgroundColor: "deepskyblue",
                          float: "left",
                          marginTop: "2px",
                        }}
                      >
                        <span
                          style={{ fontSize: "2rem", color: "floralwhite" }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{
                              paddingRight: "3px",
                              display: "contents",
                              color: "white",
                            }}
                          ></i>
                        </span>
                        {x.likes}
                        &nbsp;
                      </button>
                    </div>
                    <div className="col-10">
                      <div className="row">
                        <label style={{ fontWeight: "700" }}>
                          <h3>Title: &nbsp;</h3>
                        </label>
                        <h6 style={{ fontSize: "21px" }}>{x.title}</h6> <br />
                      </div>
                      <div className="row">
                        <label style={{ fontWeight: "700" }}>
                          <h3>Description: &nbsp;</h3>
                        </label>
                        <h6 style={{ fontSize: "21px" }}>{x.description}</h6>
                      </div>
                    </div>
                    <div className="col-1" style={{ paddingLeft: "0px" }}>
                      <label style={{ fontWeight: "700" }}>
                        <button
                          onClick={() => setModal(true)}
                          style={{
                            paddingLeft: "38px",
                            paddingRight: "11px",
                            backgroundColor: "deepskyblue",
                            float: "right",
                            marginTop: "2px",
                          }}
                        >
                          <span
                            // className="myclass"
                            style={{
                              fontSize: "2rem",
                              color: "floralwhite",
                              paddingRight: "2px",
                            }}
                          >
                            <i
                              className="fas fa-comment-alt"
                              // className="button"
                              style={{
                                paddingRight: "3px",
                                display: "contents",
                                color: "white",
                              }}
                            ></i>
                          </span>
                          {x.commentCount}
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Articlehomepage;
