import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HeaderNav from "./components/NavBar/HeaderNav";
import { Salon } from "./components/Salon/Salon";
import { Reservacion } from "./components/Reservacion/Reservacion";
import { NuevaReservacion } from "./components/Reservacion/NuevaReservacion";
import { NuevoSalon } from "./components/Salon/NuevoSalon";
import { Login } from "./components/Login/Login";
import PrivateRoute from "./components/Login/auth";
import { Registro } from "./components/Registro/Registro";

function App() {
  return (
    // En esta parte se crean las rutas para la navegación SPA en el proyecto
    <div className="App">
      <Routes>
        {/* las rutas que pueden consultarse sin necesidad de verificación de token son solo registro y login */}
        <Route default exact path="/login" element={<Login />} />
        <Route default exact path="/registro" element={<Registro />} />
        {/* Las demás rutas necesitan ser verificadas con un token para poder accesarlas al igual que comparten el mismo navbar */}
        <Route
          path="/salones"
          element={
            <PrivateRoute>
              <HeaderNav>
                <Salon />
              </HeaderNav>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/reservaciones"
          element={
            <PrivateRoute>
              <HeaderNav>
                <Reservacion />
              </HeaderNav>
            </PrivateRoute>
          }
        />
        <Route
          path="/reservaciones/nueva"
          element={
            <PrivateRoute>
              <HeaderNav>
                <NuevaReservacion />
              </HeaderNav>
            </PrivateRoute>
          }
        />
        <Route
          path="/salones/nuevo"
          element={
            <PrivateRoute>
              <HeaderNav>
                <NuevoSalon />
              </HeaderNav>
            </PrivateRoute>
          }
        />
        {/* Aquí se declara la ruta por defecto, que en caso de no estar logueado te redirige al login, de lo contrario la ruta por defecto es reservaciones */}
        <Route path="*" element={<Navigate to="/reservaciones" replace />} />
      </Routes>
    </div>
  );
}

export default App;
