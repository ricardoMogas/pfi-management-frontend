import React, { useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalTable = ({ isOpen, setIsOpen, type, data }) => {
    if (!isOpen) {
        return null;
    }
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (type) {
            console.log(type);
        }
    }, [type]);
    return (
        <Modal isOpen={isOpen} toggle={toggle} fade={true} centered>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <ContentTable data={data} />    
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


const ContentTable = ({data}) => {
    return (
        <>
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
        </>
    )
}