import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Solo importamos Routes y Route
import Olvidocontrase from './Componentes/olvidocontrase';
import Registro from './Componentes/Registro';
import Login from './Componentes/login';
import Home from './Componentes/Home';
import Nuevamulta from './Componentes/Nuevamulta';
import Perfil from './Componentes/perfil';
import HomeAdm from './Componentes/home-adm';
import HomeUser from './Componentes/home-usuario';
import ReporteUsuario from './Componentes/reporte-usuario';
import Historial from './Componentes/Historial';
import Eror404 from './Componentes/Error404';
import Nuevomsg from './Componentes/Nuevomensaje';
import Placeholder from './Componentes/Placeholder';
import { useAuth } from './context/provider';
import MultasAdim from './Componentes/multas-admin';
import HomeUsuario from './Componentes/home-usuario';
import Reportesadm from './Componentes/Reportesadm';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/olvidocontrasena" element={<Olvidocontrase />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/" element={<Login />} />
      {user?.user?.role === 'AGENTE' && <Route path="/home-agente" element={<Home />} />}
      {user?.user?.role === 'USUARIO' && <Route path="/home-usuario" element={<HomeUser />} />}
      {user?.user?.role === 'USUARIO' && <Route path="/reporte-usuario" element={<ReporteUsuario />} />}
      {user?.user?.role === 'ADMINISTRADOR' && <Route path="/home-adm" element={<HomeAdm />} />}
      {user?.user?.role === 'ADMINISTRADOR' && <Route path="/multas-admin" element={<MultasAdim />} />}
      {user?.user?.role === 'USUARIO' && <Route path="/home-user" element={<HomeUser />} />}
      {user?.user?.role === 'AGENTE' && <Route path="/nuevamulta" element={<Nuevamulta />} />}
      {(user?.user?.role === 'ADMINISTRADOR' || user?.user?.role === 'AGENTE' || user?.user?.role === 'USUARIO') && <Route path="/perfil" element={<Perfil />} />}
      {user?.user?.role === 'AGENTE' && <Route path="/historial" element={<Historial />} />}
      {user?.user?.role === 'ADMINISTRADOR' && <Route path="/notificaciones" element={<Nuevomsg />} />}
      {user?.user?.role === 'ADMINISTRADOR' && <Route path="/reportes-adm" element={<Reportesadm />} />}
      <Route path="/ph" element={<Placeholder />} />
      <Route path="*" element={<Eror404 />} />
    </Routes>
  );
}

export default App;