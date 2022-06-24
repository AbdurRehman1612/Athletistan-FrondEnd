import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../../constants/actionTypes";
import { WorldMap } from "./map";
import styles from "./historyolympics.module.css";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Line } from "react-chartjs-2";
import "./styles1.css";
import { scroller } from "react-scroll";
import "./navbar.css";

const Historyolympics = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth?.authData?.token);
  const name = useSelector((state) => state.auth?.authData?.result?.name);
  const dp = useSelector((state) => state.auth?.authData?.result?.dp);

  const routelogin = () => {
    history.push("/login");
  };

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

  const handledashboard = () => {
    history.push("/dashboard");
  };

  const scrollTarget = (target) =>
    scroller.scrollTo(target, {
      smooth: "easeInOutQuart",
      duration: 800,
      delay: 0,
    });

  const handleextra = (val) => {
    history.push(`/recorddetails/${val}`);
    window.scrollTo(0, 0);
  };

  const scrollToPage = async (target) => {
    if (history.location.pathname !== "/") {
      await history.push("/");
    }
    scrollTarget(target);
  };

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
                    onClick={() => !token && routelogin()}
                    className="d-none d-lg-inline me-2 text-gray-600 small"
                    style={{ fontSize: "16px", marginLeft: "145px" }}
                  >
                    {token ? name : "Login"}
                  </span>
                  <img
                    onClick={() => !token && routelogin()}
                    className="border rounded-circle img-profile"
                    src={token ? dp : "/profile.png"}
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
          className="text-center text-white"
          style={{
            paddingTop: "calc(10rem + 55px)",
            paddingBottom: "10rem",
            position: "relative",
            overflow: "hidden",
            paddingTop: "calc(7rem + 72px)",
            paddingBottom: "7rem",
            color:
              "rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important",
            textAlign: "center !important",
            marginTop: "103px",
            background: "url(/olympiccopy.gif) round",
          }}
        >
          <div
            className="masthead-content"
            style={{
              zIndex: "1",
              position: "relative",
              textAlign: "center !important",
            }}
          >
            <div
              className="container"
              style={{
                maxWidth: "1140px",
                width: "100%",
                paddingRight: "var(--bs-gutter-x, 0.75rem)",
                paddingLeft: "var(--bs-gutter-x, 0.75rem)",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              <h1
                style={{
                  fontSize: "6rem",
                  fontWeight: "800 !important",
                  color: "rgb(0,0,0)",
                  // backgroundColor: "rgb(0,0,0,0.5)",

                  marginBottom: "0 !important",
                  lineHeight: "1.2",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                History of Olympics
              </h1>
              <h2
                style={{
                  fontSize: "4rem",
                  fontWeight: "800 !important",
                  color: "#FAB822",
                  marginBottom: "0 !important",
                  lineHeight: "1.2",
                  fontFamily: "Montserrat, sans-serif",
                }}
              ></h2>
            </div>
          </div>
        </header>
        <section>
          <div className="container" style={{ maxWidth: "1140px" }}>
            <div
              className="row align-items-center"
              style={{
                alignItems: "center !important",
                background: "rgb(248,249,250)",
              }}
            >
              <div
                className="col-lg-6 order-lg-2"
                style={{
                  order: "2 !important",
                  flex: "0 0 auto",
                  width: "50%",
                }}
              >
                <div className="p-5">
                  <img
                    className="rounded-circle img-fluid"
                    src="/fromancienttomodern.jpg"
                    style={{ verticalAlign: "middle" }}
                  />
                </div>
              </div>
              <div
                className="col-lg-6 order-lg-1"
                style={{
                  order: "1 !important",
                  flex: "0 0 auto",
                  width: "50%",
                }}
              >
                <div className="p-5">
                  <h2 className="display-4">
                    <strong>FROM ANCIENT TO MODERN</strong>
                    <br />
                  </h2>
                  <p>
                    Although the ancient Games were staged in Olympia, Greece,
                    from 776 BC through 393 AD, it took 1503 years for the
                    Olympics to return. The first modern Olympics were held in
                    Athens, Greece, in 1896. The man responsible for its rebirth
                    was a Frenchman named Baron Pierre de Coubertin, who
                    presented the idea in 1894. His original thought was to
                    unveil the modern Games in 1900 in his native Paris, but
                    delegates from 34 countries were so enthralled with the
                    concept that they convinced him to move the Games up to 1896
                    and have Athens serve as the first host.
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div
              className="row align-items-center"
              style={{ background: "rgb(248,249,250)" }}
            >
              <div
                className="col-lg-6 order-lg-1"
                style={{ flex: "0 0 auto", width: "50%" }}
              >
                <div className="p-5">
                  <img
                    className="rounded-circle img-fluid"
                    src="olympicflame1.jpg"
                  />
                </div>
              </div>
              <div
                className="col-lg-6 order-lg-2"
                style={{
                  order: "1 !important",
                  flex: "0 0 auto",
                  width: "50%",
                }}
              >
                <div className="p-5">
                  <h2 className="display-4">
                    <strong>THE OLYMPIC FLAME</strong>
                    <br />
                  </h2>
                  <p>
                    The idea of the Olympic torch or Olympic Flame was first
                    inaugurated in the 1928 Olympic Games in Amsterdam. There
                    was no torch relay in the ancient Olympic Games. There were
                    known, however, torch relays in other ancient Greek athletic
                    festivals including those held at Athens. The modern Olympic
                    torch relay was first instituted at the 1936 Olympic Games
                    in Berlin.
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div
              className="row align-items-center"
              style={{ background: "rgb(248,249,250)" }}
            >
              <div
                className="col-lg-6 order-lg-2"
                style={{ flex: "0 0 auto", width: "50%" }}
              >
                <div className="p-5">
                  <img
                    className="rounded-circle img-fluid"
                    src="/olumpicoath.jpg"
                  />
                </div>
              </div>
              <div
                className="col-lg-6 order-lg-1"
                style={{
                  order: "1 !important",
                  flex: "0 0 auto",
                  width: "50%",
                }}
              >
                <div className="p-5">
                  <h2 className="display-4">
                    <strong>The Olympic Oath</strong>
                    <br />
                  </h2>
                  <p>
                    Taken for the first time at the 1920 Olympic Games in
                    Antwerp by Victor Boin, a Belgian fencer, the Olympic oath
                    is one of the protocol elements of the Opening Ceremony. It
                    is taken by an athlete from the host county, on behalf of
                    all the athletes. This oath is similar to the one sworn by
                    Olympic athletes in ancient times – the only difference
                    being that today’s athletes take the oath with the Olympic
                    flag and not the innards of a sacrificed animal.&nbsp; Since
                    1972, a judge has sworn an oath alongside the athlete at the
                    Games opening ceremony; and since 2012, so too has a coach.
                    <br />
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer
          className="d-xl-flex justify-content-xl-center align-items-xl-center"
          style={{ height: "90px", background: "#001c33", marginTop: "-60px" }}
        >
          <div className={`${styles.container}`}>
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
};

export default Historyolympics;
