import { Outlet } from "react-router-dom";
import { useLocation, useNavigate  } from "react-router-dom";
import NavBar from "../components/NavBar";
import routes from "../routes";
import { useEffect } from "react";
export default function Root() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        //console.log("Current location:", location.pathname);
        if (location.pathname === "/") {
            navigate("/home");
        }
    }, []);
    return (
        <>
            <NavBar routes={routes[0].children} />
            <div id="Content" style={{overflow: "auto"}}>
                <Outlet />
            </div>
        </>
    );
}
