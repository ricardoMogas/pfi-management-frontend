import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    // más datos aquí...
];
const types = ['Alumnos', 'Visitas', 'Licenciatura', 'Solo genero', 'Etnia'];
export default function ReportPage() {
    return (
        <>
            <main >
                <section className="card text-center m-5">
                    <div className="card-header">Alumnos</div>
                    <div className="card-body">
                        <section className='row'>
                            <div className='col'>
                                <Dropdown currentType={'alumnos'} types={types}/>
                            </div>
                        </section>
                    </div>
                    <BarChart
                        width={600}
                        height={300}
                        data={data}
                        style={{ width: '100%' }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                    <div className='card-footer text-body-secondary'>
                        <button className='btn btn-success'>Generar Reporte</button>
                    </div>
                </section>
            </main>
        </>
    );
};

function Dropdown({currentType, types}) {
    return (
        <div className="dropdown">
            <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Tipo {currentType}
            </a>
            <ul className="dropdown-menu">
                {types.map((type, index) => (
                    <li key={index}>
                        <a className="dropdown-item" href="#">
                            {type}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
  }