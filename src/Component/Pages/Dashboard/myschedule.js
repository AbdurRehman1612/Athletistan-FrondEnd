import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../../constants/actionTypes";
import "./style.css";
import { blue, alpha } from "@material-ui/core/colors";
import axios from "axios";
// import Paper from "@material-ui/core/Paper";
// import { ViewState } from "@devexpress/dx-react-scheduler";
// import {
//   Scheduler,
//   WeekView,
//   Appointments,
// } from "@devexpress/dx-react-scheduler-material-ui";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  AppointmentTooltip,
  Appointments,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";

const Myschedule = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: { type: "dark", primary: blue },
  });

  const [toggle, setToggle] = useState(false);

  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const acctype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const charges = useSelector((state) => state.auth?.authData?.result?.expfee);
  const tm = useSelector(
    (state) => state.auth?.authData?.result?.trainingmonths
  );
  const st = useSelector((state) => state.auth?.authData?.result?.starttime);
  const et = useSelector((state) => state.auth?.authData?.result?.endtime);
  const ad = useSelector(
    (state) => state.auth?.authData?.result?.availabledays
  );

  var schedulerData = [];

  const [coachschedule, setcoachschedule] = useState([]);
  const [values, setvalues] = useState([]);

  const views = ["day", "week", "workWeek", "month"];

  // const colors = ["green", "blue", "red"];

  const getschedule = () => {
    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/getcoachschedule`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setcoachschedule(res.data);
        res.data.map((rd) => {
          // rd.availabledays.map((ad) => {
          schedulerData.push({
            title: `Athlete ${rd.athletename}'s (${rd.sportname}) training`,
            startDate: `${rd.trainingstartdate.substring(0, 10)}T${
              rd.trainingstarttime
            }`,
            endDate: `${rd.trainingenddate.substring(0, 10)}T${
              rd.trainingendtime
            }`,
            notes: `Training will pe conducted from the period ${
              rd.trainingstartdate
            } to ${rd.trainingenddate.substring(0, 10)} (${
              rd.trainingweeks
            } weeks) at ${rd.trainingstarttime}-${rd.trainingendtime} in ${
              rd.athletecity
            }`,
          });
          // });
        });

        setvalues(schedulerData);
      });
  };

  useEffect(() => {
    getschedule();
  }, []);

  // useEffect(() => {
  //
  // }, [values]);

  let today = new Date();
  let date =
    today.getFullYear() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getDate();

  const currentdate = date;

  const handlelogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
  };

  const routedashboard = () => {
    history.push("/dashboard");
  };
  const routehome = () => {
    history.push("/");
  };
  const routemyathlete = () => {
    history.push("/myathlete");
  };
  const routemyprofile = () => {
    history.push("/myprofile");
  };
  const routetestimonials = () => {
    history.push("/requests");
  };
  const routeavailabilityandfee = () => {
    history.push("availabilityandfee");
  };
  const routeevaluationform = () => {
    history.push("/evaluationform");
  };

  return (
    <div>
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
                  <a className="nav-link active">
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
                    <i
                      className="fa fa-star"
                      style={{ paddingRight: "8px" }}
                    ></i>
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
                <div className="d-sm-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-dark mb-4">My Schedule</h3>
                </div>

                <Paper>
                  <Scheduler data={values} style={{ fontSize: "20px" }}>
                    <ViewState currentDate={currentdate} />
                    <MonthView />
                    <Appointments />
                    <AppointmentTooltip showCloseButton showOpenButton />
                    <AppointmentForm readOnly />
                  </Scheduler>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Myschedule;
