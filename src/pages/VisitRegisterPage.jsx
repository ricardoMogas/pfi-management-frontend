import React, { useState } from 'react';

export default function VisitRegisterPage() {
    const [activeTab, setActiveTab] = useState('tab1');
    const [date, setDate] = useState('');
    const [registros, setRegistros] = useState([]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleRegistrarVisita = () => {
        const nuevoRegistro = {
            matricula: document.getElementById('registrados').value,
            fecha: date,
            horaEntrada: new Date().toLocaleTimeString(),
            horaSalida: '',
            NoVisitas: document.getElementById('NoVisitas') ? document.getElementById('NoVisitas').value : ''
        };
        setRegistros([...registros, nuevoRegistro]);

        // Limpiar los campos después de registrar la visita
        document.getElementById('registrados').value = '';
        setDate('');
        if (document.getElementById('NoVisitas')) {
            document.getElementById('NoVisitas').value = '';
        }
    };

    const handleRegistrarSalida = () => {
        const horaActual = new Date().toLocaleTimeString();
        const registroActualizado = { ...registros[registros.length - 1], horaSalida: horaActual };
        setRegistros([...registros.slice(0, -1), registroActualizado]);
    };

    return (
        <div className="card text-center">
            <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <a className={"nav-link" + (activeTab === 'tab1' ? " active" : "")} onClick={() => handleTabClick('tab1')}>Visita de registrados</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + (activeTab === 'tab2' ? " active" : "")} onClick={() => handleTabClick('tab2')}>Visita de No registrados</a>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                <h5 className="card-title">Registro de entradas y salidas (PFI)</h5>
                {activeTab === 'tab1' && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="registrados">Matrícula:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input style={{ marginLeft: '820px' }} type="text" id="registrados" name="registrados" />
                            <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={handleRegistrarVisita}>Registrar visita</button>
                        </div>
                        <label htmlFor="date" style={{ marginLeft: '10px' }}>Fecha:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input style={{ marginLeft: '860px' }} type="date" id="date" name="date" value={date} onChange={handleDateChange} />
                            <button className="btn btn-primary" style={{ marginLeft: '30px' }} onClick={handleRegistrarSalida}>Registrar salida</button>
                        </div>
                    </div>
                )}
                {activeTab === 'tab2' && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="registrados">Matrícula:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input style={{ marginLeft: '850px' }} type="text" id="registrados" name="registrados" />
                            <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={handleRegistrarVisita}>Registrar visita</button>
                        </div>
                        <label htmlFor="date" style={{ marginLeft: '20px' }}>Fecha:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input style={{ marginLeft: '850px' }} type="date" id="date" name="date" value={date} onChange={handleDateChange} />
                            <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={handleRegistrarSalida}>Registrar salida</button>
                        </div>
                        <label htmlFor="NoVisitas" style={{ marginLeft: '20px' }}>No. de Visitas:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input style={{ marginLeft: '850px' }} type="text" id="NoVisitas" name="NoVisitas" />
                            <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={handleRegistrarVisita}>Registrar Visitas</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="card-footer text-muted">
                {activeTab === 'tab1' && (
                    <table className="table table-dark table-striped" style={{ marginLeft: '50px', marginTop: '20px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Matrícula</th>
                                <th>Fecha</th>
                                <th>Hora de entrada</th>
                                <th>Hora de salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registros.map((registro, index) => (
                                <tr key={index}>
                                    <td>{registro.matricula}</td>
                                    <td>{registro.fecha}</td>
                                    <td>{registro.horaEntrada}</td>
                                    <td>{registro.horaSalida}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {activeTab === 'tab2' && (
                    <table className="table table-dark table-striped" style={{ marginLeft: '50px', marginTop: '20px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Matrícula</th>
                                <th>Fecha</th>
                                <th>Hora de entrada</th>
                                <th>Hora de salida</th>
                                <th>No. de Visitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registros.map((registro, index) => (
                                <tr key={index}>
                                    <td>{registro.matricula}</td>
                                    <td>{registro.fecha}</td>
                                    <td>{registro.horaEntrada}</td>
                                    <td>{registro.horaSalida}</td>
                                    <td>{registro.NoVisitas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
