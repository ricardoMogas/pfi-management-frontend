import axios from 'axios';

class CopiasFetcher {

    constructor(API_BASE_URL) {
      this.API_BASE_URL = API_BASE_URL;
    }

    async GetTotalCopies(registration, date) {
      try {
        const response = await axios.get(`${this.API_BASE_URL}/Copies?registration=${registration}&date=${date}`);
        const resultResponse = response.data.result;
        return resultResponse;
      } catch (error) {
        console.error('Error fetching copias:', error);
      }
    }

    async RegisterCopia(registration, quantityOfPrint, date) {
      try {
        const result= await axios.post(`${this.API_BASE_URL}/Copies?registration=${registration}&total=${quantityOfPrint}&date=${date}`);
        return result.data;
      } catch (error) {
        console.error('Error registering copia:', error);
      }
    }

}
export default CopiasFetcher;
// register copies example
/*
const copiasfetcher = new CopiasFetcher("http://localhost/PFI-Services-Api");
const date = new Date().toISOString().split('T')[0];


const NewCopies = new CopiasFetcher("http://localhost/PFI-Services-Api");
const result = await NewCopies.RegisterCopia(66208, 1, date);
console.log(result);


const copiasTotal = await copiasfetcher.GetTotalCopies(66208, date);
console.log(copiasTotal);
console.log(date);
*/