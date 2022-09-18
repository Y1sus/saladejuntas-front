import { SalonReservacion } from "../Salon/SalonReservacion";
import { TimePicker } from "antd";

import "antd/dist/antd.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../ModalesAlerts/Alerts";
import axios from "axios";

// esta función regresa un componente que muestra el formulario para crear una nueva reservación,
// en este componente se hace la petición al servidor para crear una nueva reservación

export const NuevaReservacion = () => {
  // obtenemos el id del usuario que esta logueado del localstorage y lo guardamos en la variable id_usuario
  const id_usuario = localStorage.getItem("id_usuario");

  // el useNavigate es para redireccionar a otra pagina y se lo asignamos a la variable navigate
  const navigate = useNavigate();

  // estas variables son para guardar los datos de la reservación
  const [salonSeleccionado, setSalonSeleccionado] = useState(0);
  const [horaInicial, setHoraInicial] = useState("");
  const [horaFinal, setHoraFinal] = useState("");

  // con este objeto guardamos los header que se van a enviar en la petición
  // inluyendo el token que se obtuvo del localstorage y el tipo de contenido que se va a enviar
  const httpConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // con esta función asignamos el rango de horas que se pueden seleccionar en el timepicker
  const handleOnchange = (time) => {
    if (
      // si el rango de tiempo seleccionado en el timepicker es mayor a 2 horas
      // entonces se muestra un mensaje de precaución y se limpian los campos de hora inicial y hora final
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
      // si el rango de tiempo es menor a 2 horas entonces se asigna el valor de la hora inicial y final
      setHoraInicial(moment(time[0]).format("HH:mm"));
      setHoraFinal(moment(time[1]).format("HH:mm"));
    }
  };

  // con esta función obtenemos la hora en formato de 24 horas
  const parseHours = (s) => {
    var c = s.split(":");
    return parseInt(c[0]);
  };

  // en esta función asignamos las horas que estarán deshabilitadas en el timepicker
  // para este caso se deshabilitan algunas hora de la madrugada
  const disabledTime = (current) => {
    const hours = [0, 1, 2, 3, 4, 5];
    return { disabledHours: () => hours };
  };

  // con esta función se hace la petición al servidor para crear una nueva reservación
  const handleSave = async () => {
    const url_nueva_reservacion =
      "http://localhost:4000/api/reservacion/create";

    if (salonSeleccionado !== 0) {
      // si el salon seleccionado es diferente de 0 entonces se hace la petición al servidor
      if (horaInicial !== "" && horaFinal !== "") {
        const data = {
          id_usuario: id_usuario,
          id_salon: salonSeleccionado,
          hora_inicial: horaInicial,
          hora_final: horaFinal,
        };

        try {
          const nuevaReservacion = await axios.post(
            url_nueva_reservacion,
            data,
            httpConfig
          );
          if (nuevaReservacion.status === 200) {
            // si la petición fue exitosa entonces se muestra un mensaje de éxito y se 
            // redirecciona a la página de reservaciones
            openNotification(
              "success",
              "Reservación Creada",
              "Se creó la reservación"
            );
            navigate("/reservaciones");
          } else {
            // si la petición no fue exitosa entonces se muestra un mensaje de error
            openNotification(
              "error",
              "Error",
              "No se pudo crear la reservación"
            );
          }
        } catch (error) {
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
        <div
          className="card-body justify-content-center text-center"
          style={{ background: "#f0ecec" }}
        >
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
