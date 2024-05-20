import React from 'react';
import { Alert } from 'reactstrap';

const MiniAlert = ({ title, message, type, showAlert, setShowAlert, style = null, disbleCloseBtn = false}) => {
  return (
    <div style={{ position: 'relative' }}>
      {showAlert && (
        <div style={style}>
          <Alert color={type} isOpen={showAlert} toggle={disbleCloseBtn ? undefined : () => setShowAlert(!showAlert)}>
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