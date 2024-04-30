import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo_PFI from '../assets/Logo_PFI.png';
const NavBar = (routes) => {
    const location = useLocation();

    return (
        <nav 
            className="navbar navbar-expand-lg navbar-light fixed-top" 
            style={{ backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}
        >
            <div className="container-fluid">
                <ul className="nav nav-underline">
                    <a className="navbar-brand" href="#">
                        <img
                            src={Logo_PFI}
                            alt="Logo"
                            width={30}
                            height={30}
                            className="d-inline-block align-text-top"
                        />
                    </a>
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
        </nav>
    );
};

export default NavBar;