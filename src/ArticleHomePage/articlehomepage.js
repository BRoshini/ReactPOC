import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ModalBody, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./articlehomepage.css";

const Articlehomepage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [count, setCount] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const [likes, setLikes] = useState([]);
  const [inputCommentText, setInputCommentText] = useState("");

  console.log(userId);
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
    });
  }, []);

  // const incrementCount = () => {
  //   setCount(count + 1);
  // };

  const [modal, setModal] = useState(false);
  const [commentTxts, setCommentTxts] = useState([]);
  const [commentTxt, setCommentTxt] = useState("");

  console.log(commentTxts);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  let commentsObject = {
    commentTxts,
    id,
  };
  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
    console.log("submitted value", commentTxts);
  };

  return (
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
              <div class="container-fluid p-0 card text-white bg-primary mb-3">
                <div class="row">
                  <div class="col-1" style={{ color: "white" }}>
                    <button
                      // onClick={incrementCount}
                      style={{
                        paddingLeft: "38px",
                        marginTop: "15px",
                        paddingRight: "11px",
                        backgroundColor: "deepskyblue",
                        float: "left",
                        marginTop: "2px",
                      }}
                    >
                      <span style={{ fontSize: "2rem", color: "floralwhite" }}>
                        <i
                          class="fas fa-thumbs-up"
                          style={{
                            paddingRight: "3px",
                            display: "contents",
                            color: "white;",
                          }}
                        ></i>
                      </span>
                      {x.likes}
                      &nbsp;
                    </button>
                  </div>
                  <div class="col-10">
                    {/* <label style={{ fontWeight: "700" }}>
                      <h3> {x.title} &nbsp;</h3>
                      <br />
                      <label style={{ fontWeight: "700" }}>
                        <h8> {x.description} &nbsp;</h8>
                      </label>
                    </label> */}
                    <label style={{ fontWeight: "700" }}>
                      <h3>Title: &nbsp;</h3>
                    </label>
                    <h7 style={{ fontSize: "21px" }}>{x.title}</h7> <br />
                    <label style={{ fontWeight: "700" }}>
                      <h3>Description: &nbsp;</h3>
                    </label>
                    <h7 style={{ fontSize: "21px" }}>{x.description}</h7>
                    <div className="row">
                      {commentTxt ? (
                        <label style={{ fontWeight: "700" }}>
                          <h3>Comment message: &nbsp; </h3>
                          {commentTxt}
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div class="col-1" style={{ paddingLeft: "0px" }}>
                    <label style={{ fontWeight: "700" }}>
                      <button
                        onClick={() => setModal(true)}
                        style={{
                          paddingLeft: "38px",
                          // marginTop: "15px",
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
                            class="fas fa-comment-alt"
                            // className="button"
                            style={{
                              paddingRight: "3px",
                              display: "contents",
                              color: "white;",
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
  );
};
export default Articlehomepage;
