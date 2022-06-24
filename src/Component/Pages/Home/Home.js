import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import validator from "validator";
import { Contactus } from "../../../actions/home";
import axios from "axios";
import styles from "./homestyles.module.css";
import { scroller } from "react-scroll";
import "./navbar.css";
// import "./homestyles.css";
// import "./accordion-faq-list.css";

const Home = () => {
  const token = useSelector((state) => state.auth?.authData?.token);
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const email = useSelector((state) => state.auth?.authData?.result?.email);
  const accounttype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );
  const contact = useSelector(
    (state) => state.auth?.authData?.result?.contactno
  );
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  let history = useHistory();
  const dispatch = useDispatch();
  const [faqtoggle1, setfaqtoggle1] = useState(false);
  const [faqtoggle2, setfaqtoggle2] = useState(false);
  const [faqtoggle3, setfaqtoggle3] = useState(false);
  const [faqtoggle4, setfaqtoggle4] = useState(false);
  const [faqtoggle5, setfaqtoggle5] = useState(false);
  const [faqtoggle6, setfaqtoggle6] = useState(false);
  const [faqtoggle7, setfaqtoggle7] = useState(false);
  const d = new Date();

  useEffect(() => {
    axios
      .post(`https://athletistan.herokuapp.com/routes/dashboard/checkenddate`, {
        date: d,
      })
      .then((res) => {});
  }, []);

  const handlecoachroutes = () => {
    history.push("/coachsignup");
  };
  const handlesearchacoach = () => {
    history.push("/searchacoach");
  };

  const handleathleteroutes = () => {
    history.push("/athletesignup");
  };
  const routelogin = () => {
    history.push("/login");
  };

  const handlelogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
  };

  const routemyprofile = () => {
    history.push("/myprofile");
  };

  const handleguinness = () => {
    history.push("/guinnesscategories");
  };
  const routeolympics = () => {
    history.push("/olympics");
  };

  const handledashboard = () => {
    history.push("/dashboard");
  };

  const handleguinnessclick = () => {
    history.push("/guinnesscategories");
  };
  const handleolympicsclick = () => {
    history.push("/olympics");
  };
  const handlepoaclick = () => {
    history.push("/poa");
  };

  const [emailerror, setEmailError] = useState("");
  const [isCollapse, setIsCollapse] = useState("");

  const [e, sete] = useState(false);

  const contactdetails = {
    id: id,
    name: name,
    email: email,
    phone: contact,
    message: "",
  };

  const [details, setdetails] = useState(contactdetails);

  const handleChange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
    if (details?.email?.length > 0) {
      validateEmail(details?.email);
    }
  };

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmailError("");
      sete(false);
    } else {
      setEmailError("Email is not valid");
      sete(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      details.name !== "" &&
      details.email !== "" &&
      details.phone !== "" &&
      details.message !== ""
    ) {
      dispatch(Contactus(details));
      alert("Message sent successfully!");
    } else {
      alert(
        "Please fill the empty fields or enter correct information to proceed"
      );
    }
  };

  const handleClick = () => {
    scroller.scrollTo("about", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const handleClick1 = () => {
    scroller.scrollTo("guinness", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const handleClick2 = () => {
    scroller.scrollTo("olympics", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const handleClick3 = () => {
    scroller.scrollTo("faq", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const handleClick4 = () => {
    scroller.scrollTo("contact", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const handleClick5 = () => {
    scroller.scrollTo("page-top", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const handleroute = () => {
    if (accounttype === "Athlete") {
      history.push("/searchacoach");
    } else {
      alert("Please signup as an athlete to proceed");
    }
  };

  return (
    <body>
      <body
        className="page-top"
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
                  <a className="nav-link2" onClick={handleClick5}>
                    Home
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link2" onClick={handleClick}>
                    About
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link2" onClick={handleClick1}>
                    Guinness
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link2" onClick={handleClick2}>
                    Olympics
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link2" onClick={handleClick3}>
                    FAQ
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link2" onClick={handleClick4}>
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

            {token ? (
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
                    {name}
                  </span>
                  <img
                    className="border rounded-circle img-profile"
                    src={dp}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginLeft: "10px",
                    }}
                  />
                </a>

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
              </div>
            ) : (
              <a
                className="navbar-brand text-start d-xxl-flex"
                href="#page-top"
                style={{
                  color: "rgb(254,209,54)",
                  fontSize: "28px",
                  fontFamily: "Montserrat, sans-serif",
                  marginLeft: "80px",
                  paddingLeft: "80px",
                }}
              ></a>
            )}
          </div>
        </nav>
      </body>
      <header
        style={{
          background: "url(/HeaderBackground.jpg)",
          paddingBottom: "200px",
        }}
      >
        <div className="container" style={{ paddingTop: "81px" }}>
          <div>
            <div className="d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center">
              <img
                className="img-fluid"
                src="/Logowithouttagline.png"
                style={{ width: "200px", marginTop: "30px" }}
              />
            </div>
            <div
              className="d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center"
              style={{ marginTop: "30px" }}
            >
              <span
                style={{
                  color: "rgb(255,255,255)",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "40px",
                  textAlign: "center",
                }}
              >
                Welcome to Athletistan!
                <br />
              </span>
            </div>
            <div
              className="d-xl-flex justify-content-xl-center align-items-xl-center"
              style={{
                textAlign: "center",
                width: "100%",
                marginTop: "30px",
              }}
            >
              <span
                className="d-flex justify-content-center"
                style={{
                  color: "rgb(255,255,255)",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "75px",
                  lineHeight: "75px",
                  letterSpacing: "0px",
                  width: "auto",
                  height: "auto",
                }}
              >
                <strong>WHERE TALENT PERCEIVES DESTINATION</strong>
                <br />
              </span>
            </div>
            {token && accounttype === "Athlete" ? (
              <div
                className="d-xl-flex justify-content-xl-center align-items-xl-center"
                style={{ textAlign: "center", marginTop: "30px" }}
              >
                <a
                  className={`${styles.btnjoinathlete}`}
                  onClick={handlesearchacoach}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    borderBottomRightRadius: "25px",
                    borderTopRightRadius: "25px",
                  }}
                >
                  Search a Coach
                </a>
              </div>
            ) : null}
            <div
              className="d-xl-flex justify-content-xl-center align-items-xl-center"
              style={{ textAlign: "center", marginTop: "25px" }}
            >
              <span
                style={{
                  color: "rgb(255,255,255)",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "30px",
                  lineHeight: "40px",
                  letterSpacing: "0px",
                }}
              >
                Join Us
                <br />
              </span>
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a
                className={`${styles.btnjoin}`}
                onClick={handlecoachroutes}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                }}
              >
                As a coach
              </a>
              <a
                className={`${styles.btnjoinathlete}`}
                onClick={handleathleteroutes}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  borderBottomRightRadius: "4px",
                  borderTopRightRadius: "4px",
                }}
              >
                As an athlete
              </a>
              <br />
              <br />
              {token ? null : (
                <a
                  className={`${styles.btnjoinathlete}`}
                  onClick={routelogin}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    borderTopLeftRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    borderBottomRightRadius: "25px",
                    borderTopRightRadius: "25px",
                  }}
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
      <section
        className="about"
        style={{
          background: "rgb(248,249,250)",
          marginTop: "130px",
          paddingBottom: "130px",
        }}
      >
        <div className="container">
          <div className="row" style={{ paddingTop: "50px" }}>
            <div className="col">
              <h1
                className="text-uppercase"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center",
                  color: "rgb(0,0,0)",
                  marginTop: "60px",
                }}
              >
                <strong>about</strong>
              </h1>
              <h1
                className="text-justify"
                style={{
                  fontSize: "16px",
                  lineHeight: "19.2px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <br />
                Through the several years, we do not see Pakistan making its
                name in Olympics or Guinness World Record. The problem is not
                the lacking of talent in Pakistan but the inexistent of the
                platform which supports the athletes for their training. The
                only athletes who have connections will get promoted even if
                they are not so skilled. The right talent will get no chance to
                perform. Athletes are unable to find coach for their training
                according to their preference. Also, coaches do not know where
                the talent is seeking for training and they are unable to serve
                their experience. Athletes are finding it hard to showcase their
                talent what they are capable of. To solve the above problems, we
                found a solution to make a platform for both athletes and
                coaches to find the best match accordingly. It will help us to
                promote the only talent which are really capable to make his
                name in the world but its hiding somewhere in the country.
                <br />
                <br />
                Following are the main features of our website.
                <br />
                <br />
              </h1>
            </div>
          </div>
          <div className="row" style={{ marginBottom: "50px" }}>
            <div
              className="col"
              style={{ cursor: "pointer" }}
              onClick={handleguinnessclick}
            >
              <div className="row d-xl-flex">
                <div className="col d-xl-flex justify-content-xl-center">
                  <img className="img-fluid" src="/Guinness.jpg" />
                </div>
              </div>

              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <div
                    style={{
                      background: "#ffffff",
                      paddingTop: "25px",
                      paddingRight: "25px",
                      paddingBottom: "25px",
                      paddingLeft: "25px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgb(0,0,0)",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Guinness World Record</strong>
                      <br />
                    </h4>
                    <p
                      style={{
                        lineHeight: "28px",
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      Anyone can explore all the details about{" "}
                      <a style={{ color: "blue" }}>Guinness World Record.</a>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{ cursor: "pointer" }}
              onClick={handleolympicsclick}
            >
              <div className="row d-xl-flex">
                <div className="col d-xl-flex justify-content-xl-center">
                  <img className="img-fluid" src="/olympic.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <div
                    style={{
                      background: "#ffffff",
                      paddingTop: "25px",
                      paddingRight: "25px",
                      paddingBottom: "25px",
                      paddingLeft: "25px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgb(0,0,0)",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Olympics</strong>
                      <br />
                    </h4>
                    <p
                      style={{
                        lineHeight: "28px",
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      You can find all the details about the{" "}
                      <a style={{ color: "blue" }}>Olympics</a> on this website.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row d-xl-flex">
                <div className="col d-xl-flex justify-content-xl-center">
                  <img className="img-fluid" src="/showcase.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <div
                    style={{
                      background: "#ffffff",
                      paddingTop: "25px",
                      paddingRight: "25px",
                      paddingBottom: "25px",
                      paddingLeft: "25px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgb(0,0,0)",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Showcase</strong>
                      <br />
                    </h4>
                    <p
                      style={{
                        lineHeight: "28px",
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      If you are the one who have the skills, can showcase on
                      our platform.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row d-xl-flex">
                <div className="col d-xl-flex justify-content-xl-center">
                  <img className="img-fluid" src="/feminine.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <div
                    style={{
                      background: "#ffffff",
                      paddingTop: "25px",
                      paddingRight: "25px",
                      paddingBottom: "25px",
                      paddingLeft: "25px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgb(0,0,0)",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Feminine</strong>
                      <br />
                    </h4>
                    <p
                      style={{
                        lineHeight: "28px",
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      Female athletes can find female coach according to their
                      feasibility.&nbsp;
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{ cursor: "pointer" }}
              onClick={handlepoaclick}
            >
              <div className="row d-xl-flex">
                <div className="col d-xl-flex justify-content-xl-center">
                  <img className="img-fluid" src="/recommend.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <div
                    style={{
                      background: "#ffffff",
                      paddingTop: "25px",
                      paddingRight: "25px",
                      paddingBottom: "25px",
                      paddingLeft: "25px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgb(0,0,0)",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Recommend</strong>
                      <br />
                    </h4>
                    <p
                      style={{
                        lineHeight: "28px",
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      Best athletes will be recommend to{" "}
                      <a onClick={handlepoaclick} style={{ color: "blue" }}>
                        Pakistan Olympic Association (POA).
                      </a>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row d-xl-flex">
                <div className="col d-xl-flex justify-content-xl-center">
                  <img className="img-fluid" src="/exposure.jpg" />
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <div
                    style={{
                      background: "#ffffff",
                      paddingTop: "25px",
                      paddingRight: "25px",
                      paddingBottom: "25px",
                      paddingLeft: "25px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgb(0,0,0)",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Exposure</strong>
                      <br />
                    </h4>
                    <p
                      style={{
                        lineHeight: "28px",
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      Provide exposure to those who are capable of making us
                      proud.
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="guinness" style={{ marginTop: "130px" }}>
        <div className="container">
          <div className="row">
            <div className="col" style={{ height: "auto" }}>
              <h1
                style={{
                  color: "rgb(0,0,0)",
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center",
                  marginTop: "120px",
                }}
              >
                <strong>GUINNESS WORLD RECORDS</strong>
                <br />
              </h1>
              <h1
                style={{
                  color: "rgb(134,142,150)",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Top most famous Guinness World Records
                <br />
              </h1>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "60px",
              border: "1px ridge rgb(215,215,215)",
              paddingTop: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            <div className="col">
              <div>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "right",
                  }}
                >
                  <strong>18 MARCH 2010</strong>
                  <br />
                </h1>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "right",
                  }}
                >
                  <strong>Widest mouth (unstretched)</strong>
                  <br />
                </h1>
              </div>
              <div>
                <p style={{ textAlign: "right", color: "rgb(134,142,150)" }}>
                  The widest mouth measures 17 cm (6.69 in) and <br />
                  belongs to Francisco Domingo Joaquim <br />
                  "Chiquinho" (Angola).
                  <br />
                </p>
              </div>
            </div>
            <div
              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start"
              style={{ background: "#C81E1D" }}
            >
              <div
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                style={{
                  background: "rgb(235,235,235)",
                  borderWidth: "7px",
                  borderRadius: "100px",
                  width: "160px",
                  height: "160px",
                }}
              >
                <img
                  className="img-fluid"
                  style={{
                    width: "146px",
                    height: "146px",
                    borderRadius: "50%",
                  }}
                  src="/2842.jpg"
                />
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "60px",
              border: "1px ridge rgb(215,215,215)",
              paddingTop: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            <div
              className="col d-flex d-xl-flex justify-content-center justify-content-xl-end"
              style={{ background: "#FAB822" }}
            >
              <div
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                style={{
                  background: "rgb(235,235,235)",
                  borderWidth: "7px",
                  borderRadius: "100px",
                  width: "160px",
                  height: "160px",
                }}
              >
                <img
                  className="img-fluid"
                  style={{
                    width: "146px",
                    height: "146px",
                    borderRadius: "50%",
                  }}
                  src="/Jyoti_amge_(2).jpg"
                />
              </div>
            </div>
            <div className="col">
              <div>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  <strong>16 DECEMBER 2011</strong>
                  <br />
                </h1>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  <strong>Shortest female living</strong>
                  <br />
                </h1>
              </div>
              <div>
                <p style={{ textAlign: "left", color: "rgb(134,142,150)" }}>
                  The shortest woman living (mobile) is Jyoti Amge (India, born
                  16 Dec 1993), who measured 62.8 cm (24.7 in) in Nagpur, India,
                  on 16 December 2011.
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "60px",
              border: "1px ridge rgb(215,215,215)",
              paddingTop: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            <div className="col">
              <div>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "right",
                  }}
                >
                  <strong>23 FEBRUARY 2008</strong>
                  <br />
                </h1>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "right",
                  }}
                >
                  <strong>Longest fingernails</strong>
                  <br />
                </h1>
              </div>
              <div>
                <p style={{ textAlign: "right", color: "rgb(134,142,150)" }}>
                  The longest fingernails belonged to Lee Redmond (USA), who
                  started to grow them in 1979 and carefully manicured them to
                  reach a total length of 8.65 m (28 ft 4.5 in) as measured on
                  the set of Lo show dei record in Madrid, Spain, on 23 February
                  2008. Lee lost her nails in an automobile accident in early
                  2009.
                  <br />
                </p>
              </div>
            </div>
            <div
              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
              style={{ background: "#001C33" }}
            >
              <div
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                style={{
                  background: "rgb(235,235,235)",
                  borderWidth: "7px",
                  borderRadius: "100px",
                  width: "160px",
                  height: "160px",
                }}
              >
                <img
                  className="img-fluid"
                  style={{
                    width: "146px",
                    height: "146px",
                    borderRadius: "50%",
                  }}
                  src="/VZBS33LFRZDDXCPQ2PW2TRK2CU.jpg"
                />
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "60px",
              border: "1px ridge rgb(215,215,215)",
              paddingTop: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
            }}
          >
            <div
              className="col d-flex d-xl-flex justify-content-center justify-content-xl-end align-items-xl-center"
              style={{ background: "#4f4f4f" }}
            >
              <div
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                style={{
                  background: "rgb(235,235,235)",
                  borderWidth: "7px",
                  borderRadius: "100px",
                  width: "160px",
                  height: "160px",
                }}
              >
                <img
                  className="img-fluid"
                  style={{
                    width: "146px",
                    height: "146px",
                    borderRadius: "50%",
                  }}
                  src="/1bc4a3fbddfc4865bd356dce686aab4d.jpg"
                />
              </div>
            </div>
            <div className="col">
              <div>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  <strong>01 MAY 2014</strong>
                  <br />
                </h1>
                <h1
                  style={{
                    color: "rgb(0,0,0)",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  <strong>Highest vehicle mileage</strong>
                  <br />
                </h1>
              </div>
              <div>
                <p style={{ textAlign: "left", color: "rgb(134,142,150)" }}>
                  At 4 p.m. on 18 September 2013, Irvin "Irv" Gordon (USA)
                  clocked up his three-millionth mile in his 1966 Volvo 1800S
                  while driving near the village of Girdwood, south of Anchorage
                  in Alaska, USA. By 1 May 2014, he had driven 3,039,122 miles.
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "60px",
              paddingTop: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              border: "0px ridge rgb(215,215,215)",
            }}
          >
            <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center">
              <div
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                style={{
                  background: "rgb(235,235,235)",
                  borderWidth: "7px",
                  borderRadius: "100px",
                  width: "160px",
                  height: "160px",
                }}
              >
                <button
                  className="btn btn-primary btncontact"
                  type="button"
                  onClick={handleguinness}
                  style={{
                    height: "160px",
                    borderRadius: "100px",
                    fontFamily: "Montserrat, sans-serif",
                    borderWidth: "0px",
                  }}
                >
                  <strong>Click Here for More</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="olympics"
        style={{ marginTop: "130px", background: "rgb(248,249,250)" }}
      >
        <div
          className="container"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <div className="row">
            <div className="col" style={{ height: "auto" }}>
              <h1
                className="text-uppercase"
                style={{
                  color: "rgb(0,0,0)",
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center",
                }}
              >
                <strong>OLYMPICS</strong>
              </h1>
              <h1
                style={{
                  color: "rgb(134,142,150)",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Top players of the Olympics
                <br />
              </h1>
            </div>
          </div>
          <div
            className="row"
            style={{ marginTop: "100px", background: "#ffffff" }}
          >
            <div
              className="col"
              style={{
                border: "1px dotted rgb(201,201,201)",
                paddingBottom: "50px",
              }}
            >
              <div className="row">
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div>
                    <img
                      style={{
                        width: "225px",
                        height: "225px",
                        borderRadius: "50%",
                        marginTop: "20px",
                      }}
                      src="/EmmaMcKeon.jpg"
                    />
                    <h1
                      style={{
                        marginTop: "25px",
                        color: "rgb(33,37,41)",
                        fontSize: "24px",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Emma McKeon</strong>
                      <br />
                    </h1>
                    <p
                      style={{
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                      }}
                    >
                      Swimming
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#ffd700",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      5
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#c0c0c0",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      2
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#cd7f32",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      4
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Gold Medals
                    <br />
                  </small>
                </div>
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Silver Medals
                    <br />
                  </small>
                </div>
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Bronze Medals
                    <br />
                  </small>
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{
                border: "1px dotted rgb(201,201,201)",
                paddingBottom: "50px",
              }}
            >
              <div className="row">
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div>
                    <img
                      style={{
                        width: "225px",
                        height: "225px",
                        borderRadius: "50%",
                        marginTop: "20px",
                      }}
                      src="/MartinFourcade.jpg"
                    />
                    <h1
                      style={{
                        marginTop: "25px",
                        color: "rgb(33,37,41)",
                        fontSize: "24px",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Martin Fourcade</strong>
                      <br />
                    </h1>
                    <p
                      style={{
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                      }}
                    >
                      Archery
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mx-auto" style={{ width: "179px" }}>
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#ffd700",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      5
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#c0c0c0",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      2
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mx-auto" style={{ width: "179px" }}>
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Gold <br />
                    Medals
                    <br />
                  </small>
                </div>
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Silver <br />
                    Medals
                    <br />
                  </small>
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{
                border: "1px dotted rgb(201,201,201)",
                paddingBottom: "50px",
              }}
            >
              <div className="row">
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div>
                    <img
                      style={{
                        width: "225px",
                        height: "225px",
                        borderRadius: "50%",
                        marginTop: "20px",
                      }}
                      src="/RYOKIYUNA.jpg"
                    />
                    <h1
                      style={{
                        marginTop: "25px",
                        color: "rgb(33,37,41)",
                        fontSize: "24px",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>RYO KIYUNA</strong>
                      <br />
                    </h1>
                    <p
                      style={{
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                      }}
                    >
                      Karate
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#ffd700",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      6
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#c0c0c0",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      1
                    </p>
                  </div>
                </div>
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#cd7f32",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      1
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Gold Medals
                    <br />
                  </small>
                </div>
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Silver Medals
                    <br />
                  </small>
                </div>
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Bronze Medals
                    <br />
                  </small>
                </div>
              </div>
            </div>
            <div
              className="col"
              style={{
                border: "1px dotted rgb(201,201,201)",
                paddingBottom: "50px",
              }}
            >
              <div className="row">
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div>
                    <img
                      style={{
                        width: "225px",
                        height: "225px",
                        borderRadius: "50%",
                        marginTop: "20px",
                      }}
                      src="/QianYang.jpeg"
                    />
                    <h1
                      style={{
                        marginTop: "25px",
                        color: "rgb(33,37,41)",
                        fontSize: "24px",
                        fontFamily: "Montserrat, sans-serif",
                        textAlign: "center",
                      }}
                    >
                      <strong>Qian Yang</strong>
                      <br />
                    </h1>
                    <p
                      style={{
                        color: "rgb(134,142,150)",
                        textAlign: "center",
                      }}
                    >
                      Shooting
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center">
                  <div
                    className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#ffd700",
                      borderRadius: "100px",
                    }}
                  >
                    <p
                      style={{
                        color: "rgb(0,0,0)",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                        fontSize: "20px",
                        fontFamily: "Montserrat, sans-serif",
                        marginBottom: "0px",
                      }}
                    >
                      8
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center">
                  <small
                    className="form-text text-muted"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Montserrat, sans-serif",
                      textAlign: "center",
                    }}
                  >
                    Gold <br />
                    Medals
                    <br />
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "60px",
              paddingTop: "10px",
              paddingRight: "10px",
              paddingBottom: "10px",
              paddingLeft: "10px",
              border: "0px ridge rgb(215,215,215)",
            }}
          >
            <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center">
              <div
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                style={{
                  background: "rgb(235,235,235)",
                  borderWidth: "7px",
                  borderRadius: "100px",
                  width: "160px",
                  height: "160px",
                }}
              >
                <button
                  className="btn btn-primary btncontact"
                  type="button"
                  onClick={routeolympics}
                  style={{
                    height: "160px",
                    borderRadius: "100px",
                    fontFamily: "Montserrat, sans-serif",
                    borderWidth: "0px",
                  }}
                >
                  <strong>Click Here for More</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="faq"
        style={{
          marginTop: "130px",
          background: "transparent",
          paddingBottom: "130px",
        }}
      >
        <div className="container">
          <div className="row" style={{ paddingTop: "50px" }}>
            <div className="col">
              <h1
                className="text-uppercase"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  textAlign: "center",
                  color: "rgb(0,0,0)",
                  marginTop: "50px",
                }}
              >
                <strong>faq</strong>
              </h1>
              <h1
                className="text-justify"
                style={{
                  fontSize: "16px",
                  lineHeight: "19.2px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <br />
                Here's the answers to the most frequently asked questions.
                <br />
                <br />
              </h1>
            </div>
          </div>
          <div
            className="row"
            style={{
              paddingTop: "50px",
              paddingBottom: "50px",
              background: "#ffffff",
              paddingRight: "50px",
              paddingLeft: "50px",
            }}
          >
            {/* {`${toggle ? "sidebar-toggled" : ""}`} */}
            <div className="col">
              <div role="tablist" id="accordion-1">
                <div className="card">
                  <div
                    className="card-header"
                    role="tab"
                    style={{
                      paddingBottom: "30px",
                      paddingTop: "30px",
                      paddingLeft: "30px",
                    }}
                  >
                    <h1
                      className="mb-0"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "16px",
                      }}
                    >
                      <a
                        onClick={() => setfaqtoggle1(!faqtoggle1)}
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1 .item-1"
                        href="#accordion-1 .item-1"
                        style={{ color: "rgb(0,0,0)" }}
                      >
                        <strong>How do I register myself as a coach?</strong>
                        <i
                          className={`${
                            faqtoggle1
                              ? "fa fa-minus float-right"
                              : "fa fa-plus float-right"
                          }`}
                        ></i>
                        <br />
                      </a>
                    </h1>
                  </div>

                  {faqtoggle1 ? (
                    <div
                      className="collapse item-1"
                      role="tabpanel"
                      data-parent="#accordion-1"
                    >
                      <div className="card-body">
                        <p
                          className="card-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgb(0,0,0)",
                          }}
                        >
                          On home page, you can see the title below Join US{" "}
                          <a
                            onClick={handlecoachroutes}
                            style={{ color: "blue", cursor: "pointer" }}
                          >
                            "As A Coach"
                          </a>
                          . Click on that to register yourself as a coach.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    role="tab"
                    style={{
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "30px",
                    }}
                  >
                    <h5 className="mb-0">
                      <a
                        onClick={() => setfaqtoggle2(!faqtoggle2)}
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1"
                        href="#accordion-1 .item-2"
                        style={{
                          color: "rgb(0,0,0)",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <strong>How do I register myself as an athlete?</strong>
                        <i
                          className={`${
                            faqtoggle2
                              ? "fa fa-minus float-right"
                              : "fa fa-plus float-right"
                          }`}
                        ></i>
                        <br />
                      </a>
                    </h5>
                  </div>
                  {faqtoggle2 ? (
                    <div
                      className="collapse item-2"
                      role="tabpanel"
                      data-parent="#accordion-1"
                    >
                      <div className="card-body">
                        <p
                          className="card-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgb(0,0,0)",
                          }}
                        >
                          On home page, you can see the title below Join US{" "}
                          <a
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={handleathleteroutes}
                          >
                            "As An Athlete"
                          </a>
                          . Click on that to register yourself as an athlete.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    role="tab"
                    style={{
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "30px",
                    }}
                  >
                    <h5 className="mb-0">
                      <a
                        onClick={() => setfaqtoggle3(!faqtoggle3)}
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1 .item-3"
                        href="#accordion-1 .item-3"
                        style={{
                          color: "rgb(0,0,0)",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <strong>
                          Being an athlete, how can I filter out the best
                          coaches?
                        </strong>
                        <i
                          className={`${
                            faqtoggle3
                              ? "fa fa-minus float-right"
                              : "fa fa-plus float-right"
                          }`}
                        ></i>
                        <br />
                      </a>
                    </h5>
                  </div>
                  {faqtoggle3 ? (
                    <div
                      className="collapse item-3"
                      role="tabpanel"
                      data-parent="#accordion-1"
                    >
                      <div className="card-body">
                        <p
                          className="card-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgb(0,0,0)",
                          }}
                        >
                          After you successfully registered as an athlete, click
                          on{" "}
                          <a onClick={handleroute} style={{ color: "blue" }}>
                            "search a coach"
                          </a>{" "}
                          button then will be able to filter out the best
                          coaches by their respective ratings given by other
                          athletes and from their experience as well.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    role="tab"
                    style={{
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "30px",
                    }}
                  >
                    <h5 className="mb-0">
                      <a
                        onClick={() => setfaqtoggle4(!faqtoggle4)}
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1 .item-4"
                        href="#accordion-1 .item-4"
                        style={{
                          color: "rgb(0,0,0)",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <strong>
                          Is this platform for female players too?
                        </strong>
                        <i
                          className={`${
                            faqtoggle4
                              ? "fa fa-minus float-right"
                              : "fa fa-plus float-right"
                          }`}
                        ></i>
                        <br />
                      </a>
                    </h5>
                  </div>
                  {faqtoggle4 ? (
                    <div
                      className="collapse item-4"
                      role="tabpanel"
                      data-parent="#accordion-1"
                    >
                      <div className="card-body">
                        <p
                          className="card-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgb(0,0,0)",
                          }}
                        >
                          Yes. Its the first time in Pakistan where Female
                          players are encouraged to be a part of the games.
                          Female athlete can find a female coach and enjoy their
                          training comfortably.&nbsp;
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    role="tab"
                    style={{
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "30px",
                    }}
                  >
                    <h5 className="mb-0">
                      <a
                        onClick={() => setfaqtoggle5(!faqtoggle5)}
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1 .item-5"
                        href="#accordion-1 .item-5"
                        style={{
                          color: "rgb(0,0,0)",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <strong>
                          How do I get benefit if my performance is outstanding
                          during training period?
                        </strong>
                        <i
                          className={`${
                            faqtoggle5
                              ? "fa fa-minus float-right"
                              : "fa fa-plus float-right"
                          }`}
                        ></i>
                        <br />
                      </a>
                    </h5>
                  </div>
                  {faqtoggle5 ? (
                    <div
                      className="collapse item-5"
                      role="tabpanel"
                      data-parent="#accordion-1"
                    >
                      <div className="card-body">
                        <p
                          className="card-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgb(0,0,0)",
                          }}
                        >
                          If you perform outstanding during your training
                          period. You will get exposure from our platform and
                          recommend to Pakistan Olympic Association (POA).&nbsp;
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    role="tab"
                    style={{
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "30px",
                    }}
                  >
                    <h5 className="mb-0">
                      <a
                        onClick={() => setfaqtoggle6(!faqtoggle6)}
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1 .item-6"
                        href="#accordion-1 .item-6"
                        style={{
                          color: "rgb(0,0,0)",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <strong>
                          I am willing to break a Guinness World Record? What
                          should I do ?
                        </strong>
                        <i
                          className={`${
                            faqtoggle6
                              ? "fa fa-minus float-right"
                              : "fa fa-plus float-right"
                          }`}
                        ></i>
                        <br />
                      </a>
                    </h5>
                  </div>
                  {faqtoggle6 ? (
                    <div
                      className="collapse item-6"
                      role="tabpanel"
                      data-parent="#accordion-1"
                    >
                      <div className="card-body">
                        <p
                          className="card-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgb(0,0,0)",
                          }}
                        >
                          In 'Guinness World Record' section, you will see
                          button 'Break the Record'. Click on it and send us
                          your detail information what you can do to make a name
                          in Guinness Book of World Record.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    role="tab"
                    style={{
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "30px",
                    }}
                  >
                    <h5 className="mb-0">
                      <a
                        onClick={() => setfaqtoggle7(!faqtoggle7)}
                        data-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="accordion-1 .item-7"
                        href="#accordion-1 .item-7"
                        style={{
                          color: "rgb(0,0,0)",
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        <strong>
                          How can I be safe from any scam/harassments being an
                          athlete?
                        </strong>
                        <i
                          className={`${
                            faqtoggle7
                              ? "fa fa-minus float-right"
                              : "fa fa-plus float-right"
                          }`}
                        ></i>
                        <br />
                      </a>
                    </h5>
                  </div>
                  {faqtoggle7 ? (
                    <div
                      className="collapse item-7"
                      role="tabpanel"
                      data-parent="#accordion-1"
                    >
                      <div className="card-body">
                        <p
                          className="card-text"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            color: "rgb(0,0,0)",
                          }}
                        >
                          Your safety is our first priority. To maintain a
                          quality and safety standard we make our platform
                          anti-scam/anti-harassments. Being a an athlete you are
                          provide a section 'Register a complaint'. You can file
                          a complaint against any coach if you are involved in
                          any incident.&nbsp;
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="associated"
        style={{ background: "rgb(255,255,255)", marginBottom: "64px" }}
      >
        <div className="container" style={{ marginTop: "50px" }}>
          <div className="row d-xl-flex justify-content-xl-center align-items-xl-center">
            <div className="col d-xl-flex justify-content-xl-center align-items-xl-center">
              <img
                className="img-fluid"
                src="/POA.png"
                style={{ width: "150px" }}
              />
            </div>
            <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
              <img
                className="img-fluid"
                src="/Olympic.png"
                style={{ width: "225px" }}
              />
            </div>
            <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
              <img
                className="img-fluid"
                src="/Guinness.png"
                style={{ width: "150px" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="contact"
        style={{
          paddingTop: "130px",
          paddingBottom: "100px",
          background: "url(/map-image.png), rgb(33,37,41)",
          marginBottom: "-20px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col" style={{ height: "157.1875px" }}>
              <h1
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "rgb(255,255,255)",
                  textAlign: "center",
                }}
              >
                <strong>Contact Us</strong>
              </h1>
              <h1
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                You can contact us by filling the form below.
                <br />
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form>
                <div className="form-row">
                  <div className="col">
                    <div style={{ marginBottom: "16px" }}>
                      <input
                        className="form-control inputform"
                        onChange={handleChange}
                        name="name"
                        type="text"
                        style={{
                          height: "66px",
                          borderRadius: "4px",
                          color: "rgb(33,37,41)",
                          fontSize: "16px",
                          fontFamily: "Montserrat, sans-serif",
                          lineHeight: "24px",
                          fontWeight: "bold",
                          padding: "1rem",
                        }}
                        placeholder="Your Name *"
                      />
                    </div>
                    {/* <text style={{ color: "red" }}>
                        {details?.name === "" ? "Name is required" : null}
                      </text> */}
                    <div style={{ marginBottom: "16px" }}>
                      <input
                        className="form-control inputform"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        style={{
                          height: "66px",
                          borderRadius: "4px",
                          color: "rgb(33,37,41)",
                          fontSize: "16px",
                          fontFamily: "Montserrat, sans-serif",
                          lineHeight: "24px",
                          fontWeight: "bold",
                        }}
                        placeholder="Your Email *"
                      />
                    </div>
                    {/* {details?.email !== "" ? (
                        <text
                          style={{
                            color: e ? "red" : null,
                            marginLeft: "8px",
                          }}
                        >
                          {emailerror}
                        </text>
                      ) : null} */}
                    <div style={{ marginBottom: "16px" }}>
                      <input
                        className="form-control inputform"
                        type="number"
                        name="phone"
                        onChange={handleChange}
                        style={{
                          height: "66px",
                          borderRadius: "4px",
                          color: "rgb(33,37,41)",
                          fontSize: "16px",
                          fontFamily: "Montserrat, sans-serif",
                          lineHeight: "24px",
                          fontWeight: "bold",
                        }}
                        placeholder="Your Phone *"
                      />
                    </div>
                  </div>
                  {/* {details?.phone?.length !== 11 ? (
                      <text
                        style={{
                          color: "red",
                          marginLeft: "8px",
                        }}
                      >
                        Invalid phone number
                      </text>
                    ) : null} */}
                  <div className="col">
                    <div>
                      <textarea
                        className="form-control"
                        name="message"
                        onChange={handleChange}
                        style={{
                          height: "248px",
                          borderRadius: "4px",
                          color: "rgb(33,37,41)",
                          fontSize: "16px",
                          lineHeight: "24px",
                          fontWeight: "bold",
                          fontFamily: "Montserrat, sans-serif",
                          padding: "1rem",
                        }}
                        placeholder="Your Message *"
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-100"></div>
                </div>
              </form>
            </div>
          </div>
          <div className="row d-xl-flex" style={{ marginTop: "22px" }}>
            <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center">
              <button
                className="btn btn-primary btncontact"
                disabled={
                  details?.name?.length === "" ||
                  details?.phone?.length !== 11 ||
                  details?.message?.length === "" ||
                  e === true
                    ? true
                    : false
                }
                type="button"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                <strong>SEND MESSAGE</strong>
                <br />
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer
        className="d-xl-flex justify-content-xl-center align-items-xl-center"
        style={{ height: "90px", marginTop: "20px", background: "#001c33" }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col d-xl-flex justify-content-xl-center align-items-xl-center"
              style={{ textAlign: "center" }}
            >
              <span style={{ fontFamily: "Montserrat, sans-serif" }}>
                Copyright&nbsp;© Athletistan 2022
                <br />
              </span>
            </div>
            <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
              <a
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons"
                id="socialmedia"
              >
                <i
                  className="fa fa-twitter"
                  style={{ color: "rgb(255,255,255)" }}
                ></i>
              </a>
              <a
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons"
                id="socialmedia"
              >
                <i
                  className="fa fa-facebook"
                  style={{ color: "rgb(255,255,255)" }}
                ></i>
              </a>
              <a
                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center socicons"
                id="socialmedia"
              >
                <i
                  className="fa fa-instagram"
                  style={{ color: "rgb(255,255,255)" }}
                ></i>
              </a>
            </div>
            <div className="col d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center">
              <a
                id="socialmedia"
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
  );
};

export default Home;
