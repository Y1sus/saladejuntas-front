import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Salon.css";
import { config } from "../../Utils/config";

export const Salon = () => {
  const navigate = useNavigate();

  const URL_API = "http://localhost:4000/api/salon";
  const [salones, setSalones] = useState([]);
  const [color, setColor] = useState("");

  const obtenerSalones = async () => {
    const response = await axios.get(URL_API, config.httpConfig);
    if (response.status === 200) {
      setSalones(response.data.data);
    }
  };

  useEffect(() => {
    obtenerSalones();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row d-flex flex-row justify-content-end p-1 mb-5">
        <div className="titulo">Salones Actuales</div>
        <div className="col text-right">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/salones/nuevo")}
          >
            Nuevo Salón
          </button>
        </div>
      </div>
      <div className="row">
        {salones.length == 0 ? (
          <div className="container">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              <h2>No hay salones</h2>
            </div>
          </div>
        ) : (
          salones.map((salon) => {
            return (
              <div className="col-6 mb-3" key={salon.id_salon}>
                <div
                  className="card cardSalon"
                  style={{
                    borderColor:
                      salon.salon_estatus.id_salon_estatus === 2
                        ? "#b91616"
                        : "#16169c",
                  }}
                >
                  <div className="card-header"></div>
                  <div className="card-body text-center">
                    <h4 className="card-title">{salon.nombre_salon}</h4>
                    <hr className="hr hr-blurry" />
                    <span className="card-text">{salon.descripcion_salon}</span>
                    <h2
                      className="mt-3 estatus"
                      style={{
                        color:
                          salon.salon_estatus.id_salon_estatus === 2
                            ? "#b91616"
                            : "#16169c",
                      }}
                    >
                      {salon.salon_estatus.nombre_estatus}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
