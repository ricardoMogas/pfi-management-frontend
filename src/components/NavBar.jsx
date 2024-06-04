import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Switch from '../../ui_components/Switch';
import Logo_PFI from '../assets/Logo_PFI.png';

const NavBar = ({ routes, hideEvent }) => {
    const [hide, setHide] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const signOut = () => {
        // Lógica para cerrar la sesión
        localStorage.removeItem('authToken');
        navigate("/login");
    }
    const hideSidebar = () => {
        setHide(!hide);
        hideEvent(hide);
    }

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);
    return (
        <>
            <nav>
                <i className="bx bx-menu bi bi-three-dots-vertical" onClick={() => hideSidebar()}></i>

                <form action="#">
                    <div className="form-input">
                        {/* SEPARADOR DE EN EMEDIO
                        <input type="search" placeholder="Search..." />
                        <button type="submit" className="search-btn">
                            <i className="bx bx-search" />
                        </button>
                        */}
                    </div>
                </form>
                <Switch isChecked={isDarkMode} setIsChecked={setIsDarkMode} />
                <label htmlFor="switch-mode" className="switch-mode" />
                <a href="#" className="profile">
                    <div>
                    Bienvenido: {localStorage.getItem('name')}
                    <i className="bi bi-person-circle m-1"></i>
                    </div>
                </a>
            </nav>
            {/*
             <nav
                className="navbar navbar-expand-lg navbar-light fixed-top"
                style={{ backgroundColor: "#fff" }}
            >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            src={Logo_PFI}
                            alt="Logo"
                            width={40}
                            height={40}
                            className="d-inline-block align-text-top"
                        />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                        style={{ color: "#000", borderColor: "#000" }}
                    >
                        <i className="bi bi-caret-down-fill" style={{ color: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}></i>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className="nav nav-underline">
                            {routes.routes.map((route, index) => {
                                return (
                                    <li className="nav-item" key={index}>
                                        <Link
                                            className={`nav-link ${route.path === location.pathname ? 'active' : ''} ms-3`}
                                            to={route.path}
                                            style={{ color: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}
                                        >
                                            {route.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <button className="btn btn-danger m-2" onClick={() => signOut()}>
                        Cerrar aplicación
                    </button>
                </div>
            </nav>
         */}
        </>
    );
};

export default NavBar;