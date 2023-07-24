import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ModalBody, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
//import "./articleview.css";

const Articleview = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(0);
  const [ImageContent, setImageContent] = useState("");
  const [base64Data, setBase64Data] = useState("");
  const [likes, setLikes] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const [likesCount, setLikesCount] = useState("");

  useEffect(() => {
    articleCreate();
    commentsCreate();
  }, []);
  const articleCreate = () => {
    setTimeout(() => {
      axios
        .get(`http://localhost:8000/articlecreate/${params?.id}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setArticle_id(response.data.id);
          setLikes(response.data.likes);
          setLikesCount(response.data.likes);
          console.log(response.data.likes);
          setImageContent(response.data.imageContent);
          setBase64Data(response.data.videoFile);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
  };

  const commentsCreate = () => {
    let sample;
    axios
      .get(`http://localhost:8000/comments?article_id=${params.id}`)
      .then((response) => {
        const commentData = response.data;
        console.log("comment article");
        const items = commentData.map((data) => {
          return data.commentTxt;
        });
        const commentString = items.join(", ");
        console.log(response.data);
        setMessage(response.data[0]);
        setLikes(response.data[0].count);
        setInputCommentText(commentString);
        setLength(response.data.length);
        sample = response.data.length;
      })

      .catch((error) => {
        console.error(error);
      });
  };
  const incrementCount = () => {
    setLikes(1);
    setLikesCount(1);
    const payload = data;
    payload["likes"] = 1;
    axios.put(`http://localhost:8000/articlecreate/${params?.id}`, payload);
  };

  const [modal, setModal] = useState(false);
  const [commentTxt, setCommentTxt] = useState("");
  const [inputCommentText, setInputCommentText] = useState("");
  const [id, setId] = useState(0);
  const [article_id, setArticle_id] = useState(0);
  const [length, setLength] = useState("");
  let commentsObject = {
    commentTxt,
    article_id,
    length,
    id,
  };
  console.log(inputCommentText);
  const handleClick = (e) => {
    e.preventDefault();
    //setInputCommentText(" ");
    setModal(false);
    fetch(`http://localhost:8000/comments?article_id=${params.id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(commentsObject),
    })
      .then((data) => {
        console.log(data);
        setCommentTxt("");
        setCount(1);
      })

      .catch((err) => {
        console.log(err);
      });

    let sample;
    setTimeout(() => {
      axios
        .get(`http://localhost:8000/comments?article_id=${params.id}`)
        .then((response) => {
          const commentData = response.data;
          console.log("comment article");
          const items = commentData.map((data) => {
            return data.commentTxt;
          });
          const commentString = items.join(", ");
          console.log(response.data);
          setMessage(response.data[0]);
          setLikes(response.data[0].count);
          setInputCommentText(commentString);
          setLength(response.data.length);

          console.log(response.data.likes);
          sample = response.data.length;
        })

        .catch((error) => {
          console.error(error);
        });
    }, 1000);

    setTimeout(() => {
      const payload = { ...data };
      console.log(data);
      console.log(payload);
      payload.commentCount = sample;
      console.log(sample);
      axios.put(`http://localhost:8000/articlecreate/${params?.id}`, payload);
    }, 3000);
  };
  console.log(likes);
  console.log(likesCount);
  return (
    <div>
      <div class="container" style={{ marginTop: "38px" }}>
        <div class="card text-white bg-primary mb-3">
          <div class="col-lg-12">
            <div class="card-header">
              <label style={{ fontWeight: "700" }}>
                <h3>Title: &nbsp;</h3>
              </label>
              <h7 style={{ fontSize: "21px" }}>{data.title}</h7>
            </div>
            <div class="card-body">
              <div class="container-fluid p-0">
                <div class="row">
                  <div class="col-1">
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
                      &nbsp;
                      {likesCount}
                    </button>
                  </div>
                  <div class="col-10" style={{ textAlign: "justify" }}>
                    <label style={{ fontWeight: "700" }}>
                      <h3>Description:&nbsp; </h3>
                    </label>
                    <h7 style={{ fontSize: "21px" }}>{data.description}</h7>
                    <div className="row">
                      {inputCommentText ? (
                        <label style={{ fontWeight: "700" }}>
                          <h3>
                            Comment message:&nbsp;
                            <h8 style={{ fontSize: "21px" }}>
                              {inputCommentText}
                            </h8>{" "}
                          </h3>
                        </label>
                      ) : (
                        ""
                      )}
                    </div>
                    <label style={{ fontWeight: "700" }}>
                      <h3>Article created by: &nbsp;</h3>
                    </label>
                    <h7 style={{ fontSize: "21px" }}>
                      {" "}
                      {data.articleCreatedBy}
                    </h7>
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
                                              value={commentTxt}
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
                <div class="row">
                  <div class="col-12">
                    {ImageContent && ImageContent.length > 0
                      ? ImageContent.map((imageSrc) => (
                          <img
                            src={imageSrc}
                            style={{ height: "236px", width: "526px" }}
                          />
                        ))
                      : ""}
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-12">
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
        </div>
      </div>
    </div>
  );
};
export default Articleview;
