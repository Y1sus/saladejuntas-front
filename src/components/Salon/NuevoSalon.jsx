import { Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { openNotification } from "../ModalesAlerts/Alerts";

const { TextArea } = Input;

export const NuevoSalon = () => {
  //   const navigate = useNavigate();
  const [nombreText, setNombreText] = useState("");
  const [descText, setDescText] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const httpConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleNombreChange = (e) => {
    setNombreText(e.target.value);
    setStatusInput("");
  };

  const handleDescChange = (e) => {
    setDescText(e.target.value);
  };

  const handleGuardarSalon = async () => {
    const url_nuevo_salon = "http://localhost:4000/api/salon/agregar";

    if (nombreText !== "") {
      if (descText === "") {
        setDescText("Descripción default");
      }
      const data = {
        nombre_salon: nombreText,
        descripcion_salon: descText,
      };
      const nuevoSalon = await axios.post(url_nuevo_salon, data, httpConfig);
      if (nuevoSalon.status === 200) {
        setNombreText("");
        setDescText("");
        openNotification("success", "Éxito", "Se creó el salón");
      } else {
        openNotification("error", "Error", "No se pudo crear el salón");
      }
    } else {
      openNotification(
        "warning",
        "Campos incompletos",
        "Ingrese todos los datos solicitados"
      );
      setStatusInput("error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div
          className="card-header h5"
          style={{ background: "black", color: "white", fontWeight: "bold" }}
        >
          Nuevo Salón
        </div>
        <div className="card-body justify-content-center text-center" style={{background:'#f0ecec'}}>
          <div className="row">
            <div className="col-3">
              <div className="text-right">
                <span style={{ color: "red" , fontWeight:'bold'}}>* </span>Nombre:
              </div>
            </div>
            <div className="col-9">
              <Input
                status={statusInput}
                placeholder="Ingrese el nombre del salón"
                allowClear
                value={nombreText}
                onChange={handleNombreChange}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-3">
              <div className="text-right">Descripción:</div>
            </div>
            <div className="col-9">
              <TextArea
                // status={statusInput}
                placeholder="Ingrese la descripción para el nuevo salón"
                allowClear
                rows={3}
                value={descText}
                onChange={handleDescChange}
              />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div>
            <div className="text-right">
              <button className="btn btn-primary" onClick={handleGuardarSalon}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
