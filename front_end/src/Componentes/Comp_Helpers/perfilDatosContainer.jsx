import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/provider";


function PerfilDatos() {
  const { user } = useAuth();
  const [userNombre, setUserNombre] = useState("Usuario no encontrado");
  const [userCedula, setUserCedula] = useState("Cédula no encontrada");
  const [userApellido, setUserApellido] = useState("Apellido no encontrado");

  useEffect(() => {
    if (user && user.user && user.user.nombre) {
      setUserNombre(user.user.nombre);
      setUserCedula(user.user.cedula);
      setUserApellido(user.user.apellido);
      console.log(user)
    }
  })

  return (
    <div className="row ">
      <div className="col ms-auto">
        <div className="card shadow mb-3">
          <div className="card-header py-3">
            <p className="text-success m-0 fw-bold">Datos del Usuario</p>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      <strong>Nombre</strong>
                    </label>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    placeholder={`${userNombre} ${userApellido}`}
                    name="username"
                    readOnly
                  />
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="cedula">
                      <strong>Cédula</strong>
                    </label>
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    id="cedula"
                    placeholder={userCedula}
                    name="cedula"
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-3"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilDatos;
