import "./App.css";
import { Routes, Route } from "react-router-dom";
import HeaderNav from "./components/NavBar/HeaderNav";
import { Salon } from "./components/Salon/Salon";
import { Reservacion } from "./components/Reservacion/Reservacion";
import { NuevaReservacion } from "./components/Reservacion/NuevaReservacion";
import { NuevoSalon } from "./components/Salon/NuevoSalon";
import { Login } from "./components/Login/Login";
import PrivateRoute from "./components/Login/auth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route default exact path="/login" element={<Login />} />
        {/* <Route path="/" element={ <h1>Hola mundo</h1>} /> */}
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
        {/* <Route path="/salon" element={ <Salon />} /> */}
      </Routes>
    </div>
  );
}

export default App;
