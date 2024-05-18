import React, { useEffect, useState } from 'react';
import VisitsFetch from "../store/VisitsFetch";
import MiniAlert from "../components/MiniAlert";
import Utils from '../store/Utils';

const visitsObject = new VisitsFetch(import.meta.env.VITE_REACT_APP_BASE_API);

export default function VisitRegisterPage() {
    const [date, setDate] = useState(Utils.ActualDate());
    const [registeredVisits, setRegisteredVisits] = useState([]);
    const [NonRegisteredVisits, setNonRegisteredVisits] = useState([]);
    const [registration, setRegistration] = useState('');
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const handleRegistration = (e) => {
        const value = e.target.value;
        // Only allow numbers
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
                alert("Registro exitoso ✔")
                GetVisitsObject();
                setRegistration("")
            } else {
                alert("El usuario no existe o ya se registro")
            }
            console.log(resultRegister);
        }
    }
    
    const RegisterVisitExit = async () => {
        if (registration === "") {
            alert("No has ingresado la matrícula");
        } else {
            const resultRegister = await visitsObject.RegisterExitVisit(registration);
            if (resultRegister) {
                alert("Registro de salida exitoso ✔")
                GetVisitsObject();
                setRegistration("")
            } else {
                alert("El usuario no existe o ya se registro salida")
            }
            console.log(resultRegister);
        }
    }

    const RegisterVisitNon = async () => {
        if (registration === "") {
            alert("No has ingresado la matrícula");
        } else {
            const resultRegister = await visitsObject.NonRegisterEntranceVisit(registration);
            if (resultRegister) {
                alert("Registro exitoso ✔")
                GetVisitsNonObject();
                setRegistration("")
            } else {
                alert("El usuario no existe o ya se registro")
            }
            console.log(resultRegister);
        }
    }
    
    const RegisterVisitExitNon = async () => {
        if (registration === "") {
            alert("No has ingresado la matrícula");
        } else {
            const resultRegister = await visitsObject.NonRegisterExitVisit(registration);
            if (resultRegister) {
                alert("Registro de salida exitoso ✔")
                GetVisitsNonObject();
                setRegistration("")
            } else {
                alert("El usuario no existe o ya se registro salida")
            }
            console.log(resultRegister);
        }
    }

    const GetVisitsObject = async () => {
        const visits = await visitsObject.GetVisitsRegistered();
        if (visits.status === "ok") {
            setRegisteredVisits(visits.result);
        } else {
            alert("Error al obtener las visitas");
        }
    };

    const GetVisitsNonObject = async () => {
        const nonVisit = await visitsObject.GetVisitsNonRegistered();
        setNonRegisteredVisits(nonVisit.result);
    };

    const DeleteVisit = async (id, type) => {
        const result = confirm("¿Desea eliminar la visita?")
        if (result) {
            switch (type) {
                case "NoRegistrados":
                    const resultNoR = await visitsObject.DeleteVisitsRn(id);
                    if(resultNoR) {
                        alert("Eliminacion correcta")
                    } else {
                        alert("Error no se pudo elimianar");
                    }
                    GetVisitsNonObject();
                    break;
                case "Registrados":
                    const result = await visitsObject.DeleteVisits(id);
                    if(result) {
                        alert("Eliminacion correcta")
                    } else {
                        alert("Error no se pudo elimianar");
                    }
                    GetVisitsObject();
                    break;
            }
        }
    }
    useEffect(() => {
        GetVisitsNonObject();
        GetVisitsObject();
    }, []);

    return (
        <>
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
                                                        onClick={() => RegisterVisit()}
                                                    >Registrar visita</button>
                                                </div>
                                                <div className='mb-1'>
                                                    <button
                                                        className="btn btn-success mb-2"
                                                        onClick={() => RegisterVisitExit()}
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
                                            {registeredVisits.map((registro, index) => (
                                                <tr key={index}>
                                                    <td>{registro.registration}</td>
                                                    <td>{registro.visit_date}</td>
                                                    <td>{registro.entry_time}</td>
                                                    <td>{registro.exit_time ? registro.exit_time : "Sin registrar"}</td>
                                                    <td>
                                                        <button 
                                                            className='btn btn-danger mb-2' 
                                                            onClick={() => DeleteVisit(registro.no_Visit, "Registrados")}
                                                        >
                                                            <i className="bi bi-trash"></i>
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
                            <div className='container'>
                                <div className='row m-5'>
                                    <div className='col'>
                                        <div className="mb-1">
                                            <label htmlFor="registrados" className="form-label">Matrícula:</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
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
                                                    onClick={() => RegisterVisitNon()}
                                                >Registrar visita</button>
                                            </div>
                                            <div className='mb-1'>
                                                <button
                                                    className="btn btn-success mb-2"
                                                    onClick={() => RegisterVisitExitNon()}
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
                                                <th>Total de Visitas</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {NonRegisteredVisits.map((registro, index) => (
                                                <tr key={index}>
                                                    <td>{registro.registration}</td>
                                                    <td>{registro.visit_date}</td>
                                                    <td>{registro.entry_time}</td>
                                                    <td>{registro.exit_time == null ? "No registrado" : registro.exit_time}</td>
                                                    <td style={{ color: registro.total_visits >= 5 ? 'red' : 'inherit' }}>{registro.total_visits}</td>
                                                    <td>
                                                        <button className='btn btn-danger mb-2' onClick={() => DeleteVisit(registro.no_Visit, "NoRegistrados")}>
                                                            <i className="bi bi-trash"></i>
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
            </div>
        </>
    );
};
