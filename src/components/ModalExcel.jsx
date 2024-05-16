import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Loader from '../components/Loader';
import * as XLSX from 'xlsx';

const ModalExcel = ({ isOpen, setIsOpen, data }) => {
    const [dataExcel, setDataExcel] = useState(data);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setDataExcel(data); // reset dataExcel when modal is closed
        }
    }, [isOpen, data]);

    const toggle = () => setIsOpen(!isOpen);

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
                setIsLoader(false);
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleCheckboxChange = (index) => {
        const newData = [...dataExcel];
        newData[index].checked = !newData[index].checked;
        setDataExcel(newData);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} fade={true} className="modal-xl" centered>
            <ModalHeader toggle={toggle}></ModalHeader>
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
                                        {Object.keys(dataExcel[0]).filter(key => key !== 'checked').map((key) => (
                                            <th key={key}>{key}</th>
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
                                            {Object.keys(item).filter(key => key !== 'checked').map((key, idx) => (
                                                <td key={idx}>{item[key]}</td>
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
            <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    Do Something
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalExcel;
