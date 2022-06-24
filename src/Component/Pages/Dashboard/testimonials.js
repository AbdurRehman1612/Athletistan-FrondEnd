import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import axios from "axios";
import styles from "./testimonials.module.css";

const Testimonials = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const coachid = useSelector((state) => state.auth?.authData?.result?._id);
  const sportname = useSelector(
    (state) => state.auth?.authData?.result?.areaofinterest
  );
  const acctype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );

  const [reqtype, setreqtype] = useState("direct");
  const [athletesdata, setathletesdata] = useState([]);
  const [athletedetails, setathletedetails] = useState([]);
  const [customizedathletesdata, setcustomizedathletesdata] = useState([]);
  const [showdetails, setshowdetails] = useState(false);
  const [showconfirmation, setshowconfirmation] = useState(false);

  const directrequestathletes = () => {
    var rej1 = [];
    var datatoshow1 = [];
    axios
      .get(`https://athletistan.herokuapp.com/routes/dashboard/showathletes`, {
        params: {
          coachid: coachid,
        },
      })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data.map((rd) => {
            rej1.push(rd.requestrejectedby);
            console.log("rej1", rej1);
          });

          if (!rej1.some((name) => name.includes(coachid))) {
            datatoshow1.push(res.data[i]);
          }
        }
        console.log("datatoshow1", datatoshow1);
        setathletesdata(datatoshow1);
      });
  };
  const customizedrequestathletes = () => {
    var rej = [];
    var datatoshow = [];
    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/showcustomizedathletes`,
        {
          params: {
            sportname: sportname,
          },
        }
      )
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data.map((rd) => {
            rej.push(rd.customizedreqrejectedby);
            console.log("rej", rej);
          });

          if (!rej.some((name) => name.includes(coachid))) {
            datatoshow.push(res.data[i]);
          }
        }
        console.log("datatoshow", datatoshow);
        setcustomizedathletesdata(datatoshow);
      });
  };

  useEffect(() => {
    directrequestathletes();
    customizedrequestathletes();
  }, []);

  const onChange = (e) => {
    console.log(e.target.value);
    setreqtype(e.target.value);
  };

  const routehome = () => {
    history.push("/");
  };
  const handlelogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
  };

  const routedashboard = () => {
    history.push("/dashboard");
  };
  const routemyprofile = () => {
    history.push("/myprofile");
  };
  const routemyathlete = () => {
    history.push("/myathlete");
  };
  const routeavailabilityandfee = () => {
    history.push("/availabilityandfee");
  };
  const routemyschedule = () => {
    history.push("/myschedule");
  };
  const routeevaluationform = () => {
    history.push("/evaluationform");
  };

  const handledetails = (id) => {
    setshowdetails(true);
    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/customizedathletedetails`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        console.log("detailsofathleteeee===========>", res.data);

        setathletedetails(res.data);
      });
  };

  const refresh = () => {
    if (!window.location.hash) {
      window.location = window.location + "";
      window.location.reload();
    }
  };

  const handledirectaccept = (id) => {
    console.log("id", id);

    axios.post(
      `https://athletistan.herokuapp.com/routes/dashboard/acceptdirectreq`,
      {
        id: id,
      }
    );
    alert("Request has been accepted successfully!");
    refresh();
  };
  const handledirectreject = (id) => {
    console.log("id", id);

    axios.post(
      `https://athletistan.herokuapp.com/routes/dashboard/rejectdirectreq`,
      {
        id: id,
        coachid: coachid,
      }
    );
    alert("Request has been removed successfully!");
    refresh();
  };

  const handlecustomizedaccepted = (id) => {
    setshowconfirmation(true);
    console.log("id", id);

    axios.post(
      `https://athletistan.herokuapp.com/routes/dashboard/acceptcustomizedreq`,
      {
        id: id,
        coachid: coachid,
        coachname: name,
        coachdp: dp,
      }
    );
    alert("Request has been accepted successfully!");
    setshowdetails(false);
    refresh();
  };
  const handlecustomizedreject = (id) => {
    console.log("id", id);
    axios.post(
      `https://athletistan.herokuapp.com/routes/dashboard/rejectcustomizedreq`,
      {
        id: id,
        coachid: coachid,
      }
    );
    alert("Request has been removed successfully!");
    refresh();
  };

  console.log("reqtype", reqtype);
  console.log("reqtype", reqtype);
  console.log("showdetails", showdetails);
  console.log("customizedathletesdata", customizedathletesdata);
  console.log("athletedetails", athletedetails);

  return (
    <body id="page-top" className={`${toggle ? "sidebar-toggled" : ""}`}>
      <div id="wrapper">
        <nav
          className={`navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 ${
            toggle ? "toggled" : ""
          }`}
          style={{
            background: "linear-gradient(#780206 0%, #061161 169%)",
          }}
        >
          <div
            className={`container-fluid ${styles.dFlex} ${styles.flexColumn} p-0`}
          >
            <a
              className={`navbar-brand ${styles.dFlex} justify-content-center align-items-center sidebar-brand m-0`}
            >
              <div className="sidebar-brand-icon">
                {" "}
                <img src={"/logo1.png"} />
              </div>
              <div className="sidebar-brand-text mx-3">
                <span>Coach</span>
              </div>
            </a>
            <hr
              className="sidebar-divider my-0"
              style={{ paddingTop: "50px" }}
            />
            <ul className="navbar-nav text-light" id="accordionSidebar">
              <li className="nav-item" id="listsc">
                <a className="nav-link" onClick={routedashboard}>
                  <i
                    className="fas fa-tachometer-alt"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>Dashboard</span>
                </a>
              </li>
              <li className="nav-item" id="listsc">
                <a className="nav-link " onClick={routemyathlete}>
                  <i
                    className="fas fa-users"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>My Athletes</span>
                </a>
              </li>
              <li className="nav-item" id="listsc">
                <a className="nav-link" onClick={routemyprofile}>
                  <i
                    className="far fa-user-circle"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      paddingRight: "8px",
                    }}
                  >
                    Profile
                  </span>
                </a>
              </li>
              <li className="nav-item" id="listsc">
                <a className="nav-link" onClick={routemyschedule}>
                  <i
                    className="fa fa-calendar"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      paddingRight: "8px",
                    }}
                  >
                    Schedule
                  </span>
                </a>
              </li>
              <li className="nav-item" id="listsc">
                <a className="nav-link" onClick={routeavailabilityandfee}>
                  <i className="fa fa-th" style={{ paddingRight: "8px" }}></i>
                  <span style={{ paddingRight: "8px" }}>
                    Availability &amp; Fee&nbsp;
                  </span>
                </a>
              </li>
              <li className="nav-item" id="listsc">
                <a className="nav-link active">
                  <i className="fa fa-star" style={{ paddingRight: "8px" }}></i>
                  <span style={{ paddingRight: "8px" }}>Requests</span>
                </a>
              </li>
              <li className="nav-item" id="listsc">
                <a className="nav-link" onClick={routeevaluationform}>
                  <i
                    className="fa fa-wpforms"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>Evaluation Form</span>
                </a>
              </li>
            </ul>
            <div className="text-center d-none d-md-inline">
              <i
                style={{
                  fontSize: "40px",
                  color: "white",
                  marginTop: "10px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setToggle(!toggle)}
                className={
                  toggle
                    ? "far fa-arrow-alt-circle-right"
                    : "far fa-arrow-alt-circle-left"
                }
              ></i>
            </div>
            <div className="text-center d-none d-md-inline"></div>
          </div>
        </nav>
        <div
          className={` ${styles.dFlex} ${styles.flexColumn} `}
          id="content-wrapper"
        >
          <div id="content">
            <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
              <div className="container-fluid">
                <button
                  className="btn btn-link d-md-none rounded-circle mr-3"
                  id="sidebarToggleTop"
                  type="button"
                >
                  <i className="fas fa-bars"></i>
                </button>
                <form className="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <span style={{ fontSize: "24px" }}>
                    Hi <strong>{name}</strong>, Welcome Back!
                  </span>
                </form>
                <ul className="navbar-nav flex-nowrap ml-auto">
                  <li className="nav-item dropdown no-arrow">
                    <div className="nav-item dropdown no-arrow">
                      <a
                        className="dropdown-toggle nav-link"
                        aria-expanded="false"
                        data-toggle="dropdown"
                      >
                        <span
                          className="d-none d-lg-inline mr-2 text-gray-600 small"
                          style={{ fontSize: "17.8px" }}
                        >
                          {name}
                        </span>
                        <img
                          className="border rounded-circle img-profile"
                          src={dp}
                          style={{ width: "40px", height: "40px" }}
                        />
                      </a>
                      <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in">
                        <a className="dropdown-item" onClick={routehome}>
                          <i className="fas fa-home fa-sm fa-fw mr-2 text-gray-400"></i>
                          &nbsp;Home
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={routemyprofile}>
                          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                          &nbsp;My Profile
                        </a>

                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={handlelogout}>
                          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                          &nbsp;Logout
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            <div
              className="container-fluid"
              style={{
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                marginRight: "auto",
                marginLeft: "auto",
                width: "100%",
              }}
            >
              <div
                className="d-sm-flex justify-content-between align-items-center mb-4"
                style={{
                  marginBottom: "1.5rem!important",
                  alignItems: "center!important",
                  justifyContent: "space-between!important",
                }}
              >
                <h3
                  className="text-dark mb-0"
                  style={{
                    color: "#5a5c69!important",
                    marginBottom: "0!important",
                    fontSize: "1.75rem",
                    fontWeight: "400",
                    lineHeight: "1.2",
                    marginTop: "0",
                  }}
                >
                  {reqtype === "direct"
                    ? "Athletes Direct Requests"
                    : "Athletes Customized Requests"}
                  <br />
                </h3>
                <select
                  onChange={onChange}
                  style={{
                    background: "rgb(255,255,255)",
                    borderRadius: ".2rem",
                    color: "rgb(133,135,150)",
                    fontSize: "20px",
                    padding: ".375rem 2.25rem .375rem .75rem",
                    border: "1px solid #d1d3e2",
                    margin: "0",
                    fontFamily: "inherit",
                    lineHeight: "inherit",
                  }}
                >
                  <option value="direct" selected="">
                    Direct Requests
                  </option>
                  <option value="customized">Customized Requests</option>
                </select>
              </div>
              <div
                className="row"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginRight: "-.75rem",
                  marginLeft: "-.75rem",
                }}
              >
                {reqtype === "direct" && athletesdata.length > 0 ? (
                  <div
                    className={`col ${styles.dFlex} justify-content-center`}
                    style={{
                      justifyContent: "center!important",
                      display: "flex!important",
                      flexBasis: "0",
                      flexGrow: "1",
                      maxWidth: "100%",
                      position: "relative",
                      width: "100%",
                      paddingRight: ".75rem",
                      paddingLeft: ".75rem",
                    }}
                  >
                    {athletesdata.map((ad) => {
                      return (
                        <div
                          className={`${styles.card1}`}
                          style={{
                            width: "18rem",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                            borderBottomRightRadius: "20px",
                            borderBottomLeftRadius: "20px",
                            boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.25)",
                            margin: "14px",
                            marginBottom: "20px",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "200px",
                              background: `url(${ad.athletedp}) center / contain repeat`,
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                            }}
                          ></div>
                          <div
                            className={`${styles.card_Body} ${styles.dFlex} ${styles.flexColumn}`}
                            style={{ height: "auto", paddingBottom: "0px" }}
                          >
                            <div>
                              <h4
                                style={{
                                  fontFamily: "Nunito, sans-serif",
                                  fontWeight: "700",
                                  color: "#4e73df",
                                }}
                              >
                                {ad.athletename}
                              </h4>
                              <h6
                                className="text-muted mb-2"
                                style={{
                                  fontFamily: "Nunito, sans-serif",
                                  fontWeight: "600",
                                  color: "#757575 !important",
                                }}
                              >
                                {ad.athletecity}, Pakistan
                              </h6>
                              <p
                                style={{
                                  fontFamily: "Nunito, sans-serif",
                                  color: "#212121",
                                  marginTop: "16px",
                                }}
                              >
                                Age: {ad.athleteage}
                                <br />
                                Gender: {ad.athletegender}
                                <br />
                                Description: {ad.athletedesc}
                              </p>
                            </div>
                            <div
                              className="row"
                              style={{
                                marginBottom: "-15px",
                                display: "flex",
                                flexWrap: "wrap",
                                marginRight: "-.75rem",
                                marginLeft: "-.75rem",
                              }}
                            >
                              <div className="col d-xl-flex justify-content-xl-center">
                                <a
                                  className="align-self-end"
                                  data-bss-hover-animate="pulse"
                                  style={{
                                    padding: "4px",
                                    background: "#f34542",
                                    color: "rgb(255,255,255)",
                                    borderRadius: "17px",
                                    paddingRight: "14px",
                                    paddingLeft: "14px",
                                    paddingBottom: "6px",
                                    fontFamily: "Source Sans Pro, sans-serif",
                                    marginTop: "auto",
                                  }}
                                  data-target="#confirmation-1"
                                  data-toggle="modal"
                                >
                                  <i
                                    className="fa fa-remove"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Reject
                                </a>
                              </div>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <a
                                  className="align-self-end"
                                  data-bss-hover-animate="pulse"
                                  style={{
                                    padding: "4px",
                                    background: "#38ba7c",
                                    color: "rgb(255,255,255)",
                                    borderRadius: "17px",
                                    paddingRight: "14px",
                                    paddingLeft: "14px",
                                    paddingBottom: "6px",
                                    fontFamily: "Source Sans Pro, sans-serif",
                                    marginTop: "auto",
                                  }}
                                  data-target="#confirmation-2"
                                  data-toggle="modal"
                                >
                                  <i
                                    className="fa fa-check"
                                    style={{ paddingRight: "5px" }}
                                  ></i>
                                  Accept
                                </a>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${styles.modal}`}
                            role="dialog"
                            tabindex="-1"
                            id="confirmation-1"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className={`${styles.modalHeader}`}>
                                  <h4 className={`${styles.modalTitle}`}>
                                    Confirmation
                                  </h4>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className={`${styles.modalBody}`}>
                                  <p style={{ color: "rgb(0,0,0)" }}>
                                    Are you sure you want to reject the request
                                    for this athlete?
                                    <br />
                                  </p>
                                </div>
                                <div className={`${styles.modalFooter}`}>
                                  <button
                                    className="btn btn-light"
                                    type="button"
                                    data-dismiss="modal"
                                    style={{
                                      background: "rgb(242,242,242)",
                                      fontFamily:
                                        "&quot;Montserrat&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif",
                                      fontWeight: "700",
                                      color: "#000",
                                      borderColor: "#f8f9fa",
                                      display: "inline-block",
                                      lineHeight: "1.5",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                      border: "1px solid transparent",
                                      padding: ".375rem .75rem",
                                      fontSize: "1rem",
                                      borderRadius: ".25rem",
                                      transition:
                                        "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    data-dismiss="modal"
                                    onClick={() => handledirectreject(ad._id)}
                                    className="btn btn-primary"
                                    type="button"
                                    style={{
                                      background: "rgb(237,0,0)",
                                      color: "#fff",
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
                                      fontSize: "1rem",
                                      borderRadius: ".25rem",
                                      transition:
                                        "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                    }}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${styles.modal}`}
                            role="dialog"
                            tabindex="-1"
                            id="confirmation-2"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className={`${styles.modalHeader}`}>
                                  <h4 className={`${styles.modalTitle}`}>
                                    Confirmation
                                  </h4>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className={`${styles.modalBody}`}>
                                  <p style={{ color: "rgb(0,0,0)" }}>
                                    Are you sure you want to accept the request
                                    for this athlete?
                                    <br />
                                  </p>
                                </div>
                                <div className={`${styles.modalFooter}`}>
                                  <button
                                    className="btn btn-light"
                                    type="button"
                                    data-dismiss="modal"
                                    style={{
                                      background: "rgb(242,242,242)",
                                      fontFamily:
                                        "&quot;Montserrat&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif",
                                      fontWeight: "700",
                                      color: "#000",
                                      borderColor: "#f8f9fa",
                                      display: "inline-block",
                                      lineHeight: "1.5",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                      border: "1px solid transparent",
                                      padding: ".375rem .75rem",
                                      fontSize: "1rem",
                                      borderRadius: ".25rem",
                                      transition:
                                        "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handledirectaccept(ad._id)}
                                    className="btn btn-primary"
                                    type="button"
                                    style={{
                                      background: "#38ba7c",
                                      color: "#fff",
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
                                      fontSize: "1rem",
                                      borderRadius: ".25rem",
                                      transition:
                                        "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                    }}
                                  >
                                    Accept
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {reqtype === "direct" && athletesdata.length === 0 ? (
                  <div>
                    <div
                      className="row"
                      style={{ padding: "250px", marginLeft: "180px" }}
                    >
                      <div className="col">
                        <h2
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "42px",
                            textAlign: "center",
                            color: "rgb(180,180,180)",
                            fontWeight: "normal",
                            lineHeight: "1.2",
                          }}
                        >
                          <strong>Sorry, No requests to show</strong>
                        </h2>
                      </div>
                    </div>
                  </div>
                ) : null}
                {reqtype === "customized" &&
                customizedathletesdata.length > 0 ? (
                  <div
                    className={`col ${styles.dFlex} justify-content-center`}
                    style={{
                      justifyContent: "center!important",
                      display: "flex!important",
                      flexBasis: "0",
                      flexGrow: "1",
                      maxWidth: "100%",
                      position: "relative",
                      width: "100%",
                      paddingRight: ".75rem",
                      paddingLeft: ".75rem",
                    }}
                  >
                    {customizedathletesdata.map((cd) => {
                      return (
                        <div>
                          <div
                            className={`${styles.card1}`}
                            style={{
                              width: "18rem",
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                              borderBottomRightRadius: "20px",
                              borderBottomLeftRadius: "20px",
                              boxShadow: "5px 5px 16px 2px rgba(0,0,0,0.25)",
                              margin: "14px",
                              height: "440px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: "200px",
                                background: `url(${cd.athletedp}) center / contain`,
                                borderTopLeftRadius: "20px",
                                borderTopRightRadius: "20px",
                              }}
                            ></div>
                            <div
                              className={`${styles.card_Body} ${styles.dFlex} ${styles.flexColumn}`}
                              style={{ height: "auto" }}
                            >
                              <div>
                                <h4
                                  style={{
                                    fontFamily: "Nunito, sans-serif",
                                    fontWeight: "700",
                                    color: "#4e73df",
                                  }}
                                >
                                  {cd.athletename}
                                </h4>
                                <h6
                                  className="text-muted mb-2"
                                  style={{
                                    fontFamily: "Nunito, sans-serif",
                                    fontWeight: "600",
                                    color: "#757575",
                                  }}
                                >
                                  {cd.athletecity}, Pakistan
                                </h6>
                                <p
                                  style={{
                                    fontFamily: "Nunito, sans-serif",
                                    color: "#212121",
                                    marginTop: "16px",
                                  }}
                                >
                                  Age: {cd.athleteage}
                                  <br />
                                  Gender: {cd.athletegender}
                                  <br />
                                  Experience: {cd.athletenoofexp}
                                </p>
                              </div>
                              <a
                                onClick={() => handledetails(cd._id)}
                                className="-link align-self-end"
                                data-bss-hover-animate="pulse"
                                style={{
                                  padding: "4px",
                                  background: "#4e73df",
                                  color: "rgb(255,255,255)",
                                  borderRadius: "17px",
                                  paddingRight: "14px",
                                  paddingLeft: "14px",
                                  paddingBottom: "6px",
                                  fontFamily: "Source Sans Pro, sans-serif",
                                }}
                                data-target="#modal1"
                                data-toggle="modal"
                              >
                                Details
                              </a>
                            </div>
                          </div>
                          <div
                            className={`${styles.modal} ${
                              showdetails && `${styles.show}`
                            }`}
                            role="dialog"
                            tabindex="-1"
                            id="modal1"
                          >
                            <div
                              style={{ minWidth: "900px", maxWidth: "800px" }}
                              className="modal-dialog modal-lg modal-dialog-centered"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className={`${styles.modalHeader}`}>
                                  <h4 className={`${styles.modalTitle}`}>
                                    Customize training plan
                                    <br />
                                  </h4>
                                  <button
                                    onClick={() => setshowdetails(false)}
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className={`${styles.modalBody}`}>
                                  <form>
                                    <div
                                      className="form-row"
                                      style={{ marginBottom: "10px" }}
                                    >
                                      <div className="col">
                                        <div>
                                          <label for="city">
                                            About&nbsp;
                                            <br />
                                          </label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[1]}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div>
                                          <label for="city">Experience</label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[2]}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="form-row"
                                      style={{ marginBottom: "10px" }}
                                    >
                                      <div className="col">
                                        <div>
                                          <label for="city">
                                            Sports
                                            <br />
                                          </label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[3]}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div>
                                          <label for="city">City</label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[4]}, Pakistan
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="form-row"
                                      style={{ marginBottom: "10px" }}
                                    >
                                      <div className="col">
                                        <div>
                                          <label for="city">
                                            Training Duration
                                            <br />
                                          </label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[5]} weeks
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div>
                                          <label for="city">Time Slot</label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[6]}
                                            <br />
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="form-row"
                                      style={{ marginBottom: "10px" }}
                                    >
                                      <div className="col">
                                        <div>
                                          <label for="city">
                                            Fee
                                            <br />
                                          </label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[7]}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div>
                                          <label for="city">Start Date</label>
                                          <p style={{ color: "rgb(0,0,0)" }}>
                                            {athletedetails[8]}
                                            <br />
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-row">
                                      <div className="col">
                                        <div>
                                          <label for="city">
                                            Extra Note
                                            <br />
                                          </label>
                                          <textarea className="form-control">
                                            {athletedetails[9]}
                                          </textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <div className={`${styles.modalFooter}`}>
                                  <button
                                    onClick={() =>
                                      handlecustomizedreject(cd._id)
                                    }
                                    className="btn btn-light"
                                    type="button"
                                    data-dismiss="modal"
                                    style={{
                                      background: "#f34542",
                                      fontFamily:
                                        "&quot;Montserrat&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif",
                                      fontWeight: "700",
                                      color: "#ffffff",
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
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => setshowconfirmation(true)}
                                    className="btn btn-primary"
                                    type="button"
                                    style={{
                                      marginRight: "5px",
                                      marginLeft: "5px",
                                      background: "#38ba7c",
                                      color: "#fff",
                                      fontFamily:
                                        "&quot;Montserrat&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif",
                                      fontWeight: "700",
                                      display: "inline-block",
                                      lineHeight: "1.5",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                      padding: ".375rem .75rem",
                                      fontSize: "1rem",
                                      borderRadius: ".25rem",
                                      transition:
                                        "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                      borderWidth: "0px",
                                    }}
                                    data-target="#confirmation"
                                    data-toggle="modal"
                                  >
                                    Accept
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`${styles.modal} ${
                              showconfirmation && `${styles.show}`
                            }`}
                            role="dialog"
                            tabindex="-1"
                            id="confirmation"
                          >
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className={`${styles.modalHeader}`}>
                                  <h4 className={`${styles.modalTitle}`}>
                                    Confirmation
                                  </h4>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className={`${styles.modalBody}`}>
                                  <p style={{ color: "rgb(0,0,0)" }}>
                                    Are you sure you want to accept the request
                                    for this athlete?
                                    <br />
                                  </p>
                                </div>
                                <div className={`${styles.modalFooter}`}>
                                  <button
                                    onClick={() => setshowconfirmation(false)}
                                    className="btn btn-light"
                                    type="button"
                                    data-dismiss="modal"
                                    style={{
                                      background: "rgb(242,242,242)",
                                      fontFamily:
                                        "&quot;Montserrat&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif",
                                      fontWeight: "700",
                                      color: "#000",
                                      borderColor: "#f8f9fa",
                                      display: "inline-block",
                                      lineHeight: "1.5",
                                      textAlign: "center",
                                      textDecoration: "none",
                                      verticalAlign: "middle",
                                      cursor: "pointer",
                                      border: "1px solid transparent",
                                      padding: ".375rem .75rem",
                                      fontSize: "1rem",
                                      borderRadius: ".25rem",
                                      transition:
                                        "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      handlecustomizedaccepted(cd._id)
                                    }
                                    data-dismiss="modal"
                                    className="btn btn-primary"
                                    type="button"
                                    style={{
                                      background: "#38ba7c",
                                      color: "#fff",
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
                                      fontSize: "1rem",
                                      borderRadius: ".25rem",
                                      transition:
                                        "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                                    }}
                                  >
                                    Accept
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {reqtype === "customized" &&
                customizedathletesdata.length === 0 ? (
                  <div>
                    <div
                      className="row"
                      style={{ padding: "250px", marginLeft: "180px" }}
                    >
                      <div className="col">
                        <h2
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "42px",
                            textAlign: "center",
                            color: "rgb(180,180,180)",
                            fontWeight: "normal",
                            lineHeight: "1.2",
                          }}
                        >
                          <strong>Sorry, No requests to show</strong>
                        </h2>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* {reqtype === "direct" && athletesdata.length === 0 ? (
         
            <span
              className="d-xl-flex justify-content-xl-center align-items-xl-center"
              style={{ fontSize: "45px", margin: 200 }}
            >
              Currently, no requests available to show.
            </span>
         
        ) : null}
        {reqtype === "customized" && customizedathletesdata.length === 0 ? (
          <div>
            <div className="row">
              <div className="col">
                <span
                  className="d-xl-flex justify-content-xl-center align-items-xl-center"
                  style={{ fontSize: "45px", margin: 200 }}
                >
                  Currently, no requests available to show.
                </span>
              </div>
            </div>
          </div>
        ) : null} */}
      </div>
    </body>
  );
};

export default Testimonials;
