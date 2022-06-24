import { React, useState, useEffect } from "react";
import { LOGOUT } from "../../../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { evalform } from "../../../actions/dashboard";
import styles from "./testimonials.module.css";
import "./evaluationform.css";
import { useHistory } from "react-router-dom";

const Evaluationform = () => {
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const cid = useSelector((state) => state.auth?.authData?.result?._id);

  const history = useHistory();
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [showconfirmation, setshowconfirmation] = useState(false);

  const handlelogout = () => {
    dispatch({ type: LOGOUT });
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
  const routeavailabilityandfee = () => {
    history.push("/availabilityandfee");
  };
  const routetestimonials = () => {
    history.push("/requests");
  };

  const routehome = () => {
    history.push("/");
  };
  const routemyschedule = () => {
    history.push("/myschedule");
  };

  const [athletes, setathletes] = useState([]);
  const [selectedathlete, setselectedathlete] = useState("");
  const [bool, setbool] = useState(false);

  const athletenames = () => {
    axios
      .get(
        `https://athletistan.herokuapp.com/routes/dashboard/getathletenames`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setathletes(res.data);
        setselectedathlete(res.data[0].athleteid);
      });
  };

  useEffect(() => {
    athletenames();
  }, []);

  let temp = 0;
  const units = [
    "kg",
    "lb",
    "km",
    "m",
    "yard",
    "ft",
    "inch",
    "miles",
    "mph",
    "kph",
  ];

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

  let tp = 100;

  const [inival, setinival] = useState(null);
  const [check, setcheck] = useState(false);

  const [indper, setindper] = useState(0);
  const [resbmi, setresbmi] = useState("");
  const [specpara, setspecpara] = useState([
    {
      evalweek: "1",
      paraname: "",
      starttime: "",
      endtime: "",
      sets: "",
      amount: "",
      unit: "kg",
      obtpoints: "",
      totalpoints: tp,
      pointsper: "",
    },
  ]);

  const [ftotal, setftotal] = useState(100);
  const [fobttotal, setfobttotal] = useState(0);
  const [fper, setfper] = useState(0);
  const [overallspecpara, setoverallspecpara] = useState({
    finalobttotal: fobttotal,
    finaltotal: ftotal,
    finalper: fper,
  });

  const evalinfo = {
    coachid: cid,
    athleteid: "",
    grade: null,
    coachname: name,
    sportname: "",
    athletedetails: [],

    genpara: {
      fitnessrating: "",
      fitnessdetails: "",

      performancerating: "",
      performancedetails: "",

      skillsrating: "",
      skillsdetails: "",

      disciplinerating: "",
      disciplinedetails: "",

      staminarating: "",
      staminadetails: "",

      balancerating: "",
      balancedetails: "",
    },

    // spara: specpara,

    // overallspara: overallspecpara,

    remarks: {
      finalremarks: "",
      overallper: "",
    },

    bmi: "",
  };
  console.log("inival :>> ", inival);
  const [alldetails, setalldetails] = useState(evalinfo);

  const bmivalues = {
    age: "",
    gender: "",
    hfeet: "",
    hinch: "",
    weight: "",
  };

  const [bmi, setbmi] = useState(bmivalues);

  const handlebmi = (e) => {
    setbmi({ ...bmi, [e.target.name]: e.target.value });
  };

  const calbmi = () => {
    var meter = bmi.hfeet * 0.3048 + bmi.hinch * 0.0254;
    console.log("meter :>> ", meter);
    var sq = meter * meter;
    console.log("square :>> ", sq);
    var res = (bmi.weight / sq).toFixed(2);
    setresbmi(res);
    setalldetails({ ...alldetails, bmi: res });
  };

  const handleselection = (e) => {
    console.log("e.target.value", e.target.value);
    setselectedathlete(e.target.value);
  };

  const getdetails = () => {
    setbool(true);
    axios
      .get(`/routes/dashboard/getathletedetails`, {
        params: { name: selectedathlete },
      })
      .then((detail) => {
        console.log("checkkkkkk", detail.data[0]._id);
        setalldetails({
          ...alldetails,
          athletedetails: detail.data,
          athleteid: detail.data[0]._id,
          sportname: detail.data[0].areaofinterestolympics,
        });
        console.log("detail", detail);
      });
  };

  const generalpara = (e) => {
    setalldetails({
      ...alldetails,
      genpara: { ...alldetails.genpara, [e.target.name]: e.target.value },
    });
  };

  const handleremarks = (e) => {
    setalldetails({
      ...alldetails,
      remarks: { ...alldetails.remarks, [e.target.name]: e.target.value },
    });
  };

  let v = 0;

  const addval = (index) => {
    if (
      specpara[index].evalweek !== "" &&
      specpara[index].paraname !== "" &&
      specpara[index].obtpoints !== ""
    ) {
      alert(
        `Evaluation for Week ${specpara[index].evalweek} has been added successfully!`
      );

      let res2 = (specpara[index].pointsper = inival);
      console.log("res2 :>> ", res2);
      setspecpara((prev) => {
        return [
          ...prev.map((item, i) => {
            if (i === index) {
              return { ...item, pointsper: res2 };
            } else {
              return item;
            }
          }),
        ];
      });

      specpara.map((sp, index) => {
        temp += Number(specpara[index].obtpoints);
      });

      setfobttotal(temp);

      let fiper = (temp * 100) / ftotal;
      let fres = fiper.toFixed(2);
      console.log("fressssssssss", fres);
      setfper(fres);

      // if (fres >= 80.0 && fres <= 100.0) {
      //   setalldetails({
      //     ...alldetails,grade: fres });
      // }

      setoverallspecpara({
        ...overallspecpara,
        finalobttotal: temp,
        finalper: fres,
      });

      setalldetails({
        ...alldetails,
        overallspara: {
          ...alldetails.overallspara,
          finalobttotal: temp,
          finalper: fres,
        },
      });
    } else if (
      specpara[index].obtpoints > 100 &&
      specpara[index].obtpoints < 0
    ) {
      alert("Obtained Points must be in range 0 to 100");
      return null;
    } else {
      alert(
        "Please fill the required * fields to submit or you may have to cancel other fields."
      );
    }
  };

  const addspecpara = (e) => {
    v++;

    setspecpara([
      ...specpara,
      {
        evalweek: "1",
        paraname: "",
        starttime: "",
        endtime: "",
        sets: "",
        amount: "",
        unit: "kg",
        obtpoints: "",
        totalpoints: "",
        pointsper: "",
      },
    ]);

    let val = 100;

    let res = ftotal + val;

    setftotal(res);

    setoverallspecpara({
      ...overallspecpara,
      finaltotal: res,
    });

    // setalldetails
  };

  const handlespecpara = (e, index) => {
    const values = [...specpara];
    values[index][e.target.name] = e.target.value;
    setspecpara(values);

    if (e.target.name === "obtpoints") {
      let val = e.target.value;
      setinival(val);
    }
  };

  const removespecdata = (index) => {
    const values = [...specpara];
    values.splice(index, 1);
    setspecpara(values);

    let val = 100;
    let res = ftotal - val;
    setftotal(res);

    let resp = specpara[index].obtpoints;

    let ans = fobttotal - Number(resp);
    setfobttotal(ans);

    console.log("answerr :>> ", ans);
    console.log("resultttt :>> ", res);

    let fiper = (ans * 100) / res;
    let fres = fiper.toFixed(2);

    setoverallspecpara({
      ...overallspecpara,
      finalobttotal: ans,
      finaltotal: res,
      finalper: fres,
    });

    // setalldetails({
    //   ...alldetails,
    //   finalobt: ans,

    //   fpercent: fres
    // });
  };

  const handlesubmit = () => {
    setshowconfirmation(false);
    const temp = {
      ...alldetails,
      specpara: specpara,
      overallspara: overallspecpara,
    };
    dispatch(evalform(temp, history));
    // alert("Evaluation has been submitted successfully!");
  };

  const saveevalform = () => {
    setalldetails({ ...alldetails, grade: fper });
  };

  console.log("cid :>> ", cid);
  console.log("details :>> ", alldetails);
  console.log("coachname :>> ", alldetails?.coachname);
  console.log("specpara :>> ", specpara);
  console.log("inival :>> ", inival);
  console.log("fobttotal :>> ", fobttotal);
  console.log("overallspecpara :>> ", overallspecpara);
  console.log("athletes", athletes);
  console.log("selectedathlete", selectedathlete);

  console.log("toggle :>> ", toggle);

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
                <a className="nav-link active">
                  <i
                    className="fa fa-wpforms"
                    style={{ paddingRight: "8px" }}
                  ></i>
                  <span style={{ paddingRight: "8px" }}>Evaluation Form</span>
                </a>
              </li>
            </ul>
            <div className="text-center d-none d-md-inline">
              {/* <button
                onClick={() => setToggle(!toggle)} */}
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
              {/* id="sidebarToggle"
                type="button"
              ></button> */}
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
                <h3 className="text-dark mb-0">
                  Evaluation Form
                  <br />
                </h3>
              </div>
              <div className="row">
                <div className="col d-xl-flex justify-content-xl-center mb-4">
                  <div
                    className="card shadow d-xl-flex mb-4"
                    style={{ width: "auto" }}
                  >
                    <div className="card-header py-3">
                      <h6
                        className="text-primary font-weight-bold m-0"
                        style={{ textAlign: "center" }}
                      >
                        Athlete Details
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
                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              Enter the details of the athlete which you want to
                              evaluate.
                            </span>
                          </div>
                        </div>

                        <div>
                          <div
                            className="row align-items-center no-gutters"
                            style={{
                              textAlign: "center",
                              height: "40.7656px",
                              marginTop: "11px",
                            }}
                          >
                            <div className="col">
                              <select
                                onChange={(e) => handleselection(e)}
                                style={{
                                  background: "rgb(248,249,252)",
                                  borderRadius: ".2rem",
                                  color: "rgb(133,135,150)",
                                  fontSize: "16px",
                                  border: "1px solid #d1d3e2",
                                  padding: "3px",
                                }}
                              >
                                {athletes.map((ath) => {
                                  return (
                                    <option
                                      key={ath.athletename}
                                      value={ath._id}
                                    >
                                      {ath.athletename}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div
                            className="row align-items-center no-gutters"
                            style={{
                              textAlign: "center",
                              height: "40.7656px",
                            }}
                          >
                            <div className="col">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={getdetails}
                                style={{ background: "rgb(78,136,231)" }}
                              >
                                Validate
                              </button>
                            </div>
                          </div>
                        </div>

                        <div
                          className="row align-items-center no-gutters"
                          style={{
                            textAlign: "center",
                            height: "40.7656px",
                            marginTop: "14px",
                          }}
                        >
                          <div className="col">
                            <input
                              className="form-control-plaintext"
                              type="text"
                              value={alldetails?.athletedetails[0]?.email}
                              placeholder="Email"
                              disabled="true"
                              style={{
                                border: "1px solid rgb(190,190,190)",
                                textAlign: "center",
                              }}
                            />
                          </div>
                          <div className="col">
                            <input
                              className="form-control-plaintext"
                              type="text"
                              placeholder="Contact Number"
                              value={alldetails?.athletedetails[0]?.contactno}
                              disabled="true"
                              style={{
                                border: "1px solid rgb(190,190,190)",
                                textAlign: "center",
                              }}
                            />
                          </div>
                          <div className="col">
                            <input
                              className="form-control-plaintext"
                              type="text"
                              value={alldetails?.athletedetails[0]?.gender}
                              placeholder="Gender"
                              disabled="true"
                              style={{
                                border: "1px solid rgb(190,190,190)",
                                textAlign: "center",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                          style={{ textAlign: "center" }}
                        >
                          <div className="col" style={{ paddingTop: "6px" }}>
                            <input
                              className="form-control-plaintext mx-auto"
                              type="text"
                              value={
                                alldetails?.athletedetails[0]
                                  ?.areaofinterestolympics
                              }
                              placeholder="Sport Name"
                              disabled="true"
                              style={{
                                textAlign: "center",
                                width: "153px",
                                borderRadius: "20px",
                                border: "3px solid rgb(78,136,231)",
                                fontSize: "18px",
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row" style={{ height: "auto", width: "auto" }}>
                <div
                  className="col d-xl-flex justify-content-xl-center mb-4"
                  style={{ height: "auto" }}
                >
                  <div
                    className="card shadow d-xl-flex mb-4"
                    style={{
                      width: "100%",
                      height: "auto",
                      paddingBottom: "35px",
                    }}
                  >
                    <div className="card-header py-3">
                      <h6
                        className="text-primary font-weight-bold m-0"
                        style={{ textAlign: "center" }}
                      >
                        Performance Parameters
                      </h6>
                    </div>
                    <ul
                      className="list-group list-group-flush"
                      style={{ height: "auto" }}
                    >
                      <li
                        className="list-group-item"
                        style={{
                          height: "22%",
                          marginTop: "16px",
                          marginBottom: "18px",
                        }}
                      >
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center", height: "auto" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center", height: "auto" }}
                          >
                            <h1 style={{ fontSize: "20px" }}>
                              <strong>General Parameters</strong>
                            </h1>
                          </div>
                        </div>
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center", height: "auto" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center", height: "auto" }}
                          >
                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              Rate the athlete as per his/her performance
                              according to the parameters listed below.&nbsp;
                            </span>
                          </div>
                        </div>
                        <div
                          className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                          style={{
                            textAlign: "center",
                            height: "auto",
                            width: "auto",
                          }}
                        >
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto" }}
                              >
                                <h1
                                  className="text-left d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "#4e88e7",
                                    color: "rgb(255,255,255)",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "25px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Fitness
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col" style={{ height: "35px" }}>
                                <div
                                  className="rating"
                                  style={{ fontSize: "27px" }}
                                >
                                  <input
                                    type="radio"
                                    name="fitnessrating"
                                    value="5"
                                    id="2"
                                    onChange={generalpara}
                                  />
                                  <label for="2">☆</label>
                                  <input
                                    type="radio"
                                    name="fitnessrating"
                                    value="4"
                                    id="3"
                                    onChange={generalpara}
                                  />
                                  <label for="3">☆</label>
                                  <input
                                    type="radio"
                                    name="fitnessrating"
                                    value="3"
                                    id="4"
                                    onChange={generalpara}
                                  />
                                  <label for="4">☆</label>
                                  <input
                                    type="radio"
                                    name="fitnessrating"
                                    value="2"
                                    id="5"
                                    onChange={generalpara}
                                  />
                                  <label for="5">☆</label>
                                  <input
                                    type="radio"
                                    name="fitnessrating"
                                    value="1"
                                    id="6"
                                    onChange={generalpara}
                                  />
                                  <label for="6">☆</label>
                                </div>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  type="text"
                                  style={{
                                    background: "rgb(255,255,255)",
                                    border: "1px solid rgb(78,136,231)",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    height: "48.7812px",
                                    width: "80%",
                                  }}
                                  placeholder="Write details for the above ratings."
                                  onChange={generalpara}
                                  name="fitnessdetails"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto" }}
                              >
                                <h1
                                  className="text-left d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "#4e88e7",
                                    color: "rgb(255,255,255)",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "25px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Performance
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col" style={{ height: "35px" }}>
                                <div
                                  className="rating"
                                  style={{ fontSize: "27px" }}
                                >
                                  <input
                                    type="radio"
                                    name="performancerating"
                                    value="5"
                                    id="7"
                                    onChange={generalpara}
                                  />
                                  <label for="7">☆</label>
                                  <input
                                    type="radio"
                                    name="performancerating"
                                    value="4"
                                    id="8"
                                    onChange={generalpara}
                                  />
                                  <label for="8">☆</label>
                                  <input
                                    type="radio"
                                    name="performancerating"
                                    value="3"
                                    id="3"
                                    onChange={generalpara}
                                  />
                                  <label for="8">☆</label>
                                  <input
                                    type="radio"
                                    name="performancerating"
                                    value="2"
                                    id="9"
                                    onChange={generalpara}
                                  />
                                  <label for="9">☆</label>
                                  <input
                                    type="radio"
                                    name="performancerating"
                                    value="1"
                                    id="10"
                                    onChange={generalpara}
                                  />
                                  <label for="10">☆</label>
                                </div>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  type="text"
                                  name="performancedetails"
                                  style={{
                                    background: "rgb(255,255,255)",
                                    border: "1px solid rgb(78,136,231)",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    height: "48.7812px",
                                    width: "80%",
                                  }}
                                  placeholder="Write details for the above ratings."
                                  onChange={generalpara}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto" }}
                              >
                                <h1
                                  className="text-left d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "#4e88e7",
                                    color: "rgb(255,255,255)",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "25px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Skills
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col" style={{ height: "35px" }}>
                                <div
                                  className="rating"
                                  style={{ fontSize: "27px" }}
                                >
                                  <input
                                    type="radio"
                                    name="skillsrating"
                                    value="5"
                                    id="11"
                                    onChange={generalpara}
                                  />
                                  <label for="11">☆</label>
                                  <input
                                    type="radio"
                                    name="skillsrating"
                                    value="4"
                                    id="12"
                                    onChange={generalpara}
                                  />
                                  <label for="12">☆</label>
                                  <input
                                    type="radio"
                                    name="skillsrating"
                                    value="3"
                                    id="13"
                                    onChange={generalpara}
                                  />
                                  <label for="13">☆</label>
                                  <input
                                    type="radio"
                                    name="skillsrating"
                                    value="2"
                                    id="14"
                                    onChange={generalpara}
                                  />
                                  <label for="14">☆</label>
                                  <input
                                    type="radio"
                                    name="skillsrating"
                                    value="1"
                                    id="15"
                                    onChange={generalpara}
                                  />
                                  <label for="15">☆</label>
                                </div>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  type="text"
                                  name="skillsdetails"
                                  style={{
                                    background: "rgb(255,255,255)",
                                    border: "1px solid rgb(78,136,231)",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    height: "48.7812px",
                                    width: "80%",
                                  }}
                                  placeholder="Write details for the above ratings."
                                  onChange={generalpara}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                          style={{
                            textAlign: "center",
                            height: "auto",
                            width: "auto",
                          }}
                        >
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto" }}
                              >
                                <h1
                                  className="text-left d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "#4e88e7",
                                    color: "rgb(255,255,255)",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "25px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Discipline
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col" style={{ height: "35px" }}>
                                <div
                                  className="rating"
                                  style={{ fontSize: "27px" }}
                                >
                                  <input
                                    type="radio"
                                    name="disciplinerating"
                                    value="5"
                                    id="16"
                                    onChange={generalpara}
                                  />
                                  <label for="16">☆</label>
                                  <input
                                    type="radio"
                                    name="disciplinerating"
                                    value="4"
                                    id="17"
                                    onChange={generalpara}
                                  />
                                  <label for="17">☆</label>
                                  <input
                                    type="radio"
                                    name="disciplinerating"
                                    value="3"
                                    id="18"
                                    onChange={generalpara}
                                  />
                                  <label for="18">☆</label>
                                  <input
                                    type="radio"
                                    name="disciplinerating"
                                    value="2"
                                    id="19"
                                    onChange={generalpara}
                                  />
                                  <label for="19">☆</label>
                                  <input
                                    type="radio"
                                    name="disciplinerating"
                                    value="1"
                                    id="20"
                                    onChange={generalpara}
                                  />
                                  <label for="20">☆</label>
                                </div>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  type="text"
                                  name="disciplinedetails"
                                  style={{
                                    background: "rgb(255,255,255)",
                                    border: "1px solid rgb(78,136,231)",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    height: "48.7812px",
                                    width: "80%",
                                  }}
                                  placeholder="Write details for the above ratings."
                                  onChange={generalpara}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto" }}
                              >
                                <h1
                                  className="text-left d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "#4e88e7",
                                    color: "rgb(255,255,255)",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "25px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Stamina
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col" style={{ height: "35px" }}>
                                <div
                                  className="rating"
                                  style={{ fontSize: "27px" }}
                                >
                                  <input
                                    type="radio"
                                    name="staminarating"
                                    value="5"
                                    id="21"
                                    onChange={generalpara}
                                  />
                                  <label for="21">☆</label>
                                  <input
                                    type="radio"
                                    name="staminarating"
                                    value="4"
                                    id="22"
                                    onChange={generalpara}
                                  />
                                  <label for="22">☆</label>
                                  <input
                                    type="radio"
                                    name="staminarating"
                                    value="3"
                                    id="23"
                                    onChange={generalpara}
                                  />
                                  <label for="23">☆</label>
                                  <input
                                    type="radio"
                                    name="staminarating"
                                    value="2"
                                    id="24"
                                    onChange={generalpara}
                                  />
                                  <label for="24">☆</label>
                                  <input
                                    type="radio"
                                    name="staminarating"
                                    value="1"
                                    id="25"
                                    onChange={generalpara}
                                  />
                                  <label for="25">☆</label>
                                </div>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  type="text"
                                  name="staminadetails"
                                  style={{
                                    background: "rgb(255,255,255)",
                                    border: "1px solid rgb(78,136,231)",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    height: "48.7812px",
                                    width: "80%",
                                  }}
                                  placeholder="Write details for the above ratings."
                                  onChange={generalpara}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto" }}
                              >
                                <h1
                                  className="text-left d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "#4e88e7",
                                    color: "rgb(255,255,255)",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "25px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Balance
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col" style={{ height: "35px" }}>
                                <div
                                  className="rating"
                                  style={{ fontSize: "27px" }}
                                >
                                  <input
                                    type="radio"
                                    value="5"
                                    id="26"
                                    name="balancerating"
                                    onChange={generalpara}
                                  />
                                  <label for="26">☆</label>
                                  <input
                                    type="radio"
                                    name="balancerating"
                                    onChange={generalpara}
                                    value="4"
                                    id="27"
                                  />
                                  <label for="27">☆</label>
                                  <input
                                    type="radio"
                                    name="balancerating"
                                    onChange={generalpara}
                                    value="3"
                                    id="28"
                                  />
                                  <label for="28">☆</label>
                                  <input
                                    type="radio"
                                    name="balancerating"
                                    onChange={generalpara}
                                    value="2"
                                    id="29"
                                  />
                                  <label for="29">☆</label>
                                  <input
                                    type="radio"
                                    name="balancerating"
                                    onChange={generalpara}
                                    value="1"
                                    id="30"
                                  />
                                  <label for="30">☆</label>
                                </div>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  type="text"
                                  name="balancedetails"
                                  style={{
                                    background: "rgb(255,255,255)",
                                    border: "1px solid rgb(78,136,231)",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    height: "48.7812px",
                                    width: "80%",
                                  }}
                                  placeholder="Write details for the above ratings."
                                  onChange={generalpara}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <ul
                      className="list-group list-group-flush"
                      style={{ height: "auto", marginTop: "0px" }}
                    >
                      <li
                        className="list-group-item"
                        style={{
                          height: "22%",
                          marginTop: "16px",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center", height: "auto" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center", height: "auto" }}
                          >
                            <h1
                              style={{
                                fontSize: "20px",
                                color: "rgb(133, 135, 150)",
                              }}
                            >
                              <strong>Specialized Parameters</strong>
                            </h1>
                          </div>
                        </div>
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center", height: "auto" }}
                        >
                          <div
                            className="col mr-2"
                            style={{
                              textAlign: "center",
                              height: "auto",
                            }}
                          >
                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              Evaluate the athlete week wise according to your
                              specialized parameters.&nbsp;&nbsp;
                            </span>
                          </div>
                        </div>
                        {specpara.map((sp, index) => {
                          return (
                            <div key={index}>
                              <div
                                className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                                style={{
                                  textAlign: "center",
                                  height: "auto",
                                  width: "auto",
                                }}
                              >
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "82px",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Evaluation Week*
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    {/* <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        className="d-xl-flex"
                                        name="evalweek"
                                        type="number"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        style={{
                                          textAlign: "center",
                                          color: "rgb(133,135,150)",
                                          width: "80%",
                                          height: "26px",
                                          borderWidth: "1px",
                                          borderRadius: "14px",

                                          borderColor: "rgb(133,135,150)",
                                        }}
                                        placeholder="week no."
                                      />
                                    </div> */}
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <select
                                        className="d-xl-flex"
                                        name="evalweek"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        style={{
                                          textAlign: "center",
                                          color: "rgb(133,135,150)",
                                          borderRadius: "14px",
                                          borderColor: "rgb(133,135,150)",
                                          width: "90%",
                                          height: "26px",
                                        }}
                                      >
                                        <optgroup label="Select training week no.">
                                          {weeks.map((exp) => (
                                            <option key={exp} value={exp}>
                                              {exp}
                                            </option>
                                          ))}
                                        </optgroup>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto", height: "88px" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        // "background: #ffffff;color: rgb(78,136,231);width: auto;border-radius: 9px;font-size: 20px;height: auto;text-align: center;padding: 10px;"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "auto",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Parameter Name*
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        type="text"
                                        name="paraname"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        // "margin-top: 10px;"><input type="text" style="color: rgb(133,135,150);background: transparent;width: 80%;height: 26px;border-width: 1px;border-style: solid;border-radius: 14px;text-align: center;"
                                        style={{
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          width: "80%",
                                          height: "26px",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                        }}
                                        placeholder="name"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto", height: "88px" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      {/* "background: #ffffff;color: rgb(78,136,231);width: auto;border-radius: 9px;font-size: 20px;height: auto;text-align: center;padding: 10px;" */}
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "auto",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Start Time
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      {/* "margin-top: 10px;"><input type="time" style="height: 26px;width: auto;color: rgb(133,135,150);background: transparent;border-width: 1px;border-style: solid;border-radius: 14px;text-align: center;" */}
                                      <input
                                        type="time"
                                        name="starttime"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        style={{
                                          height: "26px",
                                          width: "auto",
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto", height: "88px" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "auto",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        End Time
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        type="time"
                                        name="endtime"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        style={{
                                          height: "26px",
                                          width: "auto",
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto", height: "88px" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "auto",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Total Sets
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        type="number"
                                        name="sets"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        placeholder="10"
                                        style={{
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          width: "90%",
                                          paddingLeft: "15px",
                                          marginLeft: "8px",
                                          height: "26px",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto", height: "88px" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "auto",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Parameter Count
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        type="number"
                                        name="amount"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        placeholder="10"
                                        style={{
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          width: "80%",
                                          height: "26px",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          paddingLeft: "15px",
                                          textAlign: "center",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto", height: "88px" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "auto",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Unit of Measurement
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <select
                                        className="d-xl-flex"
                                        name="unit"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        required=""
                                        style={{
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          height: "26px",
                                          width: "90%",
                                          borderColor: "rgb(133,135,150)",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                        }}
                                      >
                                        <optgroup label="Select a unit">
                                          {units.map((exp) => (
                                            <option key={exp} value={exp}>
                                              {exp}
                                            </option>
                                          ))}
                                        </optgroup>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "82px",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Obtained Points*
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        type="number"
                                        name="obtpoints"
                                        step="1"
                                        min="0"
                                        max="100"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        style={{
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          width: "80%",
                                          height: "26px",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                        }}
                                        placeholder="No. of Points Obtained"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto", height: "88px" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "auto",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Total Points
                                      </h1>
                                    </div>
                                  </div>
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        type="number"
                                        name="totalpoints"
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        style={{
                                          color: "rgb(133,135,150)",
                                          background: "transparent",
                                          width: "75%",
                                          paddingLeft: "5px",
                                          height: "26px",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                        }}
                                        placeholder=" 100"
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col"
                                  style={{ width: "auto", marginTop: "36px" }}
                                >
                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                      style={{ height: "auto" }}
                                    >
                                      <h1
                                        className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                        style={{
                                          background: "#ffffff",
                                          color: "rgb(78,136,231)",
                                          width: "auto",
                                          borderRadius: "9px",
                                          fontSize: "20px",
                                          height: "82px",
                                          textAlign: "center",
                                          padding: "10px",
                                        }}
                                      >
                                        Points Percentage%
                                        <br />
                                      </h1>
                                    </div>
                                  </div>

                                  <div
                                    className="row"
                                    style={{ width: "auto" }}
                                  >
                                    <div
                                      className="col d-xl-flex justify-content-xl-center"
                                      style={{ marginTop: "10px" }}
                                    >
                                      <input
                                        disabled
                                        type="text"
                                        name="pointsper"
                                        value={specpara[index].obtpoints}
                                        onChange={(e) =>
                                          handlespecpara(e, index)
                                        }
                                        style={{
                                          background: "transparent",
                                          width: "60%",
                                          height: "26px",
                                          borderWidth: "1px",
                                          borderStyle: "solid",
                                          borderRadius: "14px",
                                          textAlign: "center",
                                          color: "rgb(133,135,150)",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col d-xl-flex justify-content-xl-center"
                                  style={{ marginTop: "130px" }}
                                >
                                  <div
                                    className="col d-xl-flex justify-content-xl-start"
                                    style={{
                                      maxWidth: "none",
                                      paddingRight: "1px",
                                      paddingLeft: "15px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    <button
                                      className="btn btn-primary d-xl-flex"
                                      data-bss-hover-animate="pulse"
                                      type="button"
                                      onClick={() => addval(index)}
                                      style={{
                                        borderRadius: "78px",
                                        background: "transparent",
                                        color: "rgb(78,136,231)",
                                        border: "3px solid rgb(78,136,231)",
                                        width: "auto",
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                        paddingLeft: "17px",
                                        paddingRight: "20px",
                                        fontSize: "18px",
                                        height: "auto",
                                      }}
                                    >
                                      <strong>✓</strong>
                                    </button>
                                  </div>
                                </div>
                                <div
                                  className="col d-xl-flex justify-content-xl-center"
                                  style={{ marginTop: "130px" }}
                                >
                                  <div
                                    className="col d-xl-flex justify-content-xl-start"
                                    style={{
                                      maxWidth: "none",
                                      paddingRight: "1px",
                                      paddingLeft: "15px",
                                      marginLeft: "-15px",
                                    }}
                                  >
                                    <button
                                      className="btn btn-primary d-xl-flex"
                                      data-bss-hover-animate="pulse"
                                      type="button"
                                      onClick={() => removespecdata(index)}
                                      style={{
                                        borderRadius: "78px",
                                        background: "transparent",
                                        color: "rgb(78,136,231)",
                                        border: "3px solid rgb(78,136,231)",
                                        width: "auto",
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                        paddingLeft: "17px",
                                        paddingRight: "20px",
                                        fontSize: "18px",
                                        height: "auto",
                                      }}
                                    >
                                      ✘
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </li>
                    </ul>

                    <div
                      className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                      style={{
                        textAlign: "center",
                        height: "auto",
                        width: "auto",
                      }}
                    >
                      <div
                        className="col text-center"
                        style={{ width: "auto", marginTop: "36px" }}
                      >
                        <div className="row" style={{ width: "auto" }}>
                          <div
                            className="col d-xl-flex justify-content-xl-center"
                            style={{
                              maxWidth: "none",
                              paddingRight: "1px",
                              paddingLeft: "1px",

                              paddingBottom: "35px",
                            }}
                          >
                            <button
                              className="btn btn-primary"
                              data-bss-hover-animate="pulse"
                              type="button"
                              onClick={(e) => {
                                addspecpara(e);
                              }}
                              style={{
                                borderRadius: "78px",
                                background: "transparent",
                                color: "rgb(78,136,231)",
                                border: "3px solid rgb(78,136,231)",
                                width: "auto",
                                paddingTop: "0px",
                                paddingBottom: "0px",
                                paddingLeft: "19px",
                                marginRight: "20px",
                                fontSize: "21px",
                                height: "auto",
                              }}
                            >
                              <strong>Add Fields +</strong>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul
                      className="list-group list-group-flush"
                      style={{ height: "auto", marginTop: "0px" }}
                    >
                      <li
                        className="list-group-item"
                        style={{ height: "22%", marginTop: "16px" }}
                      >
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center", height: "auto" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center", height: "auto" }}
                          >
                            <h1
                              style={{
                                fontSize: "20px",
                                color: "rgb(133, 135, 150)",
                              }}
                            >
                              <strong>Overall Points</strong>
                            </h1>
                          </div>
                        </div>
                        <div
                          className="row align-items-center no-gutters"
                          style={{ textAlign: "center", height: "auto" }}
                        >
                          <div
                            className="col mr-2"
                            style={{ textAlign: "center", height: "auto" }}
                          >
                            <span
                              className="text-xs"
                              style={{
                                textAlign: "center",
                                fontSize: "14.2px",
                              }}
                            >
                              Following are the total overall points that
                              athlete obtained.
                            </span>
                          </div>
                        </div>
                        <div
                          className="row mx-auto no-gutters"
                          style={{
                            textAlign: "center",
                            height: "auto",
                            width: "53%",
                            marginTop: "-8px",
                          }}
                        >
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto" }}
                              >
                                <h1
                                  className="text-center d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "##ffffff",
                                    color: "rgb(78,136,231)",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "20px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Obtained Points
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  type="text"
                                  value={fobttotal}
                                  disabled
                                  style={{
                                    color: "rgb(133,135,150)",
                                    background: "transparent",
                                    width: "60%",
                                    height: "26px",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderRadius: "14px",
                                    textAlign: "center",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto", width: "auto" }}
                              >
                                <h1
                                  className="text-center d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center"
                                  style={{
                                    background: "##ffffff",
                                    color: "rgb(78,136,231)",
                                    width: "auto",
                                    borderColor: "black",
                                    borderRadius: "9px",
                                    fontSize: "20px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Points Out of
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  disabled
                                  type="text"
                                  value={ftotal}
                                  style={{
                                    color: "rgb(133,135,150)",
                                    background: "transparent",
                                    borderColor: "black",
                                    width: "60%",
                                    height: "26px",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderRadius: "14px",
                                    textAlign: "center",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col"
                            style={{ width: "auto", marginTop: "36px" }}
                          >
                            <div className="row" style={{ width: "auto" }}>
                              <div
                                className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                                style={{ height: "auto", width: "auto" }}
                              >
                                <h1
                                  className="text-center d-flex d-xl-flex justify-content-center align-items-center align-items-xl-center"
                                  style={{
                                    background: "##ffffff",
                                    color: "rgb(78,136,231)",
                                    borderColor: "black",
                                    width: "auto",
                                    borderRadius: "9px",
                                    fontSize: "20px",
                                    height: "auto",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Overall %
                                </h1>
                              </div>
                            </div>
                            <div className="row" style={{ width: "auto" }}>
                              <div className="col d-xl-flex justify-content-xl-center">
                                <input
                                  disabled
                                  type="text"
                                  value={overallspecpara.finalper}
                                  style={{
                                    background: "transparent",
                                    width: "60%",
                                    height: "26px",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderRadius: "14px",
                                    textAlign: "center",
                                    color: "rgb(133,135,150)",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                style={{
                  textAlign: "center",
                  margin: "auto",
                  marginTop: "0px",
                  height: "auto",
                  width: "auto",
                }}
              >
                <div
                  className="col d-xl-flex justify-content-xl-center"
                  style={{ width: "auto", marginTop: "0px", height: "auto" }}
                >
                  <div className="card shadow mb-5" style={{ width: "97%" }}>
                    <div className="card-header py-3">
                      <p className="text-primary m-0 font-weight-bold">
                        Player's BMI (If Applicable)
                      </p>
                    </div>
                    <div className="card-body" style={{ height: "auto" }}>
                      <div className="row">
                        <div className="col">
                          <form>
                            <div className="form-group">
                              <label
                                className="d-xl-flex justify-content-xl-start"
                                for="signature"
                                style={{
                                  fontSize: "16px",
                                  justifyContent: "center",
                                }}
                              >
                                Calculate the BMI of the player.
                                <br />
                              </label>
                            </div>
                          </form>

                          <div
                            className="row"
                            style={{
                              height: "auto",
                              width: "auto",
                              marginTop: "25px",
                            }}
                          >
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center"
                              style={{ width: "auto", height: "auto" }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{ width: "auto", fontSize: "25.8px" }}
                              >
                                &nbsp; &nbsp; &nbsp; Age
                              </small>
                            </div>
                            <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center">
                              <div className="row" style={{ width: "372px" }}>
                                <div className="col">
                                  <input
                                    type="number"
                                    name="age"
                                    onChange={handlebmi}
                                    style={{
                                      fontSize: "25px",
                                      background: "rgb(255,252,252)",
                                      border: "1px solid #858796",
                                      width: "250px",
                                      marginRight: "2px",
                                    }}
                                    placeholder="Enter your age"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{
                              height: "auto",
                              width: "auto",
                              marginTop: "16px",
                            }}
                          >
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center"
                              style={{ width: "auto", height: "auto" }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{ width: "auto", fontSize: "25.8px" }}
                              >
                                Gender
                              </small>
                            </div>
                            <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center">
                              <div className="row" style={{ width: "372px" }}>
                                <div className="col">
                                  <select
                                    name="gender"
                                    onChange={handlebmi}
                                    defaultValue="Select your gender"
                                    style={{
                                      width: "250px",
                                      marginRight: "2px",
                                      height: "41.7812px",
                                      fontSize: "25px",
                                      border: "1px solid #858796",
                                      color: "rgb(0,0,0)",
                                    }}
                                  >
                                    <option
                                      disabled
                                      style={{ fontWeight: "bold" }}
                                      selected=""
                                    >
                                      Select your gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{
                              height: "auto",
                              width: "auto",
                              marginTop: "15px",
                            }}
                          >
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center"
                              style={{ width: "auto", height: "auto" }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{ fontSize: "25.8px" }}
                              >
                                Height
                              </small>
                            </div>
                            <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center">
                              <div className="row" style={{ width: "372px" }}>
                                <div className="col">
                                  <input
                                    type="number"
                                    placeholder="Feet"
                                    name="hfeet"
                                    onChange={handlebmi}
                                    style={{
                                      fontSize: "25px",
                                      width: "250px",
                                      marginRight: "2px",
                                    }}
                                  />
                                </div>
                                <div className="col">
                                  <input
                                    type="number"
                                    placeholder="Inches"
                                    name="hinch"
                                    onChange={handlebmi}
                                    style={{
                                      fontSize: "25px",
                                      width: "250px",
                                      marginRight: "2px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{
                              height: "auto",
                              width: "auto",
                              marginTop: "16px",
                            }}
                          >
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center"
                              style={{ width: "auto", height: "auto" }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{ fontSize: "25.8px" }}
                              >
                                Weight
                              </small>
                            </div>
                            <div className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center">
                              <div className="row" style={{ width: "372px" }}>
                                <div className="col">
                                  <input
                                    type="number"
                                    placeholder="KG"
                                    name="weight"
                                    onChange={handlebmi}
                                    style={{
                                      fontSize: "25px",
                                      width: "250px",
                                      marginRight: "2px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{
                              height: "auto",
                              width: "auto",
                              marginTop: "16px",
                            }}
                          >
                            {/* "width: auto;height: auto;margin: 0px;margin-top: 27px;margin-bottom: 15px;" */}
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center"
                              style={{
                                width: "auto",
                                height: "auto",
                                margin: "0px",
                                marginTop: "27px",
                                marginBottom: "15px",
                              }}
                            >
                              <button
                                className="btn btn-primary"
                                onClick={calbmi}
                                type="button"
                              >
                                Calculate
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                padding: "0px",
                                height: "auto",
                              }}
                            >
                              <h1
                                style={{
                                  fontFamily: "Nunito, sans-serif",
                                  paddingLeft: "10px",
                                  paddingRight: "10px",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                {resbmi !== "" ? (
                                  <strong>BMI = {resbmi}</strong>
                                ) : null}
                              </h1>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "0px" }}>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                paddingBottom: "30px",
                              }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "left",
                                }}
                              >
                                {resbmi !== "" && resbmi < 18.5 ? (
                                  <strong
                                    style={{
                                      color: "#fb7d14",
                                      fontSize: "26px",
                                    }}
                                  >
                                    Under Weight.
                                  </strong>
                                ) : null}
                                {resbmi !== "" &&
                                resbmi >= 18.5 &&
                                resbmi <= 24.9 ? (
                                  <strong
                                    style={{
                                      color: "#16cc8a",
                                      fontSize: "26px",
                                    }}
                                  >
                                    Healthy Weight Range.
                                  </strong>
                                ) : null}
                                {resbmi !== "" &&
                                resbmi >= 25 &&
                                resbmi <= 29.9 ? (
                                  <strong
                                    style={{
                                      color: "#f3c141",
                                      fontSize: "26px",
                                    }}
                                  >
                                    Over Weight.
                                  </strong>
                                ) : null}
                                {resbmi !== "" && resbmi >= 30 ? (
                                  <strong
                                    style={{
                                      color: "#e74a38",
                                      fontSize: "26px",
                                    }}
                                  >
                                    Obese.
                                  </strong>
                                ) : null}
                              </small>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "0px" }}>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                                marginBottom: "5px",
                              }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "left",
                                }}
                              >
                                BMI Weight Ranges
                              </small>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "0px" }}>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "left",
                                }}
                              >
                                Less Than 18.5
                              </small>
                            </div>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "center",
                                  background: "var(--orange)",
                                  color: "rgb(255,255,255)",
                                  height: "100%",
                                  width: "auto",
                                  padding: "2px",
                                  marginTop: "0px",
                                }}
                              >
                                Underweight
                              </small>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "0px" }}>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "left",
                                }}
                              >
                                Between 18.5 - 24.9
                              </small>
                            </div>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "center",
                                  background: "var(--green)",
                                  color: "rgb(255,255,255)",
                                  height: "100%",
                                  width: "auto",
                                  padding: "2px",
                                  marginTop: "0px",
                                }}
                              >
                                Healthy Weight
                              </small>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "0px" }}>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "left",
                                }}
                              >
                                Between 25 - 29.9
                                <br />
                              </small>
                            </div>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "center",
                                  background: "var(--warning)",
                                  color: "rgb(255,255,255)",
                                  height: "100%",
                                  width: "auto",
                                  padding: "2px",
                                  marginTop: "0px",
                                }}
                              >
                                Overweight
                              </small>
                            </div>
                          </div>
                          <div className="row" style={{ marginTop: "0px" }}>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text text-muted"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "left",
                                }}
                              >
                                Over 30
                              </small>
                            </div>
                            <div
                              className="col d-flex d-xl-flex justify-content-center justify-content-xl-start align-items-xl-center"
                              style={{
                                width: "auto",
                                padding: "auto",
                                paddingTop: "9px",
                              }}
                            >
                              <small
                                className="form-text"
                                style={{
                                  fontSize: "20.8px",
                                  textAlign: "center",
                                  background: "var(--danger)",
                                  color: "rgb(255,255,255)",
                                  height: "100%",
                                  width: "auto",
                                  padding: "2px",
                                  marginTop: "0px",
                                }}
                              >
                                Obese
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                style={{
                  textAlign: "center",
                  height: "auto",
                  width: "auto",
                  marginTop: "0px",
                }}
              >
                <div
                  className="col"
                  style={{ width: "auto", marginTop: "0px" }}
                >
                  <div className="card shadow mb-5">
                    <div className="card-header py-3">
                      <p className="text-primary m-0 font-weight-bold">
                        Remarks
                      </p>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <form>
                            <div className="form-group">
                              <label
                                className="d-xl-flex justify-content-xl-start"
                                for="signature"
                                style={{ fontSize: "16px" }}
                              >
                                Write your remarks about the player.
                                <br />
                              </label>
                              <textarea
                                className="form-control"
                                name="finalremarks"
                                onChange={handleremarks}
                                id="signature-1"
                                rows="4"
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <form className="d-xl-flex justify-content-xl-center">
                            <div
                              className="form-group d-xl-flex justify-content-xl-center"
                              style={{ width: "auto" }}
                            >
                              <select
                                className="form-control"
                                name="overallper"
                                onChange={handleremarks}
                                style={{
                                  fontSize: "16px",
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                <option
                                  style={{ fontWeight: "bold" }}
                                  selected=""
                                >
                                  Overall Performance
                                </option>
                                <option value="Outstanding">Outstanding</option>
                                <option value="Satisfactory">
                                  Satisfactory
                                </option>
                                <option value="Average">Average</option>
                                <option value="Needs Improvement">
                                  Needs Improvement
                                </option>
                                <option value="Poor">Poor</option>
                              </select>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row d-xl-flex align-items-center justify-content-xl-center no-gutters"
                style={{
                  textAlign: "center",
                  height: "auto",
                  width: "auto",
                  marginTop: "0px",
                }}
              >
                <div
                  className="col"
                  style={{ width: "auto", marginTop: "0px", height: "100px" }}
                >
                  <button
                    disabled={
                      bool === false ||
                      alldetails?.remarks?.finalremarks === "" ||
                      alldetails?.remarks?.overallper === "" ||
                      alldetails?.genpara?.balancerating === "" ||
                      alldetails?.genpara?.fitnessrating === "" ||
                      alldetails?.genpara?.staminarating === "" ||
                      alldetails?.genpara?.performancerating === "" ||
                      alldetails?.genpara?.disciplinerating === "" ||
                      alldetails?.genpara?.skills === "" ||
                      alldetails?.overallspecpara?.finalobttotal === ""
                        ? true
                        : false
                    }
                    className="btn btn-primary"
                    type="button"
                    onClick={saveevalform}
                    style={{ width: "auto", height: "auto", fontSize: "22px" }}
                    data-target="#confirmation"
                    data-toggle="modal"
                  >
                    Submit
                  </button>
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
                      <h4 className={`${styles.modalTitle}`}>Confirmation</h4>
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
                        Are you sure you want to submit evaluation for this
                        athlete? Remember you can only submit it once.
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
                        No
                      </button>
                      <button
                        onClick={handlesubmit}
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
                        Yes
                      </button>
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
};

export default Evaluationform;
