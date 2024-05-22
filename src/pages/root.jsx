import { Outlet } from "react-router-dom";
import { useLocation, useNavigate  } from "react-router-dom";
import NavBar from "../components/NavBar";
import routes from "../routes";
import { useEffect } from "react";

const isAuthenticated = () => {
    // Suponiendo que la autenticación se maneja con un token en localStorage
    return !!localStorage.getItem('authToken');
};

export default function Root() {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("Existe token: "+isAuthenticated());
        if (!isAuthenticated()) {
            navigate("/login");
        } else if (location.pathname === "/") {
            navigate("/home");
        }
    }, [location.pathname, navigate]);

    return (
        <>
            {isAuthenticated() && <NavBar routes={routes[0].children} />}
            <div id="Content" style={{overflow: "auto"}}>
                <Outlet />
            </div>
        </>
    );
}
