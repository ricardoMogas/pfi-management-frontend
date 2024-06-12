import axios from 'axios';

class GraphFetch {

    constructor(API_BASE_URL) {
      this.API_BASE_URL = API_BASE_URL;
    }

    async GetVisitsPerDay(type) {
      try {
        const response = await axios.get(`${this.API_BASE_URL}/Graph?type=${type}`);
        const resultResponse = response.data;
        return resultResponse;
      } catch (error) {
        console.error('Error fetching copias:', error);
      }
    }

}
export default GraphFetch;
// Obtener estadisticas avansadas
/*
const graphObject = new GraphFetch("http://localhost/PFI-Services-Api");

const result = await graphObject.GetVisitsPerDay("VisitasPorDia");
console.log(result);
*/