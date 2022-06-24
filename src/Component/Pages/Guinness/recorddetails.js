import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import styles from "./recorddetails.module.css";
import { useParams } from "react-router-dom";
import { scroller } from "react-scroll";
import "./navbar.css";

const Recorddetails = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [rdata, setrdata] = useState([]);
  const [reldata, setreldata] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/guinness/rdetails`, {
        params: {
          who: params.who,
        },
      })
      .then((res) => {
        setrdata(res.data);
      });
  }, []);

  // const func = (m) => {
  //   const result = m.find(({ name }) => name.who === params.who);
  //
  // };

  //
  //   };

  const token = useSelector((state) => state.auth?.authData?.token);
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);

  const routelogin = () => {
    history.push("/login");
  };

  const handlelogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
  };

  const routehome = () => {
    history.push("/");
  };

  const routeabout = () => {
    history.push("/#about");
  };
  const routeguinness = () => {
    history.push("/#guinness");
  };
  const routeolympics = () => {
    history.push("/#olympics");
  };
  const routefaq = () => {
    history.push("/#faq");
  };
  const routecontactus = () => {
    history.push("/#contactus");
  };
  const handleapproachus = () => {
    history.push("/breaktherecord");
  };

  const handledashboard = () => {
    history.push("/dashboard");
  };

  const scrollTarget = (target) =>
    scroller.scrollTo(target, {
      smooth: "easeInOutQuart",
      duration: 800,
      delay: 0,
    });

  const handleextra = (val) => {
    history.push(`/recorddetails/${val}`);
    window.scrollTo(0, 0);
  };

  const scrollToPage = async (target) => {
    if (history.location.pathname !== "/") {
      await history.push("/");
    }
    scrollTarget(target);
  };

  var result = {};

  return (
    <div>
      <body>
        <body
          id="page-top"
          data-bs-spy="scroll"
          data-bs-target="#mainNav"
          data-bs-offset="54"
        >
          <nav
            className="navbar navbar-dark navbar-expand-lg fixed-top fixed_top"
            style={{ background: "#001c33", height: "100px" }}
            id="mainNav"
          >
            <div className="container">
              <a
                className="navbar-brand text-start d-xxl-flex"
                href="#page-top"
                style={{
                  color: "rgb(254,209,54)",
                  fontSize: "28px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                ATHLETISTAN
              </a>
              <button
                data-bs-toggle="collapse"
                data-bs-target="#navbarResponsive"
                className="navbar-toggler navbar-toggler-right"
                type="button"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{ marginLeft: "76px", marginRight: "-76px" }}
              >
                <i className="fa fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul
                  className="navbar-nav ms-auto text-uppercase"
                  style={{ marginLeft: "227.266px" }}
                >
                  <li className="nav-item1">
                    <a className="nav-link2" onClick={() => scrollToPage("")}>
                      Home
                    </a>
                  </li>
                  <li className="nav-item1">
                    <a
                      className="nav-link2"
                      onClick={() => scrollToPage("about")}
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item1">
                    <a
                      className="nav-link2"
                      onClick={() => scrollToPage("guinness")}
                    >
                      Guinness
                    </a>
                  </li>
                  <li className="nav-item1">
                    <a
                      className="nav-link2"
                      onClick={() => scrollToPage("olympics")}
                    >
                      Olympics
                    </a>
                  </li>
                  <li className="nav-item1">
                    <a
                      className="nav-link2"
                      onClick={() => scrollToPage("faq")}
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="nav-item1">
                    <a
                      className="nav-link2"
                      onClick={() => scrollToPage("contact")}
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <a
                className="navbar-brand text-start d-xxl-flex"
                href="#page-top"
                style={{ fontFamily: "Work Sans, sans-serif" }}
              ></a>

              <div
                className="nav-item dropdown no-arrow"
                style={{ width: "213.469px" }}
              >
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-toggle="dropdown"
                >
                  <span
                    id="name"
                    onClick={() => !token && routelogin()}
                    className="d-none d-lg-inline me-2 text-gray-600 small"
                    style={{ fontSize: "16px", marginLeft: "145px" }}
                  >
                    {token ? name : "Login"}
                  </span>
                  <img
                    onClick={() => !token && routelogin()}
                    className="border rounded-circle img-profile"
                    src={token ? dp : "/profile.png"}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginLeft: "10px",
                    }}
                  />
                </a>

                {token ? (
                  <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in">
                    <a className="dropdown-item" onClick={handledashboard}>
                      <i className="fas fa-user fa-sm fa-fw me-21 text-gray-400"></i>
                      &nbsp;Dashboard
                    </a>

                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={handlelogout}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw me-21 text-gray-400"></i>
                      &nbsp;Logout
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </nav>
        </body>

        <section
          id="record"
          style={{
            background: "url(/1_fg1a41nx0Wrqa-omfwkqPw.png) round",
            rgb: "(0,3,6)",
          }}
        >
          {rdata.map((r) => {
            result = r.find(({ who }) => who === params.who);
            // const extra = r.filter(function (item) {
            //   return item.who !== params.who;
            // });
            // result = inventory.find(({ name }) => name === "cherries");
            return (
              <div className="container">
                <h1
                  className="my-4"
                  style={{ color: "#FED136", background: "#c81e1d" }}
                >
                  <strong>{result.rname}</strong>

                  <br />
                </h1>
                <div className="row">
                  <div className="col-md-8">
                    <img
                      className="img-fluid"
                      src={result.rimage}
                      alt="Alt Text"
                      style={{ width: "760px", height: "444.5px" }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h3 className="my-3" style={{ color: "#fab822" }}>
                      <strong>About the record</strong>
                    </h3>
                    <br />
                    <p style={{ color: "rgb(255,255,255)" }}>{result.desc}</p>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "50px" }}>
                  <div className="col" style={{ textAlign: "center" }}>
                    <h3 className="my-3" style={{ color: "#fab822" }}>
                      <strong>Who</strong>
                    </h3>
                    <span
                      style={{
                        color: "rgb(255,255,255)",
                        fontSize: "18px",
                        borderStyle: "solid",
                        borderRadius: "25px",
                        padding: "5px",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <strong>{result.who}</strong>
                      <br />
                    </span>
                    <h3 className="my-3" style={{ color: "#fab822" }}>
                      <strong>Where</strong>
                    </h3>
                    <span
                      style={{
                        color: "rgb(255,255,255)",
                        fontSize: "18px",
                        borderStyle: "solid",
                        borderRadius: "25px",
                        padding: "5px",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <strong>{result.where}</strong>
                      <br />
                    </span>
                  </div>
                  <div className="col" style={{ textAlign: "center" }}>
                    <h3 className="my-3" style={{ color: "#fab822" }}>
                      <strong>What</strong>
                    </h3>
                    <span
                      style={{
                        color: "rgb(255,255,255)",
                        fontSize: "18px",
                        borderStyle: "solid",
                        borderRadius: "24px",
                        padding: "5px",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <strong>{result.what}</strong>
                      <br />
                    </span>
                    <h3 className="my-3" style={{ color: "#fab822" }}>
                      <strong>When</strong>
                    </h3>
                    <span
                      style={{
                        fontSize: "18px",
                        color: "rgb(255,255,255)",
                        borderStyle: "solid",
                        borderRadius: "25px",
                        padding: "5px",
                        paddingRight: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <strong>{result.when}</strong>
                      <br />
                    </span>
                  </div>
                </div>
                <br />
                <h3
                  className="my-4"
                  style={{ color: "#fab822", marginTop: "150px" }}
                >
                  <strong>Related Records</strong>
                  <br />
                </h3>
                {rdata.map((rd) => {
                  return (
                    <div className="row">
                      <div
                        className="col-sm-6 col-md-3 mb-4"
                        onClick={() => {
                          rd[0].who !== params.who
                            ? handleextra(rd[0].who)
                            : handleextra(rd[1].who);
                        }}
                      >
                        <a>
                          <img
                            className="img-fluid"
                            src={
                              rd[0].who !== params.who
                                ? rd[0].rimage
                                : rd[1].rimage
                            }
                          />
                        </a>
                        <p style={{ color: "rgb(255,255,255)" }}>
                          {rd[0].who !== params.who ? rd[0].rname : rd[1].rname}
                        </p>
                      </div>
                      <div
                        className="col-sm-6 col-md-3 mb-4"
                        onClick={() => {
                          rd[2].who !== params.who
                            ? handleextra(rd[2].who)
                            : handleextra(rd[3].who);
                        }}
                      >
                        <a>
                          <img
                            className="img-fluid"
                            src={
                              rd[2].who !== params.who
                                ? rd[2].rimage
                                : rd[3].rimage
                            }
                          />
                        </a>
                        <p style={{ color: "rgb(255,255,255)" }}>
                          {rd[2].who !== params.who ? rd[2].rname : rd[3].rname}
                        </p>
                      </div>
                      <div
                        className="col-sm-6 col-md-3 mb-4"
                        onClick={() => {
                          rd[4].who !== params.who
                            ? handleextra(rd[4].who)
                            : handleextra(rd[5].who);
                        }}
                      >
                        <a>
                          <img
                            className="img-fluid"
                            src={
                              rd[4].who !== params.who
                                ? rd[4].rimage
                                : rd[5].rimage
                            }
                          />
                        </a>
                        <p style={{ color: "rgb(255,255,255)" }}>
                          {rd[4].who !== params.who ? rd[4].rname : rd[5].rname}
                        </p>
                      </div>
                      <div
                        className="col-sm-6 col-md-3 mb-4"
                        onClick={() => {
                          rd[6].who !== params.who
                            ? handleextra(rd[6].who)
                            : handleextra(rd[7].who);
                        }}
                      >
                        <a>
                          <img
                            className="img-fluid"
                            src={
                              rd[6].who !== params.who
                                ? rd[6].rimage
                                : rd[7].rimage
                            }
                          />
                        </a>
                        <p style={{ color: "rgb(255,255,255)" }}>
                          {rd[6].who !== params.who ? rd[6].rname : rd[7].rname}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>

        <footer
          className="d-xl-flex justify-content-xl-center align-items-xl-center"
          style={{ height: "90px", background: "#001c33", marginTop: "-60px" }}
        >
          <div className={`${styles.container}`}>
            <div className="row">
              <div
                className="col d-xl-flex justify-content-xl-center align-items-xl-center"
                style={{ textAlign: "center" }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "rgb(133,135,150)",
                  }}
                >
                  Copyright&nbsp;© Athletistan 2022
                  <br />
                </span>
              </div>
              <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
                <a className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons">
                  <i
                    className="fa fa-twitter"
                    style={{ color: "rgb(255,255,255)" }}
                  ></i>
                </a>
                <a className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons">
                  <i
                    className="fa fa-facebook"
                    style={{ color: "rgb(255,255,255)" }}
                  ></i>
                </a>
                <a className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons">
                  <i
                    className="fa fa-instagram"
                    style={{ color: "rgb(255,255,255)" }}
                  ></i>
                </a>
              </div>
              <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
                <a
                  style={{
                    fontSize: "14.4px",
                    marginRight: "8px",
                    color: "rgb(250,184,34)",
                  }}
                >
                  Privacy Policy
                  <br />
                </a>
                <a
                  style={{
                    fontSize: "14.4px",
                    marginRight: "8px",
                    color: "rgb(250,184,34)",
                  }}
                >
                  Terms of Use
                  <br />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default Recorddetails;
