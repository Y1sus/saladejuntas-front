import React, { useEffect, useState } from "react";
import axios from "axios";

import "./SalonReservacion.css";
import { config } from "../../Utils/config";

export const SalonReservacion = ({ setSalonSeleccionado }) => {
  const URL_API = "http://localhost:4000/api/salon/disponibles";
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
    <div className="container mt-3 d-flex justify-content-center">
      <div className="row">
        {salones.length === 0 ? (
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <h4 className="sinSalones">No hay salones disponibles</h4>
          </div>
        ) : (
          salones.map((salon) => {
            return salon.salon_estatus.id_salon_estatus === 2 ? (
              ""
            ) : (
              <div className="col-6 mb-3" key={salon.id_salon}>
                <label>
                  <input
                    type="radio"
                    name="demo"
                    className="card-input-element d-none"
                    id="demo1"
                    value={salon.id_salon}
                    onClick={(e) => {
                      setSalonSeleccionado(e.target.value);
                    }}
                  />
                  <span className="card card-body bg-light d-flex flex-row justify-content-between align-items-center">
                    {salon.nombre_salon}
                  </span>
                </label>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
