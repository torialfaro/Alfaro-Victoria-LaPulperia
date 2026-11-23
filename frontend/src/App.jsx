import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import RutaProtegida from './components/RutaProtegida.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Perfil from './pages/Perfil.jsx';
import Inscripcion from './pages/Inscripcion.jsx';
import InscriptosTaller from './pages/InscriptosTaller.jsx';
import Usuarios from './pages/Usuarios.jsx';
import NotFound from './pages/NotFound.jsx';
import { useRouteEffects } from './utils/useRouteEffects.js';

export default function App() {
  useRouteEffects();

  return (
    <>
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingresar" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/perfil"
            element={
              <RutaProtegida>
                <Perfil />
              </RutaProtegida>
            }
          />
          <Route
            path="/inscripcion/:tallerId"
            element={
              <RutaProtegida>
                <Inscripcion />
              </RutaProtegida>
            }
          />
          <Route
            path="/usuarios"
            element={
              <RutaProtegida soloAdmin>
                <Usuarios />
              </RutaProtegida>
            }
          />
          <Route
            path="/inscriptos/:tallerId"
            element={
              <RutaProtegida soloAdmin>
                <InscriptosTaller />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

