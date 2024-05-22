import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // Aquí deberías agregar la lógica de autenticación, 
        // como una llamada a una API para verificar las credenciales
        // Suponiendo que la autenticación es exitosa y recibes un token:
        if (username === "root" && password === "root") {
            localStorage.setItem("authToken", "token");
            navigate("/home");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    useEffect(() => {
        
    }, []);
    return (
        <>
            <title>Login</title>
            {/* Bootstrap CSS */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        body {
                            background: linear-gradient(135deg, #0056b3, ${import.meta.env.VITE_REACT_COLOR_PRIMARY});
                            background-size: 400% 400%;
                            animation: gradientBG 15s ease infinite;
                            height: 100vh;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            overflow: hidden;
                            margin: 0;
                        }
                        .login-container {
                            background: white;
                            padding: 4rem; /* Aumenta el padding para un contenedor más grande */
                            border-radius: 16px;
                            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                            max-width: 600px; /* Aumenta el max-width para un contenedor más ancho */
                            width: 100%;
                            opacity: 0;
                            transform: translateX(-100%);
                            animation: slideInLeft 1s forwards;
                        }
                        .login-container .form-group label {
                            color: ${import.meta.env.VITE_REACT_COLOR_PRIMARY};
                            transition: color 0.3s ease;
                        }
                        .login-container .form-control {
                            transition: border-color 0.3s ease, box-shadow 0.3s ease;
                        }
                        .login-container .form-control:focus {
                            box-shadow: none;
                            border-color: ${import.meta.env.VITE_REACT_COLOR_PRIMARY};
                        }
                        .login-container .btn-primary {
                            background: ${import.meta.env.VITE_REACT_COLOR_PRIMARY};
                            border: none;
                            transition: background 0.3s ease, transform 0.3s ease;
                        }
                        .login-container .btn-primary:hover {
                            background: ${import.meta.env.VITE_REACT_COLOR_PRIMARY};
                            transform: translateY(-3px);
                        }
                        .login-container h2 {
                            margin-bottom: 1rem;
                            color: ${import.meta.env.VITE_REACT_COLOR_PRIMARY};
                            transition: color 0.3s ease;
                        }
                        .login-container .form-group .input-group-text {
                            background: ${import.meta.env.VITE_REACT_COLOR_PRIMARY};
                            border: none;
                            color: white;
                        }
                        .login-container .logo-container {
                            text-align: center;
                            margin-bottom: 1.5rem;
                        }
                        .login-container .logo-container img {
                            max-width: 150px;
                        }

                        @keyframes slideInLeft {
                            to {
                                opacity: 1;
                                transform: translateX(0);
                            }
                        }

                        @keyframes gradientBG {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `
                }}
            />
            <div className="login-container">
                <div className="logo-container">
                    <img src="public/PFILogo.png" alt="Logo" />
                </div>
                <div className='text-center'><h2>Iniciar Sesión</h2></div>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Usuario</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-person"></i>
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Introduce tu correo"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="bi bi-lock"></i>
                                </span>
                            </div>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Introduce tu contraseña"
                            />
                        </div>
                    </div>
                    <div className='text-center m-2'>
                        <button className="btn btn-primary btn-block" onClick={handleLogin}>
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
            {/* Bootstrap JS and dependencies */}
        </>
    );
}
