import React, {useState} from 'react';
import { SendMailEvery } from '../store/SendMail';
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
            <div className="card m-5">
                <div className='card-header' style={ColorPrimary}>
                    <h2>Desarrolladores</h2>
                </div>
                <div className='card-header'>
                    <h3>Equipo</h3>
                    <p>
                        Ricardo J Moo Vargas
                        <br />
                        Angel G Manrero Hidalgo
                        <br />
                        Jorge F Dzul Cobos
                        <br />
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

            <div className="card m-5">
                <div className='card-header' style={ColorPrimary}>
                    <h2>Documentación</h2>
                </div>
                <div className='card-body'>
                    <p>Nombre de repositorio: PFI MASO</p>
                    <p>Repository API: <a href="https://github.com/ricardoMogas/PFI-Services-Api" target='_blank'>PFI-Services-Api</a></p>
                    <br />
                    <p>Repository Frontend: <a href="https://github.com/ricardoMogas/pfi-management-frontend" target='_blank'>pfi-management-frontend</a></p>
                    <br />
                    <button className='btn btn-info' onClick={handleDownload}>
                        Descargar manual de usuario
                        <br />
                        <i className="bi bi-arrow-down-circle"></i>
                    </button>
                </div>

            </div>
        </>
    );
};

export default InfoPage;