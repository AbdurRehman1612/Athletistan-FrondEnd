import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import axios from "axios";
import styles from "./requests.module.css";

const Requests = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const sportname = useSelector(
    (state) => state.auth?.authData?.result?.areaofinterest
  );
  const acctype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );

  const [reqtype, setreqtype] = useState("direct");
  const [coachesdata, setcoachesdata] = useState([]);
  const [customizedcoachesdata, setcustomizecoachesdata] = useState([]);
  const [showconfirmation, setshowconfirmation] = useState(false);

  const directrequestathletes = () => {
    // var rej1 = [];
    // var datatoshow1 = [];
    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/showdirectreqhistory`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setcoachesdata(res.data);
      });
  };

  const customizedrequestathletes = () => {
    // var rej = [];
    // var datatoshow = [];
    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/showcustomizedreqhistory`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setcustomizecoachesdata(res.data);
      });
  };

  useEffect(() => {
    directrequestathletes();
    customizedrequestathletes();
  }, []);

  const onChange = (e) => {
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
  const routeathleteprofile = () => {
    history.push("/athleteprofile");
  };
  const routescheduleathlete = () => {
    history.push("/scheduleathlete");
  };
  const routeathleteevaluation = () => {
    history.push("/athleteevaluation");
  };
  const routereport = () => {
    history.push("/report");
  };

  const refresh = () => {
    if (!window.location.hash) {
      window.location = window.location + "";
      window.location.reload();
    }
  };

  const handledirectreqdelete = (id) => {
    axios.post(
      `https://athletistan.herokuapp.com/routes/dashboard/directreqdelete`,
      {
        id: id,
      }
    );
    alert("Request has been deleted successfully!");
    refresh();
  };

  const handlecustomizedreqdelete = (id) => {
    setshowconfirmation(true);

    axios.post(
      `https://athletistan.herokuapp.com/routes/dashboard/customizedreqdelete`,
      {
        id: id,
      }
    );
    alert("Request has been deleted successfully!");
    // setshowdetails(false);
    refresh();
  };

  return (
    <body id="page-top" className={`${toggle ? "sidebar-toggled" : ""}`}>
      <div id="wrapper">
        <nav
          className={`navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 ${
            toggle ? "toggled" : ""
          }`}
          style={{
            background: "linear-gradient(#1c4076 0%, rgb(238,46,57) 214%)",
          }}
        >
          <div className="container-fluid d-flex flex-column p-0">
            <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
              <div className="sidebar-brand-icon">
                {" "}
                <img src={"/logo.png"} />
              </div>
              <div className="sidebar-brand-text mx-3">
                <span>Athlete</span>
              </div>
            </a>
            <hr
              className="sidebar-divider my-0"
              style={{ paddingTop: "50px" }}
            />
            <ul className="navbar-nav text-light" id="accordionSidebar">
              <li className="nav-item" id="lists">
                <a className="nav-link" onClick={routedashboard} id="lists">
                  <i
                    className="fas fa-tachometer-alt"
                    style={{ paddingRight: "6px" }}
                  ></i>
                  <span style={{ paddingRight: "6px" }}>Dashboard</span>
                </a>
              </li>
              <li className="nav-item" id="lists">
                <a className="nav-link " onClick={routeathleteprofile}>
                  <i
                    className="fas fa-user"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>Profile</span>
                </a>
              </li>
              <li className="nav-item" id="lists">
                <a className="nav-link" onClick={routescheduleathlete}>
                  <i
                    className="fa fa-calendar"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>Schedule</span>
                </a>
              </li>
              <li className="nav-item" id="lists">
                <a className="nav-link" onClick={routeathleteevaluation}>
                  <i
                    className="fa fa-wpforms"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>Evaluation Report</span>
                </a>
              </li>
              <li className="nav-item" id="lists">
                <a className="nav-link active">
                  <i className="fa fa-star" style={{ paddingRight: "8px" }}></i>
                  <span style={{ paddingRight: "8px" }}>Requests</span>
                </a>
              </li>
              <li className="nav-item" id="lists">
                <a className="nav-link" onClick={routereport}>
                  <i
                    className="fa fa-shield"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>
                    Register Complaint
                  </span>
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
                        <a
                          className="dropdown-item"
                          onClick={routeathleteprofile}
                        >
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
                    ? "Direct Requests History"
                    : "Customized Requests History"}
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
              {reqtype === "direct" ? (
                <div className="row">
                  <div className="col">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Coach Name</th>
                            <th>Sports</th>
                            <th>City</th>
                            <th>Training weeks</th>
                            <th>Fee</th>
                            <th>Starting from</th>
                            <th>Time slot</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coachesdata.map((cd) => {
                            return (
                              <tr>
                                <td>
                                  <img
                                    className="rounded-circle"
                                    src={`${
                                      cd.coachdp === ""
                                        ? `/test-woman.jpg`
                                        : `${cd.coachdp}`
                                    }`}
                                    width="30"
                                    height="30"
                                    style={{
                                      marginRight: "0.5rem",
                                    }}
                                  />
                                  {cd.coachname === "" ? "NA" : cd.coachname}
                                </td>
                                <td>
                                  {cd.sportname === "" ? "NA" : cd.sportname}
                                </td>
                                <td>
                                  {cd.athletecity === ""
                                    ? "NA"
                                    : cd.athletecity}
                                </td>
                                <td>
                                  {cd.trainingweeks === ""
                                    ? "NA"
                                    : cd.trainingweeks}
                                  &nbsp;
                                </td>
                                <td>{cd.fee === "" ? "NA" : cd.fee}</td>
                                <td>
                                  {cd.trainingstartdate === ""
                                    ? "NA"
                                    : cd.trainingstartdate.substring(0, 10)}
                                </td>
                                <td>
                                  {cd.trainingtimeslot === ""
                                    ? "NA"
                                    : cd.trainingtimeslot}
                                </td>

                                <td
                                  style={{
                                    fontWeight:
                                      cd.requestaccepted === true
                                        ? "bold"
                                        : "normal",
                                  }}
                                >
                                  {cd.requestaccepted === true
                                    ? "Accepted"
                                    : "Pending"}
                                </td>

                                {/* <i className="bi bi-trash">delete</i> */}
                                {cd.requestaccepted === false ? (
                                  <td>
                                    <i
                                      onClick={() =>
                                        handledirectreqdelete(cd._id)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        fontSize: "25px",
                                      }}
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </td>
                                ) : null}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}

              {reqtype === "customized" ? (
                <div className="row">
                  <div className="col">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Coach Name</th>
                            <th>Sports</th>
                            <th>City</th>
                            <th>Training weeks</th>
                            <th>Fee</th>
                            <th>Starting from</th>
                            <th>Time slot</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customizedcoachesdata.map((cd) => {
                            return (
                              <tr>
                                <td>
                                  <img
                                    className="rounded-circle"
                                    src={`${
                                      cd.coachdp === ""
                                        ? `/test-woman.jpg`
                                        : `${cd.coachdp}`
                                    }`}
                                    width="30"
                                    height="30"
                                    style={{ marginRight: ".5rem !important" }}
                                  />
                                  {cd.coachname === "" ? "NA" : cd.coachname}
                                </td>
                                <td>
                                  {cd.sportname === "" ? "NA" : cd.sportname}
                                </td>
                                <td>
                                  {cd.athletecity === ""
                                    ? "NA"
                                    : cd.athletecity}
                                </td>
                                <td>
                                  {cd.trainingweeks === ""
                                    ? "NA"
                                    : cd.trainingweeks}
                                  &nbsp;
                                </td>
                                <td>
                                  {cd.athleteexpfee === ""
                                    ? "NA"
                                    : cd.athleteexpfee}
                                </td>
                                <td>
                                  {cd.trainingstartdate === ""
                                    ? "NA"
                                    : cd.trainingstartdate.substring(0, 10)}
                                </td>
                                <td>
                                  {cd.trainingtimeslot === ""
                                    ? "NA"
                                    : cd.trainingtimeslot}
                                </td>
                                <td
                                  style={{
                                    fontWeight:
                                      cd.requestaccepted === true
                                        ? "bold"
                                        : "normal",
                                  }}
                                >
                                  {cd.requestaccepted === true
                                    ? "Accepted"
                                    : "Pending"}
                                </td>
                                {cd.requestaccepted === false ? (
                                  <td>
                                    <i
                                      onClick={() =>
                                        handledirectreqdelete(cd._id)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        fontSize: "25px",
                                      }}
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </td>
                                ) : null}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Requests;
