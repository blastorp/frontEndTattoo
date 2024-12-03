import React from "react";
import '../estilos/navbar.css'
import { useState } from 'react';
import { Link } from "react-router-dom";

function MyNavBar({listaLinks}) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const showSidebar = () => setIsSidebarVisible(true);
    const hideSidebar = () => setIsSidebarVisible(false);

    return (
        <nav>
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
                {/* <li><a href="#">Blog</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Forum</a></li>
                <li><a href="#">Login</a></li> */}
            </ul>

            {/* Main Navigation */}
            <ul>
                <li className="titulo"><a  href="#">Temple of Ink</a></li>
                {listaLinks.map((item,index) => (
                    <li className="hideOnMobile"><Link to={item.ruta}>{item.nombre}</Link></li>
                ))}


                {/* <li className="hideOnMobile"><a href="#">Blog</a></li>
                <li className="hideOnMobile"><a href="#">Products</a></li>
                <li className="hideOnMobile"><a href="#">About</a></li>
                <li className="hideOnMobile"><a href="#">Forum</a></li>
                <li className="hideOnMobile"><a href="#">Login</a></li> */}
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