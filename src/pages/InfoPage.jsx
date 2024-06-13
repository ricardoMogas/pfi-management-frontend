import React, { useState } from 'react';
import { SendMailEvery } from '../store/SendMail';
import Welcome from '../components/Welcome';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };
const InfoPage = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'Manual_de_usuario_(Software PFI).pdf';
        link.download = 'Manual_de_usuario_(Software PFI).pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const [loading, setLoading] = useState(false);
    const corre = "richyisusmoov@gmail.com";
    const mensaje = "Hola desde la app";
    const sendEmail = () => {
        SendMailEvery("Ricardo", corre, mensaje, setLoading);
    };
    return (
        <>
            <div className="card my-5">
                <div className='card-header' style={ColorPrimary}>
                    <h2>Links externos</h2>
                </div>
                <div className='card-body'>
                    <p><strong>Control de BD</strong> <a href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=pfiv3" target='_blank'>phpmyadmin</a></p>
                    <p>Usuarion : root </p>
                    <p> contraseña : </p>
                    <br />
                    <p><strong>Control de Emails</strong> <a href="https://dashboard.emailjs.com/admin" target='_blank'>Emailjs</a></p>
                    <p> Usuario : pfi-ingenieria@uacam.mx </p>
                    <p> contraseña : 7r$@CVuVmW6!Ds5 </p>
                    <p><strong>Github : </strong></p>
                </div>
            </div>

            <div className="card my-5">
                <div className='card-header' style={ColorPrimary}>
                    <h2>Desarrolladores</h2>
                </div>
                <div className='card-header'>
                    <h3>Equipo</h3>
                    <p>
                         <strong>Lider de proyecto</strong> : Ricardo J Moo Vargas
                        <br />
                        <strong> Documentación : </strong> Angel G Manrero Hidalgo
                        <br />
                        <strong> Documentación : </strong> Jorge F Dzul Cobos
                        <br />
                        <strong>Equipo de desarrollo:</strong><br />
                        Arturo A Zavala Morales
                        <br />
                        Axel A Chavez Moreno
                        <br />
                        Gael A Carrillo Chan
                        <br />
                        Uriel I Landeros Mijangos
                        <br />
                        Ricardo A Puc Duran
                    </p>
                </div>
            </div>

            <div className="card my-5">
                <div className='card-header' style={ColorPrimary}>
                    <h2>Documentación</h2>
                </div>
                <div className='card-body'>
                    <h2>Informacion de repositorio:  </h2>
                    <p>Repository API: <a href="https://github.com/ricardoMogas/PFI-Services-Api" target='_blank'>PFI-Services-Api</a></p>
                    <br />
                    <p>Repository Frontend: <a href="https://github.com/ricardoMogas/pfi-management-frontend" target='_blank'>pfi-management-frontend</a></p>
                    <br />
                    <button className='btn btn-info' onClick={handleDownload}>
                        Descargar manual de usuario
                        <br />
                        <i className="bi bi-arrow-down-circle"></i>
                    </button>
                    <h2>Modificación del proyecto :  </h2>
                    <strong>Subir cambios: </strong>
                </div>


            </div>
        </>
    );
};

export default InfoPage;