import React, { useState } from 'react';
import { Card, Button, Form, FormGroup, Label, Input, Table, CardBody } from 'reactstrap';
import MarkHoursCard from '../components/SocialServiceComponents/MarkHoursCard';
const ColorPrimary = { color: "#fff", backgroundColor: `${import.meta.env.VITE_REACT_COLOR_PRIMARY}` };

const dummyUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', password: '123456', role: 1 },
    { id: 2, name: 'Ana Gómez', email: 'ana.gomez@example.com', password: '654321', role: 0 },
];

const dummyServiceHours = [
    { id: 1, id_user: 1, date: '2024-06-12', hours: 5.5 },
    { id: 2, id_user: 2, date: '2024-06-12', hours: 3.25 },
    { id: 3, id_user: 1, date: '2024-06-13', hours: 4.75 },
];

const SocialServicePage = () => {
    const [users, setUsers] = useState(dummyUsers);
    const [serviceHours, setServiceHours] = useState(dummyServiceHours);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(0);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [hours, setHours] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [filteredHours, setFilteredHours] = useState([]);
    const [totalFilteredHours, setTotalFilteredHours] = useState(0);

    const createUser = () => {
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            role,
        };
        setUsers([...users, newUser]);
        setName('');
        setEmail('');
        setPassword('');
        setRole(0);
    };

    const handleFilter = () => {
        const filtered = serviceHours.filter(hour =>
            (!startDate || hour.date >= startDate) &&
            (!endDate || hour.date <= endDate) &&
            (!selectedUserId || hour.id_user === parseInt(selectedUserId))
        );
        setFilteredHours(filtered);

        const total = filtered.reduce((sum, record) => sum + record.hours, 0);
        setTotalFilteredHours(total);
    };

    const formatHours = (decimalHours) => {
        const h = Math.floor(decimalHours);
        const m = Math.round((decimalHours - h) * 60);
        return `${h} horas ${m} minutos`;
    };

    return (
        <>
            <h1 style={{ color: "var(--blue)" }}>MARCAR HORAS</h1>
            <hr />
            <div className='my-5'>
                <MarkHoursCard users={dummyUsers} />
            </div>
            <h1 style={{ color: "var(--blue)" }}>HORAS DE SERVICIO</h1>
            <hr />
            <div className='my-5'>
                <Card>
                    <CardBody>
                        <Form inline>
                            <FormGroup>
                                <Label for="startDate" className="mr-2">Fecha de Inicio</Label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    onChange={e => setStartDate(e.target.value)}
                                    value={startDate}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="endDate" className="mr-2">Fecha de Fin</Label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    id="endDate"
                                    onChange={e => setEndDate(e.target.value)}
                                    value={endDate}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userFilterSelect" className="mr-2">Seleccionar Usuario</Label>
                                <Input
                                    type="select"
                                    name="userFilter"
                                    id="userFilterSelect"
                                    onChange={e => setSelectedUserId(e.target.value)}
                                    value={selectedUserId}
                                >
                                    <option value="">Todos los usuarios</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Button color="primary" onClick={handleFilter} className="ml-2">
                                Filtrar
                            </Button>
                        </Form>
                        <Table striped className="mt-5">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Fecha</th>
                                    <th>Horas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHours.map(record => {
                                    const user = users.find(user => user.id === record.id_user);
                                    return (
                                        <tr key={record.id}>
                                            <th scope="row">{record.id}</th>
                                            <td>{user ? user.name : 'Usuario desconocido'}</td>
                                            <td>{record.date}</td>
                                            <td>{formatHours(record.hours)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        {totalFilteredHours > 0 && <p>Total de Horas Filtradas: {formatHours(totalFilteredHours)}</p>}
                    </CardBody>
                </Card>
            </div>
            <h1 style={{ color: "var(--blue)" }}>CRUD SERVICIO SOCIAL</h1>
            <hr />
            <div className='my-5'>
                <Card>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Nombre</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Nombre"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Contraseña</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="role">Rol</Label>
                                <Input
                                    type="select"
                                    name="role"
                                    id="role"
                                    value={role}
                                    onChange={e => setRole(parseInt(e.target.value))}
                                >
                                    <option value={0}>Usuario</option>
                                    <option value={1}>Servicio</option>
                                </Input>
                            </FormGroup>
                            <Button color="primary" onClick={createUser} style={ColorPrimary}>
                                Crear Usuario
                            </Button>
                        </Form>

                        <Table striped className="mt-5">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role === 1 ? 'Servicio' : 'Usuario'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default SocialServicePage;
