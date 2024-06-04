import React, { useState } from 'react';
import Welcome from '../components/Welcome';
import CopieasComponent from '../components/CopiasCard';
import VisitsComponent from '../components/RegisteredVisitsForm';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Button, CardTitle, CardText, CardBody } from 'reactstrap';
import Divider from '../../ui_components/Divider';
import { AreaChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area  } from 'recharts';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };

const HomePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('home');

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const selectComponent = (component) => {
    setSelectedComponent(component);
  };

  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
  ];
  const data02 = [
    {
      "name": "ISC",
      "value": 2400,
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "IE",
      "value": 4567,
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
  ];
  return (
    <>
      <h1 style={{ color: "var(--blue)" }}>Bienvenido {localStorage.getItem('name')}</h1>
      <hr />
      <div className='row'>
        <div className='col-md-6'>
          <Card body>
            <CardTitle tag="h5">
              Visitas del mes
            </CardTitle>
            <CardBody className='text-center'>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  width={500}
                  height={400}
                  data={data02}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>
        <div className='col-md-6'>
          <Card body>
            <CardTitle tag="h5">
              Alumnos Inscritos
            </CardTitle>
            <CardText>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
                </PieChart>
              </ResponsiveContainer>
            </CardText>
          </Card>
        </div>
      </div>
      <div className='row my-4'>
        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title text-center'>Registro de visitas</h5>
          </div>
          <VisitsComponent />
        </div>
        {/* 
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
      */}
      </div>
    </>
  );
  {/* Probando*/ }
};

export default HomePage;