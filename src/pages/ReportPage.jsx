import React, { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import CreateExcelReport from '../store/CreateExcel/CreateExcelReport';

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
const typeFrequency = ['Todos', 'Etnia', 'Licenciatura', 'Genero'];

export default function ReportPage() {
    /*** USESTATE CONSTS ***/
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentType, setCurrentType] = useState(null);
    const [currentTypeFrequency, setcurrentTypeFrequency] = useState(null);
    const [dataJson, setDataJson] = useState({
        types: null,
        typeFrequency: null,
        startDate: null,
        endDate: null
    });

    //obtener el tipo actual 
    const gettingTypeReport = (type) => {
        setCurrentType(type);
        setDataJson({ ...dataJson, types: type });
    };

    const gettingTypeFrequency = (type) => {
        setcurrentTypeFrequency(type);
        setDataJson({ ...dataJson, typeFrequency: type });
        console.log(type);
    }
    /*** GENERATE GRAPH OR REPORT ***/
    const generateGraph = () => {
        if (dataJson.types===null) {
            alert('Elige un tipo de reporte');
            return; // No se puede generar la gráfica
        }
        /*
        if (currentType !== null && currentTypeFrequency === null) {
            alert('Faltan datos para generar la gráfica: Tipo de Frecuencia');
            return; // No se puede generar la gráfica
        }
        */
        console.log('Generar Gráfica: ', dataJson);
        const excelData = [
            ['Nombre', 'Valor1', 'Valor2'],
            ...data.map(item => [item.name, item.value1, item.value2])
        ];
        const excelExporter = new CreateExcelReport(excelData, 'grafica.xlsx');
        excelExporter.exportToExcel();
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

    const StartDateChange = (e) => {
        const selectedStartDate = new Date(e.target.value);
        const selectedEndDate = new Date(endDate);

        // Validar que la fecha de inicio no sea mayor que la fecha de fin
        if (selectedEndDate < selectedStartDate) {
            alert('La fecha de inicio no puede ser mayor que la fecha de fin');
            return;
        }
        // Validar que el rango de fechas no sea mayor a 1 año
        const oneYearFromStartDate = new Date(selectedStartDate);
        oneYearFromStartDate.setFullYear(oneYearFromStartDate.getFullYear() + 1);
        if (oneYearFromStartDate < selectedEndDate) {
            alert('El rango de fechas no puede ser mayor a 1 año');
            return;
        }
        setStartDate(e.target.value);
        setDataJson({ ...dataJson, startDate: e.target.value });
    }

    const EndDateChange = (e) => {
        const selectedEndDate = new Date(e.target.value);
        const selectedStartDate = new Date(startDate);

        // Validar que la fecha de fin no sea menor que la fecha de inicio
        if (selectedEndDate < selectedStartDate) {
            alert('La fecha de fin no puede ser menor que la fecha de inicio');
            return;
        }
        // Validar que el rango de fechas no sea mayor a 1 año
        const oneYearFromStartDate = new Date(selectedStartDate);
        oneYearFromStartDate.setFullYear(oneYearFromStartDate.getFullYear() + 1);
        if (oneYearFromStartDate < selectedEndDate) {
            alert('El rango de fechas no puede ser mayor a 1 año');
            return;
        }
        setEndDate(e.target.value);
        setDataJson({ ...dataJson, endDate: e.target.value });
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
                            <input className="form-control" type="date" value={startDate} onChange={StartDateChange} />
                            Del mes
                        </div>
                        <div className='col'>
                            <input className="form-control" type="date" value={endDate} onChange={EndDateChange} />
                            Hasta
                        </div>
                    </section>
                </div>
                <div className="d-flex justify-content-center">
                    <BarChart data={data} width={800} height={400} />
                </div>
                <div className='card-footer text-body-secondary'>
                    <button type='button' className='btn btn-primary m-1' onClick={generateGraph}>Generar Gráfica</button>
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
