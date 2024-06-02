import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo_PFI from '../assets/LogosUni.png';
const SideBar = ({ routes, hide }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const signOut = () => {
        // Lógica para cerrar la sesión
        localStorage.removeItem('authToken');
        navigate("/login");
    }
    useEffect(() => {
        console.log("Ubicación: " + location.pathname);
        console.log(routes);
    }, [location.pathname]);
    return (
        <>
            <section id="sidebar" className={hide ? "hide" : ""}>
                <a href="#" className="brand">
                    <img className='bx' src="Logo_PFI.png" alt="Logo pfi" />
                    <span className="text">MASO</span>
                </a>
                <ul className="side-menu top">
                    {routes.map((route, index) => (
                        <li key={index} className={route.path === location.pathname ? 'active' : ''}>
                            <Link 
                                to={route.path}
                            >
                                <i className={`bx ${route.iconClass}`}></i>
                                <span className="text">{route.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="side-menu">
                    <li>
                        <a href="#">
                            <i className="bx bi bi-gear"></i>
                            <span className="text">Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="logout" onClick={signOut}>
                            <i className="bx bi bi-box-arrow-left"></i>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </section>

        </>
    );
};

export default SideBar;