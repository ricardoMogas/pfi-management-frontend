import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BorrowingFetch from "../store/BorrowingFetch";
const borrowing = new BorrowingFetch(import.meta.env.VITE_REACT_APP_BASE_API);

const PrestamosCard = ({ color }) => {
    const [showPrestamosForm, setShowPrestamosForm] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [typeBorrowing, setTypeBorrowing] = useState([]);
    const [borrowingsItems, setBorrowingsItems] = useState([]);

    const handlePrestamosImageClick = () => {
        setShowPrestamosForm(true);
    };

    const handleResetPrestamosForm = () => {
        setShowPrestamosForm(false);
    };

    const getTypeBorrowing = async () => {
        const result = await borrowing.GetTypeBorrowing();
        setTypeBorrowing(result);
    };

    const getBorrowingsItems = async (nameBorrowing) => {
        const data = await borrowing.GetBorrowingsItems(nameBorrowing);
        setBorrowingsItems(data.result);
    };

    useEffect(() => {
        getTypeBorrowing();
    }, []);

    return (
        <div className="card m-2">
            <div className='card-header' style={color}>
                <h5 className="card-title text-white">Préstamos</h5>
            </div>
            <div className="card-body">
                {showPrestamosForm ? (
                    <>
                        <button onClick={handleResetPrestamosForm} className="btn btn-secondary mb-3">Volver</button>
                        <Form className="mt-3">
                            <FormGroup className="mb-3">
                                <Label for="tipoRecurso" className="text-white">Tipo de Recurso</Label>
                                <Input type="select" id="tipoRecurso" onChange={(e) => getBorrowingsItems(e.target.value)}>
                                    <option value="">Tipo...</option>
                                    {typeBorrowing.map((type, index) => (
                                        <option key={index} value={type.name}>{type.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Form>
                        {Array.isArray(borrowingsItems) && borrowingsItems.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                Acciones
                                            </th>
                                            {borrowingsItems.length > 0 && Object.keys(borrowingsItems[0]).map((key, index) => (
                                                <th key={index}>{key === 'id_borrowing' ? "Borrowing" : key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borrowingsItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {item.id_borrowing === null ? (
                                                        <button
                                                            className='btn btn-primary'
                                                            onClick={() => { console.log(item.id_borrowing) }}
                                                        >
                                                            Prestar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => { console.log(item.id_borrowing) }}
                                                        >
                                                            Devolver
                                                        </button>
                                                    )}
                                                </td>
                                                {Object.values(item).map((value, i) => (
                                                    <td key={i}>
                                                        {value === null ?
                                                            <i className="bi bi-clipboard2-x"></i>
                                                            :
                                                            (typeof value === 'object' ?
                                                                <button className='btn btn-info' onClick={() => {
                                                                    alert(JSON.stringify(value, null, 2));
                                                                }}>
                                                                    <i className="bi bi-info-circle"></i>
                                                                </button>
                                                                :
                                                                value
                                                            )
                                                        }
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className='container text-center'>
                                <i className="bi bi-table fs-1"></i>
                                <h5>Selecciona un tipo de Prestamo</h5>
                            </div>
                        )}
                    </>
                ) : (
                    <button onClick={handlePrestamosImageClick} className="btn">
                        <i
                            className="bi bi-laptop"
                            style={{ fontSize: "15rem", color: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}
                        ></i>
                    </button>
                )}
            </div>
            {showPrestamosForm && (
                <div className='card-footer'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
            )}
            <ModalStudent
                showModalRegister={showModalRegister}
                setShowModalRegister={setShowModalRegister}
                titleModal="Registrar Préstamo"
                currentType="zzz"
                event={getTypeBorrowing}
            />
        </div>
    );
};

function ModalStudent({ showModalRegister, setShowModalRegister, titleModal, currentType, event }) {
    const [borrowing, setBorrowing] = useState({
        TypeBorrowing: "",
        item_id: "",
        registration: "",
        date: "",
        return_date: ""
    });

    const registerBorrowing = async () => {
        const result = await StudentsFetcher.RegisterStudent(borrowing);
        if (result) {
            alert('Registro completo');
            setShowModalRegister(false);
            event();
        } else {
            alert('Faltan campos');
        }
    };

    const closeModal = () => {
        setShowModalRegister(false);
    };

    const actionButton = () => {
        switch (currentType) {
            case 'zzz':
                registerBorrowing();
                break;
            case 'xx':
                // Otro caso si se necesita
                break;
            default:
                console.log(borrowing);
                break;
        }
    };

    return (
        <Modal isOpen={showModalRegister}>
            <ModalHeader>
                <h3>{titleModal}</h3>
            </ModalHeader>
            <ModalBody>
                <FormGroup className="mb-3">
                    <Label for="registration">Matrícula</Label>
                    <Input
                        type="text"
                        id="registration"
                        value={borrowing.registration}
                        onChange={(e) => setBorrowing({ ...borrowing, registration: e.target.value })}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label for="date">Fecha de Préstamo</Label>
                    <Input
                        type="date"
                        id="date"
                        value={borrowing.date}
                        onChange={(e) => setBorrowing({ ...borrowing, date: e.target.value })}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label for="return_date">Fecha de Devolución</Label>
                    <Input
                        type="date"
                        id="return_date"
                        value={borrowing.return_date}
                        onChange={(e) => setBorrowing({ ...borrowing, return_date: e.target.value })}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={closeModal}>
                    Cancelar
                </Button>
                <Button color="primary" onClick={actionButton}>
                    Confirmar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default PrestamosCard;
