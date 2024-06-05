import React, { useState, useEffect } from 'react';
import VisitsFetch from "../store/Requests/VisitsFetch";
import Utils from "../store/Utils";
import SimpleAlert from "../store/SimpleAlert";
import { narrate } from "../store/Narrate";
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
        if (/^\d*$/.test(value) && value.length <= 5) {
            setRegistration(value);
            if (value.length === 5) {
                console.log('El valor tiene exactamente 5 caracteres');
                narrate(value)
            } else if (value.length < 1) {
                console.log('El valor es menor a 0');
                narrate("vacío")
            }
        }
    };

    const RegisterVisit = async () => {
        // si en la matricula en registeredVisits tiene el valor exit_time null se registra su salida
        const user = (registeredVisits.length > 0) ?
            registeredVisits.find(visit => visit.registration === parseInt(registration)) : undefined;
        if (user) {
            if (user.exit_time === null) {
                const status = await RegisterVisitExit(user.registration);
                if (status) {
                    narrate(`Salida registrada para ${user.registration}`);
                    SimpleAlert('success', `Salida registrada para ${user.registration} ✔`);
                    GetVisitsObject();
                } else {
                    SimpleAlert('error', "Error al registrar la salida");
                }
            } else {
                SimpleAlert('error', `El usuario ${user.registration} ya se registro su visita hoy 📅`)
            }
            return;
        }


        if (registration === "" || registration.length < 5) {
            SimpleAlert('error', "No has ingresado la matrícula o se ingreso un formato de matricula de menos 5 digitos 🚫");
        } else {
            const resultRegister = await visitsObject.RegisterEntranceVisit(registration);
            if (resultRegister) {
                SimpleAlert('success', "Registro exitoso ✔");
                narrate(`Registro de salida exitoso para ${registration}`);
                GetVisitsObject();
                setRegistration("");
            } else {
                SimpleAlert('error', "El usuario no existe o ya se registro su vista hoy 📅");
            }
        }
    };

    const RegisterVisitExit = async (data) => {
        const resultRegister = await visitsObject.RegisterExitVisit(data);
        console.log(resultRegister);
        return resultRegister;
    };

    const RegisterExitForAllUsers = async () => {
        const exitPromises = registeredVisits.map(async (visit) => {
            const success = await RegisterVisitExit(visit.registration);
            return success ? visit.registration : null;
        });

        const results = await Promise.all(exitPromises);

        const successfulExits = results.filter(result => result !== null);
        if (successfulExits.length > 0) {
            SimpleAlert('success', `Registro de salida exitoso para: ${successfulExits.join(', ')} ✔`);
            GetVisitsObject();
        } else {
            SimpleAlert('error', "No se pudo registrar la salida de ningún usuario");
        }
    };

    const GetVisitsObject = async () => {
        const visits = await visitsObject.GetVisitsRegistered();
        if (visits.status === "ok") {
            setRegisteredVisits(visits.result);
        } else {
            SimpleAlert('error', "Error al obtener las visitas");
        }
    };

    const DeleteVisit = async (id) => {
        const result = await SimpleAlert('warning', "¿Estás seguro de eliminar la visita?");
        if (result) {
            const deleteResult = await visitsObject.DeleteVisits(id);
            if (deleteResult) {
                SimpleAlert('success', "Eliminación correcta ✔");
            } else {
                SimpleAlert('error', "Error al eliminar la visita");
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
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    RegisterVisit();
                                }
                            }}
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
                                                onClick={async () => {
                                                    const status = await RegisterVisitExit(registro.registration)
                                                    if (status) {
                                                        SimpleAlert('success', `Salida registrada para ${registro.registration} ✔`);
                                                        GetVisitsObject();
                                                    } else {
                                                        SimpleAlert('error', "Error al registrar la salida");
                                                    }
                                                }}
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
