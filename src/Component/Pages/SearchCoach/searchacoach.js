import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  submittraining,
  submittrainingcustomized,
} from "../../../actions/searchacoach";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import InputLabel from "@mui/material/InputLabel";
import { scroller } from "react-scroll";
import "./navbar.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import styles from "./searchacoach.module.css";

const Searchacoach = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth?.authData?.token);
  const accounttype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);
  const athid = useSelector((state) => state.auth?.authData?.result?._id);
  const city = useSelector((state) => state.auth?.authData?.result?.city);
  const gender = useSelector((state) => state.auth?.authData?.result?.gender);
  const age = useSelector((state) => state.auth?.authData?.result?.age);
  const desc = useSelector((state) => state.auth?.authData?.result?.age);
  const noofexp = useSelector((state) => state.auth?.authData?.result?.age);
  // const mess = useSelector((state) => state.searchacoachReducer?.error);

  const [sportsname, setsportsname] = useState([]);
  const [showfilters, setshowfilters] = useState(false);
  const [cityfilters, setcityfilters] = useState("");
  const [genderfilters, setgenderfilters] = useState("");
  const [noofexpfilters, setnoofexpfilters] = useState("");
  const [coachdata, setcoachdata] = useState([]);
  const [coachdetails, setcoachdetails] = useState([]);
  const [showdetails, setshowdetails] = useState(false);
  const [showform, setshowform] = useState(false);
  const [showconfirmation1, setshowconfirmation1] = useState(false);
  const [showconfirmation, setshowconfirmation] = useState(false);
  const [ed, seted] = useState("");
  var date = new Date();

  const defaultcoaches = () => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/searchacoach/coachdetails`)
      .then((res) => {
        setcoachdata(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(`https://athletistan.herokuapp.com/routes/olympics/sportslist`)
      .then((res) => {
        res.data.unshift("ALL SPORTS");
        sort(res.data);
      });

    defaultcoaches();
    {
      window.scrollTo(0, 0);
    }
  }, []);

  const sort = (array) => {
    let arr = array.sort((a, b) => a.localeCompare(b));
    setsportsname(arr);
  };

  const details = {
    coachid: "",
    coachname: "",
    athleteid: athid,
    athletedp: dp,
    coachdp: "",
    athletename: name,
    athletecity: city,
    athleteage: age,
    athletegender: gender,
    athletedesc: desc,
    athletenoofexp: noofexp,
    sportname: "",
    athleteexpfee: "",
    trainingweeks: "",
    trainingstartdate: "",
    trainingenddate: "",
    trainingstarttime: "",
    trainingendtime: "",
    trainingtimeslot: "",
    availabledays: [],
    requesttype: "direct",
    extranote: "",
    fee: "",
    date: date,
  };

  const [alldetails, setalldetails] = useState(details);
  const [sport, setsport] = useState("ALL SPORTS");

  const noofexperience = [
    "Number of Experience",
    "Less than 1 year",
    "1 to 3 years",
    "3 to 5 years",
    "5 to 10",
    "10 or more",
  ];

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
  const handleapproachus = () => {
    history.push("/breaktherecord");
  };

  const handledashboard = () => {
    history.push("/dashboard");
  };

  const cityfilter = (e) => {
    setcityfilters(e.target.value);
    if (e.target.value === "Select The City") {
      setcityfilters("");
    }
  };
  const genderfilter = (e) => {
    setgenderfilters(e.target.value);
    if (e.target.value === "Gender") {
      setgenderfilters("");
    }
  };
  const noofexpfilter = (e) => {
    setnoofexpfilters(e.target.value);
    if (e.target.value === "Number of Experience") {
      setnoofexpfilters("");
    }
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

  const handleChange = (e) => {
    setsport(([e.target.name] = e.target.value));
  };

  const enddate = (date, day) => {
    var d = date.substr(0, 10);

    var res = new Date(d);

    var days = day * 7;

    res.setDate(res.getDate() + days);

    seted(res);
    setalldetails({ ...alldetails, trainingenddate: res });
  };

  const handleclose = () => {
    setshowdetails(false);
    setalldetails({ ...alldetails, coachdp: "" });
  };

  const handleCoach = (
    coachid,
    name,
    sportname,
    trainingweeks,
    startdate,
    availabledays,
    sport
  ) => {
    setshowdetails(true);
    axios
      .get(`https://athletistan.herokuapp.com/routes/searchacoach/details`, {
        params: {
          id: coachid,
        },
      })
      .then((res) => {
        setcoachdetails(res.data);
      });

    setalldetails({
      ...alldetails,
      coachid: coachid,
      requesttype: "direct",
      coachname: name,
      sportname: sportname,
      trainingweeks: trainingweeks,
      trainingstartdate: startdate,
      availabledays: availabledays,
      sportname: sport,
    });
  };

  const handletrainingtimeslot = (e) => {
    if (e.target.value === "06:00-09:00") {
      setalldetails({
        ...alldetails,
        trainingstarttime: "06:00",
        trainingendtime: "09:00",
        trainingtimeslot: e.target.value,
      });
    }
    if (e.target.value === "09:00-12:00") {
      setalldetails({
        ...alldetails,
        trainingstarttime: "09:00",
        trainingendtime: "12:00",
        trainingtimeslot: e.target.value,
      });
    }
    if (e.target.value === "12:00-15:00") {
      setalldetails({
        ...alldetails,
        trainingstarttime: "12:00",
        trainingendtime: "15:00",
        trainingtimeslot: e.target.value,
      });
    }
    if (e.target.value === "15:00-18:00") {
      setalldetails({
        ...alldetails,
        trainingstarttime: "15:00",
        trainingendtime: "18:00",
        trainingtimeslot: e.target.value,
      });
    }
    if (e.target.value === "18:00-21:00") {
      setalldetails({
        ...alldetails,
        trainingstarttime: "18:00",
        trainingendtime: "21:00",
        trainingtimeslot: e.target.value,
      });
    }
    if (e.target.value === "21:00-00:00") {
      setalldetails({
        ...alldetails,
        trainingstarttime: "21:00",
        trainingendtime: "00:00",
        trainingtimeslot: e.target.value,
      });
    }
  };

  // const handletime = (slot) => {
  //
  // };

  const handlebutton = (st, tw, ef, dp) => {
    setshowconfirmation(true);
    enddate(st, tw);
    setalldetails({ ...alldetails, fee: ef, coachdp: dp });
  };

  const handleClick = () => {
    setcoachdata([]);
    setcityfilters("");
    setgenderfilters("");
    setnoofexpfilters("");
    setshowfilters(true);
    scroller.scrollTo("Coaches", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });

    if (sport === "ALL SPORTS") {
      defaultcoaches();
    }

    axios
      .get(
        `https://athletistan.herokuapp.com/routes/searchacoach/sportcoaches`,
        {
          params: {
            sport: sport,
          },
        }
      )
      .then((res) => {
        setcoachdata(res.data);
        if (res.data === []) {
          setcoachdata([]);
        }
      });
  };
  const handlefilters = () => {
    scroller.scrollTo("Coaches", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });

    if (
      cityfilters !== "" &&
      genderfilters === "" &&
      noofexpfilters === "" &&
      sport !== ""
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter1`, {
          params: {
            cityfilters: cityfilters,
            sport: sport,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }
    if (
      cityfilters === "" &&
      genderfilters !== "" &&
      noofexpfilters === "" &&
      sport !== ""
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter2`, {
          params: {
            genderfilters: genderfilters,
            sport: sport,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }
    if (
      cityfilters === "" &&
      genderfilters === "" &&
      noofexpfilters !== "" &&
      sport !== ""
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter3`, {
          params: {
            noofexpfilters: noofexpfilters,
            sport: sport,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }
    if (
      cityfilters !== "" &&
      genderfilters !== "" &&
      noofexpfilters === "" &&
      sport !== ""
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter4`, {
          params: {
            cityfilters: cityfilters,
            genderfilters: genderfilters,
            sport: sport,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }
    if (
      cityfilters !== "" &&
      genderfilters === "" &&
      noofexpfilters !== "" &&
      sport !== ""
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter5`, {
          params: {
            cityfilters: cityfilters,
            noofexpfilters: noofexpfilters,
            sport: sport,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }
    if (
      cityfilters === "" &&
      genderfilters !== "" &&
      noofexpfilters !== "" &&
      sport !== ""
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter6`, {
          params: {
            genderfilters: genderfilters,
            noofexpfilters: noofexpfilters,
            sport: sport,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }
    if (
      cityfilters !== "" &&
      genderfilters !== "" &&
      noofexpfilters !== "" &&
      sport !== ""
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter7`, {
          params: {
            cityfilters: cityfilters,
            genderfilters: genderfilters,
            noofexpfilters: noofexpfilters,
            sport: sport,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters !== "" &&
      genderfilters === "" &&
      noofexpfilters === "" &&
      sport === "ALL SPORTS"
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter8`, {
          params: {
            cityfilters: cityfilters,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters === "" &&
      genderfilters !== "" &&
      noofexpfilters === "" &&
      sport === "ALL SPORTS"
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter9`, {
          params: {
            genderfilters: genderfilters,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters === "" &&
      genderfilters === "" &&
      noofexpfilters !== "" &&
      sport === "ALL SPORTS"
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter10`, {
          params: {
            noofexpfilters: noofexpfilters,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters !== "" &&
      genderfilters !== "" &&
      noofexpfilters === "" &&
      sport === "ALL SPORTS"
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter11`, {
          params: {
            cityfilters: cityfilters,
            genderfilters: genderfilters,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters !== "" &&
      genderfilters === "" &&
      noofexpfilters !== "" &&
      sport === "ALL SPORTS"
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter12`, {
          params: {
            cityfilters: cityfilters,

            noofexpfilters: noofexpfilters,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters === "" &&
      genderfilters !== "" &&
      noofexpfilters !== "" &&
      sport === "ALL SPORTS"
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter13`, {
          params: {
            genderfilters: genderfilters,
            noofexpfilters: noofexpfilters,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters !== "" &&
      genderfilters !== "" &&
      noofexpfilters !== "" &&
      sport === "ALL SPORTS"
    ) {
      axios
        .get(`https://athletistan.herokuapp.com/routes/searchacoach/filter14`, {
          params: {
            cityfilters: cityfilters,
            genderfilters: genderfilters,
            noofexpfilters: noofexpfilters,
          },
        })
        .then((res) => {
          setcoachdata(res.data);
          if (res.data === []) {
            setcoachdata([]);
          }
        });
    }

    if (
      cityfilters === "" &&
      genderfilters === "" &&
      noofexpfilters === "" &&
      sport === "ALL SPORTS"
    ) {
      defaultcoaches();
    }
  };

  const handlerequest = () => {
    setshowform(true);
    setalldetails({
      ...alldetails,
      requesttype: "customized",
      coachid: "",
      coachname: "",
    });
  };

  const handledata = (e) => {
    // if (e.target.name === "trainingstartdate") {
    //   var result = new Date(e.target.value);
    //   setalldetails({ ...alldetails, trainingstartdate: result });
    // }
    //  else {
    setalldetails({ ...alldetails, [e.target.name]: e.target.value });
    // }
  };

  const handleenddate = () => {
    var result = new Date(alldetails?.trainingstartdate);

    var day = alldetails?.trainingweeks;

    var days = day * 7;

    result.setDate(result.getDate() + days);

    setalldetails({ ...alldetails, trainingenddate: result });

    // setalldetails({ ...alldetails, trainingenddate: result });
  };

  const handlecussubmit = () => {
    setshowconfirmation1(true);
    handleenddate();
  };

  const handleSubmit = () => {
    setshowform(false);
    setshowconfirmation1(false);
    date.setHours(0, 0, 0, 0);

    dispatch(submittrainingcustomized(alldetails, history));
  };

  const handlesubmit = () => {
    // setalldetails({ ...alldetails, trainingenddate: ed });

    setshowconfirmation(false);
    setshowdetails(false);

    const temp = {
      ...alldetails,
      trainingenddate: ed,
    };
    dispatch(submittraining(temp, history));

    // alert("Request has been send successfully");
  };

  if (accounttype === "Athlete") {
    return (
      <div>
        <body>
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
                      className="d-none d-lg-inline me-2 text-gray-600 small"
                      style={{ fontSize: "16px", marginLeft: "145px" }}
                    >
                      {name}
                    </span>
                    <img
                      className="border rounded-circle img-profile"
                      src={dp}
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
            className="header-blue"
            style={{
              marginTop: "80px",
              background: "url(sacheader1.jpg) no-repeat, #184e8e",
              paddingBottom: "0px",
              height: "596.891px",
              backgroundSize: "cover, auto",
            }}
          >
            <div className="container hero">
              <div
                className="row d-xl-flex justify-content-xl-center"
                id="heading"
              >
                <div
                  className="col d-xl-flex justify-content-xl-center"
                  style={{ marginTop: "100px" }}
                >
                  <h1
                    style={{
                      marginTop: "50px",
                      fontWeight: "bold",
                      fontSize: "60px",
                      marginBottom: "0px",
                      color: "white",
                    }}
                  >
                    <strong style={{ fontFamily: "Montserrat" }}>
                      Find Your Desired Coaches
                    </strong>
                  </h1>
                </div>
              </div>
              <div
                className="row d-xl-flex justify-content-xl-center"
                id="sub-heading"
              >
                <div
                  className="col d-xl-flex justify-content-xl-center"
                  style={{ marginTop: "0px" }}
                >
                  <h1
                    style={{
                      marginTop: "0px",
                      fontSize: "29px",
                      marginBottom: "0px",
                      fontFamily: "Montserrat",
                      color: "white",
                    }}
                  >
                    With thousands of coaches, we have the right one for you
                    <br />
                  </h1>
                </div>
              </div>
              <div
                className="row d-xl-flex justify-content-xl-center"
                id="selectsports"
              >
                <div
                  className="col d-flex d-xl-flex justify-content-center justify-content-xl-center align-items-xl-center"
                  style={{ marginTop: "45px" }}
                >
                  <select
                    style={{ width: "650px", height: "50px" }}
                    className={`${styles.formcontrol}`}
                    name="sport"
                    onChange={handleChange}
                  >
                    <optgroup label="Select your sport">
                      {sportsname.map((names) => (
                        <option key={names} value={names}>
                          {names}
                        </option>
                      ))}
                    </optgroup>
                  </select>

                  <button
                    style={{ marginBottom: "0.1px", marginTop: "0.1px" }}
                    className={`d-xl-flex align-items-xl-center ${styles.btnsearchcoach}`}
                    type="button"
                    onClick={handleClick}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              {coachdata.length > 0 ? (
                <div>
                  <div
                    className="row d-xl-flex justify-content-xl-center"
                    id="filtersname"
                  >
                    <div
                      className="col d-xl-flex justify-content-xl-center"
                      style={{ marginTop: "25px", fontSize: "25px" }}
                    >
                      <select
                        onChange={cityfilter}
                        style={{
                          background: "rgba(0,28,51,0.38)",
                          color: "rgb(255,255,255)",
                          padding: "10px",
                          fontFamily: "Montserrat, sans-serif",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          borderStyle: "solid",
                          borderColor: "rgb(255,255,255)",
                          marginRight: "5px",
                          marginLeft: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        <optgroup key="city">
                          <option value="" style={{ fontWeight: "bold" }}>
                            Select The City
                          </option>
                          <option value="Islamabad">Islamabad</option>
                          <option
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Punjab Cities
                          </option>
                          <option value="Ahmed Nager Chatha">
                            Ahmed Nager Chatha
                          </option>
                          <option value="Ahmadpur East">Ahmadpur East</option>
                          <option value="Ali Khan Abad">Ali Khan Abad</option>
                          <option value="Alipur">Alipur</option>
                          <option value="Arifwala">Arifwala</option>
                          <option value="Attock">Attock</option>
                          <option value="Bhera">Bhera</option>
                          <option value="Bhalwal">Bhalwal</option>
                          <option value="Bahawalnagar">Bahawalnagar</option>
                          <option value="Bahawalpur">Bahawalpur</option>
                          <option value="Bhakkar">Bhakkar</option>
                          <option value="Burewala">Burewala</option>
                          <option value="Chillianwala">Chillianwala</option>
                          <option value="Chakwal">Chakwal</option>
                          <option value="Chichawatni">Chichawatni</option>
                          <option value="Chiniot">Chiniot</option>
                          <option value="Chishtian">Chishtian</option>
                          <option value="Daska">Daska</option>
                          <option value="Darya Khan">Darya Khan</option>
                          <option value="Dera Ghazi Khan">
                            Dera Ghazi Khan
                          </option>
                          <option value="Dhaular">Dhaular</option>
                          <option value="Dina">Dina</option>
                          <option value="Dinga">Dinga</option>
                          <option value="Dipalpur">Dipalpur</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Ferozewala">Ferozewala</option>
                          <option value="Fateh Jhang">Fateh Jang</option>
                          <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                          <option value="Gojra">Gojra</option>
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Gujrat">Gujrat</option>
                          <option value="Gujar Khan">Gujar Khan</option>
                          <option value="Hafizabad">Hafizabad</option>
                          <option value="Haroonabad">Haroonabad</option>
                          <option value="Hasilpur">Hasilpur</option>
                          <option value="Haveli Lakha">Haveli Lakha</option>
                          <option value="Jatoi">Jatoi</option>
                          <option value="Jalalpur">Jalalpur</option>
                          <option value="Jattan">Jattan</option>
                          <option value="Jampur">Jampur</option>
                          <option value="Jaranwala">Jaranwala</option>
                          <option value="Jhang">Jhang</option>
                          <option value="Jhelum">Jhelum</option>
                          <option value="Kalabagh">Kalabagh</option>
                          <option value="Karor Lal Esan">Karor Lal Esan</option>
                          <option value="Kasur">Kasur</option>
                          <option value="Kamalia">Kamalia</option>
                          <option value="Kamoke">Kamoke</option>
                          <option value="Khanewal">Khanewal</option>
                          <option value="Khanpur">Khanpur</option>
                          <option value="Kharian">Kharian</option>
                          <option value="Khushab">Khushab</option>
                          <option value="Kot Addu">Kot Addu</option>
                          <option value="Jauharabad">Jauharabad</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Lalamusa">Lalamusa</option>
                          <option value="Layyah">Layyah</option>
                          <option value="Liaquat Pur">Liaquat Pur</option>
                          <option value="Lodhran">Lodhran</option>
                          <option value="Malakwal">Malakwal</option>
                          <option value="Mamoori">Mamoori</option>
                          <option value="Mailsi">Mailsi</option>
                          <option value="Mandi Bahauddin">
                            Mandi Bahauddin
                          </option>
                          <option value="Mian Channu">Mian Channu</option>
                          <option value="Mianwali">Mianwali</option>
                          <option value="Multan">Multan</option>
                          <option value="Murree">Murree</option>
                          <option value="Muridke">Muridke</option>
                          <option value="Mianwali Bangla">
                            Mianwali Bangla
                          </option>
                          <option value="Muzaffargarh">Muzaffargarh</option>
                          <option value="Narowal">Narowal</option>
                          <option value="Nankana Sahib">Nankana Sahib</option>
                          <option value="Okara">Okara</option>
                          <option value="Renala Khurd">Renala Khurd</option>
                          <option value="Pakpattan">Pakpattan</option>
                          <option value="Pattoki">Pattoki</option>
                          <option value="Pir Mahal">Pir Mahal</option>
                          <option value="Qaimpur">Qaimpur</option>
                          <option value="Qila Didar Singh">
                            Qila Didar Singh
                          </option>
                          <option value="Rabwah">Rabwah</option>
                          <option value="Raiwind">Raiwind</option>
                          <option value="Rajanpur">Rajanpur</option>
                          <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                          <option value="Sadiqabad">Sadiqabad</option>
                          <option value="Safdarabad">Safdarabad</option>
                          <option value="Sahiwal">Sahiwal</option>
                          <option value="Sangla Hill">Sangla Hill</option>
                          <option value="Sarai Alamgir">Sarai Alamgir</option>
                          <option value="Sargodha">Sargodha</option>
                          <option value="Shakargarh">Shakargarh</option>
                          <option value="Sheikhupura">Sheikhupura</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Sohawa">Sohawa</option>
                          <option value="Soianwala">Soianwala</option>
                          <option value="Siranwali">Siranwali</option>
                          <option value="Talagang">Talagang</option>
                          <option value="Taxila">Taxila</option>
                          <option value="Toba Tek Singh">Toba Tek Singh</option>
                          <option value="Vehari">Vehari</option>
                          <option value="Wah Cantonment">Wah Cantonment</option>
                          <option value="Wazirabad">Wazirabad</option>
                          <option
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Sindh Cities
                          </option>
                          <option value="Badin">Badin</option>
                          <option value="Bhirkan">Bhirkan</option>
                          <option value="Rajo Khanani">Rajo Khanani</option>
                          <option value="Chak">Chak</option>
                          <option value="Dadu">Dadu</option>
                          <option value="Digri">Digri</option>
                          <option value="Diplo">Diplo</option>
                          <option value="Dokri">Dokri</option>
                          <option value="Ghotki">Ghotki</option>
                          <option value="Haala">Haala</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Islamkot">Islamkot</option>
                          <option value="Jacobabad">Jacobabad</option>
                          <option value="Jamshoro">Jamshoro</option>
                          <option value="Jungshahi">Jungshahi</option>
                          <option value="Kandhkot">Kandhkot</option>
                          <option value="Kandiaro">Kandiaro</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Kashmore">Kashmore</option>
                          <option value="Keti Bandar">Keti Bandar</option>
                          <option value="Khairpur">Khairpur</option>
                          <option value="Kotri">Kotri</option>
                          <option value="Larkana">Larkana</option>
                          <option value="Matiari">Matiari</option>
                          <option value="Mehar">Mehar</option>
                          <option value="Mirpur Khas">Mirpur Khas</option>
                          <option value="Mithani">Mithani</option>
                          <option value="Mithi">Mithi</option>
                          <option value="Mehrabpur">Mehrabpur</option>
                          <option value="Moro">Moro</option>
                          <option value="Nagarparkar">Nagarparkar</option>
                          <option value="Naudero">Naudero</option>
                          <option value="Naushahro Feroze">
                            Naushahro Feroze
                          </option>
                          <option value="Naushara">Naushara</option>
                          <option value="Nawabshah">Nawabshah</option>
                          <option value="Nazimabad">Nazimabad</option>
                          <option value="Qambar">Qambar</option>
                          <option value="Qasimabad">Qasimabad</option>
                          <option value="Ranipur">Ranipur</option>
                          <option value="Ratodero">Ratodero</option>
                          <option value="Rohri">Rohri</option>
                          <option value="Sakrand">Sakrand</option>
                          <option value="Sanghar">Sanghar</option>
                          <option value="Shahbandar">Shahbandar</option>
                          <option value="Shahdadkot">Shahdadkot</option>
                          <option value="Shahdadpur">Shahdadpur</option>
                          <option value="Shahpur Chakar">Shahpur Chakar</option>
                          <option value="Shikarpaur">Shikarpaur</option>
                          <option value="Sukkur">Sukkur</option>
                          <option value="Tangwani">Tangwani</option>
                          <option value="Tando Adam Khan">
                            Tando Adam Khan
                          </option>
                          <option value="Tando Allahyar">Tando Allahyar</option>
                          <option value="Tando Muhammad Khan">
                            Tando Muhammad Khan
                          </option>
                          <option value="Thatta">Thatta</option>
                          <option value="Umerkot">Umerkot</option>
                          <option value="Warah">Warah</option>
                          <option
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Khyber Cities
                          </option>
                          <option value="Abbottabad">Abbottabad</option>
                          <option value="Adezai">Adezai</option>
                          <option value="Alpuri">Alpuri</option>
                          <option value="Akora Khattak">Akora Khattak</option>
                          <option value="Ayubia">Ayubia</option>
                          <option value="Banda Daud Shah">
                            Banda Daud Shah
                          </option>
                          <option value="Bannu">Bannu</option>
                          <option value="Batkhela">Batkhela</option>
                          <option value="Battagram">Battagram</option>
                          <option value="Birote">Birote</option>
                          <option value="Chakdara">Chakdara</option>
                          <option value="Charsadda">Charsadda</option>
                          <option value="Chitral">Chitral</option>
                          <option value="Daggar">Daggar</option>
                          <option value="Dargai">Dargai</option>
                          <option value="Darya Khan">Darya Khan</option>
                          <option value="Dera Ismail Khan">
                            Dera Ismail Khan
                          </option>
                          <option value="Doaba">Doaba</option>
                          <option value="Dir">Dir</option>
                          <option value="Drosh">Drosh</option>
                          <option value="Hangu">Hangu</option>
                          <option value="Haripur">Haripur</option>
                          <option value="Karak">Karak</option>
                          <option value="Kohat">Kohat</option>
                          <option value="Kulachi">Kulachi</option>
                          <option value="Lakki Marwat">Lakki Marwat</option>
                          <option value="Latamber">Latamber</option>
                          <option value="Madyan">Madyan</option>
                          <option value="Mansehra">Mansehra</option>
                          <option value="Mardan">Mardan</option>
                          <option value="Mastuj">Mastuj</option>
                          <option value="Mingora">Mingora</option>
                          <option value="Nowshera">Nowshera</option>
                          <option value="Paharpur">Paharpur</option>
                          <option value="Pabbi">Pabbi</option>
                          <option value="Peshawar">Peshawar</option>
                          <option value="Saidu Sharif">Saidu Sharif</option>
                          <option value="Shorkot">Shorkot</option>
                          <option value="Shewa Adda">Shewa Adda</option>
                          <option value="Swabi">Swabi</option>
                          <option value="Swat">Swat</option>
                          <option value="Tangi">Tangi</option>
                          <option value="Tank">Tank</option>
                          <option value="Thall">Thall</option>
                          <option value="Timergara">Timergara</option>
                          <option value="Tordher">Tordher</option>
                          <option
                            value=""
                            disabled
                            style={{ fontWeight: "bold" }}
                          >
                            Balochistan Cities
                          </option>
                          <option value="Awaran">Awaran</option>
                          <option value="Barkhan">Barkhan</option>
                          <option value="Chagai">Chagai</option>
                          <option value="Dera Bugti">Dera Bugti</option>
                          <option value="Gwadar">Gwadar</option>
                          <option value="Harnai">Harnai</option>
                          <option value="Jafarabad">Jafarabad</option>
                          <option value="Jhal Magsi">Jhal Magsi</option>
                          <option value="Kacchi">Kacchi</option>
                          <option value="Kalat">Kalat</option>
                          <option value="Kech">Kech</option>
                          <option value="Kharan">Kharan</option>
                          <option value="Khuzdar">Khuzdar</option>
                          <option value="Killa Abdullah">Killa Abdullah</option>
                          <option value="Killa Saifullah">
                            Killa Saifullah
                          </option>
                          <option value="Kohlu">Kohlu</option>
                          <option value="Lasbela">Lasbela</option>
                          <option value="Lehri">Lehri</option>
                          <option value="Loralai">Loralai</option>
                          <option value="Mastung">Mastung</option>
                          <option value="Musakhel">Musakhel</option>
                          <option value="Nasirabad">Nasirabad</option>
                          <option value="Nushki">Nushki</option>
                          <option value="Panjgur">Panjgur</option>
                          <option value="Pishin Valley">Pishin Valley</option>
                          <option value="Quetta">Quetta</option>
                          <option value="Sherani">Sherani</option>
                          <option value="Sibi">Sibi</option>
                          <option value="Sohbatpur">Sohbatpur</option>
                          <option value="Washuk">Washuk</option>
                          <option value="Zhob">Zhob</option>
                          <option value="Ziarat">Ziarat</option>
                        </optgroup>
                      </select>
                      <select
                        onChange={genderfilter}
                        style={{
                          background: "rgba(0,28,51,0.38)",
                          color: "rgb(255,255,255)",
                          padding: "10px",
                          fontFamily: "Montserrat, sans-serif",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          borderStyle: "solid",
                          borderColor: "rgb(255,255,255)",
                          marginRight: "5px",
                          marginLeft: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        <option value="" selected="">
                          Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <select
                        onChange={noofexpfilter}
                        style={{
                          background: "rgba(0,28,51,0.38)",
                          color: "rgb(255,255,255)",
                          padding: "10px",
                          fontFamily: "Montserrat, sans-serif",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          borderStyle: "solid",
                          borderColor: "rgb(255,255,255)",
                          marginRight: "5px",
                          marginLeft: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        {/* <option value="12" selected="">
                        Experience
                      </option>
                      <option value="13">5 Years</option>
                      <option value="14">10+ Years</option> */}
                        {noofexperience.map((exp) => (
                          <option key={exp} value={exp}>
                            {exp}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    className="row d-xl-flex justify-content-xl-center"
                    id="appliedfilter"
                  >
                    <div
                      className="col d-xl-flex justify-content-xl-center"
                      style={{ marginTop: "25px", fontSize: "25px" }}
                    >
                      <button
                        className={`btn btn-primary ${styles.btnappfil}`}
                        type="button"
                        onClick={handlefilters}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </header>
          <div>
            <marquee
              bgcolor="#e20b0b"
              style={{
                color: "#FED136",
                fontSize: "25px",
                fontWeight: "bolder",
                padding: "5px",
                lineHeight: "150%",
                textShadow: "#000000 0px 0px 0px",
              }}
              behavior="smooth"
              direction="left"
              onmouseover="this.stop();"
              onmouseout="this.start();"
            >
              Athletistan do not deal with payments and not responsible for any
              kind of financial and physical loss. In case of any issue with the
              Coach, athlete can fill the "Report a Coach" form. Only those
              athletes having final performance percentage greater than 80% as
              per evaluation report will be recommended to Pakistan Olympics
              Association after the successful commencement of training.
            </marquee>
          </div>
          <section
            id="Coaches"
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
                    <strong>Available coaches in pakistan</strong>
                  </h1>
                </div>
              </div>
              {/* {mess ? <p style={{ color: "red" }}>{mess}</p> : null} */}
              {coachdata.length > 0 ? (
                <div className="row" style={{ paddingTop: "50px" }}>
                  <div
                    className="col d-flex d-xl-flex justify-content-center justify-content-xl-center"
                    style={{ flexWrap: "wrap", marginBottom: "10px" }}
                  >
                    {coachdata.map((cd) => {
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
                            minWidth: " 280px",
                            maxWidth: "300px",
                            marginBottom: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "200px",
                              background: `url(${cd.dp}) center / contain no-repeat`,

                              // `url(${d.rimage})`
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                            }}
                          ></div>
                          <div
                            className={`${styles.cardbody} d-flex flex-column`}
                            style={{ height: "210px" }}
                          >
                            <div>
                              <h4
                                style={{
                                  fontFamily: "Source Sans Pro, sans-serif",
                                  fontWeight: "700",
                                  color: "rgb(255,160,0)",
                                }}
                              >
                                {cd.name}
                              </h4>
                              <h6
                                className="text-muted mb-2"
                                style={{
                                  fontFamily: "Source Sans Pro, sans-serif",
                                  fontWeight: "600",
                                  color: "#757575",
                                }}
                              >
                                {cd.city}, {cd.country}
                              </h6>
                              <p
                                style={{
                                  fontFamily: "Source Sans Pro, sans-serif",
                                  color: "#212121",
                                  marginTop: "16px",
                                }}
                              >
                                Age: {cd.age}
                                <br />
                                Gender: {cd.gender}
                              </p>
                            </div>
                            <a
                              className="card-link align-self-end"
                              data-bss-hover-animate="pulse"
                              style={{
                                padding: "4px",
                                background: "#b86868",
                                color: "rgb(255,255,255)",
                                borderRadius: "17px",
                                paddingRight: "14px",
                                paddingLeft: "14px",
                                paddingBottom: "6px",
                                fontFamily: "Source Sans Pro, sans-serif",
                                marginTop: "auto",
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#modal1"
                              onClick={() =>
                                handleCoach(
                                  cd._id,
                                  cd.name,
                                  cd.areaofinterest,
                                  cd.trainingweeks,
                                  cd.startdate,
                                  cd.availabledays,
                                  cd.areaofinterest
                                )
                              }
                            >
                              Details
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row" style={{ paddingTop: "50px" }}>
                    <div className="col">
                      <h2
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          textAlign: "center",
                          color: "rgb(180,180,180)",
                          fontWeight: "normal",
                          lineHeight: "1.2",
                        }}
                      >
                        <strong>Sorry, No Coach Found</strong>
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <div
            // className={showdetails && `${styles.modal} fade`}
            className={`${styles.modal} ${showdetails && `${styles.show}`}`}
            role="dialog"
            tabindex="-1"
            id="modal1"
          >
            <div
              style={{ minWidth: "1200px", maxWidth: "1140px" }}
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              {coachdetails.map((cd) => {
                return (
                  <div className="modal-content">
                    <div
                      className={`${styles.modalheader}`}
                      style={{ backgroundColor: "#001c33", color: "white" }}
                    >
                      <h4 className={`${styles.modaltitle}`}>
                        Coach Details
                        <br />
                      </h4>
                      <button
                        style={{
                          backgroundColor: "#001c33",
                          borderColor: "#001c33",
                          color: "white",
                        }}
                        type="button"
                        onClick={handleclose}
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        X
                      </button>
                    </div>
                    <div className={`${styles.modalbody}`}>
                      <div>
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
                                <p>{cd.name}</p>
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
                                <p>{cd.age}</p>
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
                                <p>{cd.city}</p>
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
                                <p>{cd.gender}</p>
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
                                  <strong>Sport</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <p>{cd.areaofinterest}</p>
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
                                  <strong>Training Duration</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <p>{cd.trainingweeks} weeks</p>
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
                                <p>{cd.noofexp}</p>
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
                                  <strong>Fee</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <p>{cd.expfee}</p>
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
                                  <strong>Available Days</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              {cd.availabledays.map((ad) => {
                                return (
                                  <p style={{ marginLeft: "10px" }}>*{ad}*</p>
                                );
                              })}
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
                                  <strong>Description</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <p>{cd.desc}</p>
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
                                  <strong>Start Date</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <p>{cd.startdate.substr(0, 10)}</p>
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
                                  <strong>Available Time Slots</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="row">
                                <select
                                  onChange={handletrainingtimeslot}
                                  label="select"
                                  style={{
                                    marginLeft: "22px",

                                    width: "250px",
                                    height: "30px",
                                  }}
                                >
                                  <option value="" selected="">
                                    Select your Time Slot
                                  </option>
                                  {cd.timeslots.map((ts) => (
                                    <option key={ts} value={ts}>
                                      {ts}
                                    </option>
                                  ))}
                                </select>
                                {/* <select
                          name="trainingtimeslot"
                          onChange={handletrainingtimeslot}
                          className={`${styles.formselect}`}
                          style={{ height: "37.1875px", marginTop: "-1px" }}
                        >
                          <option value="" selected="">
                            Select your Time Slot
                          </option>
                          <option value="06:00-09:00">06:00-09:00</option>
                          <option value="09:00-12:00">09:00-12:00</option>
                          <option value="12:00-15:00">12:00-15:00</option>
                          <option value="15:00-18:00">15:00-18:00</option>
                          <option value="18:00-21:00">18:00-21:00</option>
                          <option value="21:00-00:00">21:00-00:00</option>
                        </select> */}
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
                                  <strong>Training Outline</strong>
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <textarea
                                  disabled="true"
                                  id="signature-1"
                                  rows="4"
                                  name="signature"
                                  style={{ width: "100%" }}
                                >
                                  {cd.desc}
                                </textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles.modalfooter}`}>
                      <button
                        className="btn btn-light"
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={handleclose}
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
                      <button
                        disabled={
                          alldetails?.trainingtimeslot === "" ? true : false
                        }
                        className="btn btn-primary"
                        type="button"
                        data-bs-dismiss="modal"
                        data-bs-target="#modal-2"
                        data-bs-toggle="modal"
                        // onClick={() => setshowconfirmation(true)}
                        onClick={() =>
                          handlebutton(
                            cd.startdate,
                            cd.trainingweeks,
                            cd.expfee,
                            cd.dp
                          )
                        }
                        style={{
                          marginRight: "5px",
                          marginLeft: "5px",
                          background: "#36B3A7",
                          borderColor: "#36B3A7",
                          color: "#fff",
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
                            "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;border-width: 0px",
                        }}
                      >
                        <i className="fa fa-check"></i>
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`${styles.modal} ${
              showconfirmation && `${styles.show}`
            }`}
            role="dialog"
            tabindex="-1"
            id="modal-2"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div
                  className={`${styles.modalheader}`}
                  style={{ backgroundColor: "#001c33", color: "white" }}
                >
                  <h4 className={`${styles.modaltitle}`}>Confirmation</h4>
                  <button
                    onClick={() => setshowconfirmation(false)}
                    style={{
                      backgroundColor: "#001c33",
                      borderColor: "#001c33",
                      color: "white",
                    }}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    X
                  </button>
                </div>
                <div className="modal-body">
                  <p style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Are you sure you want to send a training request to this
                    coach?
                  </p>
                </div>
                <div className={`${styles.modalfooter}`}>
                  <button
                    className="btn btn-light"
                    onClick={() => setshowconfirmation(false)}
                    type="button"
                    data-bs-dismiss="modal"
                    style={{
                      background: "rgb(242,242,242)",
                      fontFamily:
                        "&quot,Montserrat&quot,,&quot,Helvetica Neue&quot,Helvetica,Arial,sans-serif",
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
                    className="btn btn-primary"
                    type="button"
                    style={{
                      background: "#36B3A7",
                      color: "#fff",
                      fontFamily:
                        "&quot,Montserrat&quot,&quot,Helvetica Neue&quot,Helvetica,Arial,sans-serif",
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
          <section id="choicecoach" style={{ background: "#f8f9fa" }}>
            <div className="container">
              <div
                className="row"
                style={{
                  padding: "80px",
                  background: "url(requestcoach.jpg) no-repeat, #001C33",
                  borderRadius: "11px",
                  backgroundSize: "cover, auto",
                }}
              >
                <div className="col">
                  <div className="row" style={{ height: "160px" }}>
                    <div className="col">
                      <h1
                        style={{
                          textAlign: "center",
                          color: "rgb(255,255,255)",
                          letterSpacing: "2px",
                          lineHeight: "55px",
                        }}
                      >
                        <strong>Didn't find a coach of your choice?</strong>
                        <br />
                        You don't need to worry.
                        <br />
                        <br />
                        <br />
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col d-xl-flex justify-content-xl-center">
                      <button
                        onClick={handlerequest}
                        className={`btn btn-primary ${styles.btncoachchoice}`}
                        type="button"
                        data-bs-target="#modal-3"
                        data-bs-toggle="modal"
                      >
                        Click here to send your personalized request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            className={`${styles.modal} ${showform && `${styles.show}`}`}
            role="dialog"
            tabindex="-1"
            id="modal-3"
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered "
              role="document"
            >
              <div className="modal-content">
                <div
                  className={`${styles.modalheader}`}
                  style={{ backgroundColor: "#001c33", color: "white" }}
                >
                  <h4 className={`${styles.modaltitle}`}>
                    Customize training plan
                  </h4>
                  <button
                    onClick={() => setshowform(false)}
                    style={{
                      backgroundColor: "#001c33",
                      color: "white",
                      borderColor: "#001c33",
                    }}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    X
                  </button>
                </div>
                <div className={`${styles.modalbody}`}>
                  <form>
                    <div className="row">
                      <div className="col">
                        <div className={`form-group ${styles.mb3}`}>
                          <label className={`${styles.formlabel}`} for="name">
                            <strong>Sport</strong>
                          </label>
                          <select
                            name="sportname"
                            onChange={handledata}
                            className={`${styles.formselect}`}
                            style={{ height: "37.1875px", marginTop: "-1px" }}
                          >
                            {sportsname.map((names) => (
                              <option key={names} value={names}>
                                {names}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className={`form-group ${styles.mb3}`}>
                          <label className={`${styles.formlabel}`} for="email">
                            <strong>City</strong>
                          </label>
                          <select
                            name="athletecity"
                            onChange={handledata}
                            className={`${styles.formselect}`}
                            style={{ height: "37.1875px", marginTop: "-1px" }}
                          >
                            <optgroup key="city">
                              <option value="" style={{ fontWeight: "bold" }}>
                                Select The City
                              </option>
                              <option value="Islamabad">Islamabad</option>
                              <option
                                value=""
                                disabled
                                style={{ fontWeight: "bold" }}
                              >
                                Punjab Cities
                              </option>
                              <option value="Ahmed Nager Chatha">
                                Ahmed Nager Chatha
                              </option>
                              <option value="Ahmadpur East">
                                Ahmadpur East
                              </option>
                              <option value="Ali Khan Abad">
                                Ali Khan Abad
                              </option>
                              <option value="Alipur">Alipur</option>
                              <option value="Arifwala">Arifwala</option>
                              <option value="Attock">Attock</option>
                              <option value="Bhera">Bhera</option>
                              <option value="Bhalwal">Bhalwal</option>
                              <option value="Bahawalnagar">Bahawalnagar</option>
                              <option value="Bahawalpur">Bahawalpur</option>
                              <option value="Bhakkar">Bhakkar</option>
                              <option value="Burewala">Burewala</option>
                              <option value="Chillianwala">Chillianwala</option>
                              <option value="Chakwal">Chakwal</option>
                              <option value="Chichawatni">Chichawatni</option>
                              <option value="Chiniot">Chiniot</option>
                              <option value="Chishtian">Chishtian</option>
                              <option value="Daska">Daska</option>
                              <option value="Darya Khan">Darya Khan</option>
                              <option value="Dera Ghazi Khan">
                                Dera Ghazi Khan
                              </option>
                              <option value="Dhaular">Dhaular</option>
                              <option value="Dina">Dina</option>
                              <option value="Dinga">Dinga</option>
                              <option value="Dipalpur">Dipalpur</option>
                              <option value="Faisalabad">Faisalabad</option>
                              <option value="Ferozewala">Ferozewala</option>
                              <option value="Fateh Jhang">Fateh Jang</option>
                              <option value="Ghakhar Mandi">
                                Ghakhar Mandi
                              </option>
                              <option value="Gojra">Gojra</option>
                              <option value="Gujranwala">Gujranwala</option>
                              <option value="Gujrat">Gujrat</option>
                              <option value="Gujar Khan">Gujar Khan</option>
                              <option value="Hafizabad">Hafizabad</option>
                              <option value="Haroonabad">Haroonabad</option>
                              <option value="Hasilpur">Hasilpur</option>
                              <option value="Haveli Lakha">Haveli Lakha</option>
                              <option value="Jatoi">Jatoi</option>
                              <option value="Jalalpur">Jalalpur</option>
                              <option value="Jattan">Jattan</option>
                              <option value="Jampur">Jampur</option>
                              <option value="Jaranwala">Jaranwala</option>
                              <option value="Jhang">Jhang</option>
                              <option value="Jhelum">Jhelum</option>
                              <option value="Kalabagh">Kalabagh</option>
                              <option value="Karor Lal Esan">
                                Karor Lal Esan
                              </option>
                              <option value="Kasur">Kasur</option>
                              <option value="Kamalia">Kamalia</option>
                              <option value="Kamoke">Kamoke</option>
                              <option value="Khanewal">Khanewal</option>
                              <option value="Khanpur">Khanpur</option>
                              <option value="Kharian">Kharian</option>
                              <option value="Khushab">Khushab</option>
                              <option value="Kot Addu">Kot Addu</option>
                              <option value="Jauharabad">Jauharabad</option>
                              <option value="Lahore">Lahore</option>
                              <option value="Lalamusa">Lalamusa</option>
                              <option value="Layyah">Layyah</option>
                              <option value="Liaquat Pur">Liaquat Pur</option>
                              <option value="Lodhran">Lodhran</option>
                              <option value="Malakwal">Malakwal</option>
                              <option value="Mamoori">Mamoori</option>
                              <option value="Mailsi">Mailsi</option>
                              <option value="Mandi Bahauddin">
                                Mandi Bahauddin
                              </option>
                              <option value="Mian Channu">Mian Channu</option>
                              <option value="Mianwali">Mianwali</option>
                              <option value="Multan">Multan</option>
                              <option value="Murree">Murree</option>
                              <option value="Muridke">Muridke</option>
                              <option value="Mianwali Bangla">
                                Mianwali Bangla
                              </option>
                              <option value="Muzaffargarh">Muzaffargarh</option>
                              <option value="Narowal">Narowal</option>
                              <option value="Nankana Sahib">
                                Nankana Sahib
                              </option>
                              <option value="Okara">Okara</option>
                              <option value="Renala Khurd">Renala Khurd</option>
                              <option value="Pakpattan">Pakpattan</option>
                              <option value="Pattoki">Pattoki</option>
                              <option value="Pir Mahal">Pir Mahal</option>
                              <option value="Qaimpur">Qaimpur</option>
                              <option value="Qila Didar Singh">
                                Qila Didar Singh
                              </option>
                              <option value="Rabwah">Rabwah</option>
                              <option value="Raiwind">Raiwind</option>
                              <option value="Rajanpur">Rajanpur</option>
                              <option value="Rahim Yar Khan">
                                Rahim Yar Khan
                              </option>
                              <option value="Rawalpindi">Rawalpindi</option>
                              <option value="Sadiqabad">Sadiqabad</option>
                              <option value="Safdarabad">Safdarabad</option>
                              <option value="Sahiwal">Sahiwal</option>
                              <option value="Sangla Hill">Sangla Hill</option>
                              <option value="Sarai Alamgir">
                                Sarai Alamgir
                              </option>
                              <option value="Sargodha">Sargodha</option>
                              <option value="Shakargarh">Shakargarh</option>
                              <option value="Sheikhupura">Sheikhupura</option>
                              <option value="Sialkot">Sialkot</option>
                              <option value="Sohawa">Sohawa</option>
                              <option value="Soianwala">Soianwala</option>
                              <option value="Siranwali">Siranwali</option>
                              <option value="Talagang">Talagang</option>
                              <option value="Taxila">Taxila</option>
                              <option value="Toba Tek Singh">
                                Toba Tek Singh
                              </option>
                              <option value="Vehari">Vehari</option>
                              <option value="Wah Cantonment">
                                Wah Cantonment
                              </option>
                              <option value="Wazirabad">Wazirabad</option>
                              <option
                                value=""
                                disabled
                                style={{ fontWeight: "bold" }}
                              >
                                Sindh Cities
                              </option>
                              <option value="Badin">Badin</option>
                              <option value="Bhirkan">Bhirkan</option>
                              <option value="Rajo Khanani">Rajo Khanani</option>
                              <option value="Chak">Chak</option>
                              <option value="Dadu">Dadu</option>
                              <option value="Digri">Digri</option>
                              <option value="Diplo">Diplo</option>
                              <option value="Dokri">Dokri</option>
                              <option value="Ghotki">Ghotki</option>
                              <option value="Haala">Haala</option>
                              <option value="Hyderabad">Hyderabad</option>
                              <option value="Islamkot">Islamkot</option>
                              <option value="Jacobabad">Jacobabad</option>
                              <option value="Jamshoro">Jamshoro</option>
                              <option value="Jungshahi">Jungshahi</option>
                              <option value="Kandhkot">Kandhkot</option>
                              <option value="Kandiaro">Kandiaro</option>
                              <option value="Karachi">Karachi</option>
                              <option value="Kashmore">Kashmore</option>
                              <option value="Keti Bandar">Keti Bandar</option>
                              <option value="Khairpur">Khairpur</option>
                              <option value="Kotri">Kotri</option>
                              <option value="Larkana">Larkana</option>
                              <option value="Matiari">Matiari</option>
                              <option value="Mehar">Mehar</option>
                              <option value="Mirpur Khas">Mirpur Khas</option>
                              <option value="Mithani">Mithani</option>
                              <option value="Mithi">Mithi</option>
                              <option value="Mehrabpur">Mehrabpur</option>
                              <option value="Moro">Moro</option>
                              <option value="Nagarparkar">Nagarparkar</option>
                              <option value="Naudero">Naudero</option>
                              <option value="Naushahro Feroze">
                                Naushahro Feroze
                              </option>
                              <option value="Naushara">Naushara</option>
                              <option value="Nawabshah">Nawabshah</option>
                              <option value="Nazimabad">Nazimabad</option>
                              <option value="Qambar">Qambar</option>
                              <option value="Qasimabad">Qasimabad</option>
                              <option value="Ranipur">Ranipur</option>
                              <option value="Ratodero">Ratodero</option>
                              <option value="Rohri">Rohri</option>
                              <option value="Sakrand">Sakrand</option>
                              <option value="Sanghar">Sanghar</option>
                              <option value="Shahbandar">Shahbandar</option>
                              <option value="Shahdadkot">Shahdadkot</option>
                              <option value="Shahdadpur">Shahdadpur</option>
                              <option value="Shahpur Chakar">
                                Shahpur Chakar
                              </option>
                              <option value="Shikarpaur">Shikarpaur</option>
                              <option value="Sukkur">Sukkur</option>
                              <option value="Tangwani">Tangwani</option>
                              <option value="Tando Adam Khan">
                                Tando Adam Khan
                              </option>
                              <option value="Tando Allahyar">
                                Tando Allahyar
                              </option>
                              <option value="Tando Muhammad Khan">
                                Tando Muhammad Khan
                              </option>
                              <option value="Thatta">Thatta</option>
                              <option value="Umerkot">Umerkot</option>
                              <option value="Warah">Warah</option>
                              <option
                                value=""
                                disabled
                                style={{ fontWeight: "bold" }}
                              >
                                Khyber Cities
                              </option>
                              <option value="Abbottabad">Abbottabad</option>
                              <option value="Adezai">Adezai</option>
                              <option value="Alpuri">Alpuri</option>
                              <option value="Akora Khattak">
                                Akora Khattak
                              </option>
                              <option value="Ayubia">Ayubia</option>
                              <option value="Banda Daud Shah">
                                Banda Daud Shah
                              </option>
                              <option value="Bannu">Bannu</option>
                              <option value="Batkhela">Batkhela</option>
                              <option value="Battagram">Battagram</option>
                              <option value="Birote">Birote</option>
                              <option value="Chakdara">Chakdara</option>
                              <option value="Charsadda">Charsadda</option>
                              <option value="Chitral">Chitral</option>
                              <option value="Daggar">Daggar</option>
                              <option value="Dargai">Dargai</option>
                              <option value="Darya Khan">Darya Khan</option>
                              <option value="Dera Ismail Khan">
                                Dera Ismail Khan
                              </option>
                              <option value="Doaba">Doaba</option>
                              <option value="Dir">Dir</option>
                              <option value="Drosh">Drosh</option>
                              <option value="Hangu">Hangu</option>
                              <option value="Haripur">Haripur</option>
                              <option value="Karak">Karak</option>
                              <option value="Kohat">Kohat</option>
                              <option value="Kulachi">Kulachi</option>
                              <option value="Lakki Marwat">Lakki Marwat</option>
                              <option value="Latamber">Latamber</option>
                              <option value="Madyan">Madyan</option>
                              <option value="Mansehra">Mansehra</option>
                              <option value="Mardan">Mardan</option>
                              <option value="Mastuj">Mastuj</option>
                              <option value="Mingora">Mingora</option>
                              <option value="Nowshera">Nowshera</option>
                              <option value="Paharpur">Paharpur</option>
                              <option value="Pabbi">Pabbi</option>
                              <option value="Peshawar">Peshawar</option>
                              <option value="Saidu Sharif">Saidu Sharif</option>
                              <option value="Shorkot">Shorkot</option>
                              <option value="Shewa Adda">Shewa Adda</option>
                              <option value="Swabi">Swabi</option>
                              <option value="Swat">Swat</option>
                              <option value="Tangi">Tangi</option>
                              <option value="Tank">Tank</option>
                              <option value="Thall">Thall</option>
                              <option value="Timergara">Timergara</option>
                              <option value="Tordher">Tordher</option>
                              <option
                                value=""
                                disabled
                                style={{ fontWeight: "bold" }}
                              >
                                Balochistan Cities
                              </option>
                              <option value="Awaran">Awaran</option>
                              <option value="Barkhan">Barkhan</option>
                              <option value="Chagai">Chagai</option>
                              <option value="Dera Bugti">Dera Bugti</option>
                              <option value="Gwadar">Gwadar</option>
                              <option value="Harnai">Harnai</option>
                              <option value="Jafarabad">Jafarabad</option>
                              <option value="Jhal Magsi">Jhal Magsi</option>
                              <option value="Kacchi">Kacchi</option>
                              <option value="Kalat">Kalat</option>
                              <option value="Kech">Kech</option>
                              <option value="Kharan">Kharan</option>
                              <option value="Khuzdar">Khuzdar</option>
                              <option value="Killa Abdullah">
                                Killa Abdullah
                              </option>
                              <option value="Killa Saifullah">
                                Killa Saifullah
                              </option>
                              <option value="Kohlu">Kohlu</option>
                              <option value="Lasbela">Lasbela</option>
                              <option value="Lehri">Lehri</option>
                              <option value="Loralai">Loralai</option>
                              <option value="Mastung">Mastung</option>
                              <option value="Musakhel">Musakhel</option>
                              <option value="Nasirabad">Nasirabad</option>
                              <option value="Nushki">Nushki</option>
                              <option value="Panjgur">Panjgur</option>
                              <option value="Pishin Valley">
                                Pishin Valley
                              </option>
                              <option value="Quetta">Quetta</option>
                              <option value="Sherani">Sherani</option>
                              <option value="Sibi">Sibi</option>
                              <option value="Sohbatpur">Sohbatpur</option>
                              <option value="Washuk">Washuk</option>
                              <option value="Zhob">Zhob</option>
                              <option value="Ziarat">Ziarat</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className={`form-group ${styles.mb3}`}>
                          <label className={`${styles.formlabel}`} for="dob">
                            <strong>No of Training Weeks</strong>
                          </label>
                          <input
                            className={`${styles.formcontrol}`}
                            type="number"
                            name="trainingweeks"
                            onChange={handledata}
                            placeholder="Enter Number of Weeks"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className={`form-group ${styles.mb3}`}>
                          <label className={`${styles.formlabel}`} for="age">
                            <strong>Expected Time Slot</strong>
                          </label>
                          <select
                            name="trainingtimeslot"
                            onChange={handletrainingtimeslot}
                            className={`${styles.formselect}`}
                            style={{ height: "37.1875px", marginTop: "-1px" }}
                          >
                            <option value="" selected="">
                              Select your Time Slot
                            </option>
                            <option value="06:00-09:00">06:00-09:00</option>
                            <option value="09:00-12:00">09:00-12:00</option>
                            <option value="12:00-15:00">12:00-15:00</option>
                            <option value="15:00-18:00">15:00-18:00</option>
                            <option value="18:00-21:00">18:00-21:00</option>
                            <option value="21:00-00:00">21:00-00:00</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className={`form-group ${styles.mb3}`}>
                          <label className={`${styles.formlabel}`} for="gender">
                            <strong>Expected Charges</strong>
                          </label>
                          <input
                            name="athleteexpfee"
                            onChange={handledata}
                            className={`${styles.formcontrol}`}
                            type="number"
                            placeholder="Enter your Expected Salary"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className={`form-group ${styles.mb3}`}>
                          <label
                            className={`${styles.formlabel}`}
                            for="contact"
                          >
                            <strong>Expected Start Date</strong>
                          </label>
                          <input
                            name="trainingstartdate"
                            onChange={handledata}
                            className={`${styles.formcontrol}`}
                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className={`form-group ${styles.mb3}`}>
                          <label
                            className={`${styles.formlabel}`}
                            for="description"
                          >
                            <strong>Add a note to the coach</strong>
                          </label>
                          <textarea
                            name="extranote"
                            onChange={handledata}
                            className={`${styles.formcontrol}`}
                            placeholder="Write a message here if you want to say someting to the coach."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className={`${styles.modalfooter}`}>
                  <button
                    onClick={() => setshowform(false)}
                    className="btn btn-light"
                    type="button"
                    data-bs-dismiss="modal"
                    style={{
                      background: "rgb(242,242,242)",
                      fontFamily:
                        "&quot,Montserrat&quot,&quot,Helvetica Neue&quot,Helvetica,Arial,sans-serif",
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
                    Cancel
                  </button>
                  <button
                    onClick={handlecussubmit}
                    disabled={
                      alldetails?.sportname === "" ||
                      alldetails?.athletecity === "" ||
                      alldetails?.trainingweeks === "" ||
                      alldetails?.trainingtimeslot === "" ||
                      alldetails?.athleteexpfee === "" ||
                      alldetails?.trainingstartdate === ""
                        ? true
                        : false
                    }
                    className="btn btn-primary"
                    type="button"
                    style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                      background: "#36B3A7",
                      color: "#fff",
                      fontFamily:
                        "&quot,Montserrat&quot,&quot,Helvetica Neue&quot,Helvetica,Arial,sans-serif",
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
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles.modal} ${
              showconfirmation1 && `${styles.show}`
            }`}
            role="dialog"
            tabindex="-1"
            id="confirmation"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div
                  className={`${styles.modalheader}`}
                  style={{ backgroundColor: "#001c33", color: "white" }}
                >
                  <h4 className={`${styles.modaltitle}`}>Confirmation</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className={`${styles.modalbody}`}>
                  <p style={{ color: "rgb(0,0,0)" }}>
                    Are you sure you want to send request with these details?
                    <br />
                  </p>
                </div>
                <div className={`${styles.modalfooter}`}>
                  <button
                    onClick={() => setshowconfirmation1(false)}
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
                    onClick={handleSubmit}
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

          <footer
            className="d-xl-flex justify-content-xl-center align-items-xl-center"
            style={{
              height: "90px",
              marginTop: "100px",
              background: "#001c33",
            }}
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
  } else {
    return alert("You are not allowed to access this page");
  }
};

export default Searchacoach;
