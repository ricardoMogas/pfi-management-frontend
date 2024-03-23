import React, { useState } from 'react';

export default function StudentControl() {
    const [alumnos, setAlumnos] = useState([
        { nombre: 'Arturo Alberto', matricula: '68627', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Ricardo', matricula: '67514', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Gael', matricula: '62314', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Arturo Alberto', matricula: '68627', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Ricardo', matricula: '67514', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Gael', matricula: '62314', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Arturo Alberto', matricula: '68627', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Ricardo', matricula: '67514', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Gael', matricula: '62314', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Arturo Alberto', matricula: '68627', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Ricardo', matricula: '67514', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Gael', matricula: '62314', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Arturo Alberto', matricula: '68627', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Ricardo', matricula: '67514', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
        { nombre: 'Gael', matricula: '62314', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo', checked: false },
    ]);

    const [mostrarModal, setMostrarModal] = useState(false);

    const handleAbrirModal = () => {
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
    };

    const handleEliminarAlumno = () => {
        const nuevosAlumnos = alumnos.filter(alumno => !alumno.checked);
        setAlumnos(nuevosAlumnos);
    };

    const handleActualizarAlumno = (id, nuevoNombre, nuevaMatricula) => {
        const nuevosAlumnos = alumnos.map(alumno => {
            if (alumno.id === id) {
                return { ...alumno, nombre: nuevoNombre, matricula: nuevaMatricula };
            }
            return alumno;
        });
        setAlumnos(nuevosAlumnos);
    };

    const buscarPorLicenciatura = (licenciatura) => {
        console.log(`Buscando por licenciatura: ${licenciatura}`);
    };

    const buscarPorGenero = (genero) => {
        console.log(`Buscando por genero: ${genero}`);
    };

    const buscarPorEtnia = (etnia) => {
        console.log(`Buscando por etnia: ${etnia}`);
    };

    const buscarPorEstado = (estado) => {
        console.log(`Buscando por estado: ${estado}`);
    };

    const handleCheckboxChange = (index) => {
        const nuevosAlumnos = [...alumnos];
        nuevosAlumnos[index].checked = !nuevosAlumnos[index].checked;
        setAlumnos(nuevosAlumnos);
    };

    return (
        <div className="container text-center">
            <h1>Administrar Alumnos</h1>
            <div className="row justify-content-center">
                <div className='col m-2'>
                    <button className="btn btn-primary" onClick={() => alert('Función de registro por Excel en desarrollo...')}>Registrar por Excel</button>
                </div>
                <div className='col m-2'>
                    <button className="btn btn-primary" onClick={handleAbrirModal}>Registrar</button>
                </div>
                <div className='col m-2'>
                    <button className="btn btn-primary" onClick={() => alert('Función de actualización en desarrollo...')}>Actualizar</button>
                </div>
                <div className='col m-2'>
                    <button className="btn btn-primary" onClick={handleEliminarAlumno}>Eliminar</button>
                </div>
            </div>
            <div className='row justify-content-center'>
                <table>
                    <thead>
                        <tr>
                            <th>Chk</th>
                            <th>Matricula</th>
                            <th>Nombre</th>
                            <th>Licenciatura</th>
                            <th>Genero</th>
                            <th>Grupo Etnico</th>
                            <th>Estado</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button className="btn-secondary">Buscar Matricula</button>
                            </td>
                            <td>
                                <button className="btn-secondary">Buscar Nombre</button>
                            </td>
                            <td>
                                <select className="select-primary" onChange={(e) => buscarPorLicenciatura(e.target.value)}>
                                    <option value="">Buscar Licenciatura</option>
                                    <option value="ISC">ISC</option>
                                    <option value="ICA">ICA</option>
                                    <option value="IE">IE</option>
                                    <option value="IM">IM</option>
                                    <option value="ITS">ITS</option>
                                    <option value="IME">IME</option>
                                </select>
                            </td>
                            <td>
                                <select className="select-primary" onChange={(e) => buscarPorGenero(e.target.value)}>
                                    <option value="">Buscar género</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </td>
                            <td>
                                <select className="select-primary" onChange={(e) => buscarPorEtnia(e.target.value)}>
                                    <option value="">Buscar Grupo étnico</option>
                                    <option value="Maya">Maya</option>
                                    <option value="Otomi">Otomi</option>
                                    <option value="Azteca">Azteca</option>
                                    <option value="Zapoteca">Zapoteca</option>
                                    <option value="Olmeca">Olmeca</option>
                                </select>
                            </td>
                            <td>
                                <select className="select-primary" onChange={(e) => buscarPorEstado(e.target.value)}>
                                    <option value="">Buscar status</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Egresado">Egresado</option>
                                    <option value="Baja temporal">Baja temporal</option>
                                    <option value="Baja definitival">Baja definitival</option>
                                </select>
                            </td>
                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {alumnos.map((alumno, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" checked={alumno.checked} onChange={() => handleCheckboxChange(index)} /></td>
                                <td>{alumno.matricula}</td>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.lic}</td>
                                <td>{alumno.Genero}</td>
                                <td>{alumno.GroT}</td>
                                <td>{alumno.Estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCerrarModal}>&times;</span>
                        <h2>Registro de alumnos</h2>
                        <form className="modal-form">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre:</label>
                                <input type="text" id="nombre" name="nombre" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="matricula">Matrícula:</label>
                                <input type="text" id="matricula" name="matricula" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="licenciatura">Licenciatura:</label>
                                <select id="licenciatura" name="licenciatura">
                                    <option value="">Selecciona Licenciatura</option>
                                    <option value="ISC">ISC</option>
                                    <option value="ICA">ICA</option>
                                    <option value="IE">IE</option>
                                    <option value="IM">IM</option>
                                    <option value="ITS">ITS</option>
                                    <option value="IME">IME</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="genero">Género:</label>
                                <select id="genero" name="genero">
                                    <option value="">Selecciona Género</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="grupoEtnico">Grupo Étnico:</label>
                                <select id="grupoEtnico" name="grupoEtnico">
                                    <option value="">Selecciona Grupo Étnico</option>
                                    <option value="Maya">Maya</option>
                                    <option value="Otomi">Otomi</option>
                                    <option value="Azteca">Azteca</option>
                                    <option value="Zapoteca">Zapoteca</option>
                                    <option value="Olmeca">Olmeca</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="estado">Estado:</label>
                                <select id="estado" name="estado">
                                    <option value="">Selecciona Status</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Egresado">Egresado</option>
                                    <option value="Baja temporal">Baja temporal</option>
                                    <option value="Baja definitiva">Baja definitiva</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-submit">Registrar</button>
                        </form>
                    </div>
                    
                </div>
                
            )}
            <style>
                {`
                    /* Estilos anteriores */
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                        white-space: nowrap;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                    tr:hover {
                        background-color: #ddd;
                    }
                    .button-container {
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .button-container button,
                    .select-primary {
                        margin: 0 10px;
                        padding: 8px 16px;
                        font-size: 16px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                        border-radius: 4px;
                    }
                    .button-container button:hover,
                    .select-primary:hover {
                        background-color: #0056b3;
                    }
                    .btn-primary {
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                        padding: 8px 16px;
                        font-size: 16px;
                        border-radius: 4px;
                    }
                    .btn-secondary {
                        background-color: #0056b3;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                        padding: 8px 16px;
                        font-size: 16px;
                        border-radius: 4px;
                    }
                    .modal {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: fixed;
                        z-index: 1;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.4);
                    }
                    .modal-content {
                        background-color: #fefefe;
                        border-radius: 8px;
                        padding: 20px;
                        width: 60%;
                        max-width: 400px;
                    }
                    .modal-content h2 {
                        margin-top: 0;
                    }
                    .modal-form {
                        display: flex;
                        flex-direction: column;
                    }
                    .form-group {
                        margin-bottom: 10px;
                    }
                    .form-group label {
                        margin-bottom: 5px;
                    }
                    .form-group input,
                    .form-group select {
                        padding: 8px;
                        font-size: 16px;
                        border-radius: 4px;
                        border: 1px solid #ccc;
                        width: 100%;
                    }
                    .form-group select {
                        appearance: none;
                        background-repeat: no-repeat;
                        background-position: right 8px center;
                        background-size: 10px;
                        padding-right: 10px;
                    }
                    .btn-submit {
                        background-color: #0056b3;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                        padding: 10px 20px;
                        font-size: 16px;
                        border-radius: 4px;
                    }
                    
                    .btn-submit:hover {
                        background-color: #218838;
                    }
                `}
            </style>
        </div>
    );
}