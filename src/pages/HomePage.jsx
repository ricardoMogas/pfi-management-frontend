import React, { useState } from 'react';
import Button from '../../ui_components/Button';

const HomePage = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Pagina de bienvenida PFI</title>
      {/* Incluir Bootstrap CSS */}
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
      <div className="container-fluid h-100 d-flex flex-column mt-3"> 
        <div className="row align-items-start text-left">  {/* Cambiado a 'align-items-start' para alinear al inicio */}
          <div className="col">
            <img src="iconpfi.png" alt="Foto" className="img-fluid" style={{maxWidth: '90px'}} /> {/* Añadido estilo para controlar el tamaño */}
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-primary">Control de Alumnos</button>
              <button type="button" className="btn btn-primary">Registro de visitas</button>
              <button type="button" className="btn btn-primary">Servicios</button>
              <button type="button" className="btn btn-primary">Reportes</button>
            </div>
          </div>
        </div>
        <div className="row align-items-cen mt-3 flex-grow-1"> {/* Añadido 'flex-grow-1' para hacer que esta fila ocupe todo el espacio restante */}
          <div className="col-12 col-md-6">
            <img src="iconpfi.png" alt="Foto" className="img-fluid" style={{maxWidth: '500px'}} />
          </div>
          <div className="col-12 col-md-6"> {/* Añadido 'd-flex' para hacer que el contenido de esta columna se estire para llenar el espacio vertical */}
            <div className="card w-100"> {/* Añadido 'flex-grow-1' para hacer que la tarjeta ocupe todo el espacio vertical y 'w-100' para llenar el espacio horizontal */}
              <div className="card-body" style={{height: '400px', overflow: 'auto'}}>
                <p className="card-text"> 
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pablitoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pablitoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                  Pepe Pecas pica papas con un pico, con un pico pica papas Pepe Pecas. Si Pepe Pecas pica papas con un pico, ¿dónde está el pico con que Pepe Pecas pica papas?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <p>¡Gracias por visitar el PFI! Esperamos que disfrutes de tu estancia.</p>
          </div>
        </div>
      </div>
    </div>
  );
  {/* Probando*/}
};

export default HomePage;