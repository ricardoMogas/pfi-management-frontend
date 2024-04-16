import React, { useEffect, useState } from 'react';
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
const types = ['Licenciatura', 'Visitas', 'Genero', 'Etnia'];
const typeFrequency = ['Todos','Etnia', 'Licenciatura', 'Genero'];

export default function ReportPage() {
    /*** USESTATE CONSTS ***/
    const [currentType, setCurrentType] = useState(null);
    const [currentTypeFrequency, setcurrentTypeFrequency] = useState(null);

    //obtener el tipo actual 
    const gettingTypeReport = (type) => {
        setCurrentType(type);
    };
    const gettingTypeFrequency = (type) => {
        setcurrentTypeFrequency(type);
    }
    /**  CONDICIONALES ***/
    const currentActionForComponent = () => {
        switch (currentType) {
            case 'Visitas':
                return <Dropdown currentType={currentTypeFrequency} types={typeFrequency} onTypeChange={gettingTypeFrequency} />;
            default:
                return null;
        }
    }

    return (
        <main>
            <section className="card text-center m-5">
                <div className="card-header">Alumnos</div>
                <div className="card-body">
                    <section className='row'>
                        <div className='col'>
                            <Dropdown currentType={currentType} types={types} onTypeChange={gettingTypeReport} />
                        </div>
                        <div className='col'>
                            {currentActionForComponent()}
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
                    <BarChart data={data} width={800} height={400} />
                </div>
                <div className='card-footer text-body-secondary'>
                    <button type='button' className='btn btn-primary m-1'>Generar Grafica</button>
                    <button type='button' className='btn btn-success m-1'>Generar Reporte</button>
                </div>
            </section>
        </main>
    );
};

function Dropdown({ currentType, types, onTypeChange }) {
    const handleTypeClick = (type) => {
        onTypeChange(type);
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-info dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                Tipo {currentType}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {types.map((type, index) => (
                    <li key={index}>
                        <button className="dropdown-item" onClick={() => handleTypeClick(type)}>
                            {type}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}