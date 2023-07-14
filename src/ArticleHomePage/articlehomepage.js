import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ModalBody, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Articlehomepage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [count, setCount] = useState(0);
  const userId = sessionStorage.getItem("userId");

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
        setCommentTxt(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const [modal, setModal] = useState(false);
  const [commentTxt, setCommentTxt] = useState([]);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
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
      {data.map((x) => {
        return (
          <div>
            <div
              className="container"
              key={x.id}
              onClick={() => {
                navigate(`/articleview/${x.id}`);
              }}
            >
              <div
                className="card"
                style={{
                  marginTop: "112px",
                  borderWidth: "thick",
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
                        <h2 class="card-title">{x.title}</h2>
                        <p
                          class="card-text"
                          style={{ fontSize: "31px", color: "currentColor" }}
                        >
                          {x.description}
                        </p>
                        {/* <p class="card-text">{commentTxt}</p> */}
                        {/* {commentTxt.map((item) => {
                          if (item.article_id === x.id) {
                            return <p class="card-text">{item.commentTxt}</p>;
                          }
                        })} */}
                      </div>
                    </div>
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
