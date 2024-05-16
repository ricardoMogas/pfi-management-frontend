import React, { useState } from 'react';
import Utils from '../store/Utils';
const visitas = [
    { registration: 'ABC123', entry_time: '2022-10-01', exit_time: '2022-10-01', visit_date: '2022-10-01' },
    { registration: 'DEF456', entry_time: '2022-10-02', exit_time: '2022-10-01', visit_date: '2022-10-01' },
    { registration: 'GHI789', entry_time: '2022-10-03', exit_time: '2022-10-01', visit_date: '2022-10-01' },
];
const NoRevisitas = [
    { registration: 'ABC123', entry_time: '2022-10-01', exit_time: '2022-10-01', visit_date: '2022-10-01', NoVisitas: 1 },
    { registration: 'DEF456', entry_time: '2022-10-02', exit_time: '2022-10-01', visit_date: '2022-10-01', NoVisitas: 1 },
    { registration: 'GHI789', entry_time: '2022-10-03', exit_time: '2022-10-01', visit_date: '2022-10-01', NoVisitas: 5 },
];

export default function VisitRegisterPage() {
    const [date, setDate] = useState(Utils.ActualDate());
    const [registerVisit, setRegisterVisit] = useState();
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const VisitRegister = () => {

    };



    const handleRegistrarSalida = () => {
        const horaActual = new Date().toLocaleTimeString();
        const registroActualizado = { ...registros[registros.length - 1], horaSalida: horaActual };
        setRegistros([...registros.slice(0, -1), registroActualizado]);
    };

    return (
        <div className="container">
            <div className='card'>
                <div className='card-header' id="myTab" role="tablist">
                    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#Registrados"
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
                                data-bs-target="#NoRegistrados"
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
                        id="Registrados"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        {/*********** Registrados **********/}
                        <div className='container'>
                            <div className='container'>
                                <div className='row m-5'>
                                    <div className='col'>
                                        <div className="mb-1">
                                            <label htmlFor="registrados" className="form-label">Matrícula:</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="registrados" 
                                                name="registrados" 
                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="date" className="form-label">Fecha:</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                id="date" 
                                                name="date" 
                                                value={date} 
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='col d-flex justify-content-center align-items-center'>
                                        <div className="mb-3">
                                            <div className='mb-1'>
                                                <button 
                                                    className="btn btn-primary btn-block mb-2" 
                                                >Registrar visita</button>
                                            </div>
                                            <div className='mb-1'>
                                                <button 
                                                    className="btn btn-primary mb-2" 
                                                >Registrar salida</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Matrícula</th>
                                            <th>Fecha</th>
                                            <th>Hora de entrada</th>
                                            <th>Hora de salida</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visitas.map((registro, index) => (
                                            <tr key={index}>
                                                <td>{registro.registration}</td>
                                                <td>{registro.visit_date}</td>
                                                <td>{registro.entry_time}</td>
                                                <td>{registro.exit_time}</td>
                                                <td>
                                                    <button className='btn btn-danger mb-2'>
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="NoRegistrados"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        {/* No registrados */}
                        <div className='container'>
                            <div className='row m-5'>
                                <div className='col'>
                                    <div className="mb-1">
                                        <label htmlFor="registrados" className="form-label">Matrícula:</label>
                                        <input type="text" className="form-control" id="registrados" name="registrados" />
                                    </div>
                                    <div className="mb-1">
                                        <label htmlFor="date" className="form-label">Fecha:</label>
                                        <input type="date" className="form-control" id="date" name="date" value={date} onChange={handleDateChange} />
                                    </div>
                                </div>
                                <div className='col d-flex justify-content-center align-items-center'>
                                    <div className="mb-3">
                                        <div className='mb-1'>
                                            <button 
                                                className="btn btn-primary btn-block mb-2" 
                                            >Registrar visita</button>
                                        </div>
                                        <div className='mb-1'>
                                            <button 
                                                className="btn btn-primary mb-2" 
                                            >Registrar salida</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row m-1'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Matrícula</th>
                                            <th>Fecha</th>
                                            <th>Hora de entrada</th>
                                            <th>Hora de salida</th>
                                            <th>No. de Visitas</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {NoRevisitas.map((registro, index) => (
                                            <tr key={index}>
                                                <td>{registro.registration}</td>
                                                <td>{registro.visit_date}</td>
                                                <td>{registro.entry_time}</td>
                                                <td>{registro.exit_time}</td>
                                                <td style={{ color: registro.NoVisitas >= 5 ? 'red' : 'inherit' }}>{registro.NoVisitas}</td>
                                                <td>
                                                    <button className='btn btn-danger mb-2'>
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Aquí va el código de la página */}
        </div>
    );
};
