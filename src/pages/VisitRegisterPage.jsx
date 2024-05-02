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
            fecha: document.getElementById('date').value,
            horaEntrada: new Date().toLocaleTimeString(),
            horaSalida: '' // La hora de salida se llenará cuando se registre la salida
        };
        setRegistros([...registros, nuevoRegistro]);
        // Limpiar los campos después de registrar la visita
        document.getElementById('registrados').value = '';
        setDate('');
    };

    const handleRegistrarSalida = () => {
        const horaActual = new Date().toLocaleTimeString();
        const registroActualizado = { ...registros[registros.length - 1], horaSalida: horaActual };
        setRegistros([...registros.slice(0, -1), registroActualizado]);
    };

   
       

    return (
        <>
            <div>
                <h1 style={{textAlign: 'center'}}>Registro de entradas y salidas (PFI)</h1>
                <div className="tab-bar">
                    <button   className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>Visita de registrados</button>
                    <button   className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>Visita de No registrados</button>
                </div>
            </div>
<div>
    {activeTab === 'tab1' && (
        <div>
    {activeTab === 'tab1' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="registrados">Matrícula:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input style={{ marginLeft: '20px' }} type="text" id="registrados" name="registrados" />
                <button style={{ marginLeft: '20px' }} onClick={handleRegistrarVisita}>Registrar visita</button>
            </div>
            <label htmlFor="date" style={{ marginLeft: '20px' }}>Fecha:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input style={{ marginLeft: '25px' }} type="date" id="date" name="date" value={date} onChange={handleDateChange} />
                <button style={{ marginLeft: '20px' }} onClick={handleRegistrarSalida}>Registrar salida</button>
            </div>
        </div>
    )}
</div>
    )}
</div>
            <div>
                {activeTab === 'tab1' && (
                    <table style={{ marginLeft: '50px', marginTop: '20px', borderCollapse: 'collapse' }}>
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
            </div>
            <div>
    {activeTab === 'tab2' && (
        <div>
    {activeTab === 'tab2' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="registrados">Matrícula:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input style={{ marginLeft: '20px' }} type="text" id="registrados" name="registrados" />
                <button style={{ marginLeft: '20px' }} onClick={handleRegistrarVisita}>Registrar visita</button>
            </div>
            <label htmlFor="date" style={{ marginLeft: '20px' }}>Fecha:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input style={{ marginLeft: '25px' }} type="date" id="date" name="date" value={date} onChange={handleDateChange} />
                <button style={{ marginLeft: '20px' }} onClick={handleRegistrarSalida}>Registrar salida</button>
            </div>
            <label htmlFor="date" style={{ marginLeft: '20px' }}>No.Visitas:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <input style={{ marginLeft: '20px' }} type="text" id="No.Visitas" name="No.Visitas" />
            <button style={{ marginLeft: '20px' }} onClick={handleRegistrarVisita}>Registrar Visitas</button>        
            </div>    
        </div>    
              )}
        </div>
         )}
       </div>
       <div>
                {activeTab === 'tab2' && (
                    <table style={{ marginLeft: '50px', marginTop: '20px', borderCollapse: 'collapse' }}>
                        <thead>
                               <tr>
                                <th>Matrícula</th>
                                <th>Fecha</th>
                                <th>Hora de entrada</th>
                                <th>Hora de salida</th>
                                <th>No de Visitas</th>
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
        </>
    );
};