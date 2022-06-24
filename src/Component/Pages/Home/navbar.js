import "./styles.css";

function App() {
  return (
    <body
      id="page-top"
      data-bs-spy="scroll"
      data-bs-target="#mainNav"
      data-bs-offset="54"
    >
      <nav
        className="navbar navbar-dark navbar-expand-lg fixed-top fixed_top"
        id="mainNav"
      >
        <div className="container">
          <a
            className="navbar-brand text-start d-xxl-flex"
            href="#page-top"
            style={{ fontFamily: "Work Sans, sans-serif" }}
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
              <li className="nav-item">
                <a className="nav-link" href="#homepage">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#guinness">
                  Guinness
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#olympics">
                  Olympics
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#faq">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
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
          <div className="dropdown no-arrow" style={{ width: "263.469px" }}>
            <a
              className="dropdown-toggle nav-link"
              aria-expanded="false"
              data-bs-toggle="dropdown"
            >
              <span
                className="d-none d-lg-inline me-2 text-gray-600 small"
                style={{ fontSize: "16px" }}
              >
                Valerie Luna
              </span>
              <img
                className="border rounded-circle img-profile"
                src="assets/img/profile.png"
                style={{ width: "36px" }}
              />
            </a>
            <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
              <a className="dropdown-item">
                <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                &nbsp;Profile
              </a>
              <a className="dropdown-item">
                <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                &nbsp;Settings
              </a>
              <a className="dropdown-item">
                <i className="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>
                &nbsp;Activity log
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item">
                <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                &nbsp;Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </body>
  );
}

export default App;
