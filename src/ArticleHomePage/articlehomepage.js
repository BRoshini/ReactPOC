import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

const Articlehomepage = () => {
  return (
    <div>
      <div class="container">
        {[1, 2, 3].map((x) => {
          return (
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
                  </button>
                </div>
                <div class="col-sm-9">
                  <div class="card" style={{ borderColor: "aliceblue" }}>
                    <div class="card-body">
                      <p class="card-text">
                        Cards assume no specific width to start, so they’ll be
                        100% wide unless otherwise stated. You can change this
                        as needed with custom CSS, grid classes, Cards assume no
                        specific width to start, so they’ll be 100% wide unless
                        otherwise stated. You can change this as needed with
                        custom CSS, grid classes,
                      </p>
                    </div>
                  </div>
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
                        class="fas fa-comment-alt"
                        style={{
                          paddingRight: "3px",
                          display: "contents",
                          color: "white;",
                        }}
                      ></i>
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
          );
        })}
      </div>
    </div>
  );
};
export default Articlehomepage;
