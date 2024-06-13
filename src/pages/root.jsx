import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import routes from "../routes";
import { useEffect, useState } from "react";
// import "../mainScript";
const isAuthenticated = () => {
    // Suponiendo que la autenticación se maneja con un token en localStorage
    return !!localStorage.getItem('authToken');
};

export default function Root() {
    const [hideSidebar, setHideSidebar] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("Existe token: " + isAuthenticated());
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [location.pathname, navigate]);

    const handleHideSidebar = (value) => {
        setHideSidebar(value);
    };

    return (
        <>
            <SideBar hide={hideSidebar} routes={routes[0].children} />
            <section id="content">
                <NavBar hideEvent={handleHideSidebar}/>
                <div className="p-5">
                    <Outlet />
                </div>
            </section>
        </>
    );
}
