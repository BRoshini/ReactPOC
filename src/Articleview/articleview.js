import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ModalBody, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";

const Articleview = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/articlecreate/${params?.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setCount(response.data.likes);
        setImageURL(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // const fetchData = () => {
  //   axios
  //     .get(`http://localhost:8000/comments/${params?.id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       //setMessage(response.data.commentMessage);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // fetchData();

  const incrementCount = () => {
    setCount(count + 1);
    console.log(setCount(count + 1));
  };

  const [modal, setModal] = useState(false);
  const [commentTxt, setCommentTxt] = useState("");
  const [id, setId] = useState(0);
  let commentsObject = {
    commentTxt,
    id,
  };
  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
    console.log("submitted value", commentTxt);

    // useEffect(() => {
    fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(commentsObject),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
    // }, [id]);
  };

  return (
    <div>
      <div className="container">
        <div
          className="card"
          style={{
            marginTop: "112px",
            borderWidth: "thick",
            borderColor: "cornflowerblue",
          }}
        >
          <div class="row">
            <div class="col-sm-1">
              <button
                onClick={incrementCount}
                style={{
                  paddingLeft: "38px",
                  marginTop: "15px",
                  paddingRight: "11px",
                  backgroundColor: "deepskyblue",
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
                {count}
              </button>
            </div>
            <div class="col-sm-9">
              <div class="card" style={{ borderColor: "aliceblue" }}>
                <div class="card-body">
                  <h1 class="card-title">{data.title}</h1>
                  <p class="card-text">{data.description}</p>
                  <p class="card-text">{message}</p>
                  <p class="card-text">{commentTxt}</p>
                </div>
              </div>
            </div>
            <div class="col-sm-1">
              <button
                onClick={() => setModal(true)}
                style={{
                  paddingLeft: "38px",
                  marginTop: "15px",
                  paddingRight: "11px",
                  backgroundColor: "deepskyblue",
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
                                      value={commentTxt}
                                      id="id"
                                      onChange={(e) =>
                                        setCommentTxt(e.target.value)
                                      }
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
            <div class="col-sm-1">
              <button
                style={{
                  paddingLeft: "38px",
                  marginTop: "15px",
                  paddingRight: "11px",
                  backgroundColor: "deepskyblue",
                }}
              >
                <span style={{ fontSize: "2rem", color: "floralwhite" }}>
                  <i
                    class="fa fa-bell"
                    style={{
                      paddingRight: "3px",
                      display: "contents",
                      color: "white;",
                    }}
                  ></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Articleview;
