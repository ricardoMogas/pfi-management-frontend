import React, { useState, useEffect } from 'react';
import VisitsFetch from "../store/Requests/VisitsFetch";
import Utils from "../store/Utils";
const visitsObject = new VisitsFetch(import.meta.env.VITE_REACT_APP_BASE_API);

const RegisteredVisitsForm = () => {
    const [date, setDate] = useState(Utils.ActualDate());
    const [registration, setRegistration] = useState('');
    const [registeredVisits, setRegisteredVisits] = useState([]);

    useEffect(() => {
        GetVisitsObject();
    }, []);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleRegistration = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setRegistration(value);
        }
    };

    const RegisterVisit = async () => {
        if (registration === "") {
            alert("No has ingresado la matrícula");
        } else {
            const resultRegister = await visitsObject.RegisterEntranceVisit(registration);
            if (resultRegister) {
                alert("Registro exitoso ✔");
                GetVisitsObject();
                setRegistration("");
            } else {
                alert("El usuario no existe");
            }
        }
    };

    const RegisterVisitExit = async (data) => {
        const resultRegister = await visitsObject.RegisterExitVisit(data);
        if (resultRegister) {
            return true;
        } else {
            return false;
        }
    };

    const RegisterExitForAllUsers = async () => {
        const exitPromises = registeredVisits.map(async (visit) => {
            const success = await RegisterVisitExit(visit.registration);
            return success ? visit.registration : null;
        });

        const results = await Promise.all(exitPromises);

        const successfulExits = results.filter(result => result !== null);
        if (successfulExits.length > 0) {
            alert(`Registro de salida exitoso para: ${successfulExits.join(', ')} ✔`);
            GetVisitsObject();
        } else {
            alert("No se pudo registrar la salida de ningún usuario");
        }
    };

    const GetVisitsObject = async () => {
        const visits = await visitsObject.GetVisitsRegistered();
        if (visits.status === "ok") {
            setRegisteredVisits(visits.result);
        } else {
            alert("Error al obtener las visitas");
        }
    };

    const DeleteVisit = async (id) => {
        const result = confirm("¿Desea eliminar la visita?");
        if (result) {
            const deleteResult = await visitsObject.DeleteVisits(id);
            if (deleteResult) {
                alert("Eliminación correcta");
            } else {
                alert("Error no se pudo eliminar");
            }
            GetVisitsObject();
        }
    };

    return (
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
                            value={registration}
                            onChange={handleRegistration}
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
                                onClick={RegisterVisit}
                            >Registrar visita</button>
                        </div>
                        <div className='mb-1'>
                            <button
                                className="btn btn-warning mb-2"
                                onClick={RegisterExitForAllUsers}
                            >Registrar todas la salidas</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                {registeredVisits.length > 0 ? (
                    <div className='table-responsive-lg m-4' style={{ maxHeight: '350px', overflow: 'auto' }}>
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
                                {registeredVisits.map((registro, index) => (
                                    <tr key={index}>
                                        <td>{registro.registration}</td>
                                        <td>{registro.visit_date}</td>
                                        <td>{registro.entry_time}</td>
                                        <td>{registro.exit_time ? registro.exit_time : "Sin registrar"}</td>
                                        <td>
                                            <button
                                                className='btn btn-danger mb-2'
                                                onClick={() => DeleteVisit(registro.no_Visit)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                            <button
                                                className='btn btn-success mb-2'
                                                onClick={() => RegisterVisitExit(registro.registration)}
                                            >
                                                <i className="bi bi-box-arrow-right"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='container text-center m-5'>
                        <i className="bi bi-table fs-1"></i>
                        <h5>No hay Entradas hoy</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisteredVisitsForm;
