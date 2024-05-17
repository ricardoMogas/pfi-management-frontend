import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Util } from 'reactstrap';
import Loader from '../components/Loader';
import Utils from '../store/Utils';
import * as XLSX from 'xlsx';

const ModalExcel = ({ isOpen, setIsOpen, data }) => {
    const [dataExcel, setDataExcel] = useState(data);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [isColumnSelectionMode, setIsColumnSelectionMode] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [readyRegister, setReadyRegister] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setDataExcel(data);
        }
    }, [isOpen, data]);

    const toggleColumnSelectionMode = () => setIsColumnSelectionMode(!isColumnSelectionMode);
    const toggle = () => {
        setIsOpen(!isOpen);
        setDataExcel([]);
        setSelectedRows([]);
        setIsLoader(false);
        setIsColumnSelectionMode(false);
        setSelectedColumns([]);
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

    const handleColumnButtonClick = (column) => {
        const newSelectedColumns = [...selectedColumns];
        if (newSelectedColumns.includes(column)) {
            const index = newSelectedColumns.indexOf(column);
            newSelectedColumns.splice(index, 1);
        } else {
            newSelectedColumns.push(column);
        }
        setSelectedColumns(newSelectedColumns);
    };

    const handleRegisterData = () => {
        const filteredData = dataExcel.map(row => {
            const newRow = {};
            selectedColumns.forEach(col => {
                newRow[col] = row[col];
            });
            setReadyRegister(true);
            return newRow;
        });
        setDataExcel(filteredData.map(student => ({ ...student, checked: false })));
        setIsColumnSelectionMode(false);
    };

    const RegisterStudents = async () => {
        console.log(selectedRows);
    };
    return (
        <Modal isOpen={isOpen} toggle={toggle} fade={true} className="modal-xl" centered>
            <ModalHeader toggle={toggle}></ModalHeader>
            {!isColumnSelectionMode ? (
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
                    <h5>Intrucciones</h5>
                    <p>Porfavor seleccione como minimo 7 columnas para determinar las que se ban a registrar a posterior</p>
                    <div className='table-responsive-md' style={{ maxHeight: '400px', overflow: 'auto' }}>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    {Object.keys(dataExcel[0]).filter(key => key !== 'checked').map((key) => (
                                        <th key={key}>
                                            <Button
                                                color={selectedColumns.includes(key) ? 'primary' : 'secondary'}
                                                onClick={() => handleColumnButtonClick(key)}
                                            >
                                                {Utils.truncateText(key, 20)}
                                            </Button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    </div>
                </ModalBody>
            )}
            <ModalFooter>
            <Button color="secondary" onClick={toggle} >
                    Cancel
                </Button>
                <Button color="primary" onClick={toggleColumnSelectionMode} disabled={!dataExcel.length > 0}>
                    {isColumnSelectionMode ? 'Regresar' : 'Seleccionar columnas'}
                </Button>{' '}
                <Button
                    color="warning"
                    onClick={handleRegisterData}
                    disabled={selectedColumns.length < 7 || !isColumnSelectionMode}
                >
                    Registrar Datos
                </Button>
                {
                    readyRegister ? (
                        <Button color="success" onClick={() => RegisterStudents()}>
                            Guardar
                        </Button>
                    ) : null
                }
            </ModalFooter>
        </Modal>
    );
};

export default ModalExcel;
