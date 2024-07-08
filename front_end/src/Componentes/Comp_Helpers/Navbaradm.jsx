import React, { useEffect, useState } from "react";
import { useAuth } from '../../context/provider.jsx';
import "../../Css/Navestilo.css";
import { limpiarDatosLocalStorage } from "../../helpers/localStorage.jsx";

function Navbaradm() {
    const { user } = useAuth();
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');
    const [imgavatar, setImgavatar] = useState(null);

    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setUserNombre(user.user.nombre);
            setImgavatar(user.user.foto);
        }
    }, [user]);

    const handleSalir = () => {
        // Llamar a la función para limpiar los datos del localStorage
        limpiarDatosLocalStorage();
        // Redirigir al usuario al inicio o a la página de inicio de sesión
        window.location.href = '/';
    };

    const [isOpen, setIsOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('home-agente');

    useEffect(() => {
        const storedActiveMenuItem = sessionStorage.getItem('activeMenuItem');
        if (storedActiveMenuItem) {
            setActiveMenuItem(storedActiveMenuItem);
        }
    }, []);

    const handleLinkClick = (e, pageName) => {
        setActiveMenuItem(pageName);
        sessionStorage.setItem('activeMenuItem', pageName);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="menuDesktop">
        <div
          className={`menuTogle ${isOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        ></div>
        <nav className={`sidebar ${isOpen ? "active" : ""}`}>
          <ul>
            <li className="logo" style={{ background: "#ff000000" }}>
              <a className="navbar-brand" href="#">
                <img
                  className="img-fluid"
                  width="150"
                  height="150"
                  src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png"
                  alt="Logo"
                />
              </a>
            </li>
            <div className="MenuList">
              <li
                style={{ "--bg": "#6bfaa4" }}
                className={activeMenuItem === "home-adm" ? "active" : ""}
              >
                <a
                  href="/home-adm"
                  onClick={(e) => handleLinkClick(e, "home-adm")}
                >
                  <div className="icon2">
                    <i className="fas fa-home"></i>
                  </div>
                  <p>Inicio</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#2bff00" }}
                className={activeMenuItem === "perfil" ? "active" : ""}
              >
                <a href="/perfil" onClick={(e) => handleLinkClick(e, "perfil")}>
                  <div className="icon2">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <p>Perfil</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#2bff00" }}
                className={activeMenuItem === "nuevamulta" ? "active" : ""}
              >
                <a
                  href="/multas-admin"
                  onClick={(e) => handleLinkClick(e, "nuevamulta")}
                >
                  <div className="icon2">
                    <i className="fa-solid fa-mail-bulk"></i>
                  </div>
                  <p>Multas</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#81760d" }}
                className={activeMenuItem === "historial" ? "active" : ""}
              >
                <a href="/notificaciones" onClick={(e) => handleLinkClick(e, "historial")}>
                  <div className="icon2">
                    <i className="fa-solid fa-money-check"></i>
                  </div>
                  <p>Enviar Mensaje</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#81760d" }}
                className={activeMenuItem === "reportes-adm" ? "active" : ""}
              >
                <a href="/reportes-adm" onClick={(e) => handleLinkClick(e, "reportes-adm")}>
                  <div className="icon2">
                    <i className="fa-solid fa-flag"></i>
                  </div>
                  <p>Reportes</p>
                </a>
              </li>
            </div>
            <div className="bottom">
              <li style={{ "--bg": "#ff0000" }}>
                <a href="/perfil">
                  <div className="icon2">
                    <div className="imgbx">
                      <img src={imgavatar} alt="Avatar" />
                    </div>
                  </div>
                  <p>{userNombre}</p>
                </a>
              </li>
              <li style={{ "--bg": "#7c2121" }}>
                <a href="/" onClick={handleSalir}>
                  <div className="icon2">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </div>
                  <p>Salir</p>
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
      <div className={`menuMobile ${isOpen ? "active" : ""}`}>
        <div
          className={`menuTogle ${isOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        ></div>
        <nav className={`responsiveMenu ${isOpen ? "active" : ""}`}>
          <ul>
            <div className="MenuList">
              <li
                style={{ "--bg": "#ffe600" }}
                className={activeMenuItem === "home-adm" ? "active" : ""}
              >
                <a
                  href="/home-adm"
                  onClick={(e) => handleLinkClick(e, "home-adm")}
                >
                  <p className="uppercase">Inicio</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#2bff00" }}
                className={activeMenuItem === "perfil" ? "active" : ""}
              >
                <a href="/perfil" onClick={(e) => handleLinkClick(e, "perfil")}>
                  <p className="uppercase">Perfil</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#81760d" }}
                className={activeMenuItem === "nuevamulta" ? "active" : ""}
              >
                <a
                  href="/multas-admin"
                  onClick={(e) => handleLinkClick(e, "nuevamulta")}
                >
                  <p className="uppercase">Multas</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#4d0000" }}
                className={activeMenuItem === "historial" ? "active" : ""}
              >
                <a
                  href="notificaciones"
                  onClick={(e) => handleLinkClick(e, "historial")}
                >
                  <p className="uppercase">Enviar Mensaje</p>
                </a>
              </li>
              <li
                style={{ "--bg": "#4d0000" }}
                className={activeMenuItem === "reportes-adm" ? "active" : ""}
              >
                <a
                  href="reportes-adm"
                  onClick={(e) => handleLinkClick(e, "reportes-adm")}
                >
                  <p className="uppercase">Reportes de Usuarios</p>
                </a>
              </li>
            </div>
            <div className="bottom">
              <li style={{ "--bg": "#ff0000" }}>
                <a href="#">
                  <p className="uppercase">{userNombre}</p>
                </a>
              </li>
              <li style={{ "--bg": "#7c2121" }}>
                <a href="/" onClick={handleSalir}>
                  <p className="uppercase">Salir</p>
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
        </div>
    );
}

export default Navbaradm;