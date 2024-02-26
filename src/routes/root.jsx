import { Outlet, Link } from "react-router-dom";

export default function Root() {
    const routes = [
        { path: "/home", label: "Principal" },
        { path: "/contacts/1", label: "Contactos" },
    ];

    return (
        <>
            <div id="sidebar">
                <h1>Principal</h1>
                <div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="text..." />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
                    </div>
                </div>
                <nav>
                    <ul>
                        {routes.map((route, index) => (
                            <li key={index}>
                                <Link to={route.path}>{route.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}
