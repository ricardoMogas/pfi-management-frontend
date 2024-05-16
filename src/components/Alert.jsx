import React from 'react';
import { Alert } from 'reactstrap';

const MiniAlert = ({ title, message, type, showAlert, setShowAlert }) => {
  return (
    <div style={{ position: 'fixed', top: '100px', width: '500px' }}>
      <Alert color={type} isOpen={showAlert} toggle={() => setShowAlert(!showAlert)}>
        <h4 className="alert-heading">{title}</h4>
        <p>{message}</p>
      </Alert>
    </div>
  );
}

export default MiniAlert;