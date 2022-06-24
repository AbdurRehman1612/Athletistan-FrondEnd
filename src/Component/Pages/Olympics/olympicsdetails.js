import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import { WorldMap } from "./map";
import styles from "./olympicsdetails.module.css";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Line } from "react-chartjs-2";
import "./styles1.css";
import { scroller } from "react-scroll";
import "./navbar.css";

const Olympicsdetails = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [odata, setodata] = useState([]);
  const [asia, setasia] = useState([]);
  const [rotw, setrotw] = useState([]);
  const params = useParams();

  console.log("params", params);
  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/odetails`, {
        params: {
          name: params.name,
        },
      })
      .then((res) => {
        console.log("res.dataaaaaaaaaaaa", res.data);
        setodata(res.data);
      });
    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/asia`, {
        params: {
          name: params.name,
        },
      })
      .then((res) => {
        console.log("res.dataaaaaaaaaaaa", res.data);
        setasia(res.data);
        console.log("ASIA", asia);
      });

    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/rotw`, {
        params: {
          name: params.name,
        },
      })
      .then((res) => {
        console.log("res.dataaaaaaaaaaaaaaaaa", res.data);

        setrotw(res.data);
        console.log("ROTWWW", rotw);
      });
  }, []);

  // const func = (m) => {
  //   const result = m.find(({ name }) => name.who === params.who);
  //   console.log("x", result);
  // };

  // console.log("xxxxxxxxx", x);
  //   };

  const Wrapper = styled.div`
    position: absolute,
    height: 1600px,
  `;

  const ChildWrapper = styled.div`
    position: absolute;
    ${(props) =>
      props.pin &&
      props.pin.type === "type1" &&
      css`
        border: 1px solid blue;
      `};
    ${(props) =>
      props.pin &&
      props.pin.type === "type2" &&
      css`
        border: 1px solid green;
      `};
    ${(props) =>
      props.pin &&
      props.pin.x &&
      css`
        left: ${props.pin.x}%;
      `};
    ${(props) =>
      props.pin &&
      props.pin.y &&
      css`
        top: ${props.pin.y}%;
      `};
  `;

  const Child = ({ value, pin, id, removePin, changePinType }) => (
    <ChildWrapper pin={pin}>
      {pin.type === "" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            changePinType(id, "type1");
          }}
        >
          Type 1
        </button>
      )}
      {pin.type === "" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            changePinType(id, "type2");
          }}
        >
          Type 2
        </button>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          removePin(id);
        }}
      >
        x
      </button>
    </ChildWrapper>
  );

  const token = useSelector((state) => state.auth?.authData?.token);
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const [pins, setpins] = useState([]);
  const [continent, setcontinent] = useState([]);

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

  const data = {
    labels: ["2000", "2004", "2008", "2012", "2016", "2020"],
    datasets: [
      {
        label: "Rest of the World",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(131,138,133,0.4)",
        borderColor: "rgba(131,138,133,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(131,138,133,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(131,138,133,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: rotw[0],
      },
      {
        label: "Asia",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(47,153,76,0.4)",
        borderColor: "rgba(47,153,76,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(47,153,76,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(47,153,76,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: asia[0],
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              return value;
            },
          },
        },
      ],
    },
  };

  const _removePin = (id) => {
    setpins({
      pins: pins.filter((pin, index) => index !== id),
    });
  };

  const _changePinType = (id, type) => {
    setpins({
      pins: pins.map((pin, index) =>
        id === index
          ? {
              ...pin,
              ...{ type: type },
            }
          : pin
      ),
    });
  };

  console.log("data", odata);
  console.log("asia", odata.asia);
  console.log("rotw", odata.rotw);

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

        {odata.map((od) => {
          // setasia(od.asia);
          // setrotw(od.restoftheworld);
          return (
            <div>
              <header
                style={{
                  height: "100%",
                  padding: "0",
                  display: "table",
                  width: "100%",
                  height: "auto",
                  padding: "200px 0",
                  textAlign: "center",
                  color: "#fff",

                  background: "url(/headerolympics1.jpg) round",
                  marginTop: "100px",
                }}
              >
                <div style={{ display: "tableCell", verticalAlign: "middle" }}>
                  <div style={{ justifyContent: "center" }}>
                    <div className="row">
                      <div className="col-lg-8 mx-auto">
                        <h1
                          style={{
                            fontSize: "8vw",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            margin: "0 0 35px",
                            lineHeight: "1.2",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          {od.name}
                        </h1>
                        <p
                          style={{
                            fontSize: "22px",
                            lineHeight: "1.6",
                            margin: "0 0 35px",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          {od.initialtext}
                        </p>
                        <a
                          className="btn btn-link btn-headolym"
                          role="button"
                          href="#about"
                        >
                          <i className="fa fa-angle-double-down"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <section
                className="text-center content-section"
                id="about"
                style={{
                  paddingTop: "200px",
                  paddingBottom: "200px",
                  background: "linear-gradient(90deg, #141E30, #243B55)",
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <h2
                        style={{
                          fontSize: "3rem",
                          fontWeight: "700",
                          margin: "0 0 35px",
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          color: "#fab822",
                          lineHeight: "1.2",
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        About the sports
                      </h2>
                      <p
                        style={{
                          fontSize: "20px",
                          lineHeight: "1.6",
                          margin: "0 0 35px",
                          color: "rgb(255,255,255)",
                          textAlign: "justify",
                        }}
                      >
                        {od.history}
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section
                id="threeboxes"
                style={{ background: "rgb(248,249,250)" }}
              >
                <div
                  className="container"
                  style={{
                    background: "#ffffff",
                    maxWidth: "1250px",
                    paddingRight: "60px",
                    paddingLeft: "60px",
                  }}
                >
                  <section
                    style={{
                      backgroundColor: "initial !important",
                      color:
                        "rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important",
                      paddingTop: "5rem !important",
                      paddingBottom: "5rem !important",
                    }}
                  >
                    <div
                      className="container text-center boxed-countdown"
                      data-countdown="11/27/2020 02:51:00"
                    >
                      <div className="row d-xl-flex justify-content-xl-center">
                        <div
                          className="col-6 col-md-3"
                          style={{
                            flex: "0 0 auto",
                            marginTop: "1rem !important",
                          }}
                        >
                          <p
                            style={{
                              background: "rgb(255,255,255)",
                              padding: "2rem 0",
                              fontSize: "5rem",
                              lineHeight: "1",
                              margin: "0 !important",
                              borderRadius: "80px",
                              borderStyle: "solid",
                              color: "rgb(63,67,253)",
                            }}
                          >
                            {od.teamgame ? (
                              <strong>✓</strong>
                            ) : (
                              <strong>✗</strong>
                            )}
                            <br />
                          </p>
                          <p
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              background: "#fed136",
                              fontSize: "1.5rem",
                              color: "rgb(0,0,0)",
                              borderRadius: "40px",
                              padding: "5px",
                              marginTop: "5px",
                            }}
                          >
                            Team Game
                          </p>
                        </div>
                        <div
                          className="col-6 col-md-3"
                          style={{ marginTop: "1rem !important" }}
                        >
                          <p
                            style={{
                              background: "rgb(255,255,255)",
                              padding: "2rem 0",
                              fontSize: "5rem",
                              lineHeight: "1",
                              margin: "0 !important",
                              borderRadius: "80px",
                              borderStyle: "solid",
                              color: "rgb(63,67,253)",
                            }}
                          >
                            {od.pakistaniplayed ? (
                              <strong>✓</strong>
                            ) : (
                              <strong>✗</strong>
                            )}
                            <br />
                          </p>
                          <p
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              background: "#fed136",
                              fontSize: "1.5rem",
                              color: "rgb(0,0,0)",
                              borderRadius: "40px",
                              marginTop: "5px",
                              padding: "5px",
                            }}
                          >
                            Pakistani Played
                          </p>
                        </div>
                        <div
                          className="col-6 col-md-3"
                          style={{
                            marginTop: "1rem !important",
                            color: "rgb(63,67,253)",
                          }}
                        >
                          <p
                            style={{
                              background: "rgb(255,255,255)",
                              padding: "2rem 0",
                              fontSize: "5rem",
                              lineHeight: "1",
                              margin: "0 !important",
                              borderRadius: "80px",
                              borderStyle: "solid",
                            }}
                          >
                            {od.forwomen ? (
                              <strong>✓</strong>
                            ) : (
                              <strong>✗</strong>
                            )}
                            <br />
                          </p>
                          <p
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              background: "#fed136",
                              fontSize: "1.5rem",
                              color: "rgb(0,0,0)",
                              borderRadius: "40px",
                              marginTop: "5px",
                              padding: "5px",
                            }}
                          >
                            For Women
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>

              {/* <section
                id="topathletes"
                style={{ background: "#f8f9fa", paddingTop: "0px" }}
              >
                <div
                  className="container"
                  style={{
                    background: "#ffffff",
                    paddingBottom: "80px",
                    maxWidth: "1250px",
                    paddingRight: "60px",
                    paddingLeft: "60px",
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
                          textTransform: "uppercase !important",
                          fontWeight: "normal",
                          lineHeight: "1.2",
                        }}
                      >
                        <strong>top players male</strong>
                      </h1>
                    </div>
                  </div>

                  {od.topplayersmale.slice(0, 3).map((tp) => {
                    console.log("tp===>", tp);
                    return (
                      <div className="row" style={{ marginTop: "60px" }}>
                        <div className="col">
                           <div
                            className="single_advisor_profile wow fadeInUp"
                            data-wow-delay="0.2 s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.2s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div
                              className="advisor_thumb"
                              style={{ background: "rgb(63, 67, 253)" }}
                            >
                              <img
                                src={tp.playerimage}
                                alt="MarcelHirscher"
                                style={{ width: "285px" }}
                              />
                              <div className="social-info">
                                <p
                                  className="rank"
                                  style={{
                                    marginBottom: "-0.1em",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    fontFamily: "Montserrat, sans-serif",
                                    color: "#fed136",
                                    textShadow: "2px 2px #ff0000",
                                  }}
                                >
                                  # {tp.rank}
                                </p>
                                <img
                                  className="img-fluid"
                                  src="/gold-medal.png"
                                  style={{ width: "25px", margin: "5px" }}
                                />
                                <img
                                  className="img-fluid"
                                  src="/silver-medal.png"
                                  style={{ width: "25px", margin: "5px" }}
                                />
                                <img
                                  className="img-fluid"
                                  src="/bronze-medal.png"
                                  style={{ width: "25px", margin: "5px" }}
                                />
                              </div>
                              <div className="social-info"></div>
                            </div>
                            <div className="single_advisor_details_info">
                              <div className="row">
                                <div
                                  className="col d-xl-flex justify-content-xl-start"
                                  style={{ width: "80px", maxWidth: "80px" }}
                                >
                                  <img
                                    src={tp.flagimage}
                                    style={{ width: "70px" }}
                                  />
                                </div>
                                <div className="col">
                                  <h6>
                                    <strong>{tp.name}</strong>
                                    <br />
                                  </h6>
                                  <p
                                    style={{
                                      fontFamily: "Montserrat, sans-serif",
                                    }}
                                  >
                                    Age: {tp.age} | Gender: {tp.gender}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          </div>
 <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2 s" style={{visibility: 'visible',animationDelay: '0.2s',animationName: 'fadeInUp'}}>
                        <div className="advisor_thumb" style={{background: 'rgb(63, 67, 253)'}}><img src="/MarcelHirscher.jpeg" alt="" style={{width: '285px'}}/>
                            <div className="social-info">
                                <p className="rank" style={{marginBottom: '-0.1em',fontWeight: 'bold',fontSize: '20px',fontFamily: 'Montserrat, sans-serif',color: '#fed136',textShadow: '2px 2px #ff0000'}}># 1</p><img className="img-fluid" src="/gold-medal.png" style={{width: '25px',margin: '5px'}}/><img className="img-fluid" src="/silver-medal.png" style={{width: '25px',margin: '5px'}}/><img className="img-fluid" src="/bronze-medal.png" style={{width: '25px',margin: '5px'}}/>
                            </div>
                            <div className="social-info"></div>
                        </div>

                        </div>
                      </div>
                    );
                  })} 

                  <div className="row" style={{ paddingTop: "50px" }}>
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
                        <strong>top players female</strong>
                      </h1>
                    </div>
                  </div>
                  {od.topplayersmale.slice(3, 6).map((tp) => {
                    console.log("tp===>", tp);
                    return (
                      <div className="row" style={{ marginTop: "60px" }}>
                        <div className="col col-12 col-sm-6 col-lg-3">
                          <div
                            className="single_advisor_profile wow fadeInUp"
                            data-wow-delay="0.2 s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.2s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div
                              className="advisor_thumb"
                              style={{ background: "rgb(63, 67, 253)" }}
                            >
                              <img
                                src={tp.playerimage}
                                alt="MarcelHirscher"
                                style={{ width: "285px" }}
                              />
                              <div className="social-info">
                                <p
                                  className="rank"
                                  style={{
                                    marginBottom: "-0.1em",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    fontFamily: "Montserrat, sans-serif",
                                    color: "#fed136",
                                    textShadow: "2px 2px #ff0000",
                                  }}
                                >
                                  # {tp.rank}
                                </p>
                                <img
                                  className="img-fluid"
                                  src="/gold-medal.png"
                                  style={{ width: "25px", margin: "5px" }}
                                />
                                <img
                                  className="img-fluid"
                                  src="/silver-medal.png"
                                  style={{ width: "25px", margin: "5px" }}
                                />
                                <img
                                  className="img-fluid"
                                  src="/bronze-medal.png"
                                  style={{ width: "25px", margin: "5px" }}
                                />
                              </div>
                              <div className="social-info"></div>
                            </div>
                            <div className="single_advisor_details_info">
                              <div className="row">
                                <div
                                  className="col d-xl-flex justify-content-xl-start"
                                  style={{ width: "80px", maxWidth: "80px" }}
                                >
                                  <img
                                    src={tp.flagimage}
                                    style={{ width: "70px" }}
                                  />
                                </div>
                                <div className="col">
                                  <h6>
                                    <strong>{tp.name}</strong>
                                    <br />
                                  </h6>
                                  <p
                                    style={{
                                      fontFamily: "Montserrat, sans-serif",
                                    }}
                                  >
                                    Age: {tp.age} | Gender: {tp.gender}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>


                        </div>
                      </div>
                    )
                  })} 
                </div>
              </section> */}

              <section
                id="topathletes"
                style={{ background: "#f8f9fa", paddingTop: "0px" }}
              >
                <div
                  className="container"
                  style={{
                    background: "#ffffff",
                    paddingBottom: "80px",
                    maxWidth: "1250px",
                    paddingRight: "60px",
                    paddingLeft: "60px",
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
                          textTransform: "uppercase !important",
                          fontWeight: "normal",
                          lineHeight: "1.2",
                        }}
                      >
                        <strong>top players male</strong>
                      </h1>
                    </div>
                  </div>
                  <div
                    className={`${styles.rowContainer}`}
                    style={{ marginTop: "60px" }}
                  >
                    {od.topplayers.slice(0, 3).map((tp) => {
                      console.log("tp===>", tp);
                      return (
                        <div className={`${styles.colContainer}`}>
                          <div
                            className={`${styles.single_advisor_profile} wow fadeInUp`}
                            data-wow-delay="0.2 s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.2s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div
                              className={`${styles.advisor_thumb}`}
                              style={{ background: "rgb(63, 67, 253)" }}
                            >
                              <img
                                src={tp.playerimage}
                                alt={tp.pname}
                                style={{ width: "100%", height: "100%" }}
                              />
                              <div className={`${styles.social_info}`}>
                                <p
                                  className="rank"
                                  style={{
                                    marginBottom: "-0.1em",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    fontFamily: "Montserrat, sans-serif",
                                    color: "#fed136",
                                    textShadow: "2px 2px #ff0000",
                                  }}
                                >
                                  # {tp.rank}
                                </p>
                                {Array.apply(0, Array(tp.gold)).map((gold) => {
                                  console.log("gold", gold);
                                  console.log("tp.gold", tp.gold);
                                  return (
                                    <img
                                      className="img-fluid"
                                      src="/gold-medal.png"
                                      style={{
                                        width: "25px",
                                        margin: "5px",
                                      }}
                                    />
                                  );
                                })}

                                {Array.apply(0, Array(tp.silver)).map((i) => {
                                  return (
                                    <img
                                      className="img-fluid"
                                      src="/silver-medal.png"
                                      style={{
                                        width: "25px",
                                        margin: "5px",
                                      }}
                                    />
                                  );
                                })}

                                {Array.apply(0, Array(tp.bronze)).map(() => {
                                  return (
                                    <img
                                      className="img-fluid"
                                      src="/bronze-medal.png"
                                      style={{
                                        width: "25px",
                                        margin: "5px",
                                      }}
                                    />
                                  );
                                })}
                              </div>
                              <div className={`${styles.social_info}`}></div>
                            </div>
                            <div className="single_advisor_details_info">
                              <div className="row">
                                <div
                                  className={`${styles.col} ${styles.d_xl_flex} ${styles.justify_content_xl_start}`}
                                  style={{ width: "150px", maxWidth: "150px" }}
                                >
                                  <img
                                    src={tp.flagimage}
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                <div
                                  className="col"
                                  style={{ marginTop: "30px" }}
                                >
                                  <h6>
                                    <strong>{tp.pname}</strong>
                                    <br />
                                  </h6>
                                  <p
                                    style={{
                                      fontFamily: "Montserrat, sans-serif",
                                    }}
                                  >
                                    Age: {tp.age} | Gender: {tp.gender}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="row" style={{ paddingTop: "50px" }}>
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
                        <strong>top players female</strong>
                      </h1>
                    </div>
                  </div>
                  <div
                    className={`${styles.rowContainer}`}
                    style={{ marginTop: "60px" }}
                  >
                    {od.topplayers.slice(3, 6).map((tp) => {
                      console.log("tp===>", tp);
                      return (
                        <div className={`${styles.colContainer}`}>
                          <div
                            className={`${styles.single_advisor_profile} wow fadeInUp`}
                            data-wow-delay="0.2 s"
                            style={{
                              visibility: "visible",
                              animationDelay: "0.2s",
                              animationName: "fadeInUp",
                            }}
                          >
                            <div
                              className={`${styles.advisor_thumb}`}
                              style={{ background: "rgb(63, 67, 253)" }}
                            >
                              <img
                                src={tp.playerimage}
                                alt={tp.pname}
                                style={{ width: "100%", height: "100%" }}
                              />
                              <div className={`${styles.social_info}`}>
                                <p
                                  className="rank"
                                  style={{
                                    marginBottom: "-0.1em",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                    fontFamily: "Montserrat, sans-serif",
                                    color: "#fed136",
                                    textShadow: "2px 2px #ff0000",
                                  }}
                                >
                                  # {tp.rank}
                                </p>
                                {Array.apply(0, Array(tp.gold)).map((gold) => {
                                  console.log("gold", gold);
                                  console.log("tp.gold", tp.gold);
                                  return (
                                    <img
                                      className="img-fluid"
                                      src="/gold-medal.png"
                                      style={{
                                        width: "25px",
                                        margin: "5px",
                                      }}
                                    />
                                  );
                                })}

                                {Array.apply(0, Array(tp.silver)).map((i) => {
                                  return (
                                    <img
                                      className="img-fluid"
                                      src="/silver-medal.png"
                                      style={{
                                        width: "25px",
                                        margin: "5px",
                                      }}
                                    />
                                  );
                                })}

                                {Array.apply(0, Array(tp.bronze)).map(() => {
                                  return (
                                    <img
                                      className="img-fluid"
                                      src="/bronze-medal.png"
                                      style={{
                                        width: "25px",
                                        margin: "5px",
                                      }}
                                    />
                                  );
                                })}
                              </div>
                              <div className={`${styles.social_info}`}></div>
                            </div>
                            <div className="single_advisor_details_info">
                              <div className="row">
                                <div
                                  className={`${styles.col} ${styles.d_xl_flex} ${styles.justify_content_xl_start}`}
                                  style={{ width: "150px", maxWidth: "150px" }}
                                >
                                  <img
                                    src={tp.flagimage}
                                    style={{ width: "100%" }}
                                  />
                                </div>
                                <div
                                  className="col"
                                  style={{ marginTop: "30px" }}
                                >
                                  <h6>
                                    <strong>{tp.pname}</strong>
                                    <br />
                                  </h6>
                                  <p
                                    style={{
                                      fontFamily: "Montserrat, sans-serif",
                                    }}
                                  >
                                    Age: {tp.age} | Gender: {tp.gender}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section
                id="graph"
                style={{ background: "#f8f9fa", paddingTop: "0px" }}
              >
                <div
                  className="container"
                  style={{
                    background: "#ffffff",
                    paddingBottom: "80px",
                    paddingRight: "60px",
                    paddingLeft: "60px",
                    maxWidth: "1250px",
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
                          textTransform: "uppercase !important",
                          fontWeight: "normal",
                          lineHeight: "1.2",
                        }}
                      >
                        <strong>Graph</strong>
                      </h1>
                      <br />
                      <h3
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
                        <strong>Based on Number of Medals won</strong>
                      </h3>
                    </div>
                  </div>
                  <div className="row" style={{ paddingTop: "20px" }}>
                    <div className="col">
                      <Line data={data} options={options} />
                    </div>
                  </div>
                </div>
              </section>
              <section
                className="clean-block clean-info dark"
                style={{ paddingTop: "0px", backgroundColor: "rgb(40,36,36)" }}
              >
                <div
                  className="container"
                  style={{
                    paddingBottom: "80px",
                    maxWidth: "1250px",
                    paddingRight: "60px",

                    paddingLeft: "60px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div
                    className="row"
                    style={{
                      paddingTop: "50px",
                    }}
                  >
                    <div className="col">
                      <h1
                        className="text-uppercase"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          textAlign: "center",
                          color: "rgb(255,255,255)",

                          textTransform: "uppercase !important",
                          fontWeight: "normal",
                          lineHeight: "1.2",
                        }}
                      >
                        <strong>preparation parameters</strong>
                      </h1>
                    </div>
                  </div>
                  <div
                    className="videoWrapper"
                    style={{
                      marginTop: "80px",
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: "0",
                    }}
                  >
                    <iframe
                      allowfullscreen=""
                      frameborder="0"
                      src={od.preparationparameter}
                      className="embed-responsive-item"
                      width="100%"
                      height="auto"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                      }}
                    ></iframe>
                  </div>
                </div>
              </section>

              <section
                id="rules"
                style={{ background: "rgb(248,249,250)", paddingTop: "150px" }}
              >
                <div
                  className="container"
                  style={{
                    background: "url(/olympicrules.jpg)",
                    paddingBottom: "20px",
                    paddingRight: "60px",
                    paddingLeft: "60px",
                    maxWidth: "1250px",
                  }}
                >
                  <p
                    className={`text-uppercase ${styles.text_center} `}
                    style={{
                      color: "black",
                      paddingTop: "50px",
                      textTransform: "uppercase !important",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    Rules for {od.name}
                  </p>
                  <hr
                    style={{
                      height: "1px",
                      marginBottom: "3rem !important",
                      margin: "1rem 0",
                      color: "inherit",
                      backgroundColor: "currentColor",
                      border: "0",
                      opacity: "0.25",
                    }}
                  />
                  <div className={`${styles.row}`}>
                    <div
                      style={{ justifyContent: "center", textAlign: "justify" }}
                    >
                      <p
                        className="lead"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "1.25rem",
                          fontWeight: "300",
                          marginTop: "0",
                          marginBottom: "1rem",
                          lineHeight: "1.75",
                        }}
                      >
                        {od.rules}
                      </p>
                    </div>
                    <div className={`${styles.col_lg_4} me-auto`}>
                      <p
                        className="lead"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "1.25rem",
                          fontWeight: "300",
                          marginTop: "0",
                          marginBottom: "1rem",
                          lineHeight: "1.75",
                          textAlign: "right",
                        }}
                      ></p>
                    </div>
                  </div>
                  <div className={`${styles.row}`}>
                    <div
                      className={`${styles.col_lg_4} ${styles.mx_auto}`}
                      style={{ width: "769.656px" }}
                    >
                      <p
                        className="lead"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "1.25rem",
                          fontWeight: "300",
                          marginTop: "0",
                          marginBottom: "1rem",
                          lineHeight: "1.75",
                          textAlign: "center",
                        }}
                      ></p>
                    </div>
                  </div>
                  <div className={`${styles.text_center} mt-4`}></div>
                </div>
              </section>
              {/* <section
                id="worldmap"
                style={{ background: "#f8f9fa", paddingTop: "0px" }}
              >
                <div
                  className="container"
                  style={{
                    background: "#ffffff",
                    paddingBottom: "80px",
                    paddingRight: "60px",
                    paddingLeft: "60px",
                    maxWidth: "1250px",
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
                          textTransform: "uppercase !important",
                          fontWeight: "normal",
                          lineHeight: "1.2",
                        }}
                      >
                        <strong>World map</strong>
                      </h1>
                    </div>
                  </div>
                  <div className="row" style={{ paddingTop: "50px" }}>
               
                  </div>
                </div>
              </section> */}
            </div>
          );
        })}

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

export default Olympicsdetails;
