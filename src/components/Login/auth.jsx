import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component, ...rest }) => {
  // console.log(useParams());
  const isAuth = () => {
    if (localStorage.getItem("token") !== null) {
      return true;
    }
    return false;
  };

  return isAuth() ? (
    <component {...rest} is="x3d" />
  ) : (
    <Navigate replace to="/login" />
  );
};
export default PrivateRoute;
