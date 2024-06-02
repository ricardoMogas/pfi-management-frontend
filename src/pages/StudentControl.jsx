import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ModalExcel from '../components/ModalExcel';
import StudentsFetche from '../store/StudentsFetch';
import StudentFilter from '../store/DataJson/StudentFilter.json';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import { SendMailEvery } from '../store/SendMail';
const ColorPrimary = { color: "#fff", backgroundColor: "var(--primary)" };
const StudentsFetcher = new StudentsFetche(import.meta.env.VITE_REACT_APP_BASE_API);

export default function StudentControl() {
    const [showModalExcel, setShowModalExcel] = useState(false);
    const [filter, setFilter] = useState({
        registration: "null",
        name: "null",
        gender: "null",
        ethnicity: "null",
        status: "null",
        career: "null"
    });
    const [currentStudent, setCurrentStudent] = useState({
        registration: "",
        name: "",
        gender: "",
        birthday_date: "",
        origin_place: "",
        ethnicity: "",
        career: "",
        status: "",
    });
    const [currentEmail, setCurrentEmail] = useState("")
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalEmail, setShowModalEmail] = useState(false);
    const [students, setStudents] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

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
        if (result.students.length > 0) {
            setStudents(result.students)
            setTotalPages(Math.ceil(result.total / perPage)); // Calculate the total number of pages
            console.log(totalPages)
            setIsLoader(false);
            console.log(students)
        } else {
            setStudents([{ registration: "---", name: "---", career: "---", gender: "---", ethnicity: "---", status: "---" }])
        }
    }

    const deleteStudent = async (registration) => {
        const confirmation = window.confirm('¿Estás seguro de que quieres eliminar este estudiante?');
        if (confirmation) {

            const result = await StudentsFetcher.DeleteStudent(registration);
            if (result) {
                alert('Estudiante eliminado');
                fetchStudents();
            } else {
                alert('Error al eliminar estudiante');
            }
        }
    }
    useEffect(() => {
        console.log(import.meta.env.VITE_REACT_APP_BASE_API);
        fetchStudents();
    }, [page, totalPages, filter]);

    return (
        <div className="container">
            <div className='card'>
                {/** Header de card */}
                <div className='card-header' style={ColorPrimary}>
                    <div className='row text-center'>
                        <div className='col-5'>
                            <h2>Control de alumnos</h2>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col p-0'>
                                    <button
                                        className="btn btn-success m-1"
                                        onClick={() => setShowModalExcel(!showModalExcel)}
                                    >Ins. Excel</button>
                                </div>
                                <div className='col p-0'>
                                    <button
                                        className="btn btn-info m-1"
                                        onClick={() => setShowModalRegister(true)}
                                    >Registrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/** tabla de card*/}
                <div className='table-responsive-lg m-4' style={{ maxHeight: '650px', overflow: 'auto' }}>
                    {students.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                            <Loader type='book' />
                        </div>
                    ) : (
                        <table className='table table-hover'>
                            <thead style={{ position: 'sticky', top: '0', zIndex: '1' }}>
                                <tr>
                                    <th scope='col'>Matricula</th>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Licenciatura</th>
                                    <th scope='col'>Genero</th>
                                    <th scope='col'>Grupo Etnico</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Acción</th>
                                </tr>
                                <tr>
                                    <td scope='col' className="align-middle">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar Matricula"
                                            onChange={(e) => {
                                                setFilter({ ...filter, registration: e.target.value })
                                                fetchStudents();
                                            }}
                                        />
                                    </td>
                                    <td scope='col' className="align-middle">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar Nombre🔎"
                                            onChange={(e) => {
                                                setFilter({ ...filter, name: e.target.value })
                                                fetchStudents();
                                            }}
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
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => {
                                                                setFilter({ ...filter, career: item.value });
                                                                fetchStudents();
                                                            }}
                                                        >{item.label}</a>
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
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => {
                                                                setFilter({ ...filter, gender: item.value });
                                                                fetchStudents();
                                                            }}
                                                        >{item.label}</a>
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
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => {
                                                                setFilter({ ...filter, ethnicity: item.value });
                                                                fetchStudents();
                                                            }}
                                                        >{item.label}</a>
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
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={() => {
                                                                setFilter({ ...filter, status: item.value });
                                                                fetchStudents();
                                                            }}
                                                        >{item.label}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody >
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.registration}</td>
                                        <td>{student.name}</td>
                                        <td>{student.career}</td>
                                        <td>{student.gender}</td>
                                        <td>{student.ethnicity}</td>
                                        <td>{student.status}</td>
                                        <td className='text-center'>
                                            <button
                                                className="btn m-1"
                                                style={ColorPrimary}
                                                onClick={() => [setCurrentStudent(student), setShowModalUpdate(true), fetchStudents()]}
                                            ><i className="bi bi-pencil fs-5"></i></button>
                                            <button
                                                className="btn btn-danger m-1"
                                                onClick={() => deleteStudent(student.registration)}
                                            ><i className="bi bi-trash fs-5"></i></button>
                                            <button
                                                className="btn btn-success m-1"
                                                onClick={() => [setCurrentStudent(student),setShowModalEmail(!showModalEmail)]}
                                            ><i class="bi bi-envelope-plus"></i></button>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

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
                <ModalExcel
                    isOpen={showModalExcel}
                    setIsOpen={setShowModalExcel}
                    data={[]}
                />
                <ModalStudent
                    setShowModalRegister={setShowModalRegister}
                    showModalRegister={showModalRegister}
                    currentAction={"register"}
                    titleModal={"Registrar estudiante"}
                    defaultData={currentStudent}
                    event={fetchStudents}
                />
                <ModalStudent
                    setShowModalRegister={setShowModalUpdate}
                    showModalRegister={showModalUpdate}
                    titleModal={"Actualizar estudiante"}
                    currentAction={"update"}
                    defaultData={currentStudent}
                    event={fetchStudents}
                />
                <ModalEmail
                    showModalEmail={showModalEmail}
                    setShowModalEmail={setShowModalEmail}
                    titleModal={"Enviar correo"}
                    email={"al0"+currentStudent.registration+"@uacam.mx"}
                    nameUser={currentStudent.name}
                />
            </div>
        </div>
    );
}

function ModalEmail({ showModalEmail, setShowModalEmail, titleModal, email, nameUser}) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const sendEmail = async () => {
        SendMailEvery(nameUser, email, message, setLoading);
        setShowModalEmail(false);
        setMessage("");
    };

    const closeModal = () => {
        setShowModalEmail(false);
        setMessage("");
    };
    return (
        <Modal isOpen={showModalEmail} toggle={() => setShowModalEmail(!showModalEmail)}>
            <ModalHeader toggle={() => setShowModalEmail(!showModalEmail)}>{titleModal}</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label className="form-label">Mensaje a : {email}</label>
                    <textarea
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => closeModal()}>
                    Cancelar
                </Button>
                <Button color="primary" onClick={() => sendEmail()}  disabled={loading}>
                    {loading ? <Loader type='spinner' /> : 'Enviar'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

function ModalStudent({ showModalRegister, setShowModalRegister, titleModal, currentAction, defaultData, event }) {
    const [student, setStudent] = useState({
        registration: "",
        name: "",
        gender: "",
        birthday_date: "",
        origin_place: "",
        ethnicity: "",
        career: "",
        status: "",
    });
    const RegisterStudent = async () => {
        const result = await StudentsFetcher.RegisterStudent(student);
        console.log(result);
        if (result) {
            alert('Registro completo')
            setShowModalRegister(false);
            event();
        } else {
            alert('Faltan campos')
        }
    };

    const UpdateStudent = async () => {
        const result = await StudentsFetcher.UpdateStudent(student);
        console.log(result);
        if (result) {
            alert('Actualización completa')
            event();
            setShowModalRegister(false);
        } else {
            alert('Faltan campos o la matricula ya se encuentra registrada')
        }
    };

    const closeModal = () => {
        setShowModalRegister(false);
        setStudent({
            registration: "",
            name: "",
            gender: "",
            birthday_date: "",
            origin_place: "",
            ethnicity: "",
            career: "",
            status: "",
        });
    };
    const ActionButton = () => {
        switch (currentAction) {
            case 'register':
                RegisterStudent();
                break;
            case 'update':
                UpdateStudent(student);
                console.log(student)
                break;
            default:
                alert('No se ha seleccionado ninguna acción');
                break;
        }
    };
    useEffect(() => {
        if (currentAction === 'update') {
            setStudent(defaultData);
        }
    }, [defaultData]);

    return (
        <Modal isOpen={showModalRegister} >
            <ModalHeader>
                <div>
                    <h3>{titleModal}</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label className="form-label">Nombre:</label>
                    <input
                        className="form-control"
                        name="nombre"
                        type="text"
                        value={student.name}
                        onChange={(e) => {
                            const upperCaseName = e.target.value.toUpperCase();
                            setStudent({ ...student, name: upperCaseName });
                        }}
                    />
                </FormGroup>

                <FormGroup>
                    <label className="form-label">Matrícula:</label>
                    <input
                        className="form-control"
                        type="number"
                        name="matricula"
                        disabled={currentAction === 'update'}
                        value={student.registration}
                        onChange={(e) => (setStudent({ ...student, registration: e.target.value }))} />
                </FormGroup>
                <FormGroup>
                    <label className='form-label'>Fecha de nacimiento</label>
                    <input
                        className="form-control"
                        type="date"
                        value={student.birthday_date}
                        onChange={(e) => (setStudent({ ...student, birthday_date: e.target.value }))} /
                    >
                </FormGroup>
                <FormGroup>
                    <label className='form-label'>Lugar de nacimiento</label>
                    <input
                        className="form-control"
                        type="text"
                        value={student.origin_place}
                        onChange={(e) => (setStudent({ ...student, origin_place: e.target.value }))} /
                    >
                </FormGroup>
                <FormGroup>
                    <label className="form-label">Licenciatura:</label>
                    <select
                        className="form-select"
                        name="licenciatura"
                        value={student.career}
                        onChange={(e) => setStudent({ ...student, career: e.target.value })}
                    >
                        {StudentFilter.licenciatura.map(opcion => (
                            <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <label className="form-label">Género:</label>
                    <select
                        className="form-select"
                        name="genero"
                        value={student.gender}
                        onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                    >
                        {StudentFilter.genero.map(opcion => (
                            <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <label className="form-label">Grupo Étnico:</label>
                    <select
                        className="form-select"
                        name="grupoEtnico"
                        value={student.ethnicity}
                        onChange={(e) => setStudent({ ...student, ethnicity: e.target.value })}
                    >
                        {StudentFilter.etnia.map(opcion => (
                            <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <label className="form-label">Estatus:</label>
                    <select
                        className="form-select"
                        name="estado"
                        value={student.status}
                        onChange={(e) => setStudent({ ...student, status: e.target.value })}
                    >
                        {StudentFilter.estado.map(opcion => (
                            <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                        ))}
                    </select>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={() => closeModal()}>
                    Cancelar
                </Button>
                <Button color="primary" onClick={() => ActionButton()}>
                    Confirmar
                </Button>
            </ModalFooter>
        </Modal>
    );
}