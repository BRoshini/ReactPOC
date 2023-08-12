import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Articlehomepage from "../ArticleHomePage/articlehomepage";
const MyArticle = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [count, setCount] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const [article_id, setArticle_id] = useState(0);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [commentTxt, setCommentTxt] = useState("");
  const [id, setId] = useState(0);
  const [myArticles, setMyArticles] = useState("");
  console.log(userId);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/articlecreate?userId=${userId}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
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

  return (
    <div>
      <Articlehomepage myArticles={true} />
    </div>
    // <div>
    //   {data.length > 0 ? (
    //     data.map((x) => {
    //       return (
    //         <div>
    //           <div
    //             className="container"
    //             key={x.id}
    //             onClick={() => {
    //               navigate(`/articleview/${x.id}`);
    //             }}
    //           >
    //             <div
    //               className="row"
    //               style={{
    //                 marginTop: "112px",
    //                 borderWidth: "thick",
    //                 borderColor: "cornflowerblue",
    //               }}
    //             >
    //               <div className="container" style={{ marginTop: "55px" }}>
    //                 <div className="container-fluid p-0 card text-white bg-primary mb-3">
    //                   <div className="col-12">
    //                     <div className="row">
    //                       <label style={{ fontWeight: "700" }}>
    //                         <h3>Title: &nbsp;</h3>
    //                         <p style={{ fontSize: "21px" }}>{x.title}</p>
    //                       </label>
    //                     </div>
    //                     <div className="row">
    //                       <label style={{ fontWeight: "700" }}>
    //                         <h3>Description: &nbsp;</h3>
    //                       </label>
    //                       <p style={{ fontSize: "21px" }}>{x.description}</p>
    //                     </div>
    //                     <div className="row">
    //                       <label style={{ fontWeight: "700" }}>
    //                         <h3>Article created by: &nbsp;</h3>
    //                       </label>
    //                       <h6 style={{ fontSize: "21px" }}>
    //                         {x.articleCreatedBy}
    //                       </h6>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <div>
    //       <nav
    //         class="navbar navbar-dark bg-success"
    //         style={{
    //           paddingTop: "20px",
    //           paddingBottom: "20px",
    //           paddingLeft: "20px",
    //         }}
    //       >
    //         <div>
    //           <Link
    //             class="navbar-brand"
    //             to="/addarticle"
    //             style={{ paddingLeft: "1391px" }}
    //           >
    //             Add new article
    //           </Link>
    //         </div>
    //       </nav>
    //       <h1 style={{ color: "white" }}>No article exists</h1>
    //     </div>
    //   )}
    // </div>
  );
};
export default MyArticle;
