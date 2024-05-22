import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BorrowingFetch from "../store/BorrowingFetch";
import Utils from '../store/Utils';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

const borrowing = new BorrowingFetch(import.meta.env.VITE_REACT_APP_BASE_API);

const PrestamosCard = ({ color }) => {
    const [showPrestamosForm, setShowPrestamosForm] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [typeBorrowing, setTypeBorrowing] = useState([]);
    const [CurrentTypeBorrowing, setCurrentTypeBorrowing] = useState('');
    const [borrowingsItems, setBorrowingsItems] = useState([]);
    const [CurrentItem, setCurrentItem] = useState({});
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
        setCurrentTypeBorrowing(nameBorrowing);
    };

    const ReturnBorrowing = async (item) => {
        let id = item;
        if (CurrentTypeBorrowing === 'book') {
            id = item.id_Book;
        } else if (CurrentTypeBorrowing === 'computer') {
            id = item.id;
        } else if (CurrentTypeBorrowing === 'locker') {
            id = item.id_locker;
        }
        const result = await borrowing.RetunrBorrowing(CurrentTypeBorrowing, id);
        if (result.status === "ok") {
            alert('Devolución completa');
            getBorrowingsItems(CurrentTypeBorrowing);
        } else {
            alert(result.result);
        }
    };

    const OpenRegisterBorrowing = (item) => {
        setCurrentItem(item);
        setShowModalRegister(true);
    }

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
                                                            onClick={() => OpenRegisterBorrowing(item)}
                                                        >
                                                            Prestar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => ReturnBorrowing(item)}
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
                                                                    alert("Matricula: " + value.registration + "\nFecha de Préstamo: " + value.borrowing_date + "\nFecha de Devolución: " + value.return_date);
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
            <ModalBorrowing
                showModalRegister={showModalRegister}
                setShowModalRegister={setShowModalRegister}
                titleModal="Registrar Préstamo"
                data={CurrentItem}
                typeBorrowing={CurrentTypeBorrowing}
                event={getBorrowingsItems}
            />
        </div>
    );
};

function ModalBorrowing({ showModalRegister, setShowModalRegister, typeBorrowing, titleModal, data, event }) {
    const [borrowingData, setBorrowingData] = useState({
        TypeBorrowing: '',
        item_id: "",
        registration: "",
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        return_date: ""
    });

    const registerBorrowing = async () => {
        const result = await borrowing.NewBorrowing(borrowingData);
        if (result.status === "ok") {
            alert('Registro completo');
            setShowModalRegister(false);
            event();
        } else {
            alert(result.result);
        }
    };

    const closeModal = () => {
        setBorrowingData({
            TypeBorrowing: "",
            item_id: "",
            registration: "",
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            return_date: ""
        });
        setShowModalRegister(false);
    };

    const handleDateTimeChange = (date) => {
        setBorrowingData({ ...borrowingData, date: date.format('YYYY-MM-DD HH:mm:ss') });
    };

    const handleReturnDateTimeChange = (date) => {
        setBorrowingData({ ...borrowingData, return_date: date.format('YYYY-MM-DD HH:mm:ss') });
    };

    useEffect(() => {
        let id = data;
        if (typeBorrowing === 'book') {
            id = data.id_Book;
        } else if (typeBorrowing === 'computer') {
            id = data.id;
        } else if (typeBorrowing === 'locker') {
            id = data.id_locker;
        }
        setBorrowingData({
            TypeBorrowing: typeBorrowing,
            item_id: id,
            registration: "",
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            return_date: ""
        });
    }, [data, typeBorrowing]);
    return (
        <Modal isOpen={showModalRegister}>
            <ModalHeader>
                {titleModal}
            </ModalHeader>
            <ModalBody>
                <FormGroup className="mb-3">
                    <Label for="registration">Matrícula</Label>
                    <Input
                        type="text"
                        id="registration"
                        value={borrowingData.registration}
                        onChange={(e) => setBorrowingData({ ...borrowingData, registration: e.target.value })}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label for="date">Fecha de Préstamo</Label>
                    <DateTime
                        id="date"
                        value={borrowingData.date}
                        onChange={handleDateTimeChange}
                        inputProps={{ placeholder: 'Selecciona fecha y hora' }}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label for="return_date">Fecha de Devolución</Label>
                    <DateTime
                        id="return_date"
                        value={borrowingData.return_date}
                        onChange={handleReturnDateTimeChange}
                        inputProps={{ placeholder: 'Selecciona fecha y hora' }}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={closeModal}>
                    Cancelar
                </Button>
                <Button color="primary" onClick={() => registerBorrowing()}>
                    Confirmar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default PrestamosCard;
