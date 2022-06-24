import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import VisibilitySensor from "react-visibility-sensor";

import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import styles from "./olympics.module.css";
import CountUp from "react-countup";
import { scroller } from "react-scroll";
import "./styles.css";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import Card from "./Cards/Card";
import CardNews from "./Cards/CardNews";
import CardNews1 from "./Cards/CardNews1";
import CardNews2 from "./Cards/CardNews2";
import CardNews3 from "./Cards/CardNews3";
import CardNews4 from "./Cards/CardNews4";
import CardNews5 from "./Cards/CardNews5";
import CardNews6 from "./Cards/CardNews6";
import CardNews7 from "./Cards/CardNews7";
import CardNews8 from "./Cards/CardNews8";
import { config } from "react-spring";
import Carroussel from "./Carroussel";

import "./navbar.css";

const Olympics = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [olympicsdata, setolympicsdata] = useState([]);
  // const [video1, setVideo1] = useState(false);
  // const [video2, setVideo2] = useState(false);
  // const [video3, setVideo3] = useState(false);
  // const [video4, setVideo4] = useState(false);

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/data`)
      .then((res) => {
        setolympicsdata(res.data);
      });
    {
      window.scrollTo(0, 0);
    }
  }, []);

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

  const handledashboard = () => {
    history.push("/dashboard");
  };

  const scrollTarget = (target) =>
    scroller.scrollTo(target, {
      smooth: "easeInOutQuart",
      duration: 800,
      delay: 0,
    });
  const scrollToPage = async (target) => {
    if (history.location.pathname !== "/") {
      await history.push("/");
    }
    scrollTarget(target);
  };

  const handleClick = () => {
    scroller.scrollTo("recordbreak", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const handleredirect = () => {
    history.push("/searchacoach");
  };

  const handleredirect1 = () => {
    history.push("/poa");
  };

  const handleclick = () => {
    history.push("/historyolympics");
  };

  console.log("olympicsdata", olympicsdata);

  let cards = [
    {
      key: uuidv4(),
      content: <CardNews />,
    },
    {
      key: uuidv4(),
      content: <CardNews1 />,
    },
    {
      key: uuidv4(),
      content: <CardNews2 />,
    },
    {
      key: uuidv4(),
      content: <CardNews3 />,
    },
    {
      key: uuidv4(),
      content: <CardNews4 />,
    },
    {
      key: uuidv4(),
      content: <CardNews5 />,
    },
    {
      key: uuidv4(),
      content: <CardNews6 />,
    },
    {
      key: uuidv4(),
      content: <CardNews7 />,
    },
    {
      key: uuidv4(),
      content: <CardNews8 />,
    },
  ];
  const handleid = (name) => {
    console.log("name", name);
    history.push(`/olympicsdetails/${name}`);
  };
  return (
    <div>
      <body style={{ background: "rgb(248,249,250)" }}>
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
        <header
          className="header_blue"
          style={{
            marginTop: "100px",
            background: "url(/headerolympics.jpg) round #184e8e",
            paddingBottom: "0px",
          }}
        >
          <div className="container hero">
            <div className={`${styles.row} d-xxl-flex justify-content-xxl-end`}>
              <div
                className="col-12 col-lg-6 col-xl-5 offset-xl-1"
                style={{
                  marginLeft: "0px",
                  width: "740.078px",
                  marginTop: "53px",
                  marginBottom: "100px",
                }}
              >
                <h1
                  style={{
                    marginTop: "94px",
                    marginBottom: "0px",
                    lineHeight: "1.2",
                    color: "#fff",
                    fontSize: "50px",
                    fontWeight: "300",
                  }}
                >
                  WANT TO BE AN
                  <br />
                </h1>
                <h1
                  style={{
                    fontSize: "99px",
                    marginTop: "-10px",
                    marginRight: "10px",
                    marginBottom: "25px",
                    lineHeight: "1.2",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  OLYMPIAN?
                </h1>
                <span
                  style={{
                    fontSize: "34px",
                    marginTop: "30px",
                    marginBottom: "0px",
                    background: "rgb(0, 0, 0, 0.5)",
                    color: "rgb(255,255,255)",
                    padding: "15px",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Athletistan is here!
                </span>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    marginTop: "26px",
                    fontSize: "20px",
                    marginBottom: "30px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "300",
                  }}
                >
                  Athletistan provides a platform for the athletes of Pakistan
                  who wish to be a part of Olympics. They may find experienced
                  coach according to their needs.
                </p>
                <button
                  className="btn btn-light btn-lg action-button"
                  type="button"
                  style={{ fontSize: "21px" }}
                  onClick={handleclick}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </header>
        <section
          id="counter"
          style={{ background: "rgb(248,249,250)", padding: "150px 0" }}
        >
          <div
            className="container"
            style={{
              background: "#ffffff",
              maxWidth: "1250px",
              width: "100%",
              paddingRight: "var(--bs-gutter-x, 0.75rem)",
              paddingLeft: "var(--bs-gutter-x, 0.75rem)",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <section
              style={{
                backgroundColor: "initial",
                color:
                  "rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important",
                paddingTop: "3rem !important",
                paddingBottom: "3rem !important",
              }}
            >
              <div
                className="container text-center boxed-countdown"
                data-countdown="11/27/2020 02:51:00"
              >
                <div className="row">
                  <div
                    className="col-6 col-md-3"
                    style={{
                      flex: "0 0 auto",
                      width: "25%",
                      marginTop: "1rem !important",
                    }}
                  >
                    <p
                      style={{
                        background: "rgb(0,130,201)",
                        padding: "2rem 0",
                        fontSize: "5rem",
                        lineHeight: "1",
                        borderTopLeftRadius: "0.25rem !important",
                        borderTopRightRadius: "0.25rem !important",
                        margin: "0 !important",
                        color: "white",
                      }}
                    >
                      <CountUp end={206} redraw={true}>
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                    </p>
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        background: "rgba(0,0,0,0.33)",
                        padding: "0.5rem 0 .6rem",
                        margin: "0",
                        fontSize: "1.5rem",
                        borderBottomRightRadius: "0.25rem !important",
                        borderBottomLeftRadius: "0.25rem !important",
                        color: "white",
                      }}
                    >
                      Countries
                    </p>
                  </div>
                  <div
                    className="col-6 col-md-3"
                    style={{ marginTop: "1rem !important" }}
                  >
                    <p
                      style={{
                        background: "rgb(250,184,34)",
                        padding: "2rem 0",
                        fontSize: "5rem",
                        lineHeight: "1",
                        borderTopLeftRadius: "0.25rem !important",
                        borderTopRightRadius: "0.25rem !important",
                        margin: "0 !important",
                        color: "white",
                      }}
                    >
                      <CountUp end={40} redraw={true}>
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                    </p>
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        background: "rgba(0,0,0,0.33)",
                        padding: "0.5rem 0 .6rem",
                        margin: "0",
                        fontSize: "1.5rem",
                        borderBottomRightRadius: "0.25rem !important",
                        borderBottomLeftRadius: "0.25rem !important",
                        color: "white",
                      }}
                    >
                      Sports and Games
                    </p>
                  </div>
                  <div
                    className="col-6 col-md-3"
                    style={{ marginTop: "1rem !important" }}
                  >
                    <p
                      style={{
                        background: "rgb(0,167,80)",
                        padding: "2rem 0",
                        fontSize: "5rem",
                        lineHeight: "1",
                        borderTopLeftRadius: "0.25rem !important",
                        borderTopRightRadius: "0.25rem !important",
                        margin: "0 !important",
                        color: "white",
                      }}
                    >
                      <CountUp end={87} redraw={true}>
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                    </p>
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        background: "rgba(0,0,0,0.33)",
                        padding: "0.5rem 0 .6rem",
                        margin: "0",
                        fontSize: "1.5rem",
                        borderBottomRightRadius: "0.25rem !important",
                        borderBottomLeftRadius: "0.25rem !important",
                        color: "white",
                      }}
                    >
                      Pakistani Olympians
                    </p>
                  </div>
                  <div
                    className="col-6 col-md-3"
                    style={{ marginTop: "1rem !important" }}
                  >
                    <p
                      style={{
                        background: "rgb(238,48,77)",
                        padding: "2rem 0",
                        fontSize: "5rem",
                        lineHeight: "1",

                        borderTopLeftRadius: "0.25rem !important",
                        borderTopRightRadius: "0.25rem !important",
                        margin: "0 !important",
                        color: "white",
                      }}
                    >
                      <CountUp end={10} redraw={true}>
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                    </p>
                    <p
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        background: "rgba(0,0,0,0.33)",
                        padding: "0.5rem 0 .6rem",
                        margin: "0",
                        fontSize: "1.5rem",
                        borderBottomRightRadius: "0.25rem !important",
                        borderBottomLeftRadius: "0.25rem !important",
                        color: "white",
                      }}
                    >
                      Pakistan Medals
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section
          id="categories"
          style={{
            background: "rgb(248,249,250)",
            marginTop: "0px",
            paddingBottom: "130px",
          }}
        >
          <div
            className="container"
            style={{
              paddingRight: "70px",
              paddingLeft: "70px",
              background: "#ffffff",
            }}
          >
            <div className={`${styles.row}`} style={{ paddingTop: "50px" }}>
              <div className="col">
                <h1
                  className="text-uppercase"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "center",
                    color: "rgb(0,0,0)",
                    textTransform: "uppercase !important",
                    fontWeight: "normal",
                    lineHeight: "1.2",
                  }}
                >
                  list of olympic sports
                </h1>
              </div>
            </div>
            <div
              className={`${styles.rowContainer}`}
              style={{ marginBottom: "50px", marginTop: "100px" }}
            >
              {olympicsdata.map((od) => {
                return (
                  <div
                    className={`${styles.colContainer}`}
                    style={{
                      background: "#ffffff",
                      margin: "15px",
                      // float: "left",
                      // boxSizing: "border-box",
                      // padding: "0 0.75rem",
                      // minHeight: "1px",
                    }}
                    onClick={() => handleid(od.name)}
                  >
                    <img
                      className={`${styles.imgFluid}`}
                      src={od.gameimage}
                      style={{ borderRadius: "402px" }}
                    />
                    <div
                      style={{
                        paddingTop: "25px",
                        paddingRight: "25px",
                        paddingBottom: "25px",
                        paddingLeft: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <h4
                        style={{
                          color: "rgb(0,0,0)",
                          fontFamily: "Montserrat, sans-serif",
                          textAlign: "center",
                        }}
                        className={`${styles.name}`}
                      >
                        <strong>{od.name}</strong>
                        <br />
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="text-center bg-primary download"
          id="partofolympics"
          style={{
            background: "url(/partolympics.jpg) round",
            textAlign: "center !important",
          }}
        >
          <div
            className="container"
            style={{
              width: "100%",
              paddingRight: "var(--bs-gutter-x, 0.75rem)",
              paddingLeft: "var(--bs-gutter-x, 0.75rem)",
              marginRight: "auto",
              marginLeft: "auto",
              maxWidth: "1140px",
            }}
          >
            <div className="row" style={{ maxWidth: "600px" }}>
              <div
                className="col"
                style={{
                  float: "left",
                  boxSizing: "borderBox",
                  padding: "0 0.75rem",
                  minHeight: "1px",
                  flex: "1 0 0%",
                }}
              >
                <div>
                  <h1
                    style={{
                      textAlign: "left",
                      color: "#ee2e39",
                      letterSpacing: "5px",
                      fontSize: "50px",
                      lineHeight: "1.2",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: "normal",
                      marginTop: "0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong>WANT TO EARN A&nbsp;</strong>
                  </h1>
                  <h1
                    style={{
                      textAlign: "left",
                      color: "#1d4076",
                      fontSize: "49px",
                      fontWeight: "bolder",
                      lineHeight: "1.2",
                      fontFamily: "Montserrat, sans-serif",
                      marginTop: "0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <strong>MEDAL IN OLYMPICS</strong>
                  </h1>
                </div>
                <div style={{ marginTop: "71px", textAlign: "left" }}>
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "left",
                      fontSize: "20px",
                      marginBottom: "1rem",
                      marginTop: "0",
                      lineHeight: "1.75",
                    }}
                  >
                    Athletistan provides you the oppotunity to find experienced
                    coaches according to your needs that help you to achieve a
                    medal in Olympics.
                    <br />
                  </p>
                  <button
                    onClick={handleredirect}
                    className="btn btn-primary btnsearchacoach"
                    type="button"
                    style={{ marginTop: "57px", fontSize: "20px" }}
                  >
                    Search a Coach
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="topplayers" style={{ background: "#f8f9fa" }}>
          <div className="container" style={{ display: "contents" }}>
            <div
              className="row"
              style={{
                padding: "80px",
                minWidth: "1200px",
                height: "600px",
                background:
                  "linear-gradient(#11998e, rgba(189,195,199,0.5)), url(16130894_101.jpg) round , #001C33",
                borderRadius: "11px",
                backgroundSize: "auto, cover, auto",
              }}
            >
              <div className="col">
                <div className="row" style={{ height: "auto" }}>
                  <div className="col">
                    <h1
                      style={{
                        textAlign: "center",
                        color: "rgb(255,255,255)",
                        letterSpacing: "2px",
                        lineHeight: "55px",
                        background: "rgba(0,0,0,0.15)",
                        borderRadius: "20px",
                        marginTop: "70px",
                      }}
                    >
                      <strong>Top Players of Athletistan</strong>
                      <br />
                      See the top players recommended by our coaches that are
                      recommending to Pakistan Olympic Association&nbsp;
                      <br />
                    </h1>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "40px" }}>
                  <div className="col d-xl-flex justify-content-xl-center">
                    <button
                      onClick={handleredirect1}
                      className={`btn ${styles.btntopplayers}`}
                      type="button"
                    >
                      Click here to view
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="successstories" style={{ background: "rgb(248,249,250)" }}>
          <div className="container" style={{ background: "#ffffff" }}>
            <div className="row" style={{ paddingTop: "50px" }}>
              <div className="col">
                <h1
                  className="text-uppercase"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "center",
                    color: "rgb(0,0,0)",
                    textTransform: "uppercase !important",
                  }}
                >
                  pakistani Olympic heroes who beat the odds
                  <br />
                </h1>
              </div>
            </div>
            <div className="row" style={{ marginTop: "35px", height: "700px" }}>
              <div className="col" id="successstorycard">
                <Carroussel
                  cards={cards}
                  height="600px"
                  width="80%"
                  margin="0 auto"
                  offset={2}
                  showArrows={true}
                />
              </div>
            </div>
          </div>
        </section>
        <footer
          className="d-xl-flex justify-content-xl-center align-items-xl-center"
          style={{ height: "90px", marginTop: "100px", background: "#001c33" }}
        >
          <div className="container">
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

export default Olympics;
