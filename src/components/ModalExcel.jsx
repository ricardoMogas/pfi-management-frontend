import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Util } from 'reactstrap';
import Loader from '../components/Loader';
import Utils from '../store/Utils';
import * as XLSX from 'xlsx';
import StudentsFetcher from '../store/Requests/StudentsFetch';
const StudentsObject = new StudentsFetcher(import.meta.env.VITE_REACT_APP_BASE_API);

const ModalExcel = ({ isOpen, setIsOpen, data }) => {
    const [dataExcel, setDataExcel] = useState(data);
    const [jsonData, setJsonData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [isRowSelectedMode, setIsRowSelectedMode] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [log, setLog] = useState([]);
    const [readyRegister, setReadyRegister] = useState(false);
    const header = ["registration", "name", "gender", "birthday_date", "ethnicity", "career", "status", "origin_place"];
    useEffect(() => {
        if (!isOpen) {
            setDataExcel(data);
        }
    }, [isOpen, data]);

    const excelDateToJSDate = (serial) => {
        if (serial === "null") {
            return ""; // o cualquier valor por defecto que quieras usar para las fechas nulas
        }
        const serialNumber = parseFloat(serial);
        const date = new Date(Math.floor((serialNumber - 25569) * 86400 * 1000));
        return date.toISOString().split('T')[0]; // Convierte la fecha a una cadena de texto en formato ISO
    };

    const toggleColumnSelectionMode = () => {
        setIsRowSelectedMode(!isRowSelectedMode)
        if (selectedRows.length === 0) {
            console.log("No hay datos seleccionados");
            const newData = dataExcel.map(item => ({
                registration: item["Matrícula."], // Asegúrate de que las claves coincidan con las de tus datos
                name: item["Nombre completo."],
                gender: item["Género"],
                birthday_date: "0000-00-00",
                ethnicity: item["Grupo étnico"],
                career: item["Carrera"],
                status: "Activo",
                origin_place: item["Lugar de origen"],
                date_of_registration: excelDateToJSDate(item["Fecha de inscripción."]), // Convierte la fecha de Excel a JS
            }));
            setJsonData(newData);
        } else {
            const newData = selectedRows.map(item => ({
                registration: item["Matrícula."], // Asegúrate de que las claves coincidan con las de tus datos
                name: item["Nombre completo."],
                gender: item["Género"],
                birthday_date: "0000-00-00",
                ethnicity: item["Grupo étnico"],
                career: item["Carrera"],
                status: "Activo",
                origin_place: item["Lugar de origen"],
                date_of_registration: excelDateToJSDate(item["Fecha de inscripción."]), // Convierte la fecha de Excel a JS
            }));
            setJsonData(newData);
            console.log(newData);
        }
    };


    const toggle = () => {
        setIsOpen(!isOpen);
        setDataExcel([]);
        setSelectedRows([]);
        setIsLoader(false);
        setIsRowSelectedMode(false);
        setSelectedColumns([]);
    };

    const toggleAlredyRegister = () => {
        setIsRowSelectedMode(false);
        setLog([]);
        setJsonData([]);
        //Vuelve false el checked de los datos
        const newData = [...dataExcel];
        newData.map(item => item.checked = false);
        setDataExcel(newData);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsLoader(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                const checkJsonData = jsonData.map(item => ({ ...item, checked: false }));
                setDataExcel(checkJsonData);
                setSelectedColumns(Object.keys(jsonData[0]).filter(key => key !== 'checked'));
                setIsLoader(false);
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleCheckboxChange = (index) => {
        const newData = [...dataExcel];
        newData[index].checked = !newData[index].checked;
        setDataExcel(newData);
        const selected = dataExcel.filter(item => item.checked);
        setSelectedRows(selected);
    };

    const RegisterStudents = async () => {
        jsonData.forEach(student => {
            StudentsObject.RegisterStudent(student).then((res) => {
                setLog(prevLog => [...prevLog, { Matricula: student.registration, status: res }]);
            });
        });
    };
    return (
        <Modal isOpen={isOpen} toggle={toggle} fade={true} className="modal-xl" centered>
            <ModalHeader toggle={toggle}></ModalHeader>
            {!isRowSelectedMode ? (
                <ModalBody>
                    <div className='container'>
                        <input className='form-control' type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    </div>
                    {isLoader ? (
                        <div className='d-flex justify-content-center align-items-center' style={{ height: '650px' }}>
                            <Loader type='book' />
                        </div>
                    ) : (
                        <div className='table-responsive-lg m-4' style={{ maxHeight: '650px', overflow: 'auto' }}>
                            {dataExcel.length > 0 ? (
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Checked</th>
                                            {selectedColumns.map((key) => (
                                                <th key={key}>{Utils.truncateText(key, 20)}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataExcel.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.checked}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                </td>
                                                {selectedColumns.map((key, idx) => (
                                                    <td key={idx}>{Utils.truncateText(item[key], 20)}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className='m-5 text-center'>
                                    <i className="bi bi-file-earmark-excel fs-1"></i>
                                    <h5>Seleccionar Archivo Excel para visualizar datos</h5>
                                </div>
                            )}
                        </div>
                    )}
                </ModalBody>
            ) : (
                <ModalBody>
                    {log.length > 0 ? (
                        <>
                            <h5>Historial de inscripción de alumnos</h5>
                            <div className='table-responsive-md' style={{ maxHeight: '400px', overflow: 'auto' }}>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            {Object.keys(log[0]).map((key) => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {log.map((item, index) => (
                                            <tr key={index}>
                                                {Object.values(item).map((value, index) => (
                                                    <td key={index}>{value === true ? "INSCRITO" : value}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <>
                            <h5>Intrucciones</h5>
                            <p>Por favor verifique los datos convertidos</p>
                            <div className='table-responsive-md' style={{ maxHeight: '400px', overflow: 'auto' }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {jsonData.length > 0 && Object.keys(jsonData[0]).map((key, index) => (
                                                <th key={index}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jsonData.map((item, index) => (
                                            <tr key={index}>
                                                {Object.keys(item).map((key, idx) => (
                                                    <td key={idx}>{item[key]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </ModalBody>
            )}
            <ModalFooter>
                {log.length > 0 ? (
                    <>
                        <Button color="secondary" onClick={toggleAlredyRegister} >
                            Regresar
                        </Button>
                        <Button color="primary" onClick={() => setIsOpen(!isOpen)} >
                            Finalizar Registro
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="secondary" onClick={toggle} >
                            Cancel
                        </Button>
                        <Button color="primary" onClick={toggleColumnSelectionMode} disabled={!dataExcel.length > 0}>
                            {isRowSelectedMode ? 'Regresar' : 'Convertir Datos'}
                        </Button>{' '}
                        <Button
                            color="warning"
                            onClick={() => RegisterStudents()}
                            disabled={selectedColumns.length < 7 || !isRowSelectedMode}
                        >
                            Registrar Datos
                        </Button>
                    </>
                )}
            </ModalFooter>
        </Modal>
    );
};

export default ModalExcel;
