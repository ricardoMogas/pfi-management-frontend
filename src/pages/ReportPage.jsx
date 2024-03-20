import React, { useEffect } from 'react';
import BarChart from '../components/BarChart';
const data = [
    { name: 'A', value1: 4000, value2: 2400 },
    { name: 'B', value1: 3000, value2: 1398 },
    { name: 'C', value1: 2000, value2: 9800 },
    { name: 'D', value1: 2780, value2: 3908 },
    { name: 'E', value1: 1890, value2: 4800 },
    { name: 'F', value1: 2390, value2: 3800 },
    { name: 'G', value1: 3490, value2: 4300 },
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
                                <Dropdown currentType={'alumnos'} types={types} />
                            </div>
                            <div className='col'>
                                <button type="button" class="btn btn-info">Por Genero</button>
                            </div>
                            <div className='col'>
                                
                                <input type="date" className="form-control" />
                                Del mes
                            </div>
                            <div className='col'>
                                <input type="date" className="form-control" />
                                Hasta
                            </div>
                        </section>
                    </div>
                    <div className="d-flex justify-content-center">
                        <BarChart data={data} />
                    </div>
                    <div className='card-footer text-body-secondary'>
                        <button className='btn btn-success'>Generar Reporte</button>
                    </div>
                </section>
            </main>
        </>
    );
};

function Dropdown({ currentType, types }) {
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