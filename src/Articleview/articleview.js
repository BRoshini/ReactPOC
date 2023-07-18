import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ModalBody, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";

const Articleview = () => {
  const params = useParams();
  // const { userid } = useParams();
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(0);
  const [ImageContent, setImageContent] = useState("");
  const [base64Data, setBase64Data] = useState("");
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/articlecreate/${params?.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setArticle_id(response.data.id);
        setCount(response.data.likes);
        setImageContent(response.data.imageContent);
        setBase64Data(response.data.videoFile);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(count);
  const incrementCount = () => {
    setCount(count + 1);
  };

  const [modal, setModal] = useState(false);
  const [commentTxt, setCommentTxt] = useState("");
  const [inputCommentText, setInputCommentText] = useState("");
  const [id, setId] = useState(0);
  const [article_id, setArticle_id] = useState(0);
  let commentsObject = {
    commentTxt,
    article_id,
    id,
  };
  const handleClick = (e) => {
    e.preventDefault();
    setInputCommentText(" ");
    setModal(false);
    fetch(`http://localhost:8000/comments?article_Id=${params.id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(commentsObject),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setInputCommentText(data.commentTxt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/comments?article_Id=${params.id}`)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/${userId}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div class="container" style={{ marginTop: "38px" }}>
        <div class="card text-white bg-primary mb-3">
          <div class="col-lg-12">
            <div class="card-header">
              <label style={{ fontWeight: "700" }}>
                <h1>Title:</h1>
                <span>
                  <p>{data.title}</p>
                </span>
              </label>
            </div>
            <div class="card-body">
              {/* <h5 class="card-title"> */}
              <button
                onClick={incrementCount}
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
                &nbsp;{count}
              </button>
              <div className="col-lg-11">
                {" "}
                <h3>Description:</h3>
                {data.description}
              </div>

              <div>
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
                  <span style={{ fontSize: "2rem", color: "floralwhite" }}>
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
                                        // value={message.map((item) => {
                                        //   {
                                        //     item.commentTxt;
                                        //   }
                                        // })}
                                        id="id"
                                        onChange={(e) => {
                                          setInputCommentText(e.target.value);
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
              </div>
              {/* </h5> */}
              <p class="card-text">{commentTxt}</p>
              <div className="row">
                <p class="card-text" style={{ paddingRight: "2px" }}>
                  &nbsp; Article created by :&nbsp;{item.uname}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7">
              {ImageContent ? (
                <img
                  src={ImageContent}
                  alt="Base64 Image"
                  style={{ height: "236px", width: " 526px" }}
                />
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5">
              {base64Data ? (
                <video src={base64Data} controls>
                  Your browser does not support the video tag.
                </video>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Articleview;
