import React, { useState } from 'react';
const CopiasCard = ({ color }) => {
    const [showCopiasForm, setShowCopiasForm] = useState(false);

    const handleCopiasImageClick = () => {
        setShowCopiasForm(true);
    };

    const handleResetCopiasForm = () => {
        setShowCopiasForm(false);
    };

    return (
        <div className="card m-2">
            <div className='card-header' style={color}>
                <h5 className="card-title text-white">Copias e Impresiones</h5>
            </div>
            <div className="card-body">
                {showCopiasForm ? (
                    <>
                        <button onClick={handleResetCopiasForm} className="btn btn-secondary mb-3">Volver</button>
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
                        </form>
                    </>
                ) : (
                    <button className="btn" onClick={handleCopiasImageClick}>
                        <i
                            className="bi bi-printer"
                            style={{ fontSize: "15rem", color: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}
                        ></i>
                    </button>
                )}
            </div>
            {showCopiasForm ? (
                <div className='card-footer'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            ) : null}
        </div>
    );
};

export default CopiasCard;
