import React, { useState } from 'react';

const PrestamosCard = ({ color }) => {
    const [showPrestamosForm, setShowPrestamosForm] = useState(false);

    const handlePrestamosImageClick = () => {
        setShowPrestamosForm(true);
    };

    const handleResetPrestamosForm = () => {
        setShowPrestamosForm(false);
    };

    return (
        <div className="card m-2">
            <div className='card-header' style={color}>
                <h5 className="card-title text-white">Préstamos</h5>
            </div>
            <div className="card-body">
                {showPrestamosForm ? (
                    <>
                        <button onClick={handleResetPrestamosForm} className="btn btn-secondary mb-3">Volver</button>
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
                        </form>
                    </>
                ) : (
                    <button onClick={handlePrestamosImageClick} className="btn">
                        <i 
                            className="bi bi-laptop" 
                            style={{ fontSize: "15rem", color: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}`}}
                        ></i>
                    </button>
                )}
            </div>
            {showPrestamosForm ? (
                <div className='card-footer'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            ) : null}
        </div>
    );
};

export default PrestamosCard;
