import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import StudentsFetche from '../store/StudentsFetch';
import StudentFilter from '../store/DataJson/StudentFilter.json';
import { event } from 'jquery';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };

export default function StudentControl() {
    const StudentsFetcher = new StudentsFetche(import.meta.env.VITE_REACT_APP_BASE_API);
    const [filter, setFilter] = useState({
        registration: null,
        name: null,
        gender: null,
        ethnicity: null,
        status: null,
        career: null
    });
    const [students, setStudents] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const handleChangeName =(name)  => {
        setFilter({...filter, name : name})
        fetchStudents();
    }

    const handleEliminarAlumno = () => {
        const nuevosAlumnos = alumnos.filter(alumno => !alumno.checked);
        setAlumnos(nuevosAlumnos);
    };

    const buscarPorLicenciatura = (licenciatura) => {
        setFilter({ ...filter, career: licenciatura });
        console.log(`Buscando por licenciatura: ${licenciatura}`);
    };

    const buscarPorGenero = (genero) => {
        setFilter({ ...filter, career: genero })
        console.log(`Buscando por genero: ${genero}`);
    };

    const buscarPorEtnia = (etnia) => {
        setFilter({ ...filter, career: etnia })
        console.log(`Buscando por etnia: ${etnia}`);
    };

    const buscarPorEstado = (estado) => {
        setFilter({ ...filter, career: estado })
        console.log(`Buscando por estado: ${estado}`);
    };
    const handleCheckboxChange = (index) => {
        const nuevosAlumnos = [...students];
        nuevosAlumnos[index].checked = !nuevosAlumnos[index].checked;
        setStudents(nuevosAlumnos);
    };
    const SelectAllStudents = (checked) => {
        const CheckedStudents = students.map(student => ({
            ...student,
            checked: checked
        }))
        setStudents(CheckedStudents);
    }

    const NextPage = () => {
        console.log(totalPages)
        if (page !== totalPages) {
            setPage(page + 1);
            fetchStudents();
        }
    };

    const PreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            fetchStudents();
        }
    };

    const fetchStudents = async () => {
        setIsLoader(true);
        const result = await StudentsFetcher.GetAllStudentsPagination(page, perPage, filter);
        setStudents(result.students)
        setTotalPages(Math.ceil(result.total / perPage)); // Calculate the total number of pages
        console.log(totalPages)
        setIsLoader(false);
    }

    useEffect(() => {
        console.log(import.meta.env.VITE_REACT_APP_BASE_API);
        fetchStudents();
    }, [page, totalPages, filter]);

    return (
        <div className="container">
            <div className='card'>
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
                <div className='table-responsive-lg m-4' style={{ maxHeight: '650px', overflow: 'auto' }}>
                    {students.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                            <Loader type='spiner' />
                        </div>
                    ) : (
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
                                            checked={students.every(student => student.checked)}
                                            onChange={(e) => SelectAllStudents(e.target.checked)}
                                        />
                                    </td>
                                    <td scope='col' className="align-middle">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar Matricula"
                                        />
                                    </td>
                                    <td scope='col' className="align-middle">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar Nombre🔎"
                                            onChange={(e) => handleChangeName(e.target.value)}
                                        />
                                    </td>
                                    <td scope='col' className="align-middle">
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Buscar Licenciatura
                                            </button>
                                            <ul className="dropdown-menu">
                                                {StudentFilter.licenciatura.map((item, index) => (
                                                    <li key={index}>
                                                        <a className="dropdown-item" href="#" onClick={() => buscarPorLicenciatura(item.value)}>{item.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                    <td scope='col' className="align-middle">
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id="dropdownGenero"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Buscar Género
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownGenero">
                                                {StudentFilter.genero.map((item, index) => (
                                                    <li key={index}>
                                                        <a className="dropdown-item" href="#" onClick={() => buscarPorGenero(item.value)}>{item.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                    <td scope='col' className="align-middle">
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id="dropdownEtnia"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Buscar Grupo étnico
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownEtnia">
                                                {StudentFilter.etnia.map((item, index) => (
                                                    <li key={index}>
                                                        <a className="dropdown-item" href="#" onClick={() => buscarPorEtnia(item.value)}>{item.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                    <td scope='col' className="align-middle">
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                id="dropdownEstado"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Buscar Status
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownEstado">
                                                {StudentFilter.estado.map((item, index) => (
                                                    <li key={index}>
                                                        <a className="dropdown-item" href="#" onClick={() => buscarPorEstado(item.value)}>{item.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td><input type="checkbox" className='form-check-input' checked={student.checked} onChange={() => handleCheckboxChange(index)} /></td>
                                        <td>{student.registration}</td>
                                        <td>{student.name}</td>
                                        <td>{student.career}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.ethnicity}</td>
                                        <td>{student.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <caption></caption>
                        </table>
                    )}
                </div>
                <div>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${page === 1 ? `disabled` : ''}`}>
                            <button className="page-link" onClick={PreviousPage}>Previous</button>
                        </li>
                        <li className="page-item"><a className="page-link active" >{page}</a></li>
                        <li className={`page-item ${page === totalPages ? `disabled` : ''}`}>
                            <button className="page-link" onClick={NextPage}>Next</button>
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
