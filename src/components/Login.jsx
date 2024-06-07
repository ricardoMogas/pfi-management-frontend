import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import sessionFetch from '../store/Requests/sessionFetch';
import { SendMail } from '../store/SendMail';
import { event } from 'jquery';
import SimpleAlert from "../store/SimpleAlert";
const sessionObject = new sessionFetch(import.meta.env.VITE_REACT_APP_BASE_API);
export default function Login() {
    const [missPassword, setMissPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Aquí deberías agregar la lógica de autenticación, 
        // como una llamada a una API para verificar las credenciales
        // Suponiendo que la autenticación es exitosa y recibes un token:
        setLoading(true);
        const data = await sessionObject.login(username, password);
        setLoading(false);
        if (data.result) {
            console.log(data.result);
            localStorage.setItem("name", username);
            localStorage.setItem("authToken", "token");
            navigate("/home");
        } else {
            SimpleAlert('error', 'Credenciales incorrectas');
        }
    };



    return (
        <>
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
            {missPassword ? (
                <>
                    <div className='text-center m-2'>
                        <button className="btn btn-secondary btn-block" onClick={() => setMissPassword(!missPassword)}>
                            Iniciar Sesión
                        </button>
                    </div>
                    <FormRecoveryPass event={() => setMissPassword(!missPassword)} />
                </>
            ) : (
                <>
                    <title>Login</title>
                    <div className="login-container">
                        <div className="logo-container">
                            <img src="/PFILogo.png" alt="Logo" />
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
                        </form>
                        <a href="#" onClick={() => setMissPassword(!missPassword)}>Olvide mi contraseña</a>
                        <div className='text-center m-2'>
                            <button className="btn btn-primary btn-block" onClick={handleLogin} disabled={loading}>
                                {loading ? "Cargando..." : "Iniciar Sesión"}
                            </button>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}

function FormRecoveryPass({ event }) {
    const [loading, setLoading] = useState(false);
    const [sendEmail, setSendEmail] = useState(false);
    const [correctCode, setCorrectCode] = useState(false);
    const [generateCode, setGenerateCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');  // Added state for email

    const generateRandomCode = () => {
        const code = Math.floor(Math.random() * 10000);
        return code.toString().padStart(4, '0');
    };

    const comprobeCode = (value) => {
        setCode(value);
        if (generateCode === value) {
            setCorrectCode(true);
        } else {
            setCorrectCode(false);
        }
    };

    const changePassword = () => {
        // Aquí deberías agregar la lógica para cambiar la contraseña
        event();
        SimpleAlert('success', 'Contraseña cambiada');
    };

    const handleSendEmail = () => {
        // Aquí deberías agregar la lógica para enviar el correo de recuperación
        SimpleAlert('success', 'Correo enviado');
        const newCode = generateRandomCode();
        setGenerateCode(newCode);
        SendMail(email, newCode, setLoading); // funcion para enviar correo
        console.log(newCode);
        setSendEmail(true);
    };

    const handleRecovePass = async () => {
        // Aquí deberías agregar la lógica para recuperar la contraseña
        const result = await sessionObject.recoverPass(newPassword, email);
        console.log(result);
        if (result.status !== "error") {
            event();
            SimpleAlert('success', 'Contraseña cambiada');
        } else {
            event();
            SimpleAlert('error', "Error al cambiar contraseña: " + result.result);
        }
    }

    
    return (
        <>
            <div className="login-container">
                <div className="logo-container">
                    <img src="/PFILogo.png" alt="Logo" />
                </div>
                <div className='text-center'><h2>Recuperar Contraseña</h2></div>
                {sendEmail ? (
                    <>
                        <form>
                            <div className="form-group">
                                <label htmlFor="code">Ingresa código</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Código de verificación"
                                        value={code}
                                        onChange={(e) => comprobeCode(e.target.value)}
                                        disabled={correctCode}
                                    />
                                </div>
                                <label htmlFor="newPassword">Nueva contraseña</label>
                                <div className="input-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Nueva contraseña"
                                        value={newPassword}  // Ensure newPassword is controlled
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={!correctCode}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className='text-center m-2'>
                            <button
                                className="btn btn-primary btn-block"
                                disabled={!correctCode}
                                onClick={handleRecovePass}
                            >
                                Cambiar contraseña
                            </button>
                        </div>
                        <div className="alert alert-success" role="alert">
                            Se ha enviado un correo con el código de recuperación
                        </div>
                    </>
                ) : (
                    <>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Ingresa el correo de recuperación</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Introduce tu correo"
                                        value={email}  // Ensure email is controlled
                                        onChange={(e) => setEmail(e.target.value)}  // Update email state
                                    />
                                </div>
                            </div>
                        </form>
                        <div className='text-center m-2'>
                            <button className="btn btn-primary btn-block" onClick={handleSendEmail} disabled={loading}>
                                {loading ? "Cargando..." : "Enviar correo"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

