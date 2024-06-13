import React, { useState, useEffect } from 'react';
import { Card, Button, Form, FormGroup, Label, Input, CardBody } from 'reactstrap';

const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };

const MarkHoursCard = ({ users }) => {
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [startTimeMap, setStartTimeMap] = useState({});
    const [hoursMap, setHoursMap] = useState({});
    const [serviceHours, setServiceHours] = useState([]);

    useEffect(() => {
        const storedStartTimeMap = JSON.parse(localStorage.getItem('startTimeMap')) || {};
        const storedHoursMap = JSON.parse(localStorage.getItem('hoursMap')) || {};
        setStartTimeMap(storedStartTimeMap);
        setHoursMap(storedHoursMap);
    }, []);

    const handleStart = (userId) => {
        const newStartTimeMap = { ...startTimeMap, [userId]: new Date() };
        setStartTimeMap(newStartTimeMap);
        localStorage.setItem('startTimeMap', JSON.stringify(newStartTimeMap));
    };

    const handleStop = (userId) => {
        const endTime = new Date();
        const diff = (endTime - startTimeMap[userId]) / (1000 * 60 * 60); // Convert milliseconds to hours
        const newServiceHour = {
            id: serviceHours.length + 1,
            id_user: parseInt(userId),
            date: new Date().toISOString().split('T')[0],
            hours: diff,
        };
        setServiceHours([...serviceHours, newServiceHour]);
        setHoursMap({ ...hoursMap, [userId]: diff });
        localStorage.setItem('hoursMap', JSON.stringify({ ...hoursMap, [userId]: diff }));
        const newStartTimeMap = { ...startTimeMap, [userId]: null };
        setStartTimeMap(newStartTimeMap);
        localStorage.setItem('startTimeMap', JSON.stringify(newStartTimeMap));
    };

    const formatHours = (decimalHours) => {
        const h = Math.floor(decimalHours);
        const m = Math.round((decimalHours - h) * 60);
        return `${h} horas ${m} minutos`;
    };

    return (
        <Card>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="userSelect" className="mr-2">Seleccionar Usuarios</Label>
                        <Input
                            type="select"
                            name="select"
                            id="userSelect"
                            onChange={(e) => setSelectedUserIds(Array.from(e.target.selectedOptions, option => parseInt(option.value)))}
                            multiple
                        >
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    {selectedUserIds.map(userId => (
                        <div key={userId} className="mb-3">
                            <h5>{users.find(user => user.id === userId).name}</h5>
                            <Form inline>
                                <Button
                                    color="primary"
                                    onClick={() => handleStart(userId)}
                                    disabled={startTimeMap[userId]}
                                    className="ml-2"
                                >
                                    Iniciar
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() => handleStop(userId)}
                                    disabled={!startTimeMap[userId]}
                                    className="ml-2"
                                >
                                    Detener
                                </Button>
                                {hoursMap[userId] > 0 && <p>Total de Horas: {formatHours(hoursMap[userId])}</p>}
                            </Form>
                        </div>
                    ))}
                </Form>
            </CardBody>
        </Card>
    );
};

export default MarkHoursCard;
