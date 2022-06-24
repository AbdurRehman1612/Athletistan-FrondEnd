import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LOGOUT, availabilityandfees } from "../../../constants/actionTypes";
import { availabilityandfee } from "../../../actions/dashboard";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

const Availabilityandfee = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const acctype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const charges = useSelector((state) => state.auth?.authData?.result?.expfee);
  const tm = useSelector(
    (state) => state.auth?.authData?.result?.trainingweeks
  );
  const timeslots = useSelector(
    (state) => state.auth?.authData?.result?.timeslots
  );

  const ad = useSelector(
    (state) => state.auth?.authData?.result?.availabledays
  );
  const desc = useSelector(
    (state) => state.auth?.authData?.result?.description
  );
  const stdate = useSelector(
    (state) => state.auth?.authData?.result?.startdate
  );
  const [toggle, setToggle] = useState(false);

  //   console.log(ad);

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
  const routemyathlete = () => {
    history.push("/myathlete");
  };
  const routemyprofile = () => {
    history.push("/myprofile");
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

  console.log("stdate", stdate.substr(0, 10));
  const details = {
    id: id,
    acctype: acctype,
    trainingweeks: tm,
    timeslots: timeslots,
    description: desc,
    startdate: stdate,
    availabledays: ad,
    charges: charges,
  };

  const [mydetails, setmydetails] = useState(details);

  console.log(`mydetails`, mydetails);

  const weeks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];

  const handleChange = (e) => {
    if (e.target.name === "startdate") {
      var result = new Date(e.target.value);
      setmydetails({ ...mydetails, [e.target.name]: result });
    } else {
      setmydetails({ ...mydetails, [e.target.name]: e.target.value });
    }
  };
  const handleOutline = (e) => {
    setmydetails({ ...mydetails, [e.target.name]: e.target.value });
  };

  const handleDays = (e) => {
    if (mydetails.availabledays.includes(e.target.value)) {
      setmydetails((prev) => {
        console.log(prev);
        return {
          ...prev,
          availabledays: prev.availabledays.filter(
            (abc) => abc !== e.target.value
          ),
        };
      });
    } else {
      setmydetails((prev) => {
        console.log(prev);
        return {
          ...prev,
          availabledays: [...prev.availabledays, e.target.value],
        };
      });
    }
  };

  const handleTime = (e) => {
    if (mydetails.timeslots.includes(e.target.value)) {
      setmydetails((prev) => {
        console.log(prev);
        return {
          ...prev,
          timeslots: prev.timeslots.filter((abc) => abc !== e.target.value),
        };
      });
    } else {
      setmydetails((prev) => {
        console.log(prev);
        return {
          ...prev,
          timeslots: [...prev.timeslots, e.target.value],
        };
      });
    }
  };

  const handleSubmit = () => {
    dispatch(availabilityandfee(mydetails, history));
    alert("Details updated successfully!");
  };

  console.log(`mydetails`, mydetails);
  console.log(`timeslots`, timeslots);

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
                <a className="nav-link active">
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
              <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-4">Availability &amp; Fee</h3>
              </div>
              <div className="row">
                <div className="col mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary font-weight-bold m-0">
                        Training Duration
                      </h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center" }}
                          >
                            <h6
                              className="mb-0"
                              style={{
                                textAlign: "center",
                                fontSize: "20px",
                                height: "auto",
                              }}
                            >
                              <strong>
                                Choose Number of Weeks for training
                              </strong>
                            </h6>

                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              This information will be shown where athlete
                              search for a coach
                            </span>
                            <form style={{ height: "128.1875px" }}>
                              <div
                                className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center field"
                                style={{ height: "98.1875px" }}
                              >
                                <br />

                                <select
                                  className="form-control d-flex"
                                  name="trainingweeks"
                                  onChange={handleChange}
                                  defaultValue={tm}
                                  style={{
                                    marginTop: "35px",
                                    width: "55%",
                                  }}
                                >
                                  <optgroup label="Number of Training Weeks">
                                    {weeks.map((exp) => (
                                      <option key={exp} value={exp}>
                                        {exp}
                                      </option>
                                    ))}
                                  </optgroup>
                                </select>
                                <br />
                              </div>
                            </form>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary font-weight-bold m-0">
                        Training Timings
                      </h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center", height: "auto" }}
                          >
                            <h6
                              className="mb-0"
                              style={{ textAlign: "center", fontSize: "20px" }}
                            >
                              <strong>Choose your timings for training</strong>
                            </h6>
                            <span
                              className="text-xs"
                              style={{
                                width: "14.2px",
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              This information will be shown where athlete
                              search for a coach
                            </span>

                            <div>
                              <div className="form-group d-xl-flex justify-content-xl-center">
                                <div className="col-sm-10">
                                  <br />
                                  <div className="row">
                                    <div
                                      className="col"
                                      // style={{ marginLeft: "20px" }}
                                    >
                                      <input
                                        type="checkbox"
                                        name="timeslots"
                                        value="06:00-09:00"
                                        checked={
                                          mydetails?.timeslots?.includes(
                                            "06:00-09:00"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleTime}
                                      />
                                      <label
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "7px",
                                        }}
                                      >
                                        06:00-09:00
                                      </label>
                                      <input
                                        style={{ marginLeft: "30px" }}
                                        type="checkbox"
                                        name="timeslots"
                                        value="09:00-12:00"
                                        checked={
                                          mydetails?.timeslots?.includes(
                                            "09:00-12:00"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleTime}
                                      />
                                      <label
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "7px",
                                        }}
                                      >
                                        09:00-12:00
                                      </label>
                                      <input
                                        style={{ marginLeft: "30px" }}
                                        type="checkbox"
                                        name="timeslots"
                                        value="12:00-15:00"
                                        checked={
                                          mydetails?.timeslots?.includes(
                                            "12:00-15:00"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleTime}
                                      />
                                      <label
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "7px",
                                        }}
                                      >
                                        12:00-15:00
                                      </label>
                                      <br />
                                      <br />
                                      <input
                                        type="checkbox"
                                        name="timeslots"
                                        value="15:00-18:00"
                                        checked={
                                          mydetails?.timeslots?.includes(
                                            "15:00-18:00"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleTime}
                                      />
                                      <label
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "7px",
                                        }}
                                      >
                                        15:00-18:00
                                      </label>
                                      <input
                                        style={{ marginLeft: "30px" }}
                                        type="checkbox"
                                        name="timeslots"
                                        value="18:00-21:00"
                                        checked={
                                          mydetails?.timeslots?.includes(
                                            "18:00-21:00"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleTime}
                                      />
                                      <label
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "7px",
                                        }}
                                      >
                                        18:00-21:00
                                      </label>
                                      <input
                                        style={{ marginLeft: "30px" }}
                                        type="checkbox"
                                        name="timeslots"
                                        value="21:00-00:00"
                                        checked={
                                          mydetails?.timeslots?.includes(
                                            "21:00-00:00"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleTime}
                                      />
                                      <label
                                        style={{
                                          fontSize: "14px",
                                          marginLeft: "7px",
                                        }}
                                      >
                                        21:00-00:00
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary font-weight-bold m-0">
                        Training Outline
                      </h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center" }}
                          >
                            <h6
                              className="mb-0"
                              style={{
                                textAlign: "center",
                                fontSize: "20px",
                                height: "auto",
                              }}
                            >
                              <strong>
                                Describe your training attributes that you will
                                deliver during the {mydetails?.trainingweeks}{" "}
                                {mydetails?.trainingweeks === "1"
                                  ? `week`
                                  : `weeks`}{" "}
                                training period.
                              </strong>
                            </h6>

                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              This information will help you to get shortlist
                              based on the material you are covering during
                              training period.
                            </span>
                            <form style={{ height: "145.1875px" }}>
                              <div className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center field">
                                <br />

                                <textarea
                                  className="form-control"
                                  type="text"
                                  value={mydetails?.description}
                                  name="description"
                                  onChange={handleOutline}
                                />
                                <br />
                              </div>
                            </form>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary font-weight-bold m-0">
                        Training Start Date
                      </h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center", height: "auto" }}
                          >
                            <h6
                              className="mb-0"
                              style={{ textAlign: "center", fontSize: "20px" }}
                            >
                              <strong>
                                Choose your start date for training
                              </strong>
                            </h6>
                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              This information will be shown where athlete
                              search for a coach and the training will start
                              from below date till next{" "}
                              {mydetails.trainingweeks}{" "}
                              {mydetails?.trainingweeks === "1"
                                ? `week`
                                : `weeks`}
                              .
                            </span>

                            <div>
                              <div
                                className="form-group d-xl-flex justify-content-xl-center"
                                style={{ height: "129.1875px" }}
                              >
                                <div className="col-sm-10">
                                  <br />
                                  <br />
                                  <div className="row">
                                    <div
                                      className="col"
                                      // style={{ marginLeft: "20px" }}
                                    >
                                      <input
                                        className="form-control"
                                        type="date"
                                        defaultValue={stdate.substr(0, 10)}
                                        name="startdate"
                                        data-date-format="yyyy-mm-dd"
                                        onChange={handleChange}
                                        required=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary font-weight-bold m-0">
                        Available Days
                      </h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li
                        className="list-group-item"
                        style={{ height: "auto", width: "auto" }}
                      >
                        <div
                          className="row align-items-center no-gutters"
                          style={{
                            textAlign: "center",
                            height: "auto",
                            width: "auto",
                          }}
                        >
                          <div
                            className="col mr-2"
                            style={{
                              textAlign: "center",
                              height: "auto",
                              width: "auto",
                            }}
                          >
                            <h6
                              className="mb-0"
                              style={{
                                textAlign: "center",
                                fontSize: "20px",
                                height: "auto",
                                width: "auto",
                                marginTop: "15px",
                              }}
                            >
                              <strong>
                                Choose your available days for training
                              </strong>
                            </h6>
                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                                height: "auto",
                              }}
                            >
                              This information will be shown where athlete
                              search for a coach
                            </span>
                            <small
                              className="form-text text-muted"
                              style={{
                                fontSize: "16.8px",
                                marginTop: "15px",
                              }}
                            >
                              Please mention the available days in which you
                              will provide training.
                            </small>
                            <div
                              style={{
                                height: "auto",
                                width: "auto",
                              }}
                            >
                              <div
                                className="form-group d-xl-flex justify-content-xl-center"
                                style={{ height: "auto", width: "auto" }}
                              >
                                <div className="col-sm-10">
                                  <div
                                    className="row"
                                    style={{
                                      height: "auto",
                                      width: "auto",
                                      marginTop: "20px",
                                    }}
                                  >
                                    <div className="col">
                                      <label style={{ fontSize: "14px" }}>
                                        Monday
                                      </label>
                                      <form>
                                        <div className="field"></div>
                                      </form>

                                      <input
                                        type="checkbox"
                                        name="availabledays"
                                        value="Monday"
                                        checked={
                                          mydetails?.availabledays?.includes(
                                            "Monday"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleDays}
                                      />
                                    </div>
                                    <div className="col">
                                      <label style={{ fontSize: "14px" }}>
                                        Tuesday
                                      </label>
                                      <form>
                                        <div className="field"></div>
                                      </form>
                                      <input
                                        type="checkbox"
                                        name="availabledays"
                                        value="Tuesday"
                                        checked={
                                          mydetails?.availabledays?.includes(
                                            "Tuesday"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleDays}
                                      />
                                    </div>
                                    <div className="col">
                                      <label style={{ fontSize: "14px" }}>
                                        Wednesday
                                      </label>
                                      <form>
                                        <div className="field"></div>
                                      </form>
                                      <input
                                        type="checkbox"
                                        name="availabledays"
                                        value="Wednesday"
                                        onChange={handleDays}
                                        checked={
                                          mydetails?.availabledays?.includes(
                                            "Wednesday"
                                          )
                                            ? true
                                            : false
                                        }
                                      />
                                    </div>
                                    <div className="col">
                                      <label style={{ fontSize: "14px" }}>
                                        Thursday
                                      </label>
                                      <form>
                                        <div className="field"></div>
                                      </form>
                                      <input
                                        type="checkbox"
                                        name="availabledays"
                                        checked={
                                          mydetails?.availabledays?.includes(
                                            "Thursday"
                                          )
                                            ? true
                                            : false
                                        }
                                        value="Thursday"
                                        onChange={handleDays}
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{
                                      height: "auto",
                                      width: "auto",
                                      marginTop: "19px",
                                    }}
                                  >
                                    <div
                                      className="col"
                                      style={{ height: "auto", width: "auto" }}
                                    >
                                      <label style={{ fontSize: "14px" }}>
                                        Friday
                                      </label>
                                      <form>
                                        <div className="field"></div>
                                      </form>
                                      <input
                                        type="checkbox"
                                        name="availabledays"
                                        value="Friday"
                                        checked={
                                          mydetails?.availabledays?.includes(
                                            "Friday"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleDays}
                                      />
                                    </div>
                                    <div
                                      className="col"
                                      style={{ height: "auto", width: "auto" }}
                                    >
                                      <label style={{ fontSize: "14px" }}>
                                        Saturday
                                      </label>
                                      <form>
                                        <div className="field"></div>
                                      </form>
                                      <input
                                        type="checkbox"
                                        name="availabledays"
                                        value="Saturday"
                                        checked={
                                          mydetails?.availabledays?.includes(
                                            "Saturday"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleDays}
                                      />
                                    </div>
                                    <div
                                      className="col"
                                      style={{ height: "auto", width: "auto" }}
                                    >
                                      <label style={{ fontSize: "14px" }}>
                                        Sunday
                                      </label>
                                      <form>
                                        <div className="field"></div>
                                      </form>
                                      <input
                                        type="checkbox"
                                        name="availabledays"
                                        value="Sunday"
                                        checked={
                                          mydetails?.availabledays?.includes(
                                            "Sunday"
                                          )
                                            ? true
                                            : false
                                        }
                                        onChange={handleDays}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                {mydetails?.availabledays?.length === 0 ? (
                                  <p style={{ color: "red" }}>
                                    Please Add your available days
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="text-primary font-weight-bold m-0">
                        Training Fee
                      </h6>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li
                        className="list-group-item"
                        style={{ height: "auto", width: "auto" }}
                      >
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center" }}
                        />
                        <div
                          className="col mr-2"
                          style={{ textAlign: "center" }}
                        />
                        <h6
                          className="mb-0"
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            marginTop: "15px",
                          }}
                        >
                          <strong>Mention the charges for training</strong>
                        </h6>
                        <span
                          className="text-xs"
                          style={{ textAlign: "center", fontSize: "14.2px" }}
                        >
                          <div style={{ textAlign: "center", height: "auto" }}>
                            This information will be shown where athlete search
                            for a coach.&nbsp;
                          </div>
                        </span>
                        <small
                          className="form-text text-muted"
                          style={{
                            fontSize: "16.8px",

                            marginTop: "20px",
                          }}
                        >
                          Please mention the amount according to the number of
                          months you will provide training.
                        </small>
                        <div
                          style={{ marginTop: "51px", marginBottom: "40px" }}
                        >
                          <div className="form-group d-xl-flex justify-content-xl-center">
                            <div className="col-sm-10">
                              <div className="row" style={{ marginTop: "0px" }}>
                                <div className="col">
                                  <form>
                                    <div className="field"></div>
                                  </form>

                                  <span
                                    className="text-center d-xl-flex justify-content-xl-end align-items-xl-center"
                                    style={{
                                      textAlign: "center",
                                      marginTop: "2px",
                                      marginBottom: "64px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Rs.
                                  </span>
                                </div>
                                <div className="col">
                                  <form>
                                    <div className="field"></div>
                                  </form>
                                  <input
                                    name="charges"
                                    onChange={handleChange}
                                    type="number"
                                    value={mydetails.charges}
                                    style={{
                                      textAlign: "center",
                                    }}
                                  />
                                </div>

                                <div
                                  className="col"
                                  style={{ marginTop: "2px" }}
                                >
                                  <form>
                                    <div className="field"></div>
                                  </form>
                                  <span className="d-xl-flex justify-content-xl-start">
                                    &nbsp;
                                    <label style={{ fontWeight: "bold" }}>
                                      {mydetails?.trainingweeks === "1"
                                        ? `/ ${mydetails?.trainingweeks} Week`
                                        : `/ ${mydetails?.trainingweeks} Weeks`}
                                    </label>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="form-group d-xl-flex justify-content-xl-center align-items-xl-center">
                <button
                  className="btn btn-primary btn-sm d-xl-flex justify-content-xl-center align-items-xl-center"
                  type="submit"
                  style={{ width: "146px", height: "43px", fontSize: "18px" }}
                  onClick={handleSubmit}
                  disabled={
                    mydetails?.charges === "" ||
                    mydetails?.availabledays === [] ||
                    mydetails?.trainingmonths === ""
                      ? true
                      : false
                  }
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Availabilityandfee;
