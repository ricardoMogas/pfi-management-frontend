import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import MiniAlert from "../components/Alert";

export default function Test() {
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('primary');
  const [messageAlert, setMessageAlert] = useState('HOLA');
  const [titleAlert, setTitleAlert] = useState('loremp ipsum');
  return (
    <>
      <div className="container text-center">
        <div className="row h-100 justify-content-center align-items-center">
          <button onClick={() => {setShowAlert(!showAlert)}}>hola</button>
          <MiniAlert title={titleAlert} message={messageAlert} type={typeAlert} showAlert={showAlert} setShowAlert={setShowAlert} />
        </div>
      </div>
    </>
  );
}


// CENTRAR AL CENTRO :  position-fixed top-50 start-50 translate-middle