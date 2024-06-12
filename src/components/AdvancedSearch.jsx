import React, { useState } from 'react';
import {
    Card, CardBody, CardTitle, Button, Table, Input,
    CardHeader, Popover, PopoverHeader, PopoverBody,
    Modal
} from 'reactstrap';
import Select from 'react-select';
import AceEditor from 'react-ace';
import axios from 'axios';
import 'ace-builds/src-noconflict/mode-sql';
import options from '../store/DataJson/QuerysSelect.json';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };
const AdvancedSearch = () => {
    const [originalData, setOriginalData] = useState([]); // State to store original data
    const [filteredData, setFilteredData] = useState([]);
    const [filterValues, setFilterValues] = useState({});
    const [selectedQuery, setSelectedQuery] = useState('');
    const [hasResults, setHasResults] = useState(true); // State to track if there are results
    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);


    const handleFilterChange = (e, column) => {
        const value = e.target.value || '';
        setFilterValues({
            ...filterValues,
            [column]: value.toLowerCase(),
        });
        filterData();
    };

    const handleQuerySelect = (option) => {
        setSelectedQuery(option.query);
    };

    const filterData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_API}/advance?query=${encodeURIComponent(selectedQuery)}`);
            const responseData = response.data;

            if (responseData.status === 'ok') {
                let filtered = responseData.result;

                // Apply filters for each column
                Object.keys(filterValues).forEach((key) => {
                    const filterVal = filterValues[key];
                    filtered = filtered.filter((item) =>
                        item[key].toString().toLowerCase().includes(filterVal)
                    );
                });

                setFilteredData(filtered);
                setHasResults(filtered.length > 0); // Update hasResults based on filtered data

                // Store original data when filters are first applied
                if (originalData.length === 0) {
                    setOriginalData(responseData.result);
                }
            } else {
                alert(responseData.result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Ha ocurrido un error al obtener los datos.');
        }
    };

    const resetFilters = () => {
        setFilterValues({});
        setFilteredData(originalData);
        setHasResults(true); // Assume there are results after resetting
    };

    return (
        <Card>
            <CardHeader style={ColorPrimary}>
                <h4 tag="h5">Busqueda Avanzada</h4>
            </CardHeader>
            <CardBody>
                <div>
                    <Button
                        id='Popover1'
                        type='buttons'
                        color="info"
                        onClick={togglePopover}
                        style={{ width: '100%', height: '55px', marginBottom: '10px', marginRight: '10px' }}
                    >Ver Tablas</Button>
                    <Modal isOpen={popoverOpen} toggle={togglePopover}>
                        <img src="database_tabla.png" alt="Imagen de la base de datos" style={{ width: '120%' }} />
                    </Modal>
                </div>
                <div className="row m-2">
                    <div className='col-8'>
                        <AceEditor
                            mode="sql"
                            value={selectedQuery}
                            onChange={(value) => setSelectedQuery(value)}
                            placeholder="Ingrese su consulta SQL"
                            style={{ borderRadius: "4px", width: '100%', height: '55px' }}
                            setOptions={{ fontSize: 14 }}
                        />
                    </div>
                    <div className='col'>
                        <Select
                            options={options}
                            isSearchable
                            onChange={handleQuerySelect}
                            placeholder="Seleccionar query"
                        />
                    </div>
                    <div className="col">
                        <Button
                            color="primary"
                            onClick={filterData}
                            style={{ width: '100%', height: '55px', marginBottom: '10px', marginRight: '10px' }}
                        >Buscar</Button>
                    </div>
                </div>
                {filteredData && filteredData.length > 0 && hasResults ? (
                    <>
                        <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {Object.keys(filteredData[0]).map((key, index) => (
                                            <th key={index}>
                                                <Input
                                                    type="text"
                                                    value={filterValues[key] || ''}
                                                    onChange={(e) => handleFilterChange(e, key)}
                                                    placeholder={`Filtrar ${key}`}
                                                />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, rowIndex) => (
                                        <tr key={rowIndex}>
                                            <td>{rowIndex + 1}</td>
                                            {Object.values(item).map((value, colIndex) => (
                                                <td key={colIndex}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <p>Total de resultados: {filteredData.length}</p>
                    </>
                ) : (
                    <div className='container text-center m-5'>
                        <i className="bi bi-table fs-1"></i>
                        {filteredData.length === 0 && !hasResults && (
                            <>
                                <p>No hay resultados que coincidan con los filtros aplicados.</p>
                                <Button
                                    color="secondary"
                                    onClick={resetFilters}
                                    style={{ width: '50%', height: '55px', marginBottom: '10px' }}
                                >Limpiar Filtros</Button>
                            </>


                        )}
                        {filteredData.length === 0 && hasResults && (
                            <p>No hay datos disponibles.</p>
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default AdvancedSearch;
