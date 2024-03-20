import React, { useState } from 'react';
import Button from '../../ui_components/Button';

const HomePage = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pagina de bienvenida</title>
      <style dangerouslySetInnerHTML={{ __html: "\n button {\n padding: 10px 20px; * ajusta el tamaño del botón \n font-size: 15px; texto font-family: 'gill sans', sans mt', calibri, 'trebuchet ms', sans-serif;\n background-color: lightblue;\n }\n " }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="PFILogo.png" alt="Foto" style={{ width: "70%", maxWidth: 80, alignContent: "center" }} />
          <div>
            <button>Control de Alumnos</button>
            <button>Registro de visitas</button>
            <button>Servicios</button>
            <button>Reportes</button>
          </div>
        </div>
        <button>
          <img src="TuercaSF.png" alt="Imagen del botón 5" style={{ width: "100%", maxWidth: 30, padding: 0, alignContent: "center" }} />
        </button>
      </div>
      <div style={{ position: "absolute", top: "30%", left: "5%" }}>
        <img src="PFILogo.png" alt="Foto" style={{ width: "100%", maxWidth: 400 }} />
      </div>
      <div style={{ position: "absolute", top: "40%", left: "30%", right: "20%" }}>
        {/* Scrollbar para el texto justo a la derecha */}
        <div style={{ overflowY: "scroll", height: 200, right: "60%" }}>
          <p>
            Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si
            Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe
            Pecas pica papas? Pepe Pecas pica papas con un pico, con un pico pica
            papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el
            pico con que Pepe Pecas pica papas? Pepe Pecas pica papas con un pico,
            con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico,
            ¿dónde está el pico con que Pepe Pecas pica papas? Pepe Pecas pica papas
            con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas
            con un pico, ¿dónde está el pico con que Pepe Pecas pica papas? Pepe
            Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe
            Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas
            pica papas? Pepe Pecas pica papas con un pico, con un pico pica papas
            Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico
            con que Pepe Pecas pica papas? Pepe Pecas pica papas con un pico, con un
            pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde
            está el pico con que Pepe Pecas pica papas? Pepe Pecas pica papas con un
            pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un
            pico, ¿dónde está el pico con que Pepe Pecas pica papas? Pepe Pecas pica
            papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica
            papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
            Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si
            Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe
            Pecas pica papas? Pepe Pecas pica papas con un pico, con un pico pica
            papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el
            pico con que Pepe Pecas pica papas? Pepe Pecas pica papas con un pico,
            con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico,
            ¿dónde está el pico con que Pepe Pecas pica papas? Pepe Pecas pica papas
            con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas
            con un pico, ¿dónde está el pico con que Pepe Pecas pica papas? Pepe
            Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe
            Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas
            pica papas? Pepe Pecas pica papas con un pico, con un pico pica papas
            Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico
            con que Pepe Pecas pica papas? Pepe Pecas pica papas con un pico, con un
            pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde
            está el pico con que Pepe Pecas pica papas? Pepe Pecas pica papas con un
            pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un
            pico, ¿dónde está el pico con que Pepe Pecas pica papas? Pepe Pecas pica
            papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica
            papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
