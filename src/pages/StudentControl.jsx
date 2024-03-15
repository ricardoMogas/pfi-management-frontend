import React, { useState } from 'react';

export default function StudentControl() {
    const [alumnos, setAlumnos] = useState([
        { id: 1, nombre: 'Arturo Alberto', matricula: '68627', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo' },
        { id: 2, nombre: 'Ricardo', matricula: '67514', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo' },
        { id: 3, nombre: 'Gael', matricula: '62314', lic:'ISC', Genero:'M', GroT:'Maya', Estado:'Activo' },
    ]);

    const handleEliminarAlumno = (id) => {
        const nuevosAlumnos = alumnos.filter(alumno => alumno.id !== id);
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

    const handleRegistrarPorExcel = () => {
        // Lógica para registrar alumnos por Excel
        console.log('Registrando alumnos por Excel...');
    };

    const handleRegistrarAlumno = () => {
        // Lógica para registrar un nuevo alumno
        console.log('Registrando un nuevo alumno...');
    };

    return (
        <div className="container">
            <h1 style={{textAlign: 'center'}}>Administrar Alumnos</h1>
            <div className="button-container">
                <button onClick={handleRegistrarPorExcel}>Registrar por Excel</button>
                <button onClick={handleRegistrarAlumno}>Registrar</button>
                <button onClick={() => alert('Función de actualización en desarrollo...')}>Actualizar</button>
                <button onClick={() => alert('Función de eliminación en desarrollo...')}>Eliminar</button>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Matricula</th>
                            <th>Nombre</th>
                            <th>Licenciatura</th>
                            <th>Genero</th>
                            <th>Grupo Etnico</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map((alumno) => (
                            <tr key={alumno.id}>
                                <td>{alumno.id}</td>
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
            <style>
                {`
                    .container {
                        max-width: 800px;
                        margin: auto;
                        padding: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
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
                    .button-container button {
                        margin: 0 10px;
                        padding: 8px 16px;
                        font-size: 16px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                    }
                    .button-container button:hover {
                        background-color: #0056b3;
                    }
                `}
            </style>
        </div>
    );
}
