import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const MyArticle = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [count, setCount] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const [article_id, setArticle_id] = useState(0);
  const navigate = useNavigate();
  console.log(userId);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/articlecreate?userId=${userId}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        //setArticle_id(response.data.id);
        // setCount(response.data.likes);
        // setImageURL(response.data.name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:8000/comments?article_Id=${userId}`)
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
  const [commentTxt, setCommentTxt] = useState("");
  const [id, setId] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    setModal(false);
    console.log("submitted value", commentTxt);
  };

  return (
    <div>
      {data.length > 0 ? (
        data.map((x) => {
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
                        <div class="card-body">
                          <label style={{ fontWeight: "700" }}>
                            <h3 style={{ color: "deeppink" }}>Title: &nbsp;</h3>
                          </label>
                          <h7 style={{ fontSize: "21px", color: "deeppink" }}>
                            {x.title}
                          </h7>{" "}
                          <br />
                          <label style={{ fontWeight: "700" }}>
                            <h3 style={{ color: "deeppink" }}>
                              Description: &nbsp;
                            </h3>
                          </label>
                          <h7 style={{ fontSize: "21px", color: "deeppink" }}>
                            {x.description}
                          </h7>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <nav
            class="navbar navbar-dark bg-success"
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingLeft: "20px",
            }}
          >
            <div>
              <Link
                class="navbar-brand"
                to="/addarticle"
                style={{ paddingLeft: "1391px" }}
              >
                Add new article
              </Link>
            </div>
          </nav>
          <h1 style={{ color: "white" }}>No article exists</h1>
        </div>
      )}
    </div>
  );
};
export default MyArticle;
