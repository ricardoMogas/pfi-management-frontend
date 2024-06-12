import axios from "axios";

export default class VisitsFetch {
    constructor(API_BASE_URL) {
        this.API_BASE_URL = API_BASE_URL;
    }

    async GetVisitsRegistered(date = null) {
        const url = `${this.API_BASE_URL}/visits?todayNotExit=${date}`;
        console.log(url)
        try {
            const response = await axios.get(url);
            const student = response.data;
            return student;
        } catch (error) {
            console.error('Error fetching student:', error);
        }
    }

    async RegisterEntranceVisit(registration, date) {
        if (date === null) {
            date = new Date();
            const dia = date.getDate().toString().padStart(2, '0');
            const mes = (date.getMonth() + 1).toString().padStart(2, '0');
            const anio = date.getFullYear().toString();
            date = `${anio}-${mes}-${dia}`;
        }
        try {
            const response = await axios.post(`${this.API_BASE_URL}/visits?matricula=${registration}&date=${date}`);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }
    async RegisterExitVisit(registration, date) {
        if (date === null) {
            date = new Date();
            const dia = date.getDate().toString().padStart(2, '0');
            const mes = (date.getMonth() + 1).toString().padStart(2, '0');
            const anio = date.getFullYear().toString();
            date = `${anio}-${mes}-${dia}`;
        }
        try {
            const response = await axios.put(`${this.API_BASE_URL}/visits?matricula=${registration}&date=${date}`);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }

    async DeleteVisits(id) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/visits?deleteVisit=${id}`);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }

    // OBTENER NO REGISTRADOS
    async GetVisitsNonRegistered(date = null) {

        const isValidDateFormat = /^\d{2}-\d{2}-\d{2}$/;
        if (date !== null && !isValidDateFormat.test(date)) {
            throw new Error('Invalid date format. Expected format: yy-mm-dd');
        }
        try {
            const response = await axios.get(`${this.API_BASE_URL}/nonRegVisits?todayNotExit=${date}`);
            const student = response.data;
            return student;
        } catch (error) {
            console.error('Error fetching student:', error);
        }
    }

    async NonRegisterEntranceVisit(registration) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/nonRegVisits?matricula=${registration}`);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }
    async NonRegisterExitVisit(registration) {
        try {
            const response = await axios.put(`${this.API_BASE_URL}/nonRegVisits?matricula=${registration}`);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }

    async DeleteVisitsRn(id) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/nonRegVisits?deleteVisit=${id}`);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }
}

// const visits = new VisitsFetch('http://localhost/PFI-Services-Api');


//registrar una entrada
/*
const resultRegister = await visits.RegisterEntranceVisit(66209);
console.log(resultRegister)
*/

//registrar una salida
/*
const resultExit = visits.RegisterExitVisit(66208);
console.log(resultExit ? "Salida correcta" : "Error al registrar salida")
*/
// Obtener entradas de hoy
/*
const resultGet = await visits.GetVisitsRegistered();
console.log(resultGet);
*/