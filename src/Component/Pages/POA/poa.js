import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import styles from "./poa.module.css";
import { scroller } from "react-scroll";
import "./navbar.css";

const POA = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [sportsname, setsportsname] = useState([]);
  const [selectedsport, setselectedsport] = useState("ALL SPORTS");
  const [poadata, setpoadata] = useState([]);
  const [details, setdetails] = useState([]);
  const [showconfirmation, setshowconfirmation] = useState(false);

  const defaultathletes = () => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/poa/defaultathletes`)
      .then((res) => {
        setpoadata(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/sportslist`)
      .then((res) => {
        res.data.unshift("ALL SPORTS");
        sort(res.data);
      });
    defaultathletes();
    {
      window.scrollTo(0, 0);
    }
  }, []);

  const sort = (array) => {
    let arr = array.sort((a, b) => a.localeCompare(b));
    setsportsname(arr);
    setselectedsport(arr[0]);
  };

  const handleChange = (e) => {
    setselectedsport(e.target.value);
    if (e.target.value === "ALL SPORTS") {
      defaultathletes();
    } else {
      axios
        .get(`https://athletistan.herokuapp.com/routes/poa/findtopathletes`, {
          params: {
            sportname: e.target.value,
          },
        })
        .then((res) => {
          setpoadata(res.data);
        });
    }
  };

  const handlegetthedetails = (id) => {
    setshowconfirmation(true);
    axios
      .get(`https://athletistan.herokuapp.com/routes/poa/getthedetails`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setdetails(res.data);
      });
  };

  const handleclick = () => {
    scroller.scrollTo("SearchSport", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  //   const findtopathletes = () => {
  //     axios
  //       .get(`https://athletistan.herokuapp.com/routes/poa/findtopathletes`, {
  //         params: {
  //           sportname: selectedsport,
  //         },
  //       })
  //       .then((res) => {
  //         setpoadata(res.data);
  //       });
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
          className="headerblue"
          style={{
            marginTop: "80px",
            background: "url(Headercopy.jpg) round #184e8e",
            paddingBottom: "0px",
            height: "850px",
            backgroundSize: "cover, auto",
          }}
        >
          <div className="container hero">
            <div className="row d-xxl-flex justify-content-xxl-end">
              <div
                className="col-12 col-lg-6 col-xl-5 offset-xl-1"
                style={{
                  marginLeft: "0px",
                  width: "740.078px",
                  // marginTop: "0px",
                  // marginBottom: "100px",
                  margin: "0px 40px 100px -24px",
                }}
              >
                <h1
                  style={{
                    marginTop: "275px",
                    fontFamily: "Montserrat, sans-serif",
                    marginBottom: "0px",
                    lineHeight: "1.2",
                    color: "#fff",
                    fontSize: "42px",
                    fontWeight: "bold",
                    minWidth: "1000px",
                  }}
                >
                  <strong>Pakistan Olympic Association</strong>
                  <br />
                </h1>
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    marginTop: "26px",
                    fontSize: "20px",
                    marginBottom: "30px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: "300",
                    textAlign: "justify",
                    minWidth: "710px",
                  }}
                >
                  Aim is to develop, promote and protect the Olympic Movement in
                  Pakistan, in accordance with the Olympic Charter by spreading
                  the POA’s vision through deliverable means. <br />
                  Athletistan helping POA to shortlist the best candidates from
                  our platform and we highlight their performance in the form of
                  marks that is given by their respective coach below
                  <br />
                </p>
                <button
                  onClick={handleclick}
                  className={`btn btn-light btn-lg ${styles.btnathlesian}`}
                  type="button"
                  style={{ fontSize: "28px" }}
                >
                  See our best Athletistanis&nbsp;
                  <i className="fa fa-angle-double-down"></i>
                </button>
              </div>
            </div>
          </div>
        </header>
        <section
          id="SearchSport"
          style={{ background: "#f8f9fa", padding: "150px 0" }}
        >
          <div
            className="container"
            style={{
              background: "#ffffff",
              paddingBottom: "80px",
              maxWidth: "1250px",
              paddingRight: "60px",
              paddingLeft: "60px",
              marginRight: "auto",
              marginLeft: "auto",
              width: "100%",
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
                    marginTop: "0",
                    marginBottom: ".5rem",
                  }}
                >
                  <strong>select sport</strong>
                </h1>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "12px" }}>
              <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-end">
                <select
                  onChange={handleChange}
                  style={{
                    width: "400px",
                    appearance: "none",
                    fontSize: "30px",
                    background: "linear-gradient(#C9D6FF, rgba(226,226,226,0))",
                    marginRight: "0px",
                    color: "rgb(0,0,0)",
                    cursor: "pointer",
                    fontFamily:
                      "&quot;Montserrat&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif",
                    fontWeight: "700",
                    display: "inline-block",
                    lineHeight: "1.5",
                    textAlign: "center",
                    textDecoration: "none",
                    verticalAlign: "middle",
                    border: "1px solid transparent",
                    padding: ".375rem .75rem",
                    borderRadius: ".25rem",
                    transition:
                      "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                  }}
                >
                  <optgroup label="Select your sport">
                    {sportsname.map((names) => (
                      <option key={names} value={names}>
                        {names}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
            {poadata.length > 0 ? (
              <div
                className="row"
                style={{ paddingTop: "80px", marginTop: "10px" }}
              >
                {poadata.map((pd) => {
                  return (
                    <div
                      className="col d-flex d-xl-flex "
                      style={{ marginTop: "20px" }}
                    >
                      {pd.athletedata.map((ad) => {
                        return (
                          <div
                            className={`${styles.card}`}
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
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "200px",
                                background: `url(${ad.dp}) center / contain `,
                                borderTopLeftRadius: "20px",
                                borderRopRightRadius: "20px",
                                borderBottomLeftRadius: "30px",
                              }}
                            ></div>
                            <div
                              className="card-body d-flex flex-column"
                              style={{
                                height: "210px",
                                background: "linear-gradient(#ECE9E6, #FFFFFF)",
                                borderTopRightRadius: "30px",
                              }}
                            >
                              <div>
                                <h4
                                  style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: "700",
                                    color: "#001C33",
                                  }}
                                >
                                  {ad.name}
                                </h4>
                                <h6
                                  className="text-muted mb-2"
                                  style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: "600",
                                    color: "#8f8f8f !important",
                                  }}
                                >
                                  {ad.city}, Pakistan
                                </h6>
                                <p
                                  style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    color: "#212121",
                                    marginTop: "16px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Age: {ad.age}
                                  <br />
                                  Gender: {ad.gender}
                                  <br />
                                  Performance result: {pd.grade}%
                                </p>
                              </div>
                              <a
                                onClick={() => handlegetthedetails(pd._id)}
                                className="card-link align-self-end"
                                data-bss-hover-animate="pulse"
                                style={{
                                  padding: "4px",
                                  background: "#001c33",
                                  color: "rgb(255,255,255)",
                                  borderRadius: "17px",
                                  paddingRight: "14px",
                                  paddingLeft: "14px",
                                  paddingBottom: "6px",
                                  fontFamily: "Montserrat, sans-serif",
                                  marginTop: "auto",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#modal1"
                              >
                                Details
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <div className="row">
                  <div className="col">
                    <span
                      className="d-xl-flex justify-content-xl-center align-items-xl-center"
                      style={{ fontSize: "40px", margin: 200 }}
                    >
                      Currently, no athletes available to show.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <div
          className={`${styles.modal} ${showconfirmation && `${styles.show}`}`}
          role="dialog"
          tabindex="-1"
          id="modal1"
        >
          <div
            className="modal-dialog modal-xl"
            role="document"
            style={{ minWidth: "1200px", maxWidth: "1140px" }}
          >
            <div className="modal-content">
              <div
                className={`${styles.modal_header}`}
                style={{ background: "#ECECF1" }}
              >
                <h4
                  className={`${styles.modal_title}`}
                  style={{ fontSize: "30px" }}
                >
                  <strong>Athlete Details</strong>
                  <br />
                </h4>
                <button
                  type="button"
                  style={{ backgroundColor: "#ECECF1", borderColor: "#ECECF1" }}
                  onClick={() => setshowconfirmation(false)}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  X
                </button>
              </div>

              {details.map((dt) => {
                return (
                  <div>
                    {dt.athletedata.map((ad) => {
                      return (
                        <div className={`${styles.modal_body}`}>
                          <div className="row" style={{ marginBottom: "10px" }}>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div
                                  className="col"
                                  style={{
                                    background:
                                      "linear-gradient(rgba(0,0,0,0.13), white)",
                                    borderTopLeftRadius: "20px",
                                    borderTopRightRadius: "20px",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  <p
                                    className="mb-auto"
                                    style={{ fontSize: "20px" }}
                                  >
                                    <strong>Personal Details</strong>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Name</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p>{ad.name}</p>{" "}
                                </div>
                              </div>
                            </div>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Email</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p>
                                    {ad.email}
                                    <br />
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Contact</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p>{ad.contactno}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Gender</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p>{ad.gender}</p>{" "}
                                </div>
                              </div>
                            </div>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Age</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  {" "}
                                  <p>{ad.age}</p>{" "}
                                </div>
                              </div>
                            </div>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>City</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  {" "}
                                  <p>{ad.city}</p>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Experience&nbsp;</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p>{ad.noofexp}</p>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Sports</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <p>{ad.areaofinterestolympics}</p>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Description</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  {" "}
                                  <p>{ad.desc}</p>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row" style={{ marginBottom: "10px" }}>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div
                                  className="col"
                                  style={{
                                    background:
                                      "linear-gradient(rgba(0,0,0,0.13), white)",
                                    borderTopLeftRadius: "20px",
                                    borderTopRightRadius: "20px",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  <p
                                    className="mb-auto"
                                    style={{ fontSize: "20px" }}
                                  >
                                    <strong>Coach by</strong>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div className="col">
                                  <p className="mb-auto">
                                    <strong>Coach Name</strong>
                                  </p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  {" "}
                                  <p>{dt.coachname}</p>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row" style={{ marginBottom: "10px" }}>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div
                                  className="col"
                                  style={{
                                    background:
                                      "linear-gradient(rgba(0,0,0,0.13), white)",
                                    borderTopLeftRadius: "20px",
                                    borderTopRightRadius: "20px",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  <p
                                    className="mb-auto"
                                    style={{ fontSize: "20px" }}
                                  >
                                    <strong>Overall Performance</strong>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {dt.overallspecializedparameters.map((osp) => {
                            return (
                              <div className="row">
                                <div
                                  className="col"
                                  style={{
                                    fontFamily: "Montserrat, sans-serif",
                                  }}
                                >
                                  <div className="row">
                                    <div className="col">
                                      <p className="mb-auto">
                                        <strong>Obtained Points</strong>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <p>{osp.finalobttotal}</p>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{
                                    fontFamily: "Montserrat, sans-serif",
                                  }}
                                >
                                  <div className="row">
                                    <div className="col">
                                      <p className="mb-auto">
                                        <strong>Total Points</strong>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <p>{osp.finaltotal}</p>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{
                                    fontFamily: "Montserrat, sans-serif",
                                  }}
                                >
                                  <div className="row">
                                    <div className="col">
                                      <p className="mb-auto">
                                        <strong>Percentage</strong>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <p>{dt.grade}%</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="row" style={{ marginBottom: "10px" }}>
                            <div
                              className="col"
                              style={{ fontFamily: "Montserrat, sans-serif" }}
                            >
                              <div className="row">
                                <div
                                  className="col"
                                  style={{
                                    background:
                                      "linear-gradient(rgba(0,0,0,0.13), white)",
                                    borderTopLeftRadius: "20px",
                                    borderTopRightRadius: "20px",
                                    paddingTop: "5px",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  <p
                                    className="mb-auto"
                                    style={{ fontSize: "20px" }}
                                  >
                                    <strong>Remarks</strong>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {dt.remarks.map((rm) => {
                            return (
                              <div className="row">
                                <div
                                  className="col"
                                  style={{
                                    fontFamily: "Montserrat, sans-serif",
                                  }}
                                >
                                  <div className="row">
                                    <div className="col">
                                      <p className="mb-auto">
                                        <strong>Remarks by Coach</strong>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <p>
                                        {rm.finalremarks}
                                        <br />
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <p
                                        className="mb-auto"
                                        style={{ textAlign: "center" }}
                                      >
                                        <strong>Overall Performance is</strong>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <p style={{ textAlign: "center" }}>
                                        {rm.overallper}
                                        <br />
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div
                className={`${styles.modal_footer}`}
                style={{ background: "#ECECF1" }}
              >
                <button
                  onClick={() => setshowconfirmation(false)}
                  className="btn btn-light"
                  type="button"
                  data-bs-dismiss="modal"
                  style={{
                    background: "rgb(255,255,255)",
                    fontFamily:
                      "&quot;Montserrat&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif",
                    fontWeight: "700",
                    color: "#000",
                    borderColor: "#f8f9fa",
                    textAlign: "center",
                    textDecoration: "none",
                    verticalAlign: "middle",
                    display: "inline-block",
                    lineHeight: "1.5",
                    padding: ".375rem .75rem",
                    fontSize: "1rem",
                    borderRadius: ".25rem",
                    transition:
                      "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default POA;
