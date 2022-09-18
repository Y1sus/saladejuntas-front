import { Modal, notification } from "antd";

// este archivo contiene las funciones que se encargan de mostrar los mensajes de alerta, de error y de confirmación.

export function modalSuccess(texto) {
  Modal.success({
    content: texto,
  });
}

export async function modalError(texto) {
  Modal.error({
    title: "Error",
    content: texto,
  });
}

export function modalWarning(texto) {
  Modal.warning({
    title: "Advertencia",
    content: texto,
  });
}

// esta es la función principal que se encarga de mostrar el mensaje de confirmación, 
// recibe como parámetros el tipo de mensaje, el texto que se mostrará, 
// la descripción del mensaje y un icono opcional.
export function openNotification(type, title, description, icon) {
  notification[type]({
    message: title,
    description: description,
    icon: icon !== undefined ? icon : "",
  });
}
