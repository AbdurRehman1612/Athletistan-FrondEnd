import { React, useState, useEffect } from "react";
import { LOGOUT } from "../../../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import validator from "validator";
import { changepassword, updateprofiledata } from "../../../actions/dashboard";
import "./style.css";
import Input from "./Input";

const MyProfile = () => {
  const getdata = (e) => {
    e.preventDefault();
    if (
      resetprofile?.email === "" &&
      resetprofile?.name === "" &&
      resetprofile?.dateofbirth === "" &&
      resetprofile?.age === "" &&
      resetprofile?.contactno === "" &&
      resetprofile?.address === "" &&
      resetprofile?.city === "" &&
      resetprofile?.nic === "" &&
      resetprofile?.description === "" &&
      resetprofile?.noexp === ""
    ) {
      alert("Cannot proceed further. Please fill the empty fields");
    } else {
      dispatch(updateprofiledata(resetprofile, history));
      alert("Profile updated successfully!");
    }
  };

  const noofexperience = [
    "Less than 1 year",
    "1 to 3 years",
    "3 to 5 years",
    "5 to 10",
    "10 or more",
  ];
  const id = useSelector((state) => state.auth?.authData?.result?._id);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [wp, setwp] = useState(false);
  const [e, sete] = useState(false);
  const updatedpass = {
    oldpassword: "",
    newpassword: "",
    retypenewpassword: "",
    acctype: useSelector((state) => state.auth?.authData?.result?.accounttype),
    id: id,
  };

  // const [selectedFile, setSelectedFile] = useState(
  //   "assets/img/dogs/image2.jpeg"
  // );

  const accounttype = useSelector(
    (state) => state.auth?.authData?.result?.accounttype
  );
  const mess = useSelector((state) => state.dashboardReducer?.error);
  const [toggle, setToggle] = useState(false);
  const noexp = useSelector((state) => state.auth?.authData?.result?.noofexp);
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const email = useSelector((state) => state.auth?.authData?.result?.email);
  const dob = useSelector((state) => state.auth?.authData?.result?.dateofbirth);
  const age = useSelector((state) => state.auth?.authData?.result?.age);
  const gender = useSelector((state) => state.auth?.authData?.result?.gender);
  const contactno = useSelector(
    (state) => state.auth?.authData?.result?.contactno
  );
  const address = useSelector((state) => state.auth?.authData?.result?.address);
  const country = useSelector((state) => state.auth?.authData?.result?.country);
  const city = useSelector((state) => state.auth?.authData?.result?.city);
  const desc = useSelector((state) => state.auth?.authData?.result?.desc);
  const nic = useSelector((state) => state.auth?.authData?.result?.nic);
  const areaofinterest = useSelector(
    (state) => state.auth?.authData?.result?.areaofinterest
  );
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);

  const changeHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        // setSelectedFile(reader.result);
        setresetprofile({ ...resetprofile, image: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateprofile = {
    image: dp,
    acctype: accounttype,
    id: id,
    email: email,
    name: name,
    dateofbirth: dob,
    age: age,
    contactno: contactno,
    address: address,
    city: city,
    nic: nic,
    description: desc,
    noofexp: noexp,
  };

  // const data = useSelector(
  //   (state) => state.dashboardReducer?.getmyprofdata?.result
  // );
  //

  const history = useHistory();
  const dispatch = useDispatch();

  const [bol, setbol] = useState(false);
  const [resetpass, setresetpass] = useState(updatedpass);
  const [resetprofile, setresetprofile] = useState(updateprofile);

  const handlechange = (e) => {
    setresetpass({ ...resetpass, [e.target.name]: e.target.value });

    if (resetpass?.newpassword !== "") {
      validate(resetpass?.newpassword);
    }
  };

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Strong Password");
      setwp(false);
    } else {
      setErrorMessage(
        "Weak Password (Must contain capital and small letters with a number and a symbol)"
      );
      setwp(true);
    }
  };

  const handleChange = (e) => {
    setresetprofile({ ...resetprofile, [e.target.name]: e.target.value });
    if (resetprofile?.email.length > 0) {
      validateEmail(resetprofile?.email);
    }
  };

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setEmailError("");
      sete(false);
    } else {
      setEmailError("Email is not valid");
      sete(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      resetpass?.oldpassword === "" &&
      resetpass?.newpassword === "" &&
      resetpass?.retypenewpassword === ""
    ) {
      alert("Cannot proceed further. Please fill the empty fields");
    } else if (resetpass.newpassword !== resetpass.retypenewpassword) {
      alert("Passwords does not match!");
    } else {
      dispatch(changepassword(resetpass, history));
      alert("Password changed successfully!");
    }
  };

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
  const routehome = () => {
    history.push("/");
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

  return (
    <div>
      <body id="page-top" className={`${toggle ? "sidebar-toggled" : ""}`}>
        <div id="wrapper">
          {/* <nav
            className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0"
            style={{ background: "#001c33" }}
          > */}
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
                  <a className="nav-link active">
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
                            src={resetprofile.image}
                            style={{ width: "40px", height: "40px" }}
                          />
                        </a>
                        <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in">
                          <a className="dropdown-item" onClick={routehome}>
                            <i className="fas fa-home fa-sm fa-fw mr-2 text-gray-400"></i>
                            &nbsp;Home
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
            </div>
            <div className="container-fluid">
              <h3 className="text-dark mb-4">Profile</h3>
              <div className="row mb-3">
                <div className="col-lg-4">
                  <div className="card mb-3">
                    <div className="card-body text-center shadow">
                      <img
                        className="rounded-circle mb-3 mt-4"
                        src={resetprofile?.image}
                        width="160"
                        height="160"
                      />
                      <div className="mb-3">
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setresetprofile({ ...resetprofile, image: base64 })
                          }
                        ></FileBase>
                        <div>
                          {/* <label
                            className="image-upload"
                            className="btn btn-primary btn-sm"
                          >
                            Change Picture
                          </label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card"
                    style={{ boxShadow: "0px 0px 16px rgba(133,135,150,0.3)" }}
                  >
                    <div className="card-header py-3">
                      <p className="text-primary m-0 font-weight-bold">
                        Change Account Password
                      </p>
                    </div>
                    <div
                      className="card-body"
                      style={{ height: "auto", boxShadow: "0px 0px 0px" }}
                    >
                      <form>
                        <div className="form-row">
                          <div className="col">
                            <div className="form-group">
                              <label>
                                <strong>Old Password</strong>
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                onChange={handlechange}
                                placeholder="*********"
                                name="oldpassword"
                              />
                              {/* <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton> */}
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col">
                            <div className="form-group">
                              <label>
                                <strong>New Password</strong>
                              </label>

                              <input
                                className="form-control"
                                type="password"
                                onChange={handlechange}
                                placeholder="*********"
                                name="newpassword"
                              />
                            </div>
                          </div>
                        </div>
                        {resetpass?.newpassword !== "" ? (
                          <p
                            style={{
                              color: wp ? "red" : "green",
                            }}
                          >
                            {errorMessage}
                          </p>
                        ) : null}

                        <div className="form-row">
                          <div className="col">
                            <div className="form-group">
                              <label>
                                <strong>Retype New Password</strong>
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                onChange={handlechange}
                                placeholder="*********"
                                name="retypenewpassword"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          {resetpass?.newpassword !==
                          resetpass?.retypenewpassword ? (
                            <p style={{ color: "red" }}>
                              Fields does not match
                            </p>
                          ) : (
                            ""
                          )}
                          {mess ? <p style={{ color: "red" }}>{mess}</p> : null}
                        </div>
                        <div
                          className="form-group"
                          style={{ marginTop: "11px" }}
                        >
                          <button
                            className="btn btn-primary btn-sm"
                            type="submit"
                            onClick={(e) => {
                              handleSubmit(e);
                            }}
                            disabled={
                              resetpass?.oldpassword === "" ||
                              resetpass?.newpassword === "" ||
                              resetpass?.retypenewpassword === "" ||
                              resetpass?.newpassword !==
                                resetpass?.retypenewpassword
                                ? true
                                : false || wp === true
                            }
                          >
                            Save Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col">
                      <div className="card shadow mb-3">
                        <div className="card-header py-3">
                          <p className="text-primary m-0 font-weight-bold">
                            User Settings
                          </p>
                        </div>
                        <div className="card-body">
                          <form>
                            <div className="form-row">
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Name</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={resetprofile.name}
                                    onChange={handleChange}
                                    required=""
                                    pattern="[a-zA-Z'-'\s]*"
                                  />
                                </div>
                                <div>
                                  {resetprofile?.name === "" ? (
                                    <p style={{ color: "red" }}>
                                      Name is required
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Email</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="email"
                                    value={resetprofile.email}
                                    name="email"
                                    onChange={handleChange}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                                    required=""
                                  />
                                </div>
                                <div>
                                  {resetprofile?.email === "" ? (
                                    <p style={{ color: "red" }}>
                                      Email is required
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  {resetprofile?.email !== "" ? (
                                    <p
                                      style={{
                                        color: e ? "red" : null,
                                      }}
                                    >
                                      {emailerror}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Date of Birth</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    defaultValue={dob}
                                    name="dateofbirth"
                                    data-date-format="yyyy-mm-dd"
                                    onChange={handleChange}
                                    required=""
                                  />
                                </div>

                                <div>
                                  {resetprofile?.dateofbirth === "" ? (
                                    <p style={{ color: "red" }}>
                                      Date of Birth is required
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Age</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="number"
                                    value={resetprofile.age}
                                    name="age"
                                    onChange={handleChange}
                                    required=""
                                  />
                                </div>
                                <div>
                                  {resetprofile?.age === "" ? (
                                    <p style={{ color: "red" }}>
                                      Age is required
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Gender</strong>
                                  </label>
                                  <input
                                    disabled
                                    className="form-control"
                                    type="text"
                                    placeholder={gender}
                                    name="gender"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Contact No.</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    type="number"
                                    value={resetprofile.contactno}
                                    name="contactno"
                                    onChange={handleChange}
                                    required=""
                                  />
                                </div>

                                <div>
                                  {resetprofile?.contactno?.length !== 11 ? (
                                    <p style={{ color: "red" }}>
                                      Invalid Contact Number
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Address</strong>
                                  </label>
                                  <textarea
                                    value={resetprofile.address}
                                    onChange={handleChange}
                                    className="form-control"
                                    type="text"
                                    name="address"
                                    required=""
                                  />
                                </div>
                                <div>
                                  {resetprofile?.address === "" ? (
                                    <p style={{ color: "red" }}>
                                      Address is required
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>CNIC Number</strong>
                                  </label>
                                  <input
                                    className="form-control"
                                    onChange={handleChange}
                                    value={resetprofile.nic}
                                    type="number"
                                    name="nic"
                                    required=""
                                  />
                                </div>

                                <div>
                                  {resetprofile?.nic?.length !== 13 ? (
                                    <p style={{ color: "red" }}>Invalid CNIC</p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Country</strong>
                                  </label>
                                  <input
                                    disabled
                                    className="form-control"
                                    type="text"
                                    placeholder={country}
                                    name="country"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label for="city">
                                    <strong>City</strong>
                                  </label>
                                  <select
                                    className="form-control"
                                    name="city"
                                    defaultValue={resetprofile.city}
                                    onChange={handleChange}
                                    required=""
                                  >
                                    <optgroup key="city">
                                      <option
                                        value=""
                                        disabled
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Select The City
                                      </option>
                                      <option value="Islamabad">
                                        Islamabad
                                      </option>
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
                                      <option value="Bahawalnagar">
                                        Bahawalnagar
                                      </option>
                                      <option value="Bahawalpur">
                                        Bahawalpur
                                      </option>
                                      <option value="Bhakkar">Bhakkar</option>
                                      <option value="Burewala">Burewala</option>
                                      <option value="Chillianwala">
                                        Chillianwala
                                      </option>
                                      <option value="Chakwal">Chakwal</option>
                                      <option value="Chichawatni">
                                        Chichawatni
                                      </option>
                                      <option value="Chiniot">Chiniot</option>
                                      <option value="Chishtian">
                                        Chishtian
                                      </option>
                                      <option value="Daska">Daska</option>
                                      <option value="Darya Khan">
                                        Darya Khan
                                      </option>
                                      <option value="Dera Ghazi Khan">
                                        Dera Ghazi Khan
                                      </option>
                                      <option value="Dhaular">Dhaular</option>
                                      <option value="Dina">Dina</option>
                                      <option value="Dinga">Dinga</option>
                                      <option value="Dipalpur">Dipalpur</option>
                                      <option value="Faisalabad">
                                        Faisalabad
                                      </option>
                                      <option value="Ferozewala">
                                        Ferozewala
                                      </option>
                                      <option value="Fateh Jhang">
                                        Fateh Jang
                                      </option>
                                      <option value="Ghakhar Mandi">
                                        Ghakhar Mandi
                                      </option>
                                      <option value="Gojra">Gojra</option>
                                      <option value="Gujranwala">
                                        Gujranwala
                                      </option>
                                      <option value="Gujrat">Gujrat</option>
                                      <option value="Gujar Khan">
                                        Gujar Khan
                                      </option>
                                      <option value="Hafizabad">
                                        Hafizabad
                                      </option>
                                      <option value="Haroonabad">
                                        Haroonabad
                                      </option>
                                      <option value="Hasilpur">Hasilpur</option>
                                      <option value="Haveli Lakha">
                                        Haveli Lakha
                                      </option>
                                      <option value="Jatoi">Jatoi</option>
                                      <option value="Jalalpur">Jalalpur</option>
                                      <option value="Jattan">Jattan</option>
                                      <option value="Jampur">Jampur</option>
                                      <option value="Jaranwala">
                                        Jaranwala
                                      </option>
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
                                      <option value="Jauharabad">
                                        Jauharabad
                                      </option>
                                      <option value="Lahore">Lahore</option>
                                      <option value="Lalamusa">Lalamusa</option>
                                      <option value="Layyah">Layyah</option>
                                      <option value="Liaquat Pur">
                                        Liaquat Pur
                                      </option>
                                      <option value="Lodhran">Lodhran</option>
                                      <option value="Malakwal">Malakwal</option>
                                      <option value="Mamoori">Mamoori</option>
                                      <option value="Mailsi">Mailsi</option>
                                      <option value="Mandi Bahauddin">
                                        Mandi Bahauddin
                                      </option>
                                      <option value="Mian Channu">
                                        Mian Channu
                                      </option>
                                      <option value="Mianwali">Mianwali</option>
                                      <option value="Multan">Multan</option>
                                      <option value="Murree">Murree</option>
                                      <option value="Muridke">Muridke</option>
                                      <option value="Mianwali Bangla">
                                        Mianwali Bangla
                                      </option>
                                      <option value="Muzaffargarh">
                                        Muzaffargarh
                                      </option>
                                      <option value="Narowal">Narowal</option>
                                      <option value="Nankana Sahib">
                                        Nankana Sahib
                                      </option>
                                      <option value="Okara">Okara</option>
                                      <option value="Renala Khurd">
                                        Renala Khurd
                                      </option>
                                      <option value="Pakpattan">
                                        Pakpattan
                                      </option>
                                      <option value="Pattoki">Pattoki</option>
                                      <option value="Pir Mahal">
                                        Pir Mahal
                                      </option>
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
                                      <option value="Rawalpindi">
                                        Rawalpindi
                                      </option>
                                      <option value="Sadiqabad">
                                        Sadiqabad
                                      </option>
                                      <option value="Safdarabad">
                                        Safdarabad
                                      </option>
                                      <option value="Sahiwal">Sahiwal</option>
                                      <option value="Sangla Hill">
                                        Sangla Hill
                                      </option>
                                      <option value="Sarai Alamgir">
                                        Sarai Alamgir
                                      </option>
                                      <option value="Sargodha">Sargodha</option>
                                      <option value="Shakargarh">
                                        Shakargarh
                                      </option>
                                      <option value="Sheikhupura">
                                        Sheikhupura
                                      </option>
                                      <option value="Sialkot">Sialkot</option>
                                      <option value="Sohawa">Sohawa</option>
                                      <option value="Soianwala">
                                        Soianwala
                                      </option>
                                      <option value="Siranwali">
                                        Siranwali
                                      </option>
                                      <option value="Talagang">Talagang</option>
                                      <option value="Taxila">Taxila</option>
                                      <option value="Toba Tek Singh">
                                        Toba Tek Singh
                                      </option>
                                      <option value="Vehari">Vehari</option>
                                      <option value="Wah Cantonment">
                                        Wah Cantonment
                                      </option>
                                      <option value="Wazirabad">
                                        Wazirabad
                                      </option>
                                      <option
                                        value=""
                                        disabled
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Sindh Cities
                                      </option>
                                      <option value="Badin">Badin</option>
                                      <option value="Bhirkan">Bhirkan</option>
                                      <option value="Rajo Khanani">
                                        Rajo Khanani
                                      </option>
                                      <option value="Chak">Chak</option>
                                      <option value="Dadu">Dadu</option>
                                      <option value="Digri">Digri</option>
                                      <option value="Diplo">Diplo</option>
                                      <option value="Dokri">Dokri</option>
                                      <option value="Ghotki">Ghotki</option>
                                      <option value="Haala">Haala</option>
                                      <option value="Hyderabad">
                                        Hyderabad
                                      </option>
                                      <option value="Islamkot">Islamkot</option>
                                      <option value="Jacobabad">
                                        Jacobabad
                                      </option>
                                      <option value="Jamshoro">Jamshoro</option>
                                      <option value="Jungshahi">
                                        Jungshahi
                                      </option>
                                      <option value="Kandhkot">Kandhkot</option>
                                      <option value="Kandiaro">Kandiaro</option>
                                      <option value="Karachi">Karachi</option>
                                      <option value="Kashmore">Kashmore</option>
                                      <option value="Keti Bandar">
                                        Keti Bandar
                                      </option>
                                      <option value="Khairpur">Khairpur</option>
                                      <option value="Kotri">Kotri</option>
                                      <option value="Larkana">Larkana</option>
                                      <option value="Matiari">Matiari</option>
                                      <option value="Mehar">Mehar</option>
                                      <option value="Mirpur Khas">
                                        Mirpur Khas
                                      </option>
                                      <option value="Mithani">Mithani</option>
                                      <option value="Mithi">Mithi</option>
                                      <option value="Mehrabpur">
                                        Mehrabpur
                                      </option>
                                      <option value="Moro">Moro</option>
                                      <option value="Nagarparkar">
                                        Nagarparkar
                                      </option>
                                      <option value="Naudero">Naudero</option>
                                      <option value="Naushahro Feroze">
                                        Naushahro Feroze
                                      </option>
                                      <option value="Naushara">Naushara</option>
                                      <option value="Nawabshah">
                                        Nawabshah
                                      </option>
                                      <option value="Nazimabad">
                                        Nazimabad
                                      </option>
                                      <option value="Qambar">Qambar</option>
                                      <option value="Qasimabad">
                                        Qasimabad
                                      </option>
                                      <option value="Ranipur">Ranipur</option>
                                      <option value="Ratodero">Ratodero</option>
                                      <option value="Rohri">Rohri</option>
                                      <option value="Sakrand">Sakrand</option>
                                      <option value="Sanghar">Sanghar</option>
                                      <option value="Shahbandar">
                                        Shahbandar
                                      </option>
                                      <option value="Shahdadkot">
                                        Shahdadkot
                                      </option>
                                      <option value="Shahdadpur">
                                        Shahdadpur
                                      </option>
                                      <option value="Shahpur Chakar">
                                        Shahpur Chakar
                                      </option>
                                      <option value="Shikarpaur">
                                        Shikarpaur
                                      </option>
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
                                      <option value="Abbottabad">
                                        Abbottabad
                                      </option>
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
                                      <option value="Battagram">
                                        Battagram
                                      </option>
                                      <option value="Birote">Birote</option>
                                      <option value="Chakdara">Chakdara</option>
                                      <option value="Charsadda">
                                        Charsadda
                                      </option>
                                      <option value="Chitral">Chitral</option>
                                      <option value="Daggar">Daggar</option>
                                      <option value="Dargai">Dargai</option>
                                      <option value="Darya Khan">
                                        Darya Khan
                                      </option>
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
                                      <option value="Lakki Marwat">
                                        Lakki Marwat
                                      </option>
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
                                      <option value="Saidu Sharif">
                                        Saidu Sharif
                                      </option>
                                      <option value="Shorkot">Shorkot</option>
                                      <option value="Shewa Adda">
                                        Shewa Adda
                                      </option>
                                      <option value="Swabi">Swabi</option>
                                      <option value="Swat">Swat</option>
                                      <option value="Tangi">Tangi</option>
                                      <option value="Tank">Tank</option>
                                      <option value="Thall">Thall</option>
                                      <option value="Timergara">
                                        Timergara
                                      </option>
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
                                      <option value="Dera Bugti">
                                        Dera Bugti
                                      </option>
                                      <option value="Gwadar">Gwadar</option>
                                      <option value="Harnai">Harnai</option>
                                      <option value="Jafarabad">
                                        Jafarabad
                                      </option>
                                      <option value="Jhal Magsi">
                                        Jhal Magsi
                                      </option>
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
                                      <option value="Nasirabad">
                                        Nasirabad
                                      </option>
                                      <option value="Nushki">Nushki</option>
                                      <option value="Panjgur">Panjgur</option>
                                      <option value="Pishin Valley">
                                        Pishin Valley
                                      </option>
                                      <option value="Quetta">Quetta</option>
                                      <option value="Sherani">Sherani</option>
                                      <option value="Sibi">Sibi</option>
                                      <option value="Sohbatpur">
                                        Sohbatpur
                                      </option>
                                      <option value="Washuk">Washuk</option>
                                      <option value="Zhob">Zhob</option>
                                      <option value="Ziarat">Ziarat</option>
                                    </optgroup>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Description</strong>
                                  </label>
                                  <textarea
                                    className="form-control"
                                    type="text"
                                    value={resetprofile.description}
                                    name="description"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div>
                                  {resetprofile?.description === "" ? (
                                    <p style={{ color: "red" }}>
                                      Description is required
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Area of Interest</strong>
                                    <br />
                                  </label>
                                  <input
                                    disabled
                                    className="form-control"
                                    type="text"
                                    placeholder={areaofinterest}
                                    name="area_interest"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col">
                                <div className="form-group">
                                  <label>
                                    <strong>Experience</strong>
                                  </label>
                                  <select
                                    className="form-control"
                                    name="noofexp"
                                    onChange={handleChange}
                                    defaultValue={resetprofile.noofexp}
                                    required=""
                                  >
                                    <optgroup label="Select your experience">
                                      {noofexperience.map((exp) => (
                                        <option key={exp} value={exp}>
                                          {exp}
                                        </option>
                                      ))}
                                    </optgroup>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <button
                                className="btn btn-primary btn-sm"
                                type="submit"
                                style={{ marginTop: "7px" }}
                                onClick={getdata}
                                disabled={
                                  resetprofile?.name === "" ||
                                  resetprofile?.dateofbirth === "" ||
                                  resetprofile?.age === "" ||
                                  resetprofile?.age < 0 ||
                                  resetprofile?.contactno === "" ||
                                  resetprofile?.contactno?.length !== 11 ||
                                  resetprofile?.address === "" ||
                                  resetprofile?.city === "" ||
                                  resetprofile?.nic === "" ||
                                  resetprofile?.nic?.length !== 13 ||
                                  e === true ||
                                  resetprofile?.description === "" ||
                                  resetprofile?.noofexp === ""
                                    ? true
                                    : false
                                }
                              >
                                Save Settings
                              </button>
                            </div>
                          </form>
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
    </div>
  );
};

export default MyProfile;
