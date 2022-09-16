import { Modal, notification } from "antd";

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

export function openNotification(type, title, description, icon) {
  notification[type]({
    message: title,
    description: description,
    icon: icon !== undefined ? icon : "",
  });
}
