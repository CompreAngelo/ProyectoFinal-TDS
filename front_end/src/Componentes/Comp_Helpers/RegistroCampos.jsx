import "../../Css/bootstrap.min.css";
import React from 'react';

function RegistroCampos({ label, type, placeholder, value, onChange }) {
    return (
        
            <div className="mb-3">
                <label htmlFor={label} className="form-label">{label}</label>
                <input 
                    type={type} 
                    className="form-control form-control-user" 
                    id={label} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange} 
                    required 
                />
            </div>
             
    );
}

export default RegistroCampos;