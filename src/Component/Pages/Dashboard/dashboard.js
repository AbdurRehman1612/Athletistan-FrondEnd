import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../../constants/actionTypes";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import "./style.css";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";
import FileBase64 from "react-file-base64";

import { Line } from "react-chartjs-2";

const Dashboard = () => {
  const token = useSelector((state) => state.auth?.authData?.token);
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const history = useHistory();
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [athleteper, setathleteper] = useState([]);
  const [athletetotalobtpoints, setathletetotalobtpoints] = useState([]);
  const [athletetotalpoints, setathletetotalpoints] = useState([]);
  const [finalsum, setfinalsum] = useState(0);
  const [finaltotal, setfinaltotal] = useState(0);
  const [valuetoshow, setvaluetoshow] = useState("");

  const [coachper, setcoachper] = useState([]);
  const [athletescurrent, setathletescurrent] = useState("");
  const [athletesoverall, setathletesoverall] = useState("");
  const [totalcoachreviews, settotalcoachreviews] = useState([]);
  const [outof, setoutof] = useState(0);
  const [reviewforcoach, setreviewforcoach] = useState("");
  const [coachgraphdata, setcoachgraphdata] = useState([]);

  const [loading, setLoading] = useState(1);

  const accounttype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );

  const coach = () => {
    var jansum = 0;
    var febsum = 0;
    var marsum = 0;
    var aprsum = 0;
    var maysum = 0;
    var junsum = 0;
    var julsum = 0;
    var augsum = 0;
    var sepsum = 0;
    var octsum = 0;
    var novsum = 0;
    var decsum = 0;

    var noofreviews = [];
    var forgraph = [];

    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/getcoachperformance`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setcoachper(res.data);
        setathletesoverall(res.data.length);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "01" ||
            rd.trainingenddate.substring(5, 7) === "01"
          ) {
            jansum += 1;
          } else {
          }
        });
        forgraph.push(jansum);
        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "02" ||
            rd.trainingenddate.substring(5, 7) === "02"
          ) {
            febsum += 1;
          } else {
          }
        });
        forgraph.push(febsum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "03" ||
            rd.trainingenddate.substring(5, 7) === "03"
          ) {
            marsum += 1;
          } else {
          }
        });
        forgraph.push(marsum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "04" ||
            rd.trainingenddate.substring(5, 7) === "04"
          ) {
            aprsum += 1;
          } else {
          }
        });
        forgraph.push(aprsum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "05" ||
            rd.trainingenddate.substring(5, 7) === "05"
          ) {
            maysum += 1;
          } else {
          }
        });
        forgraph.push(maysum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "06" ||
            rd.trainingenddate.substring(5, 7) === "06"
          ) {
            junsum += 1;
          } else {
          }
        });
        forgraph.push(junsum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "07" ||
            rd.trainingenddate.substring(5, 7) === "07"
          ) {
            julsum += 1;
          } else {
          }
        });
        forgraph.push(julsum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "08" ||
            rd.trainingenddate.substring(5, 7) === "08"
          ) {
            augsum += 1;
          } else {
          }
        });

        forgraph.push(augsum);
        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "09" ||
            rd.trainingenddate.substring(5, 7) === "09"
          ) {
            sepsum += 1;
          } else {
          }
        });
        forgraph.push(sepsum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "10" ||
            rd.trainingenddate.substring(5, 7) === "10"
          ) {
            octsum += 1;
          } else {
          }
        });

        forgraph.push(octsum);
        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "11" ||
            rd.trainingenddate.substring(5, 7) === "11"
          ) {
            novsum += 1;
          } else {
          }
        });
        forgraph.push(novsum);

        res.data.map((rd) => {
          if (
            rd.trainingstartdate.substring(5, 7) === "12" ||
            rd.trainingenddate.substring(5, 7) === "12"
          ) {
            decsum += 1;
          } else {
          }
        });
        forgraph.push(decsum);

        setcoachgraphdata(forgraph);

        // if(res.data.startdate.substring(5,7))
      });

    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/getcurrentathletes`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setathletescurrent(res.data.length);
      });

    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/getreviewforcoach`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setoutof(res.data.length * 1000);
        for (var i = 0; i < res.data.length; i++) {
          res.data.map((rd) => {
            noofreviews.push(rd[i].sum);
          });

          settotalcoachreviews(noofreviews);
        }
      });
  };

  const athlete = () => {
    var arrfop = [];
    var arrtp = [];

    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/getathleteperformance`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data.map((rd) => {
            arrfop.push(rd[i].finalobttotal);

            arrtp.push(rd[i].finaltotal);
          });

          setathletetotalobtpoints(arrfop);
          setathletetotalpoints(arrtp);
        }
        setathleteper(res.data);
      });
  };

  const calculations = () => {
    var sum = 0;
    var sum1 = 0;

    for (var j = 0; j < athletetotalobtpoints.length; j++) {
      sum += athletetotalobtpoints[j];
    }

    for (var k = 0; k < athletetotalpoints.length; k++) {
      sum1 += athletetotalpoints[k];
    }

    var vts = ((sum / sum1) * 100).toFixed(2);

    setvaluetoshow(vts);
  };

  const coachcalculations = () => {
    var sum = 0;

    for (var j = 0; j < totalcoachreviews.length; j++) {
      sum += totalcoachreviews[j];
    }

    var vts = (sum / outof) * 100;

    setreviewforcoach(vts);
  };

  useEffect(() => {
    athlete();
    coach();
  }, []);

  useEffect(() => {
    if (athletetotalobtpoints.length > 0 && athletetotalpoints.length > 0)
      calculations();
  }, [athletetotalobtpoints, athletetotalpoints]);
  useEffect(() => {
    if (totalcoachreviews.length > 0 && outof > 0) coachcalculations();
  }, [totalcoachreviews, outof]);

  const [image, setimage] = useState({});
  // const percentage = 50;

  const handlelogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
  };

  const routemyathlete = () => {
    history.push("/myathlete");
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

  const routeathleteprofile = () => {
    history.push("/athleteprofile");
  };
  const routehome = () => {
    history.push("/");
  };
  const routescheduleathlete = () => {
    history.push("/scheduleathlete");
  };
  const routerequests = () => {
    history.push("/athleterequests");
  };
  const routeathleteevaluation = () => {
    history.push("/athleteevaluation");
  };
  const routereport = () => {
    history.push("/report");
  };

  const athletegraph = () => {};

  const graphdata = [
    { year: "January", population: 1 },
    { year: "February", population: 2 },
    { year: "March", population: 3 },
    { year: "April", population: 4 },
    { year: "May", population: 5 },
    { year: "June", population: 6 },
    { year: "July", population: 7 },
    { year: "August", population: 8 },
    { year: "September", population: 9 },
    { year: "October", population: 10 },
    { year: "November", population: 11 },
    { year: "December", population: 12 },
  ];

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Performance Track",
        data: coachgraphdata,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  if (token && accounttype === "Coach") {
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
                    <a className="nav-link active">
                      <i
                        className="fas fa-tachometer-alt"
                        style={{ paddingRight: "8px" }}
                      ></i>
                      <span style={{ paddingRight: "8px" }}>Dashboard</span>
                    </a>
                  </li>
                  <li className="nav-item" id="listsc">
                    <a className="nav-link" onClick={routemyathlete}>
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
                      <i
                        className="fa fa-th"
                        style={{ paddingRight: "8px" }}
                      ></i>
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
                      <span style={{ paddingRight: "8px" }}>
                        Evaluation Form
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
                            <a
                              className="dropdown-item"
                              onClick={routemyprofile}
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
                    <div className="text-center d-none d-md-inline">
                      <button
                        onClick={() => setToggle(!toggle)}
                        className="btn rounded-circle border-0"
                        id="sidebarToggle"
                        type="button"
                      ></button>
                    </div>
                  </div>
                </nav>
                <div className="container-fluid">
                  <div className="d-sm-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-dark mb-4">Dashboard</h3>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-xl-3 offset-xl-2 mb-4">
                      <div className="card shadow border-left-primary py-2">
                        <div className="card-body">
                          <div className="row align-items-center no-gutters">
                            <div className="col mr-2">
                              <div className="text-uppercase text-primary font-weight-bold text-xs mb-1">
                                <span>
                                  No. of Athletes (currently training)
                                </span>
                              </div>
                              <div className="text-dark font-weight-bold h5 mb-0">
                                <span>
                                  {athletescurrent === "" ? 0 : athletescurrent}
                                </span>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i
                                className="fas fa-user-friends fa-2x text-gray-300"
                                style={{ fontSize: "28px" }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                      <div className="card shadow border-left-success py-2">
                        <div className="card-body">
                          <div className="row align-items-center no-gutters">
                            <div className="col mr-2">
                              <div className="text-uppercase text-success font-weight-bold text-xs mb-1">
                                <span>No. of Athletes (overall)</span>
                              </div>
                              <div className="text-dark font-weight-bold h5 mb-0">
                                <span>
                                  {athletesoverall === "" ? 0 : athletesoverall}
                                </span>
                              </div>
                            </div>
                            <div className="col-auto">
                              <i
                                className="fas fa-user-circle fa-2x text-gray-300"
                                style={{ fontSize: "28px" }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-6 col-xl-3 mb-4"
                      style={{ marginBottom: "30px" }}
                    >
                      <div className="card shadow border-left-info py-2">
                        <div className="card-body">
                          <div className="row align-items-center no-gutters">
                            <div className="col mr-2">
                              <div className="text-uppercase text-info font-weight-bold text-xs mb-1">
                                <span>Performance (as per reviews)</span>
                              </div>
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <span>
                                      {reviewforcoach === ""
                                        ? "NA"
                                        : reviewforcoach}
                                      %
                                    </span>
                                  </div>
                                </div>

                                <div className="col">
                                  <LinearProgress
                                    style={{
                                      width: "200px",
                                      marginLeft: "-5px",
                                    }}
                                    variant="determinate"
                                    value={reviewforcoach}
                                  />
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="col-auto">
                              <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {athletesoverall > 0 ? (
                    <div>
                      <div>
                        <Line data={data} />
                      </div>
                    </div>
                  ) : (
                    <div className="row" style={{ marginTop: "180px" }}>
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
                          <strong>
                            Graph will display after the commencement of
                            training.
                          </strong>
                        </h2>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  } else if (token && accounttype === "Athlete") {
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
                  <a className="nav-link active">
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
                    <span style={{ paddingRight: "8px" }}>
                      Evaluation Report
                    </span>
                  </a>
                </li>
                <li className="nav-item" id="lists">
                  <a className="nav-link" onClick={routerequests}>
                    <i
                      className="fa fa-star"
                      style={{ paddingRight: "8px" }}
                    ></i>
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
            </div>
          </nav>
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div className="container-fluid">
                  <button
                    onClick={() => setToggle(!toggle)}
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

              <div className="container-fluid">
                <div className="d-sm-flex justify-content-between align-items-center mb-4">
                  <h3 className="text-dark mb-0">Dashboard</h3>
                </div>
                <div className="row">
                  <div className="col-lg-7 col-xl-8">
                    <div className="card shadow mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">
                          Performance Chart
                        </h6>
                      </div>
                      <div
                        className="card-body"
                        style={{ height: "100%", padding: "40px" }}
                      >
                        <div className="row align-items-center no-gutters">
                          <div className="col mr-2">
                            <div
                              className="text-uppercase text-info font-weight-bold text-xs mb-1"
                              style={{ height: "59px" }}
                            >
                              <span
                                style={{
                                  fontSize: "20px",
                                  color: "rgb(133,135,150)",
                                }}
                              >
                                Performance Review
                              </span>
                            </div>

                            {valuetoshow === "" ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <span style={{ fontSize: "45px" }}>
                                      No trainings yet!
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 80 && valuetoshow <= 100 ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <span style={{ fontSize: "45px" }}>
                                      Congratulations!
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {valuetoshow >= 60 &&
                            valuetoshow < 80 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <span style={{ fontSize: "45px" }}>
                                      Keep it up!
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 40 &&
                            valuetoshow < 60 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <span style={{ fontSize: "45px" }}>
                                      Need more effort!
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 20 &&
                            valuetoshow < 40 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <span style={{ fontSize: "45px" }}>
                                      Sorry!
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 0 &&
                            valuetoshow < 20 &&
                            valuetoshow !== "" ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <span style={{ fontSize: "45px" }}>
                                      Really Sorry!
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {valuetoshow >= 80 &&
                            valuetoshow <= 100 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <p
                                      className="lead"
                                      style={{ fontSize: "33px" }}
                                    >
                                      <strong>Excellent Performance</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 60 &&
                            valuetoshow < 80 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <p
                                      className="lead"
                                      style={{ fontSize: "33px" }}
                                    >
                                      <strong>Good Performance</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 50 &&
                            valuetoshow <= 60 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <p
                                      className="lead"
                                      style={{ fontSize: "33px" }}
                                    >
                                      <strong>Above Average Performance</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 40 &&
                            valuetoshow <= 50 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <p
                                      className="lead"
                                      style={{ fontSize: "33px" }}
                                    >
                                      <strong>Average Performance</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 30 &&
                            valuetoshow <= 40 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <p
                                      className="lead"
                                      style={{ fontSize: "33px" }}
                                    >
                                      <strong>Below Average Performance</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 10 &&
                            valuetoshow <= 30 &&
                            valuetoshow !== null ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <p
                                      className="lead"
                                      style={{ fontSize: "33px" }}
                                    >
                                      <strong>Poor Performance</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {valuetoshow >= 0 &&
                            valuetoshow <= 10 &&
                            valuetoshow !== "" ? (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="text-dark font-weight-bold h5 mb-0 mr-3">
                                    <p
                                      className="lead"
                                      style={{ fontSize: "33px" }}
                                    >
                                      <strong>Very Poor Performance</strong>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div
                            className="col-auto performance bar"
                            style={{
                              width: "329.781px",
                              height: "300px",
                            }}
                          >
                            <div
                              style={{
                                margin: "10px",
                              }}
                            >
                              <ChangingProgressProvider values={[valuetoshow]}>
                                {(valuetoshow) => (
                                  <CircularProgressbar
                                    value={valuetoshow}
                                    text={
                                      valuetoshow === ""
                                        ? "NILL"
                                        : `${valuetoshow}%`
                                    }
                                  />
                                )}
                              </ChangingProgressProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-xl-4">
                    <div className="card shadow mb-4">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="text-primary font-weight-bold m-0">
                          Performance Parameters
                        </h6>
                      </div>
                      <div
                        className="card-body"
                        style={{
                          height: "380px",
                        }}
                      >
                        <div
                          className="row"
                          style={{ width: "105%", height: "100%" }}
                        >
                          <div className="col">
                            <div>
                              <div
                                className="row"
                                style={{
                                  height: "48px",
                                  marginTop: "12px",
                                }}
                              >
                                <div className="col">
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <strong>Very Poor</strong>
                                  </span>
                                </div>
                                <div className="col">
                                  <span
                                    className="d-flex d-lg-flex d-xl-flex justify-content-end justify-content-lg-end justify-content-xl-end"
                                    style={{
                                      fontSize: "20px",
                                    }}
                                  >
                                    0% - 10%
                                  </span>
                                </div>
                              </div>
                              <div className="row" style={{ height: "48px" }}>
                                <div className="col">
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <strong>Poor</strong>
                                  </span>
                                </div>
                                <div className="col">
                                  <span
                                    className="d-flex d-lg-flex d-xl-flex justify-content-end justify-content-lg-end justify-content-xl-end"
                                    style={{ fontSize: "20px" }}
                                  >
                                    10% - 30%
                                  </span>
                                </div>
                              </div>
                              <div className="row" style={{ height: "48px" }}>
                                <div className="col">
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <strong>Below Average</strong>
                                  </span>
                                </div>
                                <div className="col">
                                  <span
                                    className="d-flex d-lg-flex d-xl-flex justify-content-end justify-content-lg-end justify-content-xl-end"
                                    style={{ fontSize: "20px" }}
                                  >
                                    30% - 40%
                                  </span>
                                </div>
                              </div>
                              <div className="row" style={{ height: "48px" }}>
                                <div className="col">
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <strong>Average</strong>
                                  </span>
                                </div>
                                <div className="col">
                                  <span
                                    className="d-flex d-lg-flex d-xl-flex justify-content-end justify-content-lg-end justify-content-xl-end"
                                    style={{
                                      fontSize: "20px",
                                      lineHeight: "20px",
                                      marginBottom: "1px",
                                    }}
                                  >
                                    40% - 50%
                                  </span>
                                </div>
                              </div>
                              <div className="row" style={{ height: "48px" }}>
                                <div className="col">
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    <strong>Above Average</strong>
                                  </span>
                                </div>
                                <div className="col">
                                  <span
                                    className="d-flex d-lg-flex d-xl-flex justify-content-end justify-content-lg-end justify-content-xl-end"
                                    style={{ fontSize: "20px" }}
                                  >
                                    50% - 60%
                                  </span>
                                </div>
                              </div>
                              <div className="row" style={{ height: "48px" }}>
                                <div className="col">
                                  <span style={{ fontSize: "20px" }}>
                                    <strong>Good</strong>
                                  </span>
                                </div>
                                <div className="col">
                                  <span
                                    className="d-flex d-lg-flex d-xl-flex justify-content-end justify-content-lg-end justify-content-xl-end"
                                    style={{ fontSize: "20px" }}
                                  >
                                    60% - 80%
                                  </span>
                                </div>
                              </div>
                              <div className="row" style={{ height: "48px" }}>
                                <div className="col">
                                  <span style={{ fontSize: "20px" }}>
                                    <strong>Excellent</strong>
                                  </span>
                                </div>
                                <div className="col">
                                  <span
                                    className="d-flex d-lg-flex d-xl-flex justify-content-end justify-content-lg-end justify-content-xl-end"
                                    style={{ fontSize: "20px" }}
                                  >
                                    80% - 100%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  } else {
    alert("You are not logged in");
    history.push("/");
    return null;
  }
};

export default Dashboard;
