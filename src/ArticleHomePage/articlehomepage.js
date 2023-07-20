import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ModalBody, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
// import "./Articlehomepage.css";

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
              {/* <div
                className="card"
                style={{
                  marginTop: "112px",
                  borderWidth: "8px",
                  borderColor: "cornflowerblue",
                  paddingLeft: "140px",
                  marginRight: "233px",
                  borderRadius: "63px",
                }}
              >
                <div class="row">
                  <div class="col-sm-9">
                    <div class="card" style={{ borderColor: "aliceblue" }}>
                      <div
                        class="card-body"
                        style={{
                          fontFamily: "fangsong",
                          color: "mediumvioletred",
                        }}
                      >
                        <h2 class="card-title" style={{ color: "deeppink" }}>
                          Title: {x.title}
                        </h2>
                        <p class="card-text" style={{ color: "deeppink" }}>
                          Description: {x.description}
                        </p>

                        {commentTxts.map((data) => {
                          return (
                            <div>
                              <p
                                class="card-text"
                                style={{ color: "deeppink" }}
                              >
                                Comment message: {data.commentTxt}
                                {data.id}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
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
                    <label style={{ fontWeight: "700" }}>
                      <h3> {x.title} &nbsp;</h3>
                      <br />
                      <label style={{ fontWeight: "700" }}>
                        <h8> {x.description} &nbsp;</h8>
                      </label>
                    </label>

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
                    {/* <div className="row">
                      <label style={{ fontWeight: "700" }}>
                        <h3>Article created by: &nbsp;</h3>
                        {item.uname}
                      </label>
                    </div> */}
                  </div>
                  <div class="col-1">
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
                          style={{ fontSize: "2rem", color: "floralwhite" }}
                        >
                          <i
                            class="fas fa-comment-alt"
                            style={{
                              paddingRight: "3px",
                              display: "contents",
                              color: "white;",
                            }}
                          ></i>

                          <div>
                            <Modal
                              size="lg"
                              isOpen={modal}
                              toggle={() => setModal(!modal)}
                            >
                              <ModalHeader toggle={() => setModal(!modal)}>
                                Comment Message for Article
                              </ModalHeader>
                              <ModalBody>
                                <form>
                                  <Row>
                                    <Col lg={12}>
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <div className="form-group">
                                            <label
                                              style={{
                                                display: "flex",
                                                fontSize: "27px",
                                                color: "blue",
                                              }}
                                            >
                                              <b>Comment Message: </b>
                                            </label>
                                            <textarea
                                              value={inputCommentText}
                                              id="id"
                                              onChange={(e) => {
                                                setInputCommentText(
                                                  e.target.value
                                                );
                                                setCommentTxt(e.target.value);
                                              }}
                                              style={{
                                                borderWidth: "thin",
                                                borderRadius: "10px",
                                              }}
                                              rows="5"
                                              cols="100"
                                              placeholder="Enter your description"
                                            ></textarea>
                                          </div>
                                        </div>
                                        <div className="card-footer">
                                          <button
                                            onClick={handleClick}
                                            style={{
                                              marginBottom: "14px",
                                              marginLeft: "364px",
                                              marginTop: "28px",
                                            }}
                                            className="btn btn-success btn-lg"
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </form>
                              </ModalBody>
                            </Modal>
                          </div>
                        </span>
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
