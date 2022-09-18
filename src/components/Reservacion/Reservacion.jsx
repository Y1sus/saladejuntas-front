import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../ModalesAlerts/Alerts";
import axios from "axios";
import { Popconfirm } from "antd";
import "./reservacion.css";

// esta función es la principal de la pagina, en ella se hace la
// petición al servidor para obtener y mostrar las reservaciones

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

  // esta función es la que se encarga de hacer la petición al servidor para obtener las reservaciones
  // y guardarlas en la variable de estado reservaciones y en la variable de estado reservacionCount guardamos el numero de reservaciones
  // para posteriormente mostrarlo en la pagina
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

  // esta función es la que se encarga de hacer la petición al servidor para eliminar una reservación
  // y posteriormente actualizar la lista de reservaciones

  const handleCancelarReservacion = async (reservacion) => {
    const url_cancelar = URL_API + "/finish/" + reservacion;

    // se hace la petición al servidor para cancelar la reservación y el resultado
    // lo guardamos en la variable cancelarReservacion para posteriormente validar si se pudo hacer la petición
    const cancelarReservacion = await axios.post(url_cancelar, {}, httpConfig);
    if (cancelarReservacion.status === 200) {
      // si se pudo cancelar la reservación se muestra un mensaje de confirmación
      // y se actualiza la cantidad de reservaciones en la variable de estado reservacionCount
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
  // el useEffect sirve para que se ejecute una función cuando se renderiza el
  // componente o cuando se actualiza una variable de estado
  // en este caso se ejecuta la función obtenerReservaciones cuando se renderiza el componente
  // y cada  que se actualiza la variable de estado reservacionCount
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
            style={{ fontWeight: "bold" }}
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
                    <div
                      className="card-text h4 mb-3"
                      style={{ fontWeight: "bold" }}
                    >
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
                      <button
                        className="btn btn-danger mt-4"
                        style={{ fontWeight: "bold" }}
                      >
                        Terminar
                      </button>
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
