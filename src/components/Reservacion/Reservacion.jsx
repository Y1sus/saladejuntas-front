import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../ModalesAlerts/Alerts";
import axios from "axios";
import { Popconfirm } from "antd";
import './reservacion.css';


export const Reservacion = () => {
  const id_usuario = localStorage.getItem("id_usuario");
  const navigate = useNavigate();
  const URL_API = "http://localhost:4000/api/reservacion";

  const [reservaciones, setReservaciones] = useState([]);
  const [reservacionCount, setReservacionCount] = useState(0);

  const httpConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const obtenerReservaciones = async () => {
    const obtenerReservaciones = await axios.post(
      URL_API,
      { id_usuario },
      httpConfig
    );
    if (obtenerReservaciones.status === 200) {
      setReservaciones(obtenerReservaciones.data.data);
      setReservacionCount(obtenerReservaciones.data.data.length);
    }
  };

  const handleCancelarReservacion = async (reservacion) => {
    const url_cancelar = URL_API + "/finish/" + reservacion;

    const cancelarReservacion = await axios.post(url_cancelar, {}, httpConfig);
    if (cancelarReservacion.status === 200) {
      setReservacionCount(reservacionCount - 1);
      openNotification(
        "success",
        "Reservacion cancelada",
        "Se ha cancelado la reservacion"
      );
    } else {
      openNotification(
        "danger",
        "Cancelar reservación",
        "No se pudo cancelar la reservación"
      );
    }
  };
  useEffect(() => {
    obtenerReservaciones();
  }, [reservacionCount]);

  return (
    <div className="container mt-3">
      <div className="row d-flex flex-row justify-content-end p-1 mb-5">
        <div className="col text-right">
          <button
            className="btn btn-primary "
            onClick={() =>
              navigate("/reservaciones/nueva", {
                state: { reservaciones: reservaciones },
              })
            }
            style={{fontWeight:'bold'}}
          >
            Nueva Reservación
          </button>
        </div>
      </div>
      <div className="row">
        {reservacionCount === 0 ? (
          <div className="container">
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              <h2>No hay reservaciones actualmente</h2>
            </div>
          </div>
        ) : (
          reservaciones.map((reservacion) => {
            return (
              <div className="col-6 mb-3" key={reservacion.id_reservacion}>
                <div className="card">
                  <h4
                    className=" text-center card-header"
                    style={{ background: "black", color: "white" }}
                  >
                    Reservación
                  </h4>
                  <div className="card-body text-center">
                    <div className="card-text h4 mb-3" style={{fontWeight:'bold'}}>
                      {reservacion.usuario.detalles_usuario.nombre +
                        " " +
                        reservacion.usuario.detalles_usuario.apellidos}
                    </div>
                    <div className="card-text h5 mb-2">
                      {reservacion.salon.nombre_salon}
                    </div>
                    <div className="card-text h6">
                      {reservacion.hora_inicial} - {reservacion.hora_final}
                    </div>
                    <Popconfirm
                      title="¿Seguro que desea cancelar la reservación?"
                      onConfirm={() =>
                        handleCancelarReservacion(reservacion.id_reservacion)
                      }
                    >
                      <button className="btn btn-danger mt-4" style={{fontWeight:'bold'}}>Terminar</button>
                    </Popconfirm>
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
