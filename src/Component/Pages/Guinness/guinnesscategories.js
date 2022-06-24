import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import { LOGOUT } from "../../../constants/actionTypes";
import styles from "./guinnesscategories.module.css";
import CountUp from "react-countup";
import { scroller } from "react-scroll";

import "./navbar.css";

const Guinnesscategories = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [guinnessdata, setguinnessdata] = useState([]);
  const [video1, setVideo1] = useState(false);
  const [video2, setVideo2] = useState(false);
  const [video3, setVideo3] = useState(false);
  const [video4, setVideo4] = useState(false);

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/guinness/data`)
      .then((res) => {
        setguinnessdata(res.data);
      });
    {
      window.scrollTo(0, 0);
    }
  }, []);

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

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

  //   const routemyprofile = () => {
  //     history.push("/myprofile");
  //   };

  const handledashboard = () => {
    history.push("/dashboard");
  };

  const handleid = (name) => {
    history.push(`/categoryrecords/${name}`);
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
        <header
          className="header-blue"
          style={{
            marginTop: "100px",
            background:
              "url(/bg-pattern.png), linear-gradient(135deg, #172a74, #21a9af), #184e8e",
            paddingBottom: "0px",
          }}
        >
          <div className={`${styles.container} hero`}>
            <div className="row d-xxl-flex justify-content-xxl-end">
              <div
                className="col-12 col-lg-6 col-xl-5 offset-xl-1"
                style={{
                  marginLeft: "120px",
                  width: "740.078px",
                  marginTop: "68px",
                  marginBottom: "100px",
                }}
              >
                <h1 style={{ marginTop: "94px", color: "white" }}>
                  HAVE COURAGE TO BREAK A{" "}
                  <strong>GUINNESS WORLD RECORD?</strong> ATHLETISTAN IS FOR
                  YOU!{" "}
                </h1>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "white",
                  }}
                >
                  In the history of Pakistan, Athletistan brings you the
                  platfrom and provides the opportunity to showcase your talent
                  and be a part of Guinness World Record.{" "}
                </p>
                <button
                  onClick={handleClick}
                  className={`${styles.btng} btn-light btn-lg action-button`}
                  type="button"
                  style={{ fontSize: "21px", marginTop: "8px" }}
                >
                  Learn More
                </button>
              </div>
              <div
                className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block d-xxl-flex justify-content-xxl-center phone-holder"
                style={{ marginTop: "14px" }}
              >
                <div className="phone-mockup">
                  <img
                    className="device"
                    src="/ImageHeader.png"
                    style={{
                      width: "503px",
                      marginRight: "0px",
                      marginLeft: "127px",
                      marginBottom: "0px",
                      marginTop: "30px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
        <section
          id="counter"
          style={{
            background: "rgb(248,249,250)",
            paddingBottom: "0px",
            paddingTop: "180px",
          }}
        >
          <div className={`${styles.container}`}>
            <section style={{ backgroundColor: "#ffffff", paddingTop: "-1px" }}>
              <div className="container-fluid text-white">
                <div className="row">
                  <div
                    className="col-md-6 col-lg-4 text-center pb-5 pt-5 number-item love_counter"
                    style={{ background: "#001C33", borderStyle: "double" }}
                  >
                    <h1
                      className="love_count"
                      style={{ fontSize: "70px", color: "#fab822" }}
                    >
                      <CountUp end={15} redraw={true} suffix="+">
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                    </h1>
                    <h4
                      style={{
                        color: "#ffffff",
                        marginTop: "-6px",
                        fontSize: "35px",
                      }}
                    >
                      Categories
                    </h4>
                  </div>
                  <div
                    className="col-md-6 col-lg-4 text-center pb-5 pt-5 love_counter"
                    style={{ background: "#012c4f", borderStyle: "double" }}
                  >
                    <h1
                      className="love_count"
                      style={{ fontSize: "70px", color: "#fab822" }}
                    >
                      <CountUp end={250} redraw={true} suffix="+">
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                    </h1>
                    <h4
                      style={{
                        color: "#ffffff",
                        marginTop: "-6px",
                        fontSize: "35px",
                      }}
                    >
                      World Records
                    </h4>
                  </div>
                  <div
                    className="col-lg-4 text-center pb-5 pt-5 love_counter"
                    style={{ background: "#192e40", borderStyle: "double" }}
                  >
                    <h1
                      className="love_count"
                      style={{ fontSize: "70px", color: "#fab822" }}
                    >
                      <CountUp end={20} redraw={true} suffix="+">
                        {({ countUpRef, start }) => (
                          <VisibilitySensor onChange={start} delayedCall>
                            <span ref={countUpRef} />
                          </VisibilitySensor>
                        )}
                      </CountUp>
                    </h1>
                    <h4
                      style={{
                        color: "#ffffff",
                        marginTop: "-6px",
                        fontSize: "35px",
                      }}
                    >
                      Pakistani Record Holders
                    </h4>
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

            paddingBottom: "130px",
            paddingTop: "180px",
          }}
        >
          <div
            className={`${styles.container}`}
            style={{
              paddingRight: "70px",
              paddingLeft: "70px",
              background: "rgb(248,249,250)",
            }}
          >
            <div className="row" style={{ paddingTop: "50px" }}>
              <div className="col">
                <h1
                  className="text-uppercase"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "center",
                    color: "rgb(0,0,0)",
                  }}
                >
                  Categories of Guinness World Record
                </h1>
              </div>
            </div>
            <div
              className="row"
              style={{
                marginBottom: "50px",
                marginTop: "100px",
                // paddingLeft: "250px",
                // paddingRight: "250px",
              }}
            >
              {guinnessdata.map((gd) => {
                return (
                  <div
                    className="col"
                    style={{
                      background: "#ffffff",
                      margin: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleid(gd.catname)}
                  >
                    <div
                      className="row d-xl-flex"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="col d-xl-flex justify-content-xl-center">
                        <img
                          className="img-fluid"
                          classname={`${styles.boxanim}`}
                          src={gd.catimage}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div
                        className="col d-xl-flex justify-content-xl-center"
                        // style={{
                        //   alignItems: "center",
                        //   justifyContent: "center",
                        // }}
                      >
                        <div
                          style={{
                            paddingTop: "25px",

                            paddingBottom: "25px",
                            width: "380px",
                            cursor: "pointer",
                          }}
                        >
                          <h4
                            style={{
                              color: "black",
                              fontFamily: "Montserrat, sans-serif",
                              textAlign: "center",
                              marginRight: "20px",
                              marginTop: "auto",
                              marginBottom: "auto",
                            }}
                          >
                            <strong style={{ paddingLeft: "18px" }}>
                              {gd.catname}
                            </strong>
                            <br />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <div className="recordbreak"></div>
        <section
          className={`text-center ${styles.bg_primary} download`}
          style={{
            background: "url(/maxresdefault1.jpg) round",
            marginTop: "90px",
            marginBottom: "-90px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <h2
                  className="section-heading"
                  style={{
                    fontSize: "70px",
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    paddingTop: "50px",
                    fontWeight: "bold",
                  }}
                >
                  Want to break Guinness World Record?
                </h2>
                <p style={{ color: "black" }}>
                  Athletistan provides you the opportunity to showcase your
                  talent through our platform and become a Guinness World Record
                  holder.&nbsp;
                </p>
                <div className="badges">
                  <a
                    className={`${styles.btng} btn-primary ${styles.btnapproach}`}
                    role="button"
                    onClick={handleapproachus}
                    style={{ marginBottom: "50px" }}
                  >
                    Approach Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="gwrpak" style={{ marginTop: "180px" }}>
          <div
            className={`${styles.container}`}
            style={{ background: "rgb(248,249,250)" }}
          >
            <div className="row" style={{ paddingTop: "50px" }}>
              <div className="col">
                <h1
                  className="text-uppercase"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "center",
                    color: "rgb(0,0,0)",
                  }}
                >
                  Top Guinness World Records of pakistan
                </h1>
              </div>
            </div>
            <div className="row" style={{ marginTop: "65px" }}>
              <div
                className="col d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.25)",
                    margin: "14px",
                    minWidth: "280px",
                    maxWidth: "300px",
                    marginBottom: "20px",
                    marginLeft: "20px",
                    background: "#001c33",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "url(/muhammadrashid.jpg) center / contain",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  ></div>
                  <div
                    className="card-body d-flex flex-column"
                    style={{ height: "262px" }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "700",
                          color: "#fed136",
                        }}
                      >
                        Muhammad Rashid
                      </h4>
                      <h6
                        className={`${styles.text_muted} mb-2`}
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "600",
                          color: "#b8b8b8",
                        }}
                      >
                        Record Year: 2020
                      </h6>
                      <p
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "#ffffff",
                          marginTop: "16px",
                        }}
                      >
                        - Most walnuts crushed by the hand in one minute (284)
                        <br />
                      </p>
                    </div>
                    <a
                      className="card-link align-self-center"
                      data-bss-hover-animate="pulse"
                      style={{
                        padding: "4px",
                        background: "#fab822",
                        color: "#ffffff",
                        borderRadius: "17px",
                        paddingRight: "14px",
                        paddingLeft: "14px",
                        paddingBottom: "6px",
                        fontFamily: "Montserrat, sans-serif",
                        marginTop: "auto",
                      }}
                      data-bs-target="#muhammadrashid"
                      data-bs-toggle="modal"
                      onClick={() => setVideo1(true)}
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.25)",
                    margin: "14px",
                    minWidth: "280px",
                    maxWidth: "300px",
                    marginBottom: "20px",
                    background: "#001c33",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "url(SyedaKisaZehra.jpg) center / contain",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  ></div>
                  <div
                    className="card-body d-flex flex-column"
                    style={{ height: "262px" }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "700",
                          color: "#fed136",
                        }}
                      >
                        Syeda Kisa Zehra
                      </h4>
                      <h6
                        className={`${styles.text_muted} mb-2`}
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "600",
                          color: "#b8b8b8",
                        }}
                      >
                        Record Year: 2021
                      </h6>
                      <p
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "#ffffff",
                          marginTop: "16px",
                        }}
                      >
                        - Most Historic/Future (fictional) Dates Memorized in 5
                        Minutes.
                        <br />
                      </p>
                    </div>
                    <a
                      className="card-link align-self-center"
                      data-bss-hover-animate="pulse"
                      style={{
                        padding: "4px",
                        background: "#fab822",
                        color: "#ffffff",
                        borderRadius: "17px",
                        paddingRight: "14px",
                        paddingLeft: "14px",
                        paddingBottom: "6px",
                        fontFamily: "Montserrat, sans-serif",
                        marginTop: "auto",
                      }}
                      data-bs-target="#syedakisazehra"
                      data-bs-toggle="modal"
                      onClick={() => setVideo2(true)}
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.25)",
                    margin: "14px",
                    minWidth: "280px",
                    maxWidth: "300px",
                    marginBottom: "20px",
                    background: "#001c33",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "url(/DaniyalMehsood.jpg) center / contain",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  ></div>
                  <div
                    className="card-body d-flex flex-column"
                    style={{ height: "262px" }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "700",
                          color: "#fed136",
                        }}
                      >
                        Daniyal Mehsood
                      </h4>
                      <h6
                        className={`${styles.text_muted} mb-2`}
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "600",
                          color: "#b8b8b8",
                        }}
                      >
                        Record Year: 2021
                      </h6>
                      <p
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "#ffffff",
                          marginTop: "16px",
                        }}
                      >
                        - Most kip-ups in one minute (52 Total Number)
                        <br />
                      </p>
                    </div>
                    <a
                      className="card-link align-self-center"
                      data-bss-hover-animate="pulse"
                      style={{
                        padding: "4px",
                        background: "#fab822",
                        color: "#ffffff",
                        borderRadius: "17px",
                        paddingRight: "14px",
                        paddingLeft: "14px",
                        paddingBottom: "6px",
                        fontFamily: "Montserrat, sans-serif",
                        marginTop: "auto",
                      }}
                      data-bs-target="#daniyalmehsood"
                      data-bs-toggle="modal"
                      onClick={() => setVideo3(true)}
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col d-xxl-flex justify-content-xxl-center align-items-xxl-center"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.25)",
                    margin: "14px",

                    minWidth: "280px",
                    maxWidth: "300px",
                    marginBottom: "20px",
                    background: "#001c33",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      background: "url(/UnaizaAliBarlas.jpg) center / contain",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  ></div>
                  <div
                    className="card-body d-flex flex-column"
                    style={{ height: "262px" }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "700",
                          color: "#fed136",
                        }}
                      >
                        Unaiza Ali Barlas
                      </h4>
                      <h6
                        className={`${styles.text_muted} mb-2`}
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: "600",
                          color: "#b8b8b8",
                        }}
                      >
                        Record Year: 2018
                      </h6>
                      <p
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "#ffffff",
                          marginTop: "16px",
                        }}
                      >
                        -&nbsp;Longest cartoon strip (individual)
                        <br />
                      </p>
                    </div>
                    <a
                      className="card-link align-self-center"
                      data-bss-hover-animate="pulse"
                      style={{
                        padding: "4px",
                        background: "#fab822",
                        color: "#ffffff",
                        borderRadius: "17px",
                        paddingRight: "14px",
                        paddingLeft: "14px",
                        paddingBottom: "6px",
                        fontFamily: "Montserrat, sans-serif",
                        marginTop: "auto",
                      }}
                      data-bs-target="#unaizaalibarlas"
                      data-bs-toggle="modal"
                      onClick={() => setVideo4(true)}
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className={`${styles.modal} ${video1 && `${styles.show}`}`}
          role="dialog"
          tabindex="-1"
          id="muhammadrashid"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ width: "1000px", height: "400px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setVideo1(false)}
                >
                  X
                </button>
              </div>
              <div className="video-container">
                {video1 ? (
                  <iframe
                    style={{ width: "498px", height: "400px" }}
                    allowfullscreen=""
                    frameborder="0"
                    src="https://www.youtube.com/embed/uxgo4wfCztM"
                  ></iframe>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.modal} ${video2 && `${styles.show}`}`}
          role="dialog"
          tabindex="-1"
          id="syedakisazehra"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ width: "1000px", height: "400px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setVideo2(false)}
                >
                  X
                </button>
              </div>
              <div className="video-container">
                {video2 ? (
                  <iframe
                    style={{ width: "498px", height: "400px" }}
                    allowfullscreen=""
                    frameborder="0"
                    src="https://www.youtube.com/embed/PtHbgEgrh6E"
                  ></iframe>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.modal} ${video3 && `${styles.show}`}`}
          role="dialog"
          tabindex="-1"
          id="daniyalmehsood"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ width: "1000px", height: "400px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setVideo3(false)}
                >
                  X
                </button>
              </div>
              <div className="video-container">
                {video3 ? (
                  <iframe
                    style={{ width: "498px", height: "400px" }}
                    allowfullscreen=""
                    frameborder="0"
                    src="https://www.youtube.com/embed/p1fWy9FSdPM"
                  ></iframe>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.modal} ${video4 && `${styles.show}`}`}
          role="dialog"
          tabindex="-1"
          id="unaizaalibarlas"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ width: "1000px", height: "400px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setVideo4(false)}
                >
                  X
                </button>
              </div>
              <div className="video-container">
                {video4 ? (
                  <iframe
                    style={{ width: "498px", height: "400px" }}
                    allowfullscreen=""
                    frameborder="0"
                    src="https://www.youtube.com/embed/O83oXeBoYG8"
                  ></iframe>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className={`${styles.modal} ${video4 && `${styles.show}`}`}
          role="dialog"
          tabindex="-1"
          id="unaizaalibarlas"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
            style={{ width: "1000px", height: "400px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setVideo4(false)}
                >
                  X
                </button>
              </div>
              <div className="video-container">
                {video4 ? (
                  <iframe
                    style={{ width: "498px", height: "400px" }}
                    allowfullscreen=""
                    frameborder="0"
                    src="https://www.youtube.com/embed/O83oXeBoYG8"
                  ></iframe>
                ) : null}
              </div>
            </div>
          </div>
        </div> */}
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

export default Guinnesscategories;
