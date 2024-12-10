import React from "react";
import '../estilos/navbar.css'
import { useState } from 'react';
import { Link } from "react-router-dom";

function MyNavBar({listaLinks}) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const showSidebar = () => setIsSidebarVisible(true);
    const hideSidebar = () => setIsSidebarVisible(false);

    return (
        <nav className="navJ">
            {/* Sidebar */}
            <ul className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
                <li onClick={hideSidebar}>
                    <a href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="26"
                            viewBox="0 96 960 960"
                            width="26"
                        >
                            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                        </svg>
                    </a>
                </li>
                {listaLinks.map((item,index) => (
                    <li key={index}><Link to={item.ruta}>{item.nombre}</Link>

                        {/* <a href={item.ruta}>{item.nombre}
                            </a> */}
                            
                            </li>
                ))}

            </ul>

            {/* Main Navigation */}
            <ul>
                <li className="titulo"><Link  to="/">Temple of Ink</Link></li>
                {listaLinks.map((item,index) => (
                    <li className="hideOnMobile"><Link to={item.ruta}>{item.nombre}</Link></li>
                ))}

                <li className="menu-button" onClick={showSidebar}>
                    <a href="#">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="26"
                            viewBox="0 96 960 960"
                            width="26"
                        >
                            <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    );
}


export default MyNavBar;