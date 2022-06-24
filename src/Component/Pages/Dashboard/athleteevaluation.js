import { React, useState, useEffect } from "react";
import "./Modern-Contact-Form.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import styles from "./athleteevaluation.module.css";
import axios from "axios";
// import Pdf from "react-to-pdf";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";

const Athleteevaluation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const ref = useRef();

  const quesdata = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    sum: 0,
    avg: 0,
  };

  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const acctype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const [toggle, setToggle] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [coaches, setcoaches] = useState([]);
  const [selectedcoach, setselectedcoach] = useState("");
  const [showconfirmation, setshowconfirmation] = useState(false);
  const [coachreview, setcoachreview] = useState(quesdata);

  const data = () => {
    if (selectedcoach !== "") {
      axios
        .get(
          `https://athletistan.herokuapp.com/routes/dashboard/getreportdata`,
          {
            params: {
              id: id,
              coachname: selectedcoach,
            },
          }
        )
        .then((res) => {
          setalldata(res.data);
        });
    }
  };
  const coachnames = () => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/dashboard/getcoachnames`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setcoaches(res.data);
        setselectedcoach(res.data[0]);
      });
  };

  useEffect(() => {
    coachnames();
  }, []);

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
  const routereport = () => {
    history.push("/report");
  };

  const handleChange = (e) => {
    setselectedcoach(e.target.value);
  };
  const getdetails = (e) => {
    data();
  };

  const refresh = () => {
    if (!window.location.hash) {
      window.location = window.location + "";
      window.location.reload();
    }
  };

  const questions = (e) => {
    setcoachreview({ ...coachreview, [e.target.name]: e.target.value });
  };
  const onsubmit = () => {
    setshowconfirmation(true);
    let summ = 0;
    let average = 0;
    summ =
      Number(coachreview?.q1) +
      Number(coachreview?.q2) +
      Number(coachreview?.q3) +
      Number(coachreview?.q4) +
      Number(coachreview?.q5) +
      Number(coachreview?.q6) +
      Number(coachreview?.q7) +
      Number(coachreview?.q8) +
      Number(coachreview?.q9) +
      Number(coachreview?.q10);
    
    average = summ / 10;
    

    setcoachreview({ ...coachreview, sum: summ, avg: average });
  };

  const onconfirmation = (id) => {
    axios.post(
      `https://athletistan.herokuapp.com/routes/dashboard/postreviewforcoach`,
      {
        id: id,
        alldata: coachreview,
      }
    );
    
    
    alert("Thank you for your feedback");
    refresh();
  };

  // const handleDownloadPdf = async () => {
  //   const element = ref.current;
  //   const canvas = await html2canvas(element);
  //   const data = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF();
  //   const imgProperties = pdf.getImageProperties(data);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  //   pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("print.pdf");
  // };

  
  
  
  

  return (
    <div>
      <body id="page-top">
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
                  <a className="nav-link active">
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
                  <h3 className="text-dark mb-0">Evaluation Report</h3>
                </div>
                <div style={{ background: "#ffffff" }}>
                  <div className="row">
                    <div
                      className="col d-flex justify-content-center"
                      style={{ background: "rgb(255,255,255)" }}
                    >
                      {coaches.length > 0 && (
                        <div
                          className="row"
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                        >
                          <div
                            className="col"
                            style={{
                              background: "rgb(248,249,252)",
                              paddingTop: "12px",
                              paddingBottom: "12px",
                              borderRadius: "15px",
                              paddingRight: "50px",
                              paddingLeft: "50px",
                              border: "2px double rgb(133,135,150)",
                              boxShadow:
                                "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
                            }}
                          >
                            <p
                              id="heading"
                              style={{
                                textAlign: "center",
                                color: "rgb(78,115,223)",
                              }}
                            >
                              <strong>Select your coach</strong>
                            </p>
                            <select
                              onChange={handleChange}
                              style={{
                                background: "rgb(248,249,252)",
                                borderRadius: ".2rem",
                                color: "rgb(133,135,150)",
                                fontSize: "16px",
                                border: "1px solid #d1d3e2",
                                padding: "3px",
                              }}
                            >
                              {coaches.map((names) => (
                                <option key={names} value={names}>
                                  {names}
                                </option>
                              ))}
                            </select>
                            <br />

                            <div className="col">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={getdetails}
                                style={{
                                  background: "rgb(78,136,231)",
                                  marginTop: "5px",
                                  marginLeft: "20px",
                                }}
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {alldata.map((ad) => {
                    return (
                      <div>
                        {alldata !== [] && ad.ratingstocoach === true ? (
                          <div>
                            <div className="row">
                              <div
                                className="col d-flex justify-content-center"
                                style={{ background: "rgb(255,255,255)" }}
                              >
                                <div
                                  className="row"
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    position: "relative",
                                    flex: "1 1 auto",
                                  }}
                                >
                                  <div
                                    className="col"
                                    style={{
                                      background: "rgb(248,249,252)",
                                      paddingTop: "12px",
                                      paddingBottom: "12px",
                                      borderRadius: "15px",
                                      paddingRight: "50px",
                                      paddingLeft: "50px",
                                      border: "2px double rgb(133,135,150)",
                                      boxShadow:
                                        "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
                                    }}
                                  >
                                    <p
                                      id="Heading"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(78,115,223)",
                                      }}
                                    >
                                      <strong>Athlete Details</strong>
                                    </p>
                                    {ad.athletedata.map((aad) => {
                                      return (
                                        <div>
                                          <div className="row">
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Name</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.name}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Email</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.email}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Age</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.age}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Gender</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.gender}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Contact No.</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.contactno}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Address</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.address}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>City</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.city}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Sport</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.areaofinterestolympics}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Experience</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {aad.noofexp}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="my-auto"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    <strong>Coached by</strong>
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    {ad.coachname}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="col d-flex justify-content-center"
                                style={{ background: "rgb(255,255,255)" }}
                              >
                                <div
                                  className="row"
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "10px",
                                    position: "relative",
                                    flex: "1 1 auto",
                                  }}
                                >
                                  <div
                                    className="col"
                                    style={{
                                      background: "rgb(248,249,252)",
                                      paddingTop: "12px",
                                      paddingBottom: "12px",
                                      borderRadius: "15px",
                                      paddingRight: "50px",
                                      paddingLeft: "50px",
                                      border: "2px double rgb(133,135,150)",
                                      boxShadow:
                                        "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
                                    }}
                                  >
                                    <p
                                      id="Heading-1"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(78,115,223)",
                                      }}
                                    >
                                      <strong>Performance Parameters</strong>
                                    </p>
                                    <p
                                      id="Heading-2"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(78,115,223)",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      General Parameters
                                    </p>
                                    <p
                                      id="Heading-3"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(133,135,150)",
                                      }}
                                    >
                                      Following are the ratings that coach has
                                      given you according to the parameters
                                      listed below.
                                      <br />
                                    </p>
                                    {ad.generalparameters.map((gp) => {
                                      return (
                                        <div>
                                          <div className="row">
                                            <div
                                              className="col"
                                              style={{
                                                border:
                                                  "2px solid rgb(78,115,223)",
                                                borderRadius: "17px",
                                                background: "rgb(78,115,223)",
                                                paddingTop: "10px",
                                                marginRight: "20px",
                                                flex: "1",
                                              }}
                                            >
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex my-auto justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "center",
                                                      fontSize: "22px",
                                                    }}
                                                  >
                                                    <strong>
                                                      Fitness&nbsp;&nbsp;
                                                    </strong>
                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        Number(gp.fitnessrating)
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.fitness",
                                                        gp.fitnessrating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}

                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        5 -
                                                          Number(
                                                            gp.fitnessrating
                                                          )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.fitness",
                                                        gp.fitnessrating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star-o d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {gp.fitnessdetails}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="col"
                                              style={{
                                                border:
                                                  "2px solid rgb(78,115,223)",
                                                borderRadius: "17px",
                                                background: "rgb(78,115,223)",
                                                paddingTop: "10px",
                                                marginRight: "20px",
                                              }}
                                            >
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex my-auto justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "center",
                                                      fontSize: "22px",
                                                    }}
                                                  >
                                                    <strong>
                                                      Performance&nbsp;&nbsp;
                                                    </strong>
                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        Number(
                                                          gp.performancerating
                                                        )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.performancerating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}

                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        5 -
                                                          Number(
                                                            gp.performancerating
                                                          )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.performancerating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star-o d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {gp.performancedetails}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="col"
                                              style={{
                                                border:
                                                  "2px solid rgb(78,115,223)",
                                                borderRadius: "17px",
                                                background: "rgb(78,115,223)",
                                                paddingTop: "10px",
                                                marginRight: "20px",
                                              }}
                                            >
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex my-auto justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "center",
                                                      fontSize: "22px",
                                                    }}
                                                  >
                                                    <strong>
                                                      Skills&nbsp;&nbsp;
                                                    </strong>

                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        Number(gp.skillsrating)
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.skillsrating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}

                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        5 -
                                                          Number(
                                                            gp.skillsrating
                                                          )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.skillsrating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star-o d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {gp.skillsdetails}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="row"
                                            style={{
                                              marginTop: "20px",
                                              marginBottom: "40px",
                                            }}
                                          >
                                            <div
                                              className="col"
                                              style={{
                                                border:
                                                  "2px solid rgb(78,115,223)",
                                                borderRadius: "17px",
                                                background: "rgb(78,115,223)",
                                                paddingTop: "10px",
                                                marginRight: "20px",
                                                flex: "1",
                                              }}
                                            >
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex my-auto justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "center",
                                                      fontSize: "22px",
                                                    }}
                                                  >
                                                    <strong>
                                                      Discipline&nbsp;&nbsp;
                                                    </strong>
                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        Number(
                                                          gp.disciplinerating
                                                        )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.disciplinerating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}

                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        5 -
                                                          Number(
                                                            gp.disciplinerating
                                                          )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.disciplinerating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star-o d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {gp.disciplinedetails}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="col"
                                              style={{
                                                border:
                                                  "2px solid rgb(78,115,223)",
                                                borderRadius: "17px",
                                                background: "rgb(78,115,223)",
                                                paddingTop: "10px",
                                                marginRight: "20px",
                                              }}
                                            >
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex my-auto justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "center",
                                                      fontSize: "22px",
                                                    }}
                                                  >
                                                    <strong>
                                                      Stamina&nbsp;
                                                    </strong>
                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        Number(gp.staminarating)
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.staminarating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}

                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        5 -
                                                          Number(
                                                            gp.staminarating
                                                          )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.staminarating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star-o d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {gp.staminadetails}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="col"
                                              style={{
                                                border:
                                                  "2px solid rgb(78,115,223)",
                                                borderRadius: "17px",
                                                background: "rgb(78,115,223)",
                                                paddingTop: "10px",
                                                marginRight: "20px",
                                              }}
                                            >
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex my-auto justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "center",
                                                      fontSize: "22px",
                                                    }}
                                                  >
                                                    <strong>
                                                      Balance&nbsp;&nbsp;
                                                    </strong>
                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        Number(gp.balancerating)
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.balancerating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}

                                                    {Array.apply(
                                                      0,
                                                      Array(
                                                        5 -
                                                          Number(
                                                            gp.balancerating
                                                          )
                                                      )
                                                    ).map((gold) => {
                                                      
                                                      
                                                        "gp.gold",
                                                        gp.balancerating
                                                      );
                                                      return (
                                                        <i
                                                          className="fa fa-star-o d-xl-flex align-items-xl-center"
                                                          style={{
                                                            paddingRight:
                                                              "10px",
                                                            color: "#FFC317",
                                                          }}
                                                        ></i>
                                                      );
                                                    })}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col">
                                                  <p
                                                    className="d-xl-flex justify-content-xl-start"
                                                    style={{
                                                      color: "rgb(255,255,255)",
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {gp.balancedetails}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                    <p
                                      id="Heading-4"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(78,115,223)",
                                        marginBottom: "5px",
                                        marginTop: "16px",
                                      }}
                                    >
                                      Specialized Parameters
                                    </p>
                                    <p
                                      id="Heading-9"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(133,135,150)",
                                      }}
                                    >
                                      Following are the ratings that coach has
                                      given you according to specialized
                                      parameters.
                                    </p>

                                    <div className="row">
                                      <div className="col">
                                        <div className="table-responsive">
                                          <table className="table">
                                            <thead>
                                              <tr>
                                                <th>
                                                  Evaluation Week
                                                  <br />
                                                </th>
                                                <th>Parameter Name</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Total Sets</th>
                                                <th>Parameter Counts</th>
                                                <th>Measurement Unit</th>
                                                <th>Obtained Points</th>
                                                <th>Total Points</th>
                                                <th>Points Percentage%</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {ad.specializedparameters.map(
                                                (sp) => {
                                                  return (
                                                    <tr>
                                                      <td>
                                                        {sp.evalweek === ""
                                                          ? `N/A`
                                                          : `${sp.evalweek}`}
                                                      </td>
                                                      <td>
                                                        {sp.paraname === ""
                                                          ? `N/A`
                                                          : `${sp.paraname}`}
                                                      </td>
                                                      <td>
                                                        {sp.starttime === ""
                                                          ? `N/A`
                                                          : `${sp.starttime}`}
                                                      </td>
                                                      <td>
                                                        {sp.endtime === ""
                                                          ? `N/A`
                                                          : `${sp.endtime}`}
                                                      </td>
                                                      <td>
                                                        {sp.sets === ""
                                                          ? `N/A`
                                                          : `${sp.sets}`}
                                                      </td>
                                                      <td>
                                                        {sp.amount === ""
                                                          ? `N/A`
                                                          : `${sp.amount}`}
                                                      </td>
                                                      <td>
                                                        {sp.amount === ""
                                                          ? `N/A`
                                                          : `${sp.unit}`}
                                                      </td>
                                                      <td>
                                                        {sp.obtpoints === ""
                                                          ? `N/A`
                                                          : `${sp.obtpoints}`}
                                                      </td>
                                                      <td>100</td>
                                                      <td>
                                                        {sp.pointsper === ""
                                                          ? `N/A`
                                                          : `${sp.pointsper}`}
                                                      </td>
                                                    </tr>
                                                  );
                                                }
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                    <hr
                                      style={{
                                        marginTop: "10px",
                                        marginBottom: "1rem",
                                        border: "0",
                                        borderTop: "1px solid rgba(0,0,0,.1)",
                                        boxSizing: "content-box",
                                        height: "0",
                                        overflow: "visible",
                                      }}
                                    />
                                    <p
                                      id="Heading-10"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(78,115,223)",
                                        marginBottom: "5px",
                                        marginTop: "22px",
                                      }}
                                    >
                                      Overall Points
                                    </p>
                                    <p
                                      id="Heading-11"
                                      style={{
                                        textAlign: "center",
                                        color: "rgb(133,135,150)",
                                      }}
                                    >
                                      Following are the total overall points
                                      that you have obtained.
                                    </p>
                                    {ad.overallspecializedparameters.map(
                                      (osp) => {
                                        return (
                                          <div>
                                            <div className="row">
                                              <div className="col">
                                                <div className="table-responsive">
                                                  <table className="table">
                                                    <thead>
                                                      <tr>
                                                        <th
                                                          style={{
                                                            textAlign: "center",
                                                            width: "340px",
                                                          }}
                                                        >
                                                          Obtained Points
                                                        </th>
                                                        <th
                                                          style={{
                                                            textAlign: "center",
                                                            width: "340px",
                                                          }}
                                                        >
                                                          Total Points
                                                        </th>
                                                        <th
                                                          style={{
                                                            textAlign: "center",
                                                            width: "340px",
                                                          }}
                                                        >
                                                          Overall %
                                                        </th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style={{
                                                            textAlign: "center",
                                                          }}
                                                        >
                                                          {osp.finalobttotal}
                                                        </td>
                                                        <td
                                                          style={{
                                                            textAlign: "center",
                                                          }}
                                                        >
                                                          {osp.finaltotal}
                                                        </td>
                                                        <td
                                                          style={{
                                                            textAlign: "center",
                                                          }}
                                                        >
                                                          {osp.finalper}
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {ad.bmi !== "" ? (
                              <div>
                                <div className="row">
                                  <div
                                    className="col d-flex justify-content-center"
                                    style={{ background: "rgb(255,255,255)" }}
                                  >
                                    <div
                                      className="row"
                                      style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        position: "relative",
                                        flex: "1 1 auto",
                                      }}
                                    >
                                      <div
                                        className="col"
                                        style={{
                                          background: "rgb(248,249,252)",
                                          paddingTop: "12px",
                                          paddingBottom: "12px",
                                          borderRadius: "15px",
                                          paddingRight: "50px",
                                          paddingLeft: "50px",
                                          border: "2px double rgb(133,135,150)",
                                          boxShadow:
                                            "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
                                        }}
                                      >
                                        <p
                                          id="Heading-5"
                                          style={{
                                            textAlign: "center",
                                            color: "rgb(78,115,223)",
                                          }}
                                        >
                                          <strong>Body Mass Index (BMI)</strong>
                                        </p>

                                        <p
                                          id="Heading-6"
                                          style={{
                                            textAlign: "center",
                                            color: "#2d3638",
                                            fontSize: "55px",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          <strong>{ad.bmi}&nbsp;</strong>
                                        </p>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "10px" }}
                                        >
                                          {Number(ad.bmi) < 18.5 ? (
                                            <div className="col d-xl-flex justify-content-xl-center">
                                              <span
                                                style={{
                                                  textAlign: "center",
                                                  background: "var(--orange)",
                                                  paddingRight: "15px",
                                                  paddingLeft: "15px",
                                                  fontSize: "25px",
                                                  paddingTop: "5px",
                                                  paddingBottom: "5px",
                                                  borderRadius: "9px",
                                                }}
                                              >
                                                Under Weight
                                              </span>
                                            </div>
                                          ) : null}
                                          {Number(ad.bmi) >= 18.5 &&
                                          Number(ad.bmi) <= 24.9 ? (
                                            <div className="col d-xl-flex justify-content-xl-center">
                                              <span
                                                style={{
                                                  textAlign: "center",
                                                  background: "var(--green)",
                                                  paddingRight: "15px",
                                                  paddingLeft: "15px",
                                                  fontSize: "25px",
                                                  paddingTop: "5px",
                                                  paddingBottom: "5px",
                                                  borderRadius: "9px",
                                                }}
                                              >
                                                Healthy Weight
                                              </span>
                                            </div>
                                          ) : null}
                                          {Number(ad.bmi) < 24.9 &&
                                          Number(ad.bmi) <= 29.9 ? (
                                            <div className="col d-xl-flex justify-content-xl-center">
                                              <span
                                                style={{
                                                  textAlign: "center",
                                                  background: "var(--warning)",
                                                  paddingRight: "15px",
                                                  paddingLeft: "15px",
                                                  fontSize: "25px",
                                                  paddingTop: "5px",
                                                  paddingBottom: "5px",
                                                  borderRadius: "9px",
                                                }}
                                              >
                                                Over Weight
                                              </span>
                                            </div>
                                          ) : null}
                                          {Number(ad.bmi) > 29.9 ? (
                                            <div className="col d-xl-flex justify-content-xl-center">
                                              <span
                                                style={{
                                                  textAlign: "center",
                                                  background: "var(--danger)",
                                                  paddingRight: "15px",
                                                  paddingLeft: "15px",
                                                  fontSize: "25px",
                                                  paddingTop: "5px",
                                                  paddingBottom: "5px",
                                                  borderRadius: "9px",
                                                }}
                                              >
                                                Obese
                                              </span>
                                            </div>
                                          ) : null}
                                        </div>
                                        <div
                                          className="row"
                                          style={{
                                            marginTop: "25px",
                                            marginBottom: "5px",
                                          }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Heading-15"
                                              style={{
                                                textAlign: "center",
                                                color: "rgb(78,115,223)",
                                                marginBottom: "5px",
                                                marginTop: "16px",
                                              }}
                                            >
                                              BMI Weight Ranges
                                            </p>
                                          </div>
                                        </div>
                                        <div className="row">
                                          <div className="col">
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  className="my-auto"
                                                  style={{
                                                    color: "rgb(133,135,150)",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  Less than 18.5
                                                </p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  style={{
                                                    color: "rgb(255,255,255)",
                                                    textAlign: "center",
                                                    background: "var(--orange)",
                                                  }}
                                                >
                                                  Under Weight
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  className="my-auto"
                                                  style={{
                                                    color: "rgb(133,135,150)",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  Between 18.5 - 24.9
                                                </p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  style={{
                                                    color: "rgb(255,255,255)",
                                                    textAlign: "center",
                                                    background: "var(--green)",
                                                  }}
                                                >
                                                  Healthy Weight
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  className="my-auto"
                                                  style={{
                                                    color: "rgb(133,135,150)",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  Between 25 - 29.9
                                                </p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  style={{
                                                    color: "rgb(255,255,255)",
                                                    textAlign: "center",
                                                    background: "var(--yellow)",
                                                  }}
                                                >
                                                  Over Weight
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col">
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  className="my-auto"
                                                  style={{
                                                    color: "rgb(133,135,150)",
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  Over 30
                                                </p>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col">
                                                <p
                                                  style={{
                                                    color: "rgb(255,255,255)",
                                                    textAlign: "center",
                                                    background: "var(--red)",
                                                  }}
                                                >
                                                  Obese
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {ad.remarks.map((rm) => {
                              return (
                                <div>
                                  <div className="row">
                                    <div
                                      className="col d-flex justify-content-center"
                                      style={{ background: "rgb(255,255,255)" }}
                                    >
                                      <div
                                        className="row"
                                        style={{
                                          marginTop: "10px",
                                          marginBottom: "10px",
                                          position: "relative",
                                          flex: "1 1 auto",
                                        }}
                                      >
                                        <div
                                          className="col"
                                          style={{
                                            background: "rgb(248,249,252)",
                                            paddingTop: "12px",
                                            paddingBottom: "12px",
                                            borderRadius: "15px",
                                            paddingRight: "50px",
                                            paddingLeft: "50px",
                                            border:
                                              "2px double rgb(133,135,150)",
                                            boxShadow:
                                              "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
                                          }}
                                        >
                                          <p
                                            id="Heading-7"
                                            style={{
                                              textAlign: "center",
                                              color: "rgb(78,115,223)",
                                            }}
                                          >
                                            <strong>Coach's Remarks</strong>
                                          </p>
                                          <p
                                            id="Heading-8"
                                            style={{
                                              textAlign: "center",
                                              color: "rgb(133,135,150)",
                                              fontSize: "16px",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {rm.finalremarks}
                                            <br />
                                          </p>
                                          <div
                                            className="row"
                                            style={{ marginTop: "22px" }}
                                          >
                                            <div className="col d-xl-flex justify-content-xl-center">
                                              <p
                                                id="Heading-12"
                                                style={{
                                                  textAlign: "center",
                                                  color: "rgb(133,135,150)",
                                                  fontSize: "16px",
                                                  marginBottom: "0px",
                                                }}
                                              >
                                                <strong>
                                                  Your Overall
                                                  Performance&nbsp;is:
                                                </strong>
                                              </p>
                                            </div>
                                          </div>
                                          <div
                                            className="row"
                                            style={{ marginTop: "10px" }}
                                          >
                                            <div className="col d-xl-flex justify-content-xl-center">
                                              <span
                                                style={{
                                                  textAlign: "center",
                                                  background: "#2d3638",
                                                  paddingRight: "15px",
                                                  paddingLeft: "15px",
                                                  fontSize: "25px",
                                                  color: "white",
                                                  paddingTop: "5px",
                                                  paddingBottom: "5px",
                                                  borderRadius: "9px",
                                                }}
                                              >
                                                {rm.overallper}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="row">
                            <div
                              className="col d-flex justify-content-center"
                              style={{ background: "rgb(255,255,255)" }}
                            >
                              {alldata.map((ad) => {
                                return (
                                  <div>
                                    <div
                                      className="row"
                                      style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        position: "relative",
                                        flex: "1 1 auto",
                                      }}
                                    >
                                      <div
                                        className="col"
                                        style={{
                                          background: "rgb(248,249,252)",
                                          paddingTop: "12px",
                                          paddingBottom: "12px",
                                          borderRadius: "15px",
                                          paddingRight: "50px",
                                          paddingLeft: "50px",
                                          border: "2px double rgb(133,135,150)",
                                          boxShadow:
                                            "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
                                        }}
                                      >
                                        <div className="row">
                                          <div className="col">
                                            <p
                                              id="Heading-13"
                                              style={{
                                                textAlign: "center",
                                                color: "rgb(78,115,223)",
                                              }}
                                            >
                                              <strong>
                                                Rate this coach based on your
                                                training experience
                                              </strong>
                                              <br />
                                            </p>
                                            <p
                                              id="Heading-14"
                                              style={{
                                                textAlign: "center",
                                                color: "rgb(133,135,150)",
                                              }}
                                            >
                                              Use the scale to answer the
                                              following questions about the
                                              trainer.
                                              <br />
                                            </p>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach train you according to
                                                the training outline
                                              </strong>
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q1"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-1"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-1"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q1"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-4"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-4"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q1"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-3"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-3"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q1"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-2"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-2"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q1"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-5"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-5"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-4"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach is prepared for the
                                                training
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q2"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-21"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-21"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q2"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-22"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-22"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q2"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-23"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-23"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q2"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-24"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-24"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q2"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-25"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-25"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-3"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach demonstrates knowledge
                                                of the sport
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q3"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-16"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-16"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q3"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-17"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-17"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q3"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-18"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-18"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q3"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-19"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-19"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q3"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-20"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-20"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-2"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach is progressing the
                                                training at the planned pace
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q4"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-11"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-11"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q4"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-12"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-12"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q4"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-13"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-13"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q4"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-14"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-14"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q4"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-15"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-15"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-1"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach provides the training
                                                in a proper ground/platform
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q5"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-6"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-6"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q5"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-7"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-7"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q5"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-8"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-8"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q5"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-9"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-9"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q5"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-10"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-10"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-9"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach treats the athlete
                                                with respect
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q6"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-46"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-46"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q6"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-47"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-47"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q6"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-48"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-48"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q6"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-49"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-49"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q6"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-50"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-50"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-8"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach maintains the
                                                environment that is conductive
                                                to learning
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q7"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-41"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-41"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q7"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-42"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-42"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q7"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-43"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-43"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q7"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-44"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-44"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q7"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-45"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-45"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-7"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach is punctual
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q8"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-36"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-36"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q8"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-37"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-37"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q8"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-38"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-38"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q8"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-39"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-39"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q8"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-40"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-40"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-6"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The techniques/skills taught in
                                                this course has increased your
                                                knowledge of the sport
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q9"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-31"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-31"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q9"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-32"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-32"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q9"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-33"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-33"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q9"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-34"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-34"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q9"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-35"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-35"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginBottom: "20px" }}
                                        >
                                          <div className="col">
                                            <p
                                              id="Question-5"
                                              style={{
                                                textAlign: "left",
                                                color: "rgb(133,135,150)",
                                                fontSize: "16px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              <strong>
                                                The coach is up to&nbsp;date
                                                with the real world sports
                                                trends
                                              </strong>
                                              <br />
                                            </p>
                                            <div className="row">
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q10"
                                                    value="100"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-26"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-26"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q10"
                                                    value="75"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-27"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-27"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Agree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q10"
                                                    value="50"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-28"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-28"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Neutral
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q10"
                                                    value="25"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-29"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-29"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Disagree
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col">
                                                <div className="custom-control custom-control-inline custom-radio">
                                                  <input
                                                    name="q10"
                                                    value="0"
                                                    onClick={questions}
                                                    className="custom-control-input"
                                                    type="radio"
                                                    id="formCheck-30"
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    for="formCheck-30"
                                                    style={{
                                                      color: "rgb(133,135,150)",
                                                    }}
                                                  >
                                                    Strongly Disagree
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="row"
                                          style={{ marginTop: "20px" }}
                                        >
                                          <div className="col d-xl-flex justify-content-xl-center">
                                            <button
                                              onClick={onsubmit}
                                              disabled={
                                                coachreview?.q1 === "" ||
                                                coachreview?.q2 === "" ||
                                                coachreview?.q3 === "" ||
                                                coachreview?.q4 === "" ||
                                                coachreview?.q5 === "" ||
                                                coachreview?.q6 === "" ||
                                                coachreview?.q7 === "" ||
                                                coachreview?.q8 === "" ||
                                                coachreview?.q9 === "" ||
                                                coachreview?.q10 === ""
                                                  ? true
                                                  : false
                                              }
                                              className="btn btn-primary"
                                              type="button"
                                              data-target="#confirmation"
                                              data-toggle="modal"
                                            >
                                              Submit
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
                                      <div
                                        className="modal-dialog"
                                        role="document"
                                      >
                                        <div className="modal-content">
                                          <div
                                            className={`${styles.modalHeader}`}
                                          >
                                            <h4
                                              className={`${styles.modalTitle}`}
                                            >
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
                                          <div
                                            className={`${styles.modalBody}`}
                                          >
                                            <p style={{ color: "rgb(0,0,0)" }}>
                                              Are you sure you want to submit
                                              your reviews about the coach?
                                              <br />
                                            </p>
                                          </div>
                                          <div
                                            className={`${styles.modalFooter}`}
                                          >
                                            <button
                                              onClick={() =>
                                                setshowconfirmation(false)
                                              }
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
                                                onconfirmation(ad._id)
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
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <a className="border rounded d-inline scroll-to-top" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
        </div>
      </body>
    </div>
  );
};

export default Athleteevaluation;
