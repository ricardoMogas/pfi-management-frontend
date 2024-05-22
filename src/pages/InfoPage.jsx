import React from 'react';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };
const InfoPage = () => {
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
                    <h2>Repository Information</h2>
                </div>
                <div className='card-body'>
                    <p>Nombre de repositorio: PFI MASO</p>
                    <p>Repository API: <a href="https://github.com/ricardoMogas/PFI-Services-Api" target='_blank'>PFI-Services-Api</a></p>
                    <br />
                    <p>Repository Frontend: <a href="https://github.com/ricardoMogas/pfi-management-frontend" target='_blank'>pfi-management-frontend</a></p>
                </div>

            </div>
        </>
    );
};

export default InfoPage;