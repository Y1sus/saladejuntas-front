import { PasswordRounded, AccountCircle } from "@mui/icons-material";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { openNotification } from "../ModalesAlerts/Alerts";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const navigate = useNavigate();
  const URL_LOGIN = "http://localhost:4000/api/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword(false);
  };

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
      const login = await axios.post(URL_LOGIN, data);
      if (login.status === 200) {
        if (login.data.token !== undefined) {
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
  const handleRegistro = () => {
    navigate("/registro");
  };

  return (
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
            <Button className="float-left" style={{fontWeight:'bold'}} onClick={handleRegistro}>
              Registro
            </Button>
            <Button className="float-right" style={{fontWeight:'bold'}} onClick={handleLogin}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
