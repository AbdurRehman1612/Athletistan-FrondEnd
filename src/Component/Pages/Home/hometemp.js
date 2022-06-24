import React from "react";

const hometemp = () => {
  return (
    <div>
      <body
        id="page-top"
        data-bs-spy="scroll"
        data-bs-target="#mainNav"
        data-bs-offset="54"
      >
        <nav
          className="navbar1 navbar1-dark navbar1-expand-lg fixed-top"
          id="mainNav"
          style={{ background: "#001c33" }}
        >
          <div className="container1">
            <a
              className="navbar1-brand text-start1 d-xxl-flex1"
              href="#page-top"
              style={{ fontFamily: "Work Sans, sans-serif" }}
            >
              ATHLETISTAN
            </a>
            <button
              data-bs-toggle="collapse1"
              data-bs-target="#navbarResponsive"
              className="navbar1-toggler navbar1-toggler-right"
              type="button"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ marginLeft: "76px", marginRight: "-76px" }}
            >
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse1 navbar1-collapse1" id="navbarResponsive">
              <ul className="navbar1-nav ms-auto1 text-uppercase">
                <li className="nav-item1">
                  <a className="nav-link1" href="#homepage">
                    Home
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link1" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link1" href="#guinness">
                    Guinness
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link1" href="#olympics">
                    Olympics
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link1" href="#faq">
                    FAQ
                  </a>
                </li>
                <li className="nav-item1">
                  <a className="nav-link1" href="#contact">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <a
              className="navbar1-brand text-start1 d-xxl-flex1"
              href="#page-top"
              style={{ fontFamily: "Work Sans, sans-serif" }}
            ></a>
            <div
              className="dropdown no-arrow"
              style={{
                width: "263.469px",
                marginLeft: "76px",
                marginRight: "-76px",
              }}
            >
              <a
                className="dropdown-toggle nav-link1"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                <span
                  className="d-none1 d-lg-inline1 me-21 text-gray-600 small"
                  style={{ fontSize: "16px" }}
                >
                  {name}
                </span>
                <img
                  onClick={token ? null : routelogin}
                  className="border rounded-circle1 img-profile"
                  src={token ? dp : "/profile.png"}
                  style={{ width: "40px", height: "40px" }}
                />
              </a>
              {token ? (
                <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                  <a className="dropdown-item" onClick={handledashboard}>
                    <i className="fas fa-user fa-sm fa-fw me-21 text-gray-400"></i>
                    &nbsp;Dashboard
                  </a>
                  {/* <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={routemyprofile}>
                  <i className="fas fa-user fa-sm fa-fw me-21 text-gray-400"></i>
                  &nbsp;Profile
                </a> */}
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
        <nav
          className="navbar1 navbar1-dark navbar1-expand-lg fixed-top d-xxl-flex1 ms-auto1 rotate-n-90"
          id="mainNav-1"
          style={{
            width: "579px",
            marginTop: "363px",
            marginRight: "-262px",
            background: "#c81e1d",
            height: "66px",
          }}
        >
          <div className="container1">
            <div
              className="collapse1 navbar1-collapse1"
              id="navbarResponsive-1"
            >
              <ul className="navbar1-nav ms-auto1 text-uppercase">
                <li
                  className="nav-item1 d-xxl-flex1"
                  style={{ marginRight: "105px" }}
                >
                  <a className="nav-link1 d-xxl-flex1" href="#guinness">
                    <strong>Guinness World Record</strong>
                  </a>
                </li>
                <li
                  className="nav-item1 d-xxl-flex1"
                  style={{ paddingRight: "181.5px", width: "180.844px" }}
                >
                  <a
                    className="nav-link1 d-xxl-flex1 me-auto1"
                    href="#olympics"
                  >
                    <strong>Olympics</strong>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <header
          id="homepage"
          className="masthead1"
          style={{
            background: "url(/HeaderBackground.jpg)",
          }}
        >
          <div className="container1">
            <div
              className="intro-text1"
              style={{ paddingTop: "167px", paddingRight: "37px" }}
            >
              <div className="intro-lead1-in1">
                <img src="/Logowithouttagline.png" style={{ width: "200px" }} />
              </div>
              <div className="intro-lead1-in1">
                <span>Welcome Athletistan!</span>
              </div>
              <div
                className="intro-heading1 text-uppercase"
                style={{ width: "100%" }}
              >
                <span>Where talent perceives destination</span>
              </div>
              <div className="intro-lead1-in1" style={{ marginBottom: "15px" }}>
                <span style={{ fontSize: "30px" }}>Join Us</span>
              </div>
              <a
                className="btn1 btn1-outline-primary btn1-xl1 text-uppercase"
                role="button"
                onClick={handlecoachroutes}
                style={{
                  paddingTop: "5px",
                  paddingRight: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "5px",
                  width: "164.531px",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  borderWidth: "2px",
                }}
              >
                As A coach
              </a>
              <a
                className="btn1 btn1-outline-primary btn1-xl text-uppercase"
                role="button"
                onClick={handleathleteroutes}
                style={{
                  paddingTop: "5px",
                  paddingRight: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "5px",
                  width: "164.531px",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  borderWidth: "2px",
                }}
              >
                As An athlete
              </a>
            </div>
          </div>
        </header>
        <section className="bg-light1" id="about">
          <div className="container1">
            <div className="row1">
              <div className="col-lg-121 text-center1">
                <h2 className="text-uppercase section-heading1">About</h2>
                <h3 className="text-muted1 section-subheading1">
                  <br />
                  Through the several years, we do not see Pakistan making its
                  name in Olympics or Guinness World Record. The problem is not
                  the lacking of talent in Pakistan but the inexistent of the
                  platform which supports the athletes for their training. The
                  only athletes who have connections will get promoted even if
                  they are not
                  <br />
                  so skilled. The right talent will get no chance to perform.
                  &nbsp;Athletes are unable to find coach for their training
                  according to their preference. Also, coaches do not know where
                  the talent is seeking for training and they are unable to
                  serve their experience. Athletes are finding it hard to
                  showcase their talent what they are capable of. To solve the
                  above problems, we found a solution to make a platform for
                  both athletes and coaches to find the best match accordingly.
                  It will help us
                  <br />
                  to promote the only talent which are really capable to make
                  his name in the world but its hiding somewhere in the country.
                  <br />
                  <br /> Following are the main features of our website.
                  <br />
                  <br />
                </h3>
              </div>
            </div>
            <div className="row1">
              <div className="col-sm-61 col-md-41 portfolio-item1">
                <a
                  className="portfolio-link1"
                  href="#portfolioModal1"
                  data-bs-toggle="modal"
                >
                  <img className="img-fluid1" src="/Guinness.jpg" />
                </a>
                <div className="portfolio-caption1">
                  <h4>
                    <strong>Guinness World Record</strong>
                    <br />
                  </h4>
                  <p className="text-muted1">
                    Anyone can explore all the details about Guinness World
                    Record.
                  </p>
                </div>
              </div>
              <div className="col-sm-61 col-md-41 portfolio-item1">
                <a
                  className="portfolio-link1"
                  href="#portfolioModal2"
                  data-bs-toggle="modal"
                >
                  <img className="img-fluid1" src="/olympic.jpg" />
                </a>
                <div className="portfolio-caption1">
                  <h4>Olympic</h4>
                  <p className="text-muted1">
                    You can find all the details about the Olympics on this
                    website.
                  </p>
                </div>
              </div>
              <div className="col-sm-61 col-md-41 portfolio-item1">
                <a
                  className="portfolio-link1"
                  href="#portfolioModal3"
                  data-bs-toggle="modal"
                >
                  <img className="img-fluid1" src="/showcase.jpg" />
                </a>
                <div className="portfolio-caption1">
                  <h4>Showcase</h4>
                  <p className="text-muted1">
                    If you are the one who have the skills, can showcase in this
                    platform.
                  </p>
                </div>
              </div>
              <div className="col-sm-61 col-md-41 portfolio-item1">
                <a
                  className="portfolio-link1"
                  href="#portfolioModal4"
                  data-bs-toggle="modal"
                >
                  <img className="img-fluid1" src="/feminine.jpg" />
                </a>
                <div className="portfolio-caption1">
                  <h4>Feminine</h4>
                  <p className="text-muted1">
                    Female athletes can find female coach according to their
                    feasibility.&nbsp;
                  </p>
                </div>
              </div>
              <div className="col-sm-61 col-md-41 portfolio-item1">
                <a
                  className="portfolio-link1"
                  href="#portfolioModal5"
                  data-bs-toggle="modal"
                >
                  <img className="img-fluid1" src="/recommend.jpg" />
                </a>
                <div className="portfolio-caption1">
                  <h4>Recommend</h4>
                  <p className="text-muted1">
                    Best athletes will be recommend to Pakistan Olympic
                    Association (POA).
                  </p>
                </div>
              </div>
              <div className="col-sm-61 col-md-41 portfolio-item1">
                <a
                  className="portfolio-link1"
                  href="#portfolioModal6"
                  data-bs-toggle="modal"
                >
                  <img className="img-fluid1" src="/exposure.jpg" />
                </a>
                <div className="portfolio-caption1">
                  <h4>Exposure</h4>
                  <p className="text-muted1">
                    Provide exposure to those who are capable of breaking any
                    record.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="guinness">
          <div className="container1">
            <div className="row1">
              <div className="col-lg-121 text-center1">
                <h2
                  className="text-uppercase"
                  style={{ color: "rgb(0,28,51)" }}
                >
                  Guiness world records
                </h2>
                <h3 className="text-muted1 section-subheading1">
                  Top most famous Guinness World Records
                </h3>
              </div>
            </div>
            <div className="row1">
              <div className="col-lg-121">
                <ul className="list-group1 timeline1">
                  <li className="list-group1-item">
                    <div className="timeline1-image">
                      <img
                        className="rounded-circle1 img-fluid1"
                        src="/2842.jpg"
                      />
                    </div>
                    <div className="timeline1-panel">
                      <div className="timeline1-heading">
                        <h4>
                          18 MARCH 2010
                          <br />
                        </h4>
                        <h4 className="subheading1">
                          Widest mouth (unstretched)
                          <br />
                        </h4>
                      </div>
                      <div className="timeline1-body">
                        <p className="text-muted1">
                          The widest mouth measures 17 cm (6.69 in) and belongs
                          to Francisco Domingo Joaquim "Chiquinho" (Angola).
                          <br />
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group1-item timeline1-inverted">
                    <div className="timeline1-image">
                      <img
                        className="rounded-circle1 img-fluid1"
                        src="/Jyoti_amge_(2).jpg"
                      />
                    </div>
                    <div className="timeline1-panel">
                      <div className="timeline1-heading">
                        <h4>16 DECEMBER 2011</h4>
                        <h4 className="subheading1">Shortest female living</h4>
                      </div>
                      <div className="timeline1-body">
                        <p className="text-muted1">
                          The shortest woman living (mobile) is Jyoti Amge
                          (India, born 16 Dec 1993), who measured 62.8 cm (24.7
                          in) in Nagpur, India, on 16 December 2011.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group1-item">
                    <div className="timeline1-image">
                      <img
                        className="rounded-circle1 img-fluid1"
                        src="/VZBS33LFRZDDXCPQ2PW2TRK2CU.jpg"
                      />
                    </div>
                    <div className="timeline1-panel">
                      <div className="timeline1-heading">
                        <h4>23 FEBRUARY 2008</h4>
                        <h4 className="subheading1">Longest fingernails</h4>
                      </div>
                      <div className="timeline1-body">
                        <p className="text-muted1">
                          The longest fingernails belonged to Lee Redmond (USA),
                          who started to grow them in 1979 and carefully
                          manicured them to reach a total length of 8.65 m (28
                          ft 4.5 in) as measured on the set of Lo show dei
                          record in Madrid, Spain, on 23 February 2008. Lee lost
                          her nails in an automobile accident in early 2009.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group1-item timeline1-inverted">
                    <div className="timeline1-image">
                      <img
                        className="rounded-circle1 img-fluid1"
                        src="/1bc4a3fbddfc4865bd356dce686aab4d.jpg"
                      />
                    </div>
                    <div className="timeline1-panel">
                      <div className="timeline1-heading">
                        <h4>01 MAY 2014</h4>
                        <h4 className="subheading1">Highest vehicle mileage</h4>
                      </div>
                      <div className="timeline1-body">
                        <p className="text-muted1">
                          At 4 p.m. on 18 September 2013, Irvin "Irv" Gordon
                          (USA) clocked up his three-millionth mile in his 1966
                          Volvo 1800S while driving near the village of
                          Girdwood, south of Anchorage in Alaska, USA. By 1 May
                          2014, he had driven 3,039,122 miles.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group1-item timeline1-inverted">
                    <div className="timeline1-image">
                      <h4>
                        Click Here
                        <br />
                        for&nbsp;
                        <br />
                        More Details
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light1" id="olympics">
          <div className="row1">
            <div className="col-lg-121 text-center1">
              <h2 className="text-uppercase" style={{ color: "rgb(0,28,51)" }}>
                Olympics
              </h2>
              <h3 className="text-muted1 section-subheading1">
                Top players of the Olympics
              </h3>
            </div>
          </div>
          <div className="container1">
            <div className="row1">
              <div
                className="col-sm-41"
                style={{
                  width: "258px",
                  background: "#ffffff",
                  border: "0.5px solid rgb(239,239,239)",
                }}
              >
                <div className="team-member1">
                  <img
                    className="rounded-circle1 mx-auto1"
                    src="/EmmaMcKeon.jpg"
                  />
                  <h4>
                    Emma McKeon
                    <br />
                  </h4>
                  <p
                    className="text-muted1"
                    style={{ color: "rgb(134, 142, 150)" }}
                  >
                    Swimming
                  </p>
                  <ul className="list-inline1 d-xxl-flex1 justify-content-xxl-center1 social-buttons1">
                    <li className="list-inline1-item">
                      <a style={{ background: "#ffd700", marginRight: "40px" }}>
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="5"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                    <li className="list-inline1-item">
                      <a style={{ background: "#c0c0c0", marginRight: "40px" }}>
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="2"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                    <li className="list-inline1-item d-xxl-flex1">
                      <a
                        className="mx-auto1"
                        style={{ background: "#cd7f32", marginRight: "40px" }}
                      >
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="4"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                  </ul>
                  <div className="row1">
                    <div className="col">
                      <small className="form-text1">Gold Medals</small>
                    </div>
                    <div className="col">
                      <small className="form-text1">Silver Medals</small>
                    </div>
                    <div className="col">
                      <small className="form-text1">Bronze Medals</small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-41"
                style={{
                  width: "258px",
                  background: "#ffffff",
                  border: "0.5px solid rgb(239,239,239)",
                }}
              >
                <div className="team-member1">
                  <img
                    className="rounded-circle1 mx-auto1"
                    src="/MartinFourcade.jpg"
                  />
                  <h4>
                    Martin Fourcade
                    <br />
                  </h4>
                  <p className="text-muted1">
                    Archery
                    <br />
                  </p>
                  <ul
                    className="list-inline1 mx-auto1 social-buttons1"
                    style={{ width: "150px" }}
                  >
                    <li
                      className="list-inline1-item"
                      style={{ marginRight: "0px" }}
                    >
                      <a
                        style={{
                          background: "#ffd700",
                          marginRight: "15px",
                          marginLeft: "15px",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="5"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                    <li
                      className="list-inline1-item"
                      style={{ marginRight: "0px" }}
                    >
                      <a
                        style={{
                          background: "#c0c0c0",
                          marginRight: "15px",
                          marginLeft: "15px",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="2"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                  </ul>
                  <div className="row1 mx-auto1" style={{ width: "150px" }}>
                    <div className="col">
                      <small className="form-text1">Gold Medals</small>
                    </div>
                    <div className="col">
                      <small className="form-text1">Silver Medals</small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-41"
                style={{
                  width: "258px",
                  background: "#ffffff",
                  border: "0.5px solid rgb(239,239,239)",
                }}
              >
                <div className="team-member1">
                  <img
                    className="rounded-circle1 mx-auto1"
                    src="/RYOKIYUNA.jpg"
                  />
                  <h4>
                    RYO KIYUNA
                    <br />
                  </h4>
                  <p className="text-muted1">
                    Karate
                    <br />
                  </p>
                  <ul className="list-inline1 d-xxl-flex1 justify-content-xxl-center1 social-buttons1">
                    <li className="list-inline1-item">
                      <a style={{ background: "#ffd700", marginRight: "40px" }}>
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="6"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                    <li className="list-inline1-item">
                      <a style={{ background: "#c0c0c0", marginRight: "40px" }}>
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="1"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                    <li className="list-inline1-item d-xxl-flex1">
                      <a
                        className="mx-auto1"
                        style={{ background: "#cd7f32", marginRight: "40px" }}
                      >
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="1"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                  </ul>
                  <div className="row1">
                    <div className="col">
                      <small className="form-text1">Gold Medals</small>
                    </div>
                    <div className="col">
                      <small className="form-text1">Silver Medals</small>
                    </div>
                    <div className="col">
                      <small className="form-text1">Bronze Medals</small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-41"
                style={{
                  width: "258px",
                  background: "#ffffff",
                  border: "0.5px solid rgb(239,239,239)",
                }}
              >
                <div className="team-member1">
                  <img
                    className="rounded-circle1 mx-auto1"
                    src="/JasonKenny.jpg"
                  />
                  <h4>
                    Jason Kenny
                    <br />
                  </h4>
                  <p className="text-muted1">
                    Cycling
                    <br />
                  </p>
                  <ul
                    className="list-inline1 mx-auto1 social-buttons1"
                    style={{ width: "150px" }}
                  >
                    <li
                      className="list-inline1-item"
                      style={{ marginRight: "0px" }}
                    >
                      <a
                        style={{
                          background: "#ffd700",
                          marginRight: "15px",
                          marginLeft: "15px",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="7"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                    <li
                      className="list-inline1-item"
                      style={{ marginRight: "0px" }}
                    >
                      <a
                        style={{
                          background: "#c0c0c0",
                          marginRight: "15px",
                          marginLeft: "15px",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="2"
                          readonly=""
                          disabled=""
                        />
                      </a>
                    </li>
                  </ul>
                  <div className="row1 mx-auto1" style={{ width: "150px" }}>
                    <div className="col">
                      <small className="form-text1">Gold Medals</small>
                    </div>
                    <div className="col">
                      <small className="form-text1">Silver Medals</small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-sm-41"
                style={{
                  width: "258px",
                  background: "#ffffff",
                  border: "0.5px solid rgb(239,239,239)",
                }}
              >
                <div className="team-member1">
                  <img
                    className="rounded-circle1 mx-auto1"
                    src="/QianYang.jpeg"
                  />
                  <h4>
                    Qian Yang
                    <br />
                  </h4>
                  <p className="text-muted1">
                    Shooting
                    <br />
                  </p>
                  <ul
                    className="list-inline1 d-xxl-flex1 mx-auto1 justify-content-xxl-center1 social-buttons1"
                    style={{ width: "249px" }}
                  >
                    <li className="list-inline1-item">
                      <a style={{ background: "#ffd700" }}>
                        <input
                          type="text"
                          style={{
                            borderWidth: "0px",
                            background: "transparent",
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                          }}
                          value="8"
                          disabled=""
                          readonly=""
                        />
                      </a>
                    </li>
                    <li className="list-inline1-item"></li>
                  </ul>
                  <div className="row1">
                    <div className="col d-xxl-flex1 justify-content-xxl-center1 align-items-xxl-center">
                      <small className="form-text1">
                        Gold <br />
                        Medals
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="faq">
          <div className="container1">
            <section className="py-51 bg-light1">
              <h1
                className="text-center1"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  color: "rgb(0,28,51)",
                }}
              >
                FAQ
              </h1>
              <div className="container1">
                <div className="row1 d-xxl-flex1">
                  <div
                    className="col-md-6 offset-md-31 mx-auto1"
                    style={{ width: "1013px" }}
                  >
                    <div id="faqlist" className="accordion1 accordion1-flush">
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-1"
                          >
                            How do I register myself as a coach?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-1"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-2"
                          >
                            How do I register myself as an athlete?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-2"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-3"
                          >
                            How can I search for a coach?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-3"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-4"
                          >
                            Being a coach, how can I filter out the best
                            athletes?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-4"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-5"
                          >
                            Is this platform for female players too?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-5"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-6"
                          >
                            How do I get benefit&nbsp; if my performance is
                            outstanding during training period?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-6"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-7"
                          >
                            I am willing to break a Guinness World Record? What
                            should I do ?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-7"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                      <div className="accordion1-item">
                        <h2 className="accordion1-header">
                          <button
                            className="btn1 accordion1-button collapsed1"
                            type="button"
                            data-bs-toggle="collapse1"
                            data-bs-target="#content-accordion1-8"
                          >
                            How can I be safe from any scam/harassments being an
                            athlete?
                          </button>
                        </h2>
                        <div
                          id="content-accordion1-8"
                          className="accordion1-collapse1 collapse1"
                          data-bs-parent="#faqlist"
                        >
                          <p className="accordion1-body">
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="py-51">
          <div className="container1">
            <div className="row1 d-xxl-flex1 justify-content-xxl-center1">
              <div className="col-sm-61 col-md-3">
                <a>
                  <img
                    className="img-fluid1 d-block mx-auto1"
                    src="/POA.png"
                    style={{ width: "135px" }}
                  />
                </a>
              </div>
              <div className="col-sm-61 col-md-3" style={{ width: "350px" }}>
                <a>
                  <img
                    className="img-fluid1 d-block mx-auto1"
                    src="/Guinness.png"
                    style={{ width: "157px" }}
                  />
                </a>
              </div>
              <div className="col-sm-61 col-md-3">
                <a>
                  <img
                    className="img-fluid1 d-block mx-auto1"
                    src="/Olympic.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          style={{ backgroundImage: "url(assets/img/map-image.png)" }}
        >
          <div className="container1">
            <div className="row1">
              <div className="col-lg-121 text-center1">
                <h2 className="text-uppercase section-heading1">Contact Us</h2>
                <h3 className="text-muted1 section-subheading1">
                  You can contact us by filling the form below.
                </h3>
              </div>
            </div>
            <div className="row1">
              <div className="col-lg-121">
                <form
                  id="contactForm"
                  name="contactForm"
                  novalidate="novalidate"
                >
                  <div className="row1">
                    <div className="col-md-6">
                      <div className="form-group1 mb-311">
                        <input
                          className="form-control1"
                          onChange={handleChange}
                          type="text"
                          id="name"
                          value={name}
                          name="name"
                          placeholder="Your Name *"
                          required=""
                        />
                        <small className="form-text1 text-danger1 flex-grow-1 help-block lead1"></small>
                      </div>
                      <div className="form-group1 mb-311">
                        <input
                          className="form-control1"
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          id="email"
                          placeholder="Your Email *"
                          required=""
                        />
                        <small className="form-text1 text-danger1 help-block lead1"></small>
                      </div>
                      <div className="form-group1 mb-311">
                        <input
                          className="form-control1"
                          type="number"
                          name="phone"
                          value={contact}
                          onChange={handleChange}
                          placeholder="Your Phone *"
                          required=""
                        />
                        <small className="form-text1 text-danger1 help-block lead1"></small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group1 mb-311">
                        <textarea
                          className="form-control1"
                          id="message"
                          name="message"
                          onChange={handleChange}
                          placeholder="Your Message *"
                          required=""
                        ></textarea>
                        <small className="form-text1 text-danger1 help-block lead1"></small>
                      </div>
                    </div>
                    <div className="w-1001"></div>
                    <div className="col-lg-121 text-center1">
                      <div id="success"></div>
                      <button
                        className="btn1 btn1-primary btn1-xl text-uppercase"
                        id="sendMessageButton"
                        onClick={handleSubmit}
                        type="submit"
                        style={{ background: "#fab822", color: "#001c33" }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container1">
            <div className="row1">
              <div className="col-md-41">
                <span className="copyright1">
                  Copyright&nbsp;© Athletistan 2022
                </span>
              </div>
              <div className="col-md-41">
                <ul className="list-inline1 social-buttons1">
                  <li className="list-inline1-item">
                    <a>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline1-item">
                    <a>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline1-item">
                    <a>
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-41">
                <ul className="list-inline1 quicklinks1">
                  <li className="list-inline1-item">
                    <a style={{ color: "rgb(250,184,34)" }}>Privacy Policy</a>
                  </li>
                  <li className="list-inline1-item">
                    <a style={{ color: "rgb(250,184,34)" }}>Terms of Use</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default hometemp;
