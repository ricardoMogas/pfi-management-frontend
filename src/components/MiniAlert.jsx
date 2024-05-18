import React from 'react';
import { Alert } from 'reactstrap';

const MiniAlert = ({ title, message, type, showAlert, setShowAlert }) => {
  return (
    <div style={{ position: 'relative' }}>
      {showAlert && (
        <div style={{ position: 'absolute', top: '-50px', width: '500px' }}>
          <Alert color={type} isOpen={showAlert} toggle={() => setShowAlert(!showAlert)}>
            <h4 className="alert-heading">{title}</h4>
            <p>{message}</p>
          </Alert>
        </div>
      )}
      {/* Aquí va el código del Card */}
    </div>
  );
}

export default MiniAlert;