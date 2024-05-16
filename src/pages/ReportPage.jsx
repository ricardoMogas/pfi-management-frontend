import React, { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import CreateExcelReport from '../store/CreateExcel/CreateExcelReport';
import MiniAlert from '../components/Alert';
import Loader from '../components/Loader';
import ReportFetch from '../store/ReportFetch';
import { json } from 'react-router-dom';
const ReportObject = new ReportFetch(import.meta.env.VITE_REACT_APP_BASE_API);
const data = [
    { name: 'ISC', Hombre: 11, Mujer: 1 },
    { name: 'IM', Hombre: 0, Mujer: 0 },
    { name: 'ICA', Hombre: 0, Mujer: 0 },
    { name: 'IE', Hombre: 0, Mujer: 0 },
    { name: 'IME', Hombre: 0, Mujer: 0 },
    { name: 'ITS', Hombre: 0, Mujer: 0 }
];
const type = ['Licenciatura', 'Visitas', 'Genero', 'Etnia'];
const typeFrequency = ['Todos', 'Etnia', 'Licenciatura', 'Genero'];

export default function ReportPage() {
    /*** *** *** *** USESTATE CONSTS *** *** *** ***/
    const [startDate, setStartDate] = useState(ReportObject.ActualDate());
    const [endDate, setEndDate] = useState('');
    const [currentType, setCurrentType] = useState(null);
    const [currentTypeFrequency, setcurrentTypeFrequency] = useState(null);
    const [dataGraph, setDataGraph] = useState([]);
    const [dataJson, setDataJson] = useState({
        type: null,
        typeFrequency: null,
        startDate: null,
        endDate: null
    });
    /*** *** *** *** USESTATE CONSTS UI *** *** *** ***/
    const [showAlert, setShowAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('primary');
    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('');

    //obtener el tipo actual 
    const gettingTypeReport = (type) => {
        setCurrentType(type);
        setDataJson({ ...dataJson, type: type });
    };

    const gettingTypeFrequency = (type) => {
        setcurrentTypeFrequency(type);
        setDataJson({ ...dataJson, typeFrequency: type });
    }
    /*** GENERATE GRAPH OR REPORT ***/
    const generateReport = async () => {
        if (dataJson.type === null) {
            alert('Elige un tipo de reporte');
            return; // No se puede generar la gráfica
        }
        /*
        if (currentType !== null && currentTypeFrequency === null) {
            alert('Faltan datos para generar la gráfica: Tipo de Frecuencia');
            return; // No se puede generar la gráfica
        }
        */
        const response = await ReportObject.GetReportData(dataJson);
        if (response.status === "error") {
            console.log(response.result);
            return;
        }

        switch (dataJson.type) {
            case 'Visitas':
                const VisitasData = response.result;
                const excelData = [
                    ...VisitasData.map(item => Object.values(item))
                ];
                const excelExporter = new CreateExcelReport(excelData, `Reporte${currentType}.xlsx`, ['ID', 'Matricula', 'Hora de entrada', 'Hora de salida', 'Fecha']);
                excelExporter.exportToExcel();
                break;
            case 'Licenciatura':
            case 'Genero':
            case 'Etnia':
                const DataExel = response.result;
                const sheetsData = DataExel.map(item => ({
                    name: item.name,
                    data: item.data
                }));
                const header = ['registration', 'name', 'p_last_name', 'm_last_name', 'gender', 'birthday_date', 'origin_place', 'ethnicity', 'date_of_registration', 'status'];
                const report = new CreateExcelReport(sheetsData, `Reporte${currentType}.xlsx`, header);
                report.exportToExcelWithSheets();
                break;
            default:
                alert('Función para reporte en desarrollo');
                break;
        }
    }

    /**  CONDICIONALES ***/
    const currentActionForComponent = () => {
        switch (currentType) {
            case 'Visitas':
                return <Dropdown currentType={currentTypeFrequency} type={typeFrequency} onTypeChange={gettingTypeFrequency} />;
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
        GraphFetch();
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
        GraphFetch();
    }

    // ---------- fetching data ----------
    const GraphFetch = async () => {
        const response = await ReportObject.GetGraphData(dataJson);
        if (response.status === "error") {
            console.log(response.result);
            return;
        }
        setDataGraph(response.result);
    };
    useEffect(() => {
        if (dataJson.type === "Visitas") {
            alert('Función para grafica en desarrollo');
            dataGraph.length = 0;
            return;
        }
        GraphFetch();
    }, [dataJson]);
    return (
        <main>
            <section className="card text-center m-5">
                <div className="card-header">Generador de Reportes</div>
                <div className="card-body">
                    <section className='row'>
                        <div className='col'>
                            <Dropdown currentType={currentType} type={type} onTypeChange={gettingTypeReport} />
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
                    {dataGraph.length > 0 ?
                        <BarChart data={dataGraph} width={500} height={300} />
                        :
                        <div className='m-5'>
                            <i className="bi bi-bar-chart-line fs-1"></i>
                            <h5>Seleccionar datos para visualizar Grafico</h5>
                        </div>
                    }
                </div>
                <div className='card-footer text-body-secondary'>
                    <button type='button' className='btn btn-success m-1' onClick={generateReport}>Generar Reporte</button>
                </div>
            </section>
        </main>
    );
};

function Dropdown({ currentType, type, onTypeChange }) {
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
                {type.map((type, index) => (
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


