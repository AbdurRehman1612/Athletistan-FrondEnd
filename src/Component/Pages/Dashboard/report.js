import { React, useState, useEffect } from "react";
import "./Modern-Contact-Form.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import { reportcoach } from "../../../actions/dashboard";
import "./style.css";

const Report = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth?.authData?.result?._id);

  const reportfields = {
    athleteid: id,
    coachname: "",
    coachemail: "",
    coachcontactno: "",
    complainttype: "",
    desc: "",
    incidentdate: "",
    incidentlocation: "",
    actiontotake: "",
  };

  const name = useSelector((state) => state.auth?.authData?.result?.name);
  //   const acctype = useSelector(
  //     (state) => state.auth?.authData?.result?.accounttype
  //   );
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);

  const [toggle, setToggle] = useState(false);
  const [report, setreport] = useState(reportfields);

  const handleChange = (e) => {
    setreport({ ...report, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    if (
      report?.coachname === "" ||
      report?.coachemail === "" ||
      report?.desc === "" ||
      report?.complainttype === "" ||
      report?.coachcontactno === "" ||
      report?.incidentdate === "" ||
      report?.incidentlocation === "" ||
      report?.actiontotake === ""
    ) {
      alert("Please fill the empty fields");
    } else {
      dispatch(reportcoach(report, history));
      alert("Report has been submitted successfully!");
    }
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
  const routeathleteprofile = () => {
    history.push("/athleteprofile");
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
  console.log(`report`, report);
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
                <a className="nav-link" onClick={routedashboard}>
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
                <a className="nav-link" onClick={routerequests}>
                  <i className="fa fa-star" style={{ paddingRight: "8px" }}></i>
                  <span style={{ paddingRight: "8px" }}>Requests</span>
                </a>
              </li>
              <li className="nav-item" id="lists">
                <a className="nav-link active">
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
                <br />
              </div>
              <div className="row">
                <div className="col">
                  <section className="getintouch1">
                    <div className="container modern_form">
                      <div className="text-center">
                        <h4 style={{ color: "#212529", fontSize: "45px" }}>
                          Register Complaint
                        </h4>
                      </div>
                      <hr className="modern_form__hr" />
                      <div className="modern_form__form-container">
                        <form>
                          <div className="form-row">
                            <div className="col col-contact">
                              <div className="form-group modern_form__form-group--padding-r">
                                <input
                                  className="form-control input input-tr"
                                  type="text"
                                  placeholder="Coach Name"
                                  onChange={handleChange}
                                  name="coachname"
                                  required=""
                                />
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                            <div className="col col-contact">
                              <div className="form-group modern_form__form-group--padding-l">
                                <input
                                  className="form-control input input-tr"
                                  type="email"
                                  placeholder="Coach Email"
                                  name="coachemail"
                                  onChange={handleChange}
                                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                                  required=""
                                />
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col col-contact">
                              <div className="form-group modern_form__form-group--padding-r">
                                <input
                                  className="form-control input input-tr"
                                  type="number"
                                  placeholder="Coach Contact Number"
                                  name="coachcontactno"
                                  onChange={handleChange}
                                  required=""
                                />
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                            <div className="col col-contact">
                              <div className="form-group modern_form__form-group--padding-l">
                                <select
                                  className="form-control input input-tr"
                                  name="complainttype"
                                  onChange={handleChange}
                                  required=""
                                >
                                  <option value="">Complaint Type</option>
                                  <option value="Harassment">Harassment</option>
                                  <option value="Behaviour">Behaviour</option>
                                  <option value="Not Punctual">
                                    Not Punctual
                                  </option>
                                  <option value="Un-Professional">
                                    Un-Professional
                                  </option>
                                  <option value="Commitment Issue">
                                    Commitment Issue
                                  </option>
                                  <option value="Unethical">Unethical</option>
                                  <option value="Other">Other</option>
                                </select>
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col">
                              <div
                                className="form-group modern_form__form-group--padding-t"
                                style={{ padding: "0px" }}
                              >
                                <textarea
                                  className="form-control input modern_form__form-control--textarea"
                                  placeholder="Briefly explain your incident here."
                                  onChange={handleChange}
                                  type="text"
                                  name="desc"
                                  required=""
                                ></textarea>
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col col-contact">
                              <div className="form-group modern_form__form-group--padding-r">
                                <input
                                  className="form-control input input-tr"
                                  type="datetime-local"
                                  name="incidentdate"
                                  onChange={handleChange}
                                  required=""
                                />
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                            <div className="col col-contact">
                              <div className="form-group modern_form__form-group--padding-l">
                                <input
                                  className="form-control input input-tr"
                                  type="text"
                                  placeholder="Incident Location, City"
                                  name="incidentlocation"
                                  onChange={handleChange}
                                  required=""
                                />
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col col-contact">
                              <div className="form-group modern_form__form-group--padding-l">
                                <input
                                  className="form-control input input-tr"
                                  type="text"
                                  placeholder="What actions should be taken?"
                                  name="actiontotake"
                                  onChange={handleChange}
                                  required=""
                                />
                                <div className="line-box">
                                  <div className="line"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col text-center">
                              <button
                                className="btn btn-primary submit-now"
                                disabled={
                                  report?.coachname === "" ||
                                  report?.coachemail === "" ||
                                  report?.desc === "" ||
                                  report?.complainttype === "" ||
                                  report?.coachcontactno === "" ||
                                  report?.incidentdate === "" ||
                                  report?.incidentlocation === "" ||
                                  report?.actiontotake === ""
                                    ? true
                                    : false
                                }
                                type="submit"
                                onClick={handleSubmit}
                              >
                                Submit Now
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Report;
