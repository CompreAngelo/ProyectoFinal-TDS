import React, { useEffect, useState } from "react";
import { IconoHistorial, IconoHome, IconoMultas, IconoXD, Icono, IconoTop } from "./Iconos.jsx"
import { useAuth } from '../../context/provider.jsx';

function Topbar({titulo}) {
    const { user } = useAuth();
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');

    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setUserNombre(user.user.nombre);
        }
    }, [user]);

    console.log('Usuario en Topbar:', user);
    return (
        <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
            <div className="container-fluid">
                <div href="#index.html"></div>
                <div>
                    <nav className="navbar navbar-expand navbar-light" id="sidebar-wrapper">
                        <div className="container"><button data-bs-toggle="collapse" className="navbar-toggler d-none" data-bs-target="#navbarResponsive"></button></div>
                    </nav>
                </div>
                <div></div>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <h3 className="text-dark mb-0">{titulo}</h3>
                    <ul className="navbar-nav flex-nowrap ms-auto">
                        <li className="nav-item dropdown d-sm-none no-arrow show"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search"></i></a>
                            <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
                                <form className="me-auto navbar-search w-100">
                                    <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                                        <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search"></i></button></div>
                                    </div>
                                </form>
                            </div>
                        </li>       
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Topbar;