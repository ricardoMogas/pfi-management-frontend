import React, { useState } from 'react';
import { Card, Tab, Nav } from 'react-bootstrap';
export default function VisitRegisterPage() {
    const [activeTab, setActiveTab] = useState('visitas');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const visitas = [
        { matricula: 'ABC123', FechaEntrada: '2022-10-01', FechaSalida: '2022-10-01' },
        { matricula: 'DEF456', FechaEntrada: '2022-10-02', FechaSalida: '2022-10-01' },
        { matricula: 'GHI789', FechaEntrada: '2022-10-03', FechaSalida: '2022-10-01' },
    ];

    const handleEliminarVisita = (index) => {
        // Code to handle deleting a visit
    };

    const handleRegistrarVisita = () => {
        // Code to handle registering a visit
    };

    const handleRegistrarSalida = () => {
        // Code to handle registering a visit's exit
    };

    return (
        <div className="container text-center">
            <h1>Registrar Vistas</h1>
            <div className='card'>
                <div className='card-header' id="myTab" role="tablist">
                    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                Registrados
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                No Registrados
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        <TableRegistrados visitas={visitas} handleEliminarVisita={handleEliminarVisita} handleRegistrarSalida={handleRegistrarSalida} handleRegistrarVisita={handleRegistrarVisita} />
                    </div>
                    <div
                        className="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <TableRegistrados visitas={visitas} handleEliminarVisita={handleEliminarVisita} handleRegistrarSalida={handleRegistrarSalida} handleRegistrarVisita={handleRegistrarVisita} />
                    </div>
                </div>
            </div>
        </div>
    );
};

function TableRegistrados({ visitas , handleRegistrarVisita, handleRegistrarSalida, handleEliminarVisita}) {
    return (
        <>
            <div className='container m-5'>
                <div className='row'>
                    <div className='col'>
                        <div className="form-group">
                            <label htmlFor="matricula">Matrícula</label>
                            <input
                                type="text"
                                className="form-control"
                                id="matricula"
                                placeholder="Ingrese la matrícula"
                            />
                        </div>
                    </div>
                    <div className='col'>
                        <button type="button" className="btn btn-primary" onClick={handleRegistrarVisita}>Registrar Visita</button>{' '}
                        <button type="button" className="btn btn-secondary" onClick={handleRegistrarSalida}>Registrar Salida</button>{' '}
                        <button type="button" className="btn btn-danger" onClick={() => handleEliminarVisita(index)}>Eliminar Visita</button>{' '}
                    </div>
                </div>
            </div>
            <div className='container'>
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Matrícula</th>
                            <th scope="col">Fecha de Entrada</th>
                            <th scope="col">Fecha de Salida</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitas.map((visita, index) => (
                            <tr key={index}>
                                <td>{visita.matricula}</td>
                                <td>{visita.FechaEntrada}</td>
                                <td>{visita.FechaSalida}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleEliminarVisita(index)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}