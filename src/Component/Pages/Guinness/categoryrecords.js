import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import styles from "./categoryrecords.module.css";
import CountUp from "react-countup";
import { useParams } from "react-router-dom";
import { scroller } from "react-scroll";
import "./navbar.css";

const Categoryrecords = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  const [active, setActive] = useState(1);

  // const [prev, setprev] = useState(false);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/guinness/headerimages`, {
        params: {
          catname: params.catname,
        },
      })
      .then((res) => {
        setdata(res.data);
      });
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

  // const handleClick = () => {
  //   scroller.scrollTo("recordbreak", {
  //     duration: 800,
  //     delay: 0,
  //     smooth: "easeInOutQuart",
  //   });
  // };

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  const handleid = (who) => {
    history.push(`/recorddetails/${who}`);
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

        {data.map((gd) => {
          return (
            <div>
              <header style={{ marginTop: "100px" }}>
                <div
                  className="carousel slide"
                  data-bs-ride="carousel"
                  id="carouselExampleIndicators"
                  style={{ position: "relative" }}
                >
                  <div className={`carousel-inner`}>
                    <div
                      className={`carousel-item interval={2000} ${
                        active === 1 && "active"
                      } `}
                    >
                      <img
                        className="w-100 d-block"
                        src={gd.headerimage[0]}
                        alt="Slide Image"
                        style={{
                          display: "block !important",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>
                    <div
                      className={`carousel-item ${
                        active === 2 && "active"
                      } interval={2000}`}
                    >
                      <img
                        className="w-100 d-block"
                        style={{
                          width: "100% !important",
                          display: "block !important",
                          verticalAlign: "middle",
                        }}
                        src={gd.headerimage[1]}
                        alt="Slide Image"
                      />
                    </div>
                    <div
                      className={`carousel-item ${
                        active === 3 && "active"
                      } interval={2000}`}
                    >
                      <img
                        className="w-100 d-block"
                        src={gd.headerimage[2]}
                        style={{
                          width: "100% !important",
                          display: "block !important",
                          verticalAlign: "middle",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      onClick={() => active > 1 && setActive(active - 1)}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      onClick={() => active < 3 && setActive(active + 1)}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </a>
                  </div>
                  <ul
                    className="carousel_indicators"
                    style={{ listStyle: "none" }}
                  >
                    <li
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      onClick={() => setActive(1)}
                      className={`${active === 1 && "active"}`}
                    ></li>
                    <li
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      onClick={() => setActive(2)}
                      className={`${active === 2 && "active"}`}
                    ></li>
                    <li
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      onClick={() => setActive(3)}
                      className={`${active === 3 && "active"}`}
                    ></li>
                  </ul>
                </div>
                <div
                  className={`${styles.carousel_caption} `}
                  style={{
                    display: "block !important",
                    marginBottom: "5150px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <span
                    className="display_4"
                    style={{
                      backgroundColor: "rgba(0 ,0, 0, 0.5)",
                      fontSize: "56px",
                      fontFamily: "Montserrat, sans-serif",
                      padding: "5px",
                    }}
                  >
                    {gd.catname}
                    <br />
                  </span>
                  <p
                    className={`${styles.lead}`}
                    style={{
                      backgroundColor: "rgba(0 ,0, 0, 0.5)",
                    }}
                  >
                    {gd.initialtext}
                    <br />
                    <br />
                  </p>
                </div>
              </header>

              <section id="records" style={{ background: "rgb(248,249,250)" }}>
                <div className="container" style={{ background: "#ffffff" }}>
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
                        World Records of {gd.catname}
                      </h1>
                    </div>
                  </div>
                  <div className={styles.rowRecords}>
                    {gd.details.map((d) => {
                      return (
                        <div
                          className={`${styles.row} ${styles.d_xl_flex} justify-content-xl-center`}
                          style={{
                            marginTop: "50px",
                          }}
                          onClick={() => handleid(d.who)}
                        >
                          <div
                            className={`${styles.col} col-lg-3 col-sm-6`}
                            style={{ width: "auto" }}
                          >
                            <div
                              className={`${styles.card_box}`}
                              style={{
                                cursor: "pointer",
                                width: "315px",
                                height: "200px",
                                background: `url(${d.rimage})`,
                              }}
                            >
                              <div
                                className={`${styles.card_boxhover}`}
                                style={{
                                  width: "315px",
                                  height: "200px",
                                  marginTop: "-20px",
                                  marginLeft: "-10px",
                                  paddingTop: "20px",
                                  paddingLeft: "10px",
                                }}
                              >
                                <div className={`${styles.inner}`}>
                                  <h3
                                    style={{
                                      color: "#ffffff",
                                      fontSize: "17px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {d.rname}
                                    <br />
                                  </h3>
                                  <p>
                                    {d.who}
                                    <br />
                                  </p>
                                </div>
                              </div>
                              <a className={`${styles.card_box_footer}`}>
                                View More&nbsp;&nbsp;
                                <i className="fa fa-star fa fa-arrow-circle-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          );
        })}

        <footer
          className="d-xl-flex justify-content-xl-center align-items-xl-center"
          style={{ height: "90px", marginTop: "100px", background: "#001c33" }}
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

export default Categoryrecords;
