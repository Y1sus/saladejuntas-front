import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log(useParams());
  const isAuth = () => {
    if (localStorage.getItem("token") !== null) {
      return true;
    }
    return false;
  };

  return isAuth() ? <component {...rest} /> : <Navigate replace to="/login" />;
};
export default PrivateRoute;
