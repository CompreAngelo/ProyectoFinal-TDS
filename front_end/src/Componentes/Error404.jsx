import React from "react";
import "../Css/error.css";
import Footer from './Comp_Helpers/Footer.jsx';
import { Link } from 'react-router-dom';


function Error404() {
    return (
        <div>
            <section className="u-align-center u-clearfix u-palette-1-light-2 u-section-1" id="carousel_7246">
                <div class="u-clearfix u-sheet u-valign-middle-sm u-valign-middle-xl u-valign-middle-xs u-sheet-1 con">
                    <div className="u-clearfix u-sheet u-valign-middle-sm u-valign-middle-xl u-valign-middle-xs u-sheet-1"> </div>
                    <img className="u-expanded-width-xs u-image u-image-contain u-image-default u-image-1" src="../404-erroor.png" alt="" />
                </div>
                <div className="u-section-1-link"> 
                        <Link to="/"style={{ textDecoration: "none", color: "white", backgroundColor: "rgb(4, 131, 55)", border: "none", borderRadius: "50px", padding: "10px 20px" }}>Go to Inicio</Link>
                    </div> 
          
            </section>
            <Footer />
        </div>
    );
}

export default Error404;
