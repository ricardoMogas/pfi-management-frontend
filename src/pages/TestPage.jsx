import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SimpleAlert from "../store/SimpleAlert";
import MiniAlert from "../components/MiniAlert";
import ModalTable from "../components/ModalContent";
import Swal from "sweetalert2";
import { narrate } from "../store/Narrate";

export default function Test() {
  const showModalAlert = async () => {
    const status = await SimpleAlert("warning", "hola")
    console.log(status);
  }
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('primary');
  const [messageAlert, setMessageAlert] = useState('HOLA');
  const [titleAlert, setTitleAlert] = useState('loremp ipsum');
  const [showModal, setShowModal] = useState(false);

  const [text, setText] = useState('');

  const handleChangeText = (e) => {
    setText(e.target.value);
    narrate(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      narrate(`Visita registrada para 66208`);
    }
  };
  return (
    <>
      <div className="container text-center">
        <div className="row h-100 justify-content-center align-items-center">
          <input type="text" value={text} onChange={handleChangeText} onKeyPress={handleKeyPress}/>
          <button onClick={() => { setShowAlert(!showAlert) }}>hola</button>
          <button onClick={() => { setShowModal(!showModal) }}>Modal</button>
          <button onClick={() => showModalAlert()}>Sweet Alert</button>
          <ModalTable
            isOpen={showModal}
            setIsOpen={setShowModal}
            data={[{ name: "hola", edad: 20 }, { name: "hola", edad: 20 }]}
          />
          <MiniAlert title={titleAlert} message={messageAlert} type={typeAlert} showAlert={showAlert} setShowAlert={setShowAlert} />
        </div>
      </div>
    </>
  );
}


// CENTRAR AL CENTRO :  position-fixed top-50 start-50 translate-middle