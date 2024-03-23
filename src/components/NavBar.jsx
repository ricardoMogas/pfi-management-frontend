import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo_PFI from '../assets/Logo_PFI.png';
const NavBar = (routes) => {
    useEffect(() => {
        console.log(routes);
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
                                <Link className="nav-link" to={route.path}> {route.title} </Link>
                            </li>
                        );
                    })}
                    
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;