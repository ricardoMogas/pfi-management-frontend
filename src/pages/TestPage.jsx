import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import MiniAlert from "../components/Alert";
import ModalTable from "../components/ModalTable";
export default function Test() {
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('primary');
  const [messageAlert, setMessageAlert] = useState('HOLA');
  const [titleAlert, setTitleAlert] = useState('loremp ipsum');

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="container text-center">
        <div className="row h-100 justify-content-center align-items-center">
          <button onClick={() => {setShowAlert(!showAlert)}}>hola</button>
          <button onClick={() => {setShowModal(!showModal)}}>Modal</button>
          <ModalTable 
            isOpen={showModal} 
            setIsOpen={setShowModal} 
            data={[{name: "hola", edad: 20}, {name: "hola", edad: 20}]} 
          />
          <MiniAlert title={titleAlert} message={messageAlert} type={typeAlert} showAlert={showAlert} setShowAlert={setShowAlert} />
        </div>
      </div>
    </>
  );
}


// CENTRAR AL CENTRO :  position-fixed top-50 start-50 translate-middle