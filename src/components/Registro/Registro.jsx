import axios from "axios";
import { useState } from "react";
import { openNotification } from "../ModalesAlerts/Alerts";
import { useNavigate } from "react-router-dom";
import "./registro.css";

export const Registro = () => {
  let validar = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let validarTelefono = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const navigate = useNavigate();
  const URL_REGISTRO = "http://localhost:4000/api/registro";

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [nombreError, setNombreError] = useState({
    visible: false,
    mensaje: "",
  });
  const [apellidosError, setApellidosError] = useState({
    visible: false,
    mensaje: "",
  });
  const [domicilioError, setDomicilioError] = useState({
    visible: false,
    mensaje: "",
  });
  const [telefonoError, setTelefonoError] = useState({
    visible: false,
    mensaje: "",
  });
  const [edadError, setEdadError] = useState({
    visible: false,
    mensaje: "",
  });
  const [emailError, setEmailError] = useState({
    visible: false,
    mensaje: "",
  });
  const [passwordError, setPasswordError] = useState({
    visible: false,
    mensaje: "",
  });
  const [passwordConfirmationError, setPasswordConfirmationError] = useState({
    visible: false,
    mensaje: "",
  });

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
    setNombreError({ visible: false });
  };
  const handleChangeApellidos = (e) => {
    setApellidos(e.target.value);
    setApellidosError({ visible: false });
  };
  const handleChangeDomicilio = (e) => {
    setDomicilio(e.target.value);
    setDomicilioError({ visible: false });
  };
  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
    setTelefonoError({ visible: false });
  };
  const handleChangeEdad = (e) => {
    setEdad(e.target.value);
    setEdadError({ visible: false });
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError({ visible: false });
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError({ visible: false });
  };
  const handleChangePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
    setPasswordConfirmationError({ visible: false });
  };

  const handleRegistrar = async () => {
    if (nombre === "")
      setNombreError({ visible: true, mensaje: "Ingrese su nombre" });
    else if (apellidos === "")
      setApellidosError({ visible: true, mensaje: "Ingrese sus apellidos" });
    else if (domicilio === "")
      setDomicilioError({ visible: true, mensaje: "Ingrese su domicilio" });
    else if (telefono === "")
      setTelefonoError({ visible: true, mensaje: "Ingrese su teléfono" });
    else if (validarTelefono.test(telefono) === false)
      setTelefonoError({
        visible: true,
        mensaje: "Ingrese un teléfono válido",
      });
    else if (edad <= 0 || isNaN(edad))
      setEdadError({ visible: true, mensaje: "Ingrese su edad" });
    else if (email === "")
      setEmailError({ visible: true, mensaje: "Ingrese su correo" });
    else if (validar.test(email) === false)
      setEmailError({ visible: true, mensaje: "Ingrese un correo válido" });
    else if (password === "")
      setPasswordError({ visible: true, mensaje: "Ingrese su contraseña" });
    else if (passwordConfirmation === "")
      setPasswordConfirmationError({
        visible: true,
        mensaje: "Ingrese la confirmación de contraseña",
      });
    else if (password !== passwordConfirmation)
      setPasswordError({
        visible: true,
        mensaje: "Las contraseñas no coincide",
      });
    else {
      const data = {
        nombre: nombre,
        apellidos: apellidos,
        domicilio: domicilio,
        telefono: telefono,
        edad: edad,
        email: email,
        password: password,
      };
      const nuevoRegistro = await axios.post(URL_REGISTRO, data);
      if (nuevoRegistro.status === 200) {
        openNotification("success", "Éxito", "Se ha registrado correctamente");
        navigate("/login");
      } else {
        setNombreError({ visible: false });
        setApellidosError({ visible: false });
        setDomicilioError({ visible: false });
        setTelefonoError({ visible: false });
        setEdadError({ visible: false });
        setEmailError({ visible: false });
        setPasswordError({ visible: false });
        setPasswordConfirmationError({ visible: false });

        openNotification(
          "error",
          "Error",
          "No se pudo crear el registro. Intente de nuevo"
        );
      }
    }
  };

  const handleRegresar = () => {
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <b
          className="card-header text-center"
          style={{ fontSize: "20px", background: "black", color: "white" }}
        >
          Registro
        </b>

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 m-auto">
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <span className="spanRegistro">Nombre</span>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Ingrese su nombre"
                      value={nombre}
                      onChange={handleChangeNombre}
                    />
                    {nombreError.visible ? (
                      <span
                        className="spanRegistro"
                        style={{
                          fontStyle: "italic",
                          color: "red",
                          fontSize: "13px",
                          marginLeft: "5px",
                        }}
                      >
                        {nombreError.mensaje}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-6">
                    <span className="spanRegistro">Apellidos</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingrese sus apellidos"
                      value={apellidos}
                      onChange={handleChangeApellidos}
                    />
                    {apellidosError.visible ? (
                      <span
                        className="spanRegistro"
                        style={{
                          fontStyle: "italic",
                          color: "red",
                          fontSize: "13px",
                          marginLeft: "5px",
                        }}
                      >
                        {apellidosError.mensaje}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <span className="spanRegistro">Domicilio</span>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su domicilio"
                  value={domicilio}
                  onChange={handleChangeDomicilio}
                />
                {domicilioError.visible ? (
                  <span
                    className="spanRegistro"
                    style={{
                      fontStyle: "italic",
                      color: "red",
                      fontSize: "13px",
                      marginLeft: "5px",
                    }}
                  >
                    {domicilioError.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <span className="spanRegistro">Teléfono</span>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="000-000-000"
                      value={telefono}
                      onChange={handleChangeTelefono}
                    />
                    {telefonoError.visible ? (
                      <span
                        className="spanRegistro"
                        style={{
                          fontStyle: "italic",
                          color: "red",
                          fontSize: "13px",
                          marginLeft: "5px",
                        }}
                      >
                        {telefonoError.mensaje}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <span className="spanRegistro">Edad</span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Edad"
                      value={edad}
                      onChange={handleChangeEdad}
                    />
                    {edadError.visible ? (
                      <span
                        className="spanRegistro"
                        style={{
                          fontStyle: "italic",
                          color: "red",
                          fontSize: "13px",
                          marginLeft: "5px",
                        }}
                      >
                        {edadError.mensaje}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <hr className="hr hr-blurry mb-4" />
              <div className="form-group">
                <span className="spanRegistro">Correo</span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email@example.com"
                  value={email}
                  onChange={handleChangeEmail}
                />
                {emailError.visible ? (
                  <span
                    className="spanRegistro"
                    style={{
                      fontStyle: "italic",
                      color: "red",
                      fontSize: "13px",
                      marginLeft: "5px",
                    }}
                  >
                    {emailError.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col">
                  <span className="spanRegistro">Contraseña</span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  {passwordError.visible ? (
                    <span
                      className="spanRegistro"
                      style={{
                        fontStyle: "italic",
                        color: "red",
                        fontSize: "13px",
                        marginLeft: "5px",
                      }}
                    >
                      {passwordError.mensaje}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col">
                  <span className="spanRegistro">Repita la Contraseña</span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={passwordConfirmation}
                    onChange={handleChangePasswordConfirmation}
                  />
                  {passwordConfirmationError.visible ? (
                    <span
                      className="spanRegistro"
                      style={{
                        fontStyle: "italic",
                        color: "red",
                        fontSize: "13px",
                        marginLeft: "5px",
                      }}
                    >
                      {passwordConfirmationError.mensaje}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <button
                className="btn btn-primary float-left mt-4"
                onClick={handleRegresar}
              >
                Regresar
              </button>
              <button
                className="btn btn-success float-right mt-4"
                onClick={handleRegistrar}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
