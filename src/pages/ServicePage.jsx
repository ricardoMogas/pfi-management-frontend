import React, { useState} from 'react';

export default function ServicePage() {
    const [showCopiasForm, setShowCopiasForm] = useState(false);
    const [showPrestamosForm, setShowPrestamosForm] = useState(false);

    const toggleCopiasForm = () => setShowCopiasForm(!showCopiasForm);
    const togglePrestamosForm = () => setShowPrestamosForm(!showPrestamosForm);

    const handleCopiasImageClick = () => {
        setShowCopiasForm(true);
    };

    const handlePrestamosImageClick = () => {
        setShowPrestamosForm(true);
    };

    const handleResetCopiasForm = () => {
        setShowCopiasForm(false);
    };

    const handleResetPrestamosForm = () => {
        setShowPrestamosForm(false);
    };

    return (
        <>  
     <div className="container text-center">
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <p className="text-center fs-1 fw-bolder">Servicios</p>
                    </div>
                </div>
            </div>

            <div className="card-group d-flex justify-content-center">
                <div className="card m-2" style={{ backgroundColor: "#0d47a1", width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title text-white">Copias e Impresiones</h5>
                        {!showCopiasForm ? (
                            <button onClick={handleCopiasImageClick} className="btn btn-light">
                                <img src="public/Printer_ServicePage2.jpg" alt="Copias e Impresiones" />
                            </button>
                        ) : (
                            <>
                                <button onClick={handleResetCopiasForm} className="btn btn-light mb-3">Volver</button>
                                <form className="mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="matriculaCopias" className="form-label text-white">Matrícula</label>
                                        <input type="text" className="form-control" id="matriculaCopias" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fechaImpresion" className="form-label text-white">Fecha de Impresión</label>
                                        <input type="date" className="form-control" id="fechaImpresion" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="totalImpresiones" className="form-label text-white">Total de Impresiones</label>
                                        <input type="text" className="form-control" id="totalImpresiones" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
                <div className="card m-2" style={{ backgroundColor: "#0d47a1", width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title text-white">Préstamos</h5>
                        {!showPrestamosForm ? (
                            <button onClick={handlePrestamosImageClick} className="btn btn-light">
                                <img src="public/loan_ServicePage.png" alt="Préstamos" />
                            </button>
                        ) : (
                            <>
                                <button onClick={handleResetPrestamosForm} className="btn btn-light mb-3">Volver</button>
                                <form className="mt-3">
                                    <div className="mb-3">
                                        <label htmlFor="matriculaPrestamos" className="form-label text-white">Matrícula</label>
                                        <input type="text" className="form-control" id="matriculaPrestamos" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fechaPrestamo" className="form-label text-white">Fecha de Préstamo</label>
                                        <input type="date" className="form-control" id="fechaPrestamo" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fechaDevolucion" className="form-label text-white">Fecha de Devolución</label>
                                        <input type="date" className="form-control" id="fechaDevolucion" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tipoRecurso" className="form-label text-white">Tipo de Recurso</label>
                                        <select className="form-select" id="tipoRecurso">
                                            <option value="">Seleccione...</option>
                                            <option value="computadora">Computadora</option>
                                            <option value="locker">Locker</option>
                                            <option value="libro">Libro</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
