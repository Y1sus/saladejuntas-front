import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { openNotification } from "../ModalesAlerts/Alerts";
import { SmileOutlined } from "@ant-design/icons";

const HeaderNav = ({ children }) => {
  const navigate = useNavigate();
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const logout = async () => {
    localStorage.removeItem("token");
    openNotification(
      "success",
      "Hasta Pronto",
      "Ahora saldrá del sistema",
      <SmileOutlined style={{ color: "#108ee9" }} />
    );
    navigate("/login");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{ fontWeight: "bold", color: "white " }}>
        <div className="container">
          <Link
            to="/reservaciones"
            className="navbar-brand"
            about="Sala de Juntas"
            style={{ fontWeight: "bold", color: "white " }}
          >
            Sala De Juntas
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="collapsibleNavId">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/reservaciones"
                  className="nav-link"
                  aria-expanded="false"
                  style={{ fontWeight: "bold", color: "white " }}
                >
                  Reservaciones
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/salones" className="nav-link" aria-expanded="false" style={{ fontWeight: "bold", color: "white " }}>
                  Salones
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ fontWeight: "bold", color: "white " }}
                >
                  <i className="fa fa-user" aria-hidden="true"></i>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {/* <a className="dropdown-item" href="#">
                    Configuración
                  </a>
                  <div className="dropdown-divider"></div> */}
                  <a className="dropdown-item" onClick={logout}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </Fragment>
  );
};

export default HeaderNav;
