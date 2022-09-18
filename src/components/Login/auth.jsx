import React from "react";
import { Navigate } from "react-router-dom";

// Se declara un ruta privada que es la que hace la verificación de que exista un token, de lo contrario hace un redirect al login
const PrivateRoute = ({ component, ...rest }) => {
  const isAuth = () => {
    if (localStorage.getItem("token") !== null) {
      return true;
    }
    return false;
  };

  // usamos una validación sencilla para saber si el token existe, de ser así se renderiza
  // el componente hijo que se le está pasando, de lo contrario se regresa al usuario al login
  return isAuth() ? (
    <component {...rest} is="x3d" />
  ) : (
    <Navigate replace to="/login" />
  );
};
export default PrivateRoute;
