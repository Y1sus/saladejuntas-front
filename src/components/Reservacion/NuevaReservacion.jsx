import { SalonReservacion } from "../Salon/SalonReservacion";
import { TimePicker } from "antd";

import "antd/dist/antd.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../ModalesAlerts/Alerts";
import axios from "axios";

export const NuevaReservacion = () => {
  const id_usuario = localStorage.getItem("id_usuario");
  // const location = useLocation();
  const navigate = useNavigate();

  // const [reservaciones, setReservaciones] = useState(
  //   location.state.reservaciones
  // );
  const [salonSeleccionado, setSalonSeleccionado] = useState(0);
  const [horaInicial, setHoraInicial] = useState("");
  const [horaFinal, setHoraFinal] = useState("");

  const httpConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleOnchange = (time) => {
    if (
      parseHours(moment(time[1]).format("HH:mm")) -
        parseHours(moment(time[0]).format("HH:mm")) >
      2
    ) {
      openNotification(
        "warning",
        "Demasiado tiempo",
        "El rango de tiempo debe ser máximo 2 horas"
      );
    } else {
      setHoraInicial(moment(time[0]).format("HH:mm"));
      setHoraFinal(moment(time[1]).format("HH:mm"));
    }
  };

  const parseHours = (s) => {
    var c = s.split(":");
    return parseInt(c[0]);
  };

  // const disabledTime = (current) => {
  //   const horasIniciales = [];
  //   const horasFinales = [];
  //   reservaciones.map((res) => {
  //     horasIniciales.push(parseHours(res.hora_inicial));
  //     horasFinales.push(parseHours(res.hora_final));
  //   });

  //   return {
  //     disabledHours: () => horasIniciales.concat(horasFinales),
  //     // disabledMinutes: () =>
  //     //   range(parseMinutes(horaInicial), parseMinutes(horaFinal)),
  //   };
  // };

  const disabledTime = (current) => {
    const hours = [0, 1, 2, 3, 4, 5];
    return { disabledHours: () => hours };
  };
  const handleSave = async () => {
    const url_nueva_reservacion =
      "http://localhost:4000/api/reservacion/create";

    if (salonSeleccionado !== 0) {
      if (horaInicial !== "" && horaFinal !== "") {
        const data = {
          id_usuario: id_usuario,
          id_salon: salonSeleccionado,
          hora_inicial: horaInicial,
          hora_final: horaFinal,
        };

        // console.log(data);
        const nuevaReservacion = await axios.post(
          url_nueva_reservacion,
          data,
          httpConfig
        );
        if (nuevaReservacion.status === 200) {
          openNotification(
            "success",
            "Reservación Creada",
            "Se creó la reservación"
          );
          navigate("/reservaciones");
        } else {
          openNotification("error", "Error", "No se pudo crear la reservación");
        }
      } else {
        openNotification(
          "warning",
          "Ingrese el horario",
          "Debe seleccionar un horario"
        );
      }
    } else {
      openNotification(
        "warning",
        "Seleccione un salón",
        "Debe seleccionar un salón"
      );
    }
  };
  return (
    <div className="container mt-4">
      <div className="card">
        <div
          className="card-header text-center h5"
          style={{ background: "black", color: "white", fontWeight: "bold" }}
        >
          Nueva Reservación
        </div>
        <div className="card-body justify-content-center text-center" style={{background:'#f0ecec'}}>
          <h6>Seleccione un salón</h6>
          <SalonReservacion setSalonSeleccionado={setSalonSeleccionado} />
          <h5 className="mt-3 mb-3">Seleccione horario</h5>
          <TimePicker.RangePicker
            onOk={handleOnchange}
            placeholder={["Inicio", "Fin"]}
            format="h:mm"
            minuteStep={5}
            disabledTime={disabledTime}
          />
        </div>
        <div className="card-footer">
          <div>
            <div className="text-right">
              <button className="btn btn-primary" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
