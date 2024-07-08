import "../../Css/bootstrap.min.css";
import React from 'react';

function OlvidoContraCampos({ onSubmit, setEmail }) {
    const handleChange = (e) => {
        setEmail(e.target.value); // Actualizar el estado del correo electrónico
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(); // Llamar a la función de envío desde el componente padre
    };

    return (
        <form className="user" onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
                <input 
                    className="form-control form-control-user" 
                    type="email" 
                    id="exampleInputEmail" 
                    placeholder="Inserte su correo electrónico"
                    onChange={handleChange} // Manejar cambios en el campo de correo electrónico
                />
            </div>
            <button 
                className="btn btn-primary d-block btn-user w-100" 
                type="submit" 
                style={{ background: 'var(--bs-emphasis-color)' }}
            >
                Cambiar contraseña
            </button>
        </form>
    );
}

export default OlvidoContraCampos;
