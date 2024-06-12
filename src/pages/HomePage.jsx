import React, { useEffect, useState } from 'react';
import VisitsComponent from '../components/RegisteredVisitsForm';
import { Card, CardTitle, CardBody } from 'reactstrap';
import { AreaChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area, Cell, Legend } from 'recharts';
import Utils from '../store/Utils';
import CopiasCard from '../components/CopiasCard';
import GraphFetch from '../store/Requests/GraphFetch';
import ReportFetch from '../store/Requests/ReportFetch';
import { generatePath } from 'react-router-dom';
const graphObject = new GraphFetch(import.meta.env.VITE_REACT_APP_BASE_API);
const reportObject = new ReportFetch(import.meta.env.VITE_REACT_APP_BASE_API);

const HomePage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [vistGraph, setVistGraph] = useState([]);
  const [genderGraph, setGenderGraph] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const selectComponent = (component) => {
    setSelectedComponent(component);
  };
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

  useEffect(() => {
    graphObject.GetVisitsPerDay("VisitasPorDia")
      .then(response => {
        setVistGraph(response.result);
      }).catch(error => {
        console.error(error);
      })

    reportObject.GetGraphData({
      type: 'Genero',
      typeFrequency: null,
      startDate: null,
      endDate: null
    }).then(response => {
      setGenderGraph(response.result);
      const total = response.result.reduce((sum, student) => sum + student.Total, 0);
      setTotalStudents(total);
    }).catch(error => {
      console.error(error);
    });
  }, []);
  return (
    <>
      {/* ******************** ESTADISTICS ******************** */}
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
                  data={vistGraph}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stackId="1" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </div>
        <div className='col-md-6'>
          <Card body>
            <CardTitle tag="h5">
              Alumnos Inscritos : {totalStudents}
            </CardTitle>
            <CardBody> {/* Replace CardText with CardBody */}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={500} height={500}>
                  <Pie
                    data={genderGraph}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="Total"
                  >
                    {genderGraph.map((entry, index) => (
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
      {/* ******************** MORE USE OPCIONS ******************** */}
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
      </div>
    </>
  );
  {/* Probando*/ }
};

export default HomePage;