import { React, useState, useEffect } from "react";
import { LOGOUT } from "../../../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";
import styles from "./myathletes.module.css";

const MyAthletes = () => {
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const accounttype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );
  const [myathletes, setmyathletes] = useState([]);
  const [myathletesdetails, setmyathletesdetails] = useState([]);
  const [showconfirmation, setshowconfirmation] = useState(false);

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/dashboard/getmyathletes`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setmyathletes(res.data);
      });
  }, []);

  const handleclick = (id, athleteid) => {
    setshowconfirmation(true);
    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/getmyathletesdetails`,
        {
          params: {
            id: id,
            athleteid: athleteid,
          },
        }
      )
      .then((res) => {
        setmyathletesdetails(res.data);
      });
  };

  const handlelogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
  };
  const routehome = () => {
    history.push("/");
  };
  const routedashboard = () => {
    history.push("/dashboard");
  };
  const routemyprofile = () => {
    history.push("/myprofile");
  };
  const routeavailabilityandfee = () => {
    history.push("/availabilityandfee");
  };
  const routetestimonials = () => {
    history.push("/requests");
  };
  const routemyschedule = () => {
    history.push("/myschedule");
  };
  const routeevaluationform = () => {
    history.push("/evaluationform");
  };

  console.log("myathletes", myathletes);
  console.log("myathletesdetails", myathletesdetails);

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
          <div className="container-fluid d-flex flex-column p-0">
            <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
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
                <a className="nav-link active">
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
                <a className="nav-link" onClick={routetestimonials}>
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
        <div className="d-flex flex-column" id="content-wrapper">
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

            <div className="container-fluid">
              <h3 className="text-dark mb-4">My Athletes</h3>
            </div>
            {myathletes.length === 0 ? (
              <div className="row">
                <div className="col">
                  <span
                    className="d-xl-flex justify-content-xl-center align-items-xl-center"
                    style={{ fontSize: "45px", margin: 200 }}
                  >
                    Currently, no athlete available.
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="row">
                  {myathletes.map((ma) => {
                    return (
                      <div className="col  d-xl-flex justify-content-center justify-content-xl-center">
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
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "200px",
                              background: `url(${ma.athletedp}) center / cover`,
                              borderTopLeftRadius: "20px",
                              borderRopRightRadius: "20px",
                            }}
                          ></div>
                          <div
                            className="card-body d-flex flex-column"
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
                                {ma.athletename}
                              </h4>
                              <h6
                                className="text-muted mb-2"
                                style={{
                                  fontFamily: "Nunito, sans-serif",
                                  fontWeight: "600",
                                  color: "#757575",
                                }}
                              >
                                {ma.athletecity}, Pakistan
                              </h6>
                              <p
                                style={{
                                  fontFamily: "Nunito, sans-serif",
                                  color: "#212121",
                                  marginTop: "16px",
                                }}
                              >
                                Age: {ma.athleteage}
                                <br />
                                Gender: {ma.athletegender}
                                <br />
                                Experience: {ma.athletenoofexp}
                              </p>
                            </div>
                            <a
                              onClick={() => handleclick(ma._id, ma.athleteid)}
                              className="card-link align-self-end"
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
                              data-target="#detail"
                              data-toggle="modal"
                            >
                              Details
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={`${styles.modal} ${
                    showconfirmation && `${styles.show}`
                  }`}
                  role="dialog"
                  tabindex="-1"
                  id="detail"
                >
                  <div
                    className="modal-dialog modal-lg modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">
                          Athlete Information
                          <br />
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
                      <div className="modal-body">
                        <form>
                          <div
                            className="form-row"
                            style={{ marginBottom: "10px" }}
                          >
                            <div className="col">
                              <div>
                                <label for="city">
                                  Contact No.
                                  <br />
                                </label>
                                <p style={{ color: "rgb(0,0,0)" }}>
                                  {myathletesdetails[4]}
                                </p>
                              </div>
                            </div>
                            <div className="col">
                              <div>
                                <label for="city">Address</label>
                                <p style={{ color: "rgb(0,0,0)" }}>
                                  {myathletesdetails[5]}
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
                                <label for="city">Time Slot</label>
                                <p style={{ color: "rgb(0,0,0)" }}>
                                  {myathletesdetails[0]}
                                  <br />
                                </p>
                              </div>
                            </div>
                            <div className="col">
                              <div>
                                <label for="city">No. of training weeks</label>
                                <p style={{ color: "rgb(0,0,0)" }}>
                                  {myathletesdetails[1]}
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
                                  Start Date
                                  <br />
                                </label>
                                <p style={{ color: "rgb(0,0,0)" }}>
                                  {myathletesdetails[2]}
                                </p>
                              </div>
                            </div>
                            <div className="col">
                              <div>
                                <label for="city">End Date</label>
                                <p style={{ color: "rgb(0,0,0)" }}>
                                  {myathletesdetails[3]}
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
                                  Description
                                  <br />
                                </label>
                                <textarea
                                  className="form-control"
                                  disabled="true"
                                  value={myathletesdetails[6]}
                                >
                                  {/* {myathletesdetails[6]} */}
                                </textarea>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className={`${styles.modalfooter}`}>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          // onClick={() => setshowconfirmation(false)}
                          style={{
                            background: "rgb(242,242,242)",
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
              </div>
            )}
          </div>
        </div>
      </div>
    </body>
  );
};

export default MyAthletes;
