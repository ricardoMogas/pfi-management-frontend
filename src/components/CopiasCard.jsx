import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Utils from '../store/Utils';
import MiniAlert from '../components/MiniAlert';
import CopiasFetcher from '../store/CopiasFetch';
let copias = new CopiasFetcher(import.meta.env.VITE_REACT_APP_BASE_API);

const CopiasCard = ({ color }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [showCopiasForm, setShowCopiasForm] = useState(false);
    const [dataAlert, setDataAlert] = useState({ title: '', message: '', type: '' });

    const [totalCopies, setTotalCopies] = useState(null);
    const [registration, setRegistration] = useState('');
    const [quantityOfPrint, setquantityOfPrint] = useState(0);
    const [date, setDate] = useState(Utils.ActualDate());

    const handleCopiasImageClick = () => {
        setShowCopiasForm(true);
    };

    const handleResetCopiasForm = () => {
        setShowCopiasForm(false);
        setRegistration('');
        setTotalCopies(null);
        setDate(Utils.ActualDate());
    };

    const handleRegistrationChange = async (e) => {
        const value = e.target.value;
        setRegistration(value);
        const result = await copias.GetTotalCopies(value, date);
        if (value === '') {
            setShowAlert(false);
            setTotalCopies(null);
            return;
        }
        if (result === 50) {
            setDataAlert({ title: 'Limite de copias', message: `Copieas excedidas: ${result}`, type: 'danger' });
            setShowAlert(true);
            return;
        }
        if (typeof result === 'number') {
            setDataAlert({ title: 'Copias Registradas', message: `Total de Impresiones: ${result}`, type: 'info' });
            setShowAlert(true);
            setTotalCopies(result);
        } else {
            setDataAlert({ title: 'Alerta', message: result, type: 'warning' });
            setShowAlert(true);
            setTotalCopies(null);
        }
    };

    const quantityOfPrintAndPrinnt = async () => {
        const data = await copias.RegisterCopia(registration, quantityOfPrint, date);
        if (data.result === true) {
            const result = await copias.GetTotalCopies(registration, date);
            alert('Registro exitoso ✔ : Total de copias ->' + result );
            setShowAlert(false);
            setTotalCopies(null);
            setRegistration('');
            setDate(Utils.ActualDate());
            setquantityOfPrint(0);
        }
        if (typeof data.result === 'string' || typeof data.result !== 'boolean') {
            alert(data.result);
            setShowAlert(false);
            setTotalCopies(null);
            setRegistration('');
            setDate(Utils.ActualDate());
            setquantityOfPrint(0);

        }
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
                        <Form className="mt-3">
                            <FormGroup className="mb-3">
                                <Label>Matrícula</Label>
                                <Input
                                    type="number"
                                    value={registration}
                                    onChange={handleRegistrationChange}
                                />
                            </FormGroup>
                            <MiniAlert
                                title={dataAlert.title}
                                message={dataAlert.message}
                                type={dataAlert.type}
                                showAlert={showAlert}
                                setShowAlert={setShowAlert}
                                disbleCloseBtn={true}
                            />
                            <FormGroup>
                                <Label>Fecha de Impresión</Label>
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    disabled={!registration || totalCopies === null}  // Deshabilitamos si no hay matrícula
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Total de Impresiones</Label>
                                <Input
                                    type="number"
                                    value={quantityOfPrint}
                                    onChange={(e) => setquantityOfPrint(e.target.value)}
                                    disabled={!registration || totalCopies === null}  // Deshabilitamos si no hay matrícula
                                />
                            </FormGroup>
                        </Form>
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
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={() => quantityOfPrintAndPrinnt()}
                        disabled={!registration || totalCopies === null} 
                    >
                        Registrar
                        <br />
                        <i className="bi bi-printer-fill m-2"></i>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default CopiasCard;
