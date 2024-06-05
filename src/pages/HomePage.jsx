import React, { useState } from 'react';
import Welcome from '../components/Welcome';
import CopieasComponent from '../components/CopiasCard';
import VisitsComponent from '../components/RegisteredVisitsForm';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Button, CardTitle, CardText, CardBody } from 'reactstrap';
import Divider from '../../ui_components/Divider';
import { AreaChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, Cell, Legend } from 'recharts';
import Utils from '../store/Utils';
import CopiasCard from '../components/CopiasCard';

const HomePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('home');

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const selectComponent = (component) => {
    setSelectedComponent(component);
  };

  const data = [
    { name: 'ISC', value: 41 },
    { name: 'IE', value: 23 },
    { name: 'IM', value: 23 },
    { name: 'ICA', value: 13 },
  ];
  const data02 = [
    {
      "name": "19-01-2021",
      "Masculino": 4,
      "Femenino": 10,
    },
    {
      "name": "20-01-2021",
      "Masculino": 8,
      "Femenino": 4,
    },
    {
      "name": "21-01-2021",
      "Masculino": 23,
      "Femenino": 0,
    },
    {
      "name": "22-01-2021",
      "Masculino": 5,
      "Femenino": 2,
    },
    {
      "name": "23-01-2021",
      "Masculino": 5,
      "Femenino": 2,
    },
    {
      "name": "24-01-2021",
      "Masculino": 7,
      "Femenino": 2,
    },
    {
      "name": "25-01-2021",
      "Masculino": 7,
      "Femenino": 1,
    },
    {
      "name": "26-01-2021",
      "Masculino": 2,
      "Femenino": 2,
    },
    {
      "name": "27-01-2021",
      "Masculino": 3,
      "Femenino": 1,
    },
    {
      "name": "28-01-2021",
      "Masculino": 5,
      "Femenino": 1,
    },
    {
      "name": "29-01-2021",
      "Masculino": 3,
      "Femenino": 1,
    },

  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <h1 style={{ color: "var(--blue)" }}>Estadísticas Generales</h1>
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
                  <Area type="monotone" dataKey="Masculino" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="Femenino" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
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
            <CardBody> {/* Replace CardText with CardBody */}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={Utils.RandomColor()} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardBody> {/* Close CardBody */}
          </Card>
        </div>
      </div>
      <h1 style={{ color: "var(--blue)" }}>Funciones más usadas</h1>
      <hr />
      <div className='row my-4'>
        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title text-center'>Registro de visitas</h5>
          </div>
          <VisitsComponent />
        </div>
        <CopiasCard />

        <footer
          style={{ color: "#fff", height: "20px", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` }}
          className="text-dark py-4 fixed-bottom"
        >
          <div className="container" style={{ color: "#fff" }}>
            <div className="row">
              <div className="col-md-6">
                <p>¡Gracias por visitar el PFI! Esperamos que disfrutes de tu estancia.</p>
              </div>
              <div className="col-md-6 text-md-right">
                <p>Este software ha sido desarrollado únicamente con fines académicos. No está destinado para uso comercial ni profesional. Los autores no se responsabilizan por cualquier uso indebido del mismo.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
  {/* Probando*/ }
};

export default HomePage;