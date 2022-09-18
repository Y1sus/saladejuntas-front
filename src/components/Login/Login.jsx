import { PasswordRounded, AccountCircle } from "@mui/icons-material";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { openNotification } from "../ModalesAlerts/Alerts";
import { useNavigate } from "react-router-dom";
import "./login.css";

// esta función es la principal de la pagina, en ella se hace la petición al servidor
// para verificar si el usuario existe y si la contraseña es correcta, si todo es correcto
// se redirecciona a la pagina principal, si no se muestra un mensaje de error
export const Login = () => {
  const navigate = useNavigate();
  const URL_LOGIN = "http://localhost:4000/api/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  // esta funcion es la que se encarga de asignar el valor del input a la variable email
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail(false);
  };

  // esta funcion es la que se encarga de asignar el valor del input a la variable password
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword(false);
  };

  // esta función es la que se encarga de hacer la petición al servidor para verificar si el usuario existe
  // y si la contraseña es correcta, si todo es correcto se redirecciona a la pagina principal, si no se muestra un mensaje de error
  const handleLogin = async () => {
    if (email === "" || email === undefined) {
      setErrorEmail(true);
    } else if (password === "" || password === undefined) {
      setErrorPassword(true);
    } else {
      const data = {
        email,
        password,
      };
      // hacemos la petición al servidor y el resultado lo guardamos en la variable login para posteriormente validar si se pudo hacer la petición
      const login = await axios.post(URL_LOGIN, data);
      if (login.status === 200) {
        if (login.data.token !== undefined) {
          // en caso de que la petición sea correcta se guarda el token en el localstorage y se redirecciona a la pagina principal
          openNotification("success", "Login", "Credenciales correctas");
          // await sleep(3000);
          localStorage.setItem("token", login.data.token);
          localStorage.setItem("id_usuario", login.data.data.id_usuario);
          localStorage.setItem(
            "id_tipos_usuario",
            login.data.data.tipos_usuario.id_tipos_usuario
          );
          await navigate("/reservaciones");
        }
      } else {
        openNotification(
          "error",
          "Error",
          "Las credenciales ingresadas son incorrectas"
        );
      }
    }
  };
  // función que manda al formulario de registro 
  const handleRegistro = () => {
    navigate("/registro");
  };

  return (
    // creamos el formulario con los inputs y los botones para hacer login 
    <div className="container containerLogin">
      <div className="card cardLogin">
        <div
          className="card-header text-center"
          style={{
            background: "black",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Iniciar Sesión
        </div>
        <div className="card-body">
          <form>
            <div className="form-group mt-4">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  error={errorEmail}
                  helperText={errorEmail && "El correo es requerido"}
                  required
                  id="standard-basic"
                  label="Correo"
                  variant="standard"
                  type="email"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </Box>
            </div>
            <div className="form-group mt-5 mb-5">
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <PasswordRounded
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  error={errorPassword}
                  helperText={errorPassword && "La contraseña es requerida"}
                  required
                  id="password"
                  label="Contraseña"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                />
              </Box>
            </div>
            <Button
              className="float-left"
              style={{ fontWeight: "bold" }}
              onClick={handleRegistro}
            >
              Registro
            </Button>
            <Button
              className="float-right"
              style={{ fontWeight: "bold" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
