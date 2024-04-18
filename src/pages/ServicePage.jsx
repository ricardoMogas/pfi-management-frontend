import React from 'react';

export default function ServicePage() {
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
            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="col-md-4 text-center">
                    
                    <a data-bs-toggle="modal" data-bs-target="#copiasModal" >
                        <div className="card" style={{ width: "18rem" }}>
                        <img src="/public/Printer_ServicePage.jpg" className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} alt="..." />
                        <div className="card-body">
                            <p className="card-text"><b>Copias e Impresiones</b></p>
                        </div>
                        </div>
                    </a>
                </div>
                <div className="col-md-4 text-center">
                    <a data-bs-toggle="modal" data-bs-target="#prestamosModal" >
                        <div className="card" style={{ width: "18rem" }}>
                        <img src="/public/loan_ServicePage.png" className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} alt="..." />
                        <div className="card-body">
                            <p className="card-text"><b>Prestamos</b></p>
                        </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div className="modal" id="prestamosModal"tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Prestamos</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                    <form className="row g-3">
                        <div className="col-md-4">
                            <label htmlFor="validationDefault01" className="form-label">
                            Matricula
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            id="validationDefault01"
                            required=""
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationDefault02" className="form-label">
                            Fecha de prestamo
                            </label>
                            <input
                            type="date"
                            className="form-control"
                            id="validationDefault02"
                            defaultValue="Otto"
                            required=""
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationDefaultUsername" className="form-label">
                            Fecha de devolución
                            </label>
                            <div className="input-group">
                            <input
                                type="date"
                                className="form-control"
                                id="validationDefaultUsername"
                                aria-describedby="inputGroupPrepend2"
                                required=""
                            />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="validationDefault04" className="form-label">
                            Tipo
                            </label>
                            <select className="form-select" id="validationDefault04" required="">
                            <option selected="" disabled="" value="">
                                Choose...
                            </option>
                            <option>Computadora</option>
                            <option>Locker</option>
                            <option>Libro</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">
                            Guardar
                            </button>
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
                    </div>
                </div>
            </div>
        </div>
        <div className="modal" id="copiasModal"tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Copias e Impresiones</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                    <form className="row g-3">
                        <div className="col-md-4">
                            <label htmlFor="validationDefault01" className="form-label">
                            Matricula
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            id="validationDefault01"
                            required=""
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationDefault02" className="form-label">
                            Fecha de Impresión
                            </label>
                            <input
                            type="date"
                            className="form-control"
                            id="validationDefault02"
                            defaultValue="Otto"
                            required=""
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationDefaultUsername" className="form-label">
                            Total de impresiones
                            </label>
                            <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                id="validationDefaultUsername"
                                aria-describedby="inputGroupPrepend2"
                                required=""
                            />
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">
                            Guardar
                            </button>
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
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
