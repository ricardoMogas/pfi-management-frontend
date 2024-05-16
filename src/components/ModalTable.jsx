import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalTable = ({ isOpen, setIsOpen, data }) => {
    if (!isOpen) {
        return null;
    }
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Modal isOpen={isOpen} toggle={toggle} fade={true} centered>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default ModalTable;