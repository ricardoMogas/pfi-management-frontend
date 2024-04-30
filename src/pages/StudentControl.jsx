const ColorPrimary = {color: "#fff",backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}`};
import React, { useState } from 'react';

export default function StudentControl() {
    const [alumnos, setAlumnos] = useState([
        { name: 'Arturo Alberto', registration: '68627', career: 'ISC', gender: 'Hombre', ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Beatriz Belen', registration: '68628', career: 'ISC', gender: "Hombre", ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Carlos Cesar', registration: '68629', career: 'ISC', gender: 'Hombre', ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Diana Dolores', registration: '68630', career: 'ISC', gender: 'Mujer', ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Arturo Alberto', registration: '68627', career: 'ISC', gender: 'Hombre', ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Beatriz Belen', registration: '68628', career: 'ISC', gender: "Hombre", ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Carlos Cesar', registration: '68629', career: 'ISC', gender: 'Hombre', ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Diana Dolores', registration: '68630', career: 'ISC', gender: 'Mujer', ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Carlos Cesar', registration: '68629', career: 'ISC', gender: 'Hombre', ethnicity: 'Maya', status: 'Activo', checked: false },
        { name: 'Diana Dolores', registration: '68630', career: 'ISC', gender: 'Mujer', ethnicity: 'Maya', status: 'Activo', checked: false },
    ]);

    const handleEliminarAlumno = () => {
        const nuevosAlumnos = alumnos.filter(alumno => !alumno.checked);
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
    const holaFUnción = () => {
        alert('¿Estás seguro de que deseas cerrar el modal?');
    };

    return (
        <div className="container">

            <div className='card'>
                {/* BOTONES SUPERIORES DEL CRUD */}
                <div className='card-header'>
                    <div className='row text-center'>
                        <div className='col-5'>
                            <h2>Administrar Alumnos</h2>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col p-0'>
                                    <button 
                                        className="btn btn-success m-1"
                                        onClick={() => alert('Función de registro por Excel en desarrollo...')}
                                    >R. Excel</button>
                                </div>
                                <div className='col p-0'>
                                    <button 
                                        className="btn m-1" 
                                        style={ColorPrimary}
                                        data-bs-toggle="modal" 
                                        data-bs-target="#registrarModal"
                                    >Registrar</button>
                                    <ModalStudent idModal="registrarModal" Title="Registrar Alumno" />
                                </div>
                                <div className='col p-0'>
                                    <button 
                                        className="btn m-1" 
                                        style={ColorPrimary}
                                        onClick={() => alert('Función de actualización en desarrollo...')}
                                    >Actualizar</button>
                                </div>
                                <div className='col p-0'>
                                    <button className="btn btn-danger m-1" onClick={handleEliminarAlumno}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TABLA */}
                <div className='table-responsive-lg m-4' style={{ maxHeight: '650px', overflow: 'auto' }}>
                    <table className='table table-hover'>
                        <thead style={{ position: 'sticky', top: '0', zIndex: '1' }}>
                            <tr>
                                <th scope='col'>Chk</th>
                                <th scope='col'>Matricula</th>
                                <th scope='col'>Nombre</th>
                                <th scope='col'>Licenciatura</th>
                                <th scope='col'>Genero</th>
                                <th scope='col'>Grupo Etnico</th>
                                <th scope='col'>Estado</th>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultValue=""
                                    />
                                </td>
                                <td scope='col' className="align-middle">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            style={{ padding: '.25rem', fontSize: '.75rem' }}
                                        > 🔎 </button>
                                    </div>
                                </td>
                                <td scope='col' className="align-middle">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            style={{ padding: '.25rem', fontSize: '.75rem' }}
                                        > 🔎 </button>
                                    </div>
                                </td>
                                <td scope='col' className="align-middle">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownLicenciatura" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Buscar Licenciatura
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownLicenciatura">
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura('')}>Buscar Licenciatura</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura('ISC')}>ISC</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura('ICA')}>ICA</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura('IE')}>IE</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura('IM')}>IM</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura('ITS')}>ITS</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura('IME')}>IME</a>
                                        </div>
                                    </div>
                                </td>
                                <td scope='col' className="align-middle">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownGenero" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Buscar Género
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownGenero">
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorGenero('')}>Buscar Género</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorGenero('M')}>Masculino</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorGenero('F')}>Femenino</a>
                                        </div>
                                    </div>
                                </td>
                                <td scope='col' className="align-middle">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownEtnia" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Buscar Grupo étnico
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownEtnia">
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEtnia('')}>Buscar Grupo étnico</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEtnia('Maya')}>Maya</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEtnia('Otomi')}>Otomi</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEtnia('Azteca')}>Azteca</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEtnia('Zapoteca')}>Zapoteca</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEtnia('Olmeca')}>Olmeca</a>
                                        </div>
                                    </div>
                                </td>
                                <td scope='col' className="align-middle">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownEstado" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Buscar Status
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownEstado">
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEstado('')}>Buscar Status</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEstado('Activo')}>Activo</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEstado('Egresado')}>Egresado</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEstado('Baja temporal')}>Baja temporal</a>
                                            <a className="dropdown-item" href="#" onClick={() => buscarPorEstado('Baja definitiva')}>Baja definitiva</a>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        </thead>
                        <tbody>
                            {alumnos.map((alumno, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" className='form-check-input' checked={alumno.checked} onChange={() => handleCheckboxChange(index)} /></td>
                                    <td >{alumno.registration}</td>
                                    <td>{alumno.name}</td>
                                    <td>{alumno.career}</td>
                                    <td>{alumno.gender}</td>
                                    <td>{alumno.ethnicity}</td>
                                    <td>{alumno.status}</td>
                                </tr>
                            ))}
                        </tbody>
                        <caption>

                        </caption>
                    </table>
                </div>
                <div>
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link active" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

function ModalStudent({ idModal = 'SimpleModalName', Title = 'Simple Modal', data = {} }) {
    return (
        <div
            className="modal fade"
            id={idModal}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {Title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form className="modal-form">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre:</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="matricula" className="form-label">Matrícula:</label>
                                <input type="text" className="form-control" id="matricula" name="matricula" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="licenciatura" className="form-label">Licenciatura:</label>
                                <select className="form-select" id="licenciatura" name="licenciatura">
                                    <option value="">Selecciona Licenciatura</option>
                                    <option value="ISC">ISC</option>
                                    <option value="ICA">ICA</option>
                                    <option value="IE">IE</option>
                                    <option value="IM">IM</option>
                                    <option value="ITS">ITS</option>
                                    <option value="IME">IME</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="genero" className="form-label">Género:</label>
                                <select className="form-select" id="genero" name="genero">
                                    <option value="">Selecciona Género</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="grupoEtnico" className="form-label">Grupo Étnico:</label>
                                <select className="form-select" id="grupoEtnico" name="grupoEtnico">
                                    <option value="">Selecciona Grupo Étnico</option>
                                    <option value="Maya">Maya</option>
                                    <option value="Otomi">Otomi</option>
                                    <option value="Azteca">Azteca</option>
                                    <option value="Zapoteca">Zapoteca</option>
                                    <option value="Olmeca">Olmeca</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estado" className="form-label">Estado:</label>
                                <select className="form-select" id="estado" name="estado">
                                    <option value="">Selecciona Status</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Egresado">Egresado</option>
                                    <option value="Baja temporal">Baja temporal</option>
                                    <option value="Baja definitiva">Baja definitiva</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-primary" >
                            Registrar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}