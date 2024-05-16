import axios from "axios";

export default class ReportFetcher {
    constructor(API_BASE_URL) {
        this.API_BASE_URL = API_BASE_URL;
    }

    async GetGraphData(filters) {
        console.log(filters);
        const dataJson = {
            type : filters.type,
            typeFrequency : filters.typeFrequency,
            startDate : filters.startDate,
            endDate : filters.endDate
        }
        try {
        const response = await axios.post(`${this.API_BASE_URL}/Graph`, dataJson);
        const resultResponse = response.data;
        return resultResponse;
        } catch (error) {
            console.error("Error fetching graph data:", error);
        }
    }
    
    async GetReportData(filters) {
        const dataJson = {
            type : filters.type,
            typeFrequency : filters.typeFrequency,
            startDate : filters.startDate,
            endDate : filters.endDate
        }
        try {
        const response = await axios.post(`${this.API_BASE_URL}/Report`, dataJson);
        const resultResponse = response.data;
        return resultResponse;
        } catch (error) {
        console.error("Error fetching report data:", error);
        }
    }

    ActualDate() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaActual.getFullYear().toString();
        return `${anio}-${mes}-${dia}`;
    };
}
/*
const response = new ReportFetcher("http://localhost/PFI-Services-Api");
const data = {
    type: 'Visitas',
    typeFrequency: null,
    startDate: null,
    endDate: null
};
const result = await response.GetReportData(data);
console.log(result);
*/
/*
const response = new ReportFetcher("http://localhost/PFI-Services-Api");
const data = {
    type: null,
    typeFrequency: null,
    startDate: null,
    endDate: null
};
console.log(await response.GetGraphData(data));
*/