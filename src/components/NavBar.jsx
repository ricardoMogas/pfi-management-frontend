import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo_PFI from '../assets/LogosUni.png';
const NavBar = (routes) => {
    const location = useLocation();
    const navigate = useNavigate();
    const signOut = () => {
        // Lógica para cerrar la sesión
        localStorage.removeItem('authToken');
        navigate("/login");
    }

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light fixed-top"
            style={{ backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}
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
                    style={{ color: "#fff", borderColor: "#fff" }}
                >
                    <i className="bi bi-caret-down-fill" style={{ color: "#fff" }}></i>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className="nav nav-underline">
                        {routes.routes.map((route, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <Link
                                        className={`nav-link ${route.path === location.pathname ? 'active' : ''} ms-3`}
                                        to={route.path}
                                        style={{ color: '#fff' }}
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
    );
};

export default NavBar;