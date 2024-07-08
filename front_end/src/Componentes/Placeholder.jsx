import React, { useState } from "react";
import FormEmerg from "./Comp_Helpers/FormEmerg";
import Navbar from "./Comp_Helpers/Navbar";
import Topbar from "./Comp_Helpers/Topbar";
import Footer from "./Comp_Helpers/Footer";
import "../Css/adicciones.css";

function Placeholder() {
    const [showForm, setShowForm] = useState(false);
    const [hideForm, setHideForm] = useState(false);

    const handleFormClose = () => {
        setHideForm(true);
        setTimeout(() => setShowForm(false), 300); // 300ms is the duration of the zoom-out animation
    };

    return (
        <>
            <div id="page-top"></div>
            <div id="wrapper">
                <Navbar />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <Topbar titulo="Placeholder" />
                        <div className="container-fluid">
                            <h3 className="text-dark mb-4">Placeholder</h3>
                            <div className="row mb-3">
                                <button onClick={() => setShowForm(true)}>Mostrar Formulario</button>
                                {showForm && (
                                    <div className={`overlay ${hideForm ? 'zoom-out' : 'zoom-in'}`}>
                                        <FormEmerg closeForm={handleFormClose} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Placeholder;