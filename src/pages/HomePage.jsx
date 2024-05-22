import React, { useState } from 'react';
import Welcome from '../components/Welcome';
import CopieasComponent from '../components/CopiasCard';
import VisitsComponent from '../components/RegisteredVisitsForm';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };

const HomePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('home');

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const selectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <div className="text-center"> {/* Add text-center class to center the dropdown */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color='secondary'  caret>
            Acceso direacto
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => selectComponent('home')}>Home</DropdownItem>
            <DropdownItem onClick={() => selectComponent('copias')}>Copias</DropdownItem>
            <DropdownItem onClick={() => selectComponent('visits')}>Visits</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {selectedComponent === 'home' &&
        <Welcome />
      }
      {selectedComponent === 'copias' &&
        <CopieasComponent color={ColorPrimary} />
      }
      {selectedComponent === 'visits' &&
        <div className='card m-5'>
          <div className='card-header'>
            <h5 className='card-title text-center'>Registro de visitas</h5>
          </div>
          <VisitsComponent />
        </div>
      }
      <footer
        style={{ color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}
        className="text-dark py-4 fixed-bottom"
      >
        <div className="container" style={{ color: "#fff" }}>
          <div className="row">
            <div className="col-md-6">
              <p>¡Gracias por visitar el PFI! Esperamos que disfrutes de tu estancia.</p>
            </div>
            <div className="col-md-6 text-md-right">
              <p>Este software ha sido desarrollado únicamente con fines académicos. No está destinado para uso comercial ni profesional. Los autores no se responsabilizan de cualquier uso indebido del mismo.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
  {/* Probando*/ }
};

export default HomePage;