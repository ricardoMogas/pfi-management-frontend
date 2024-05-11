import axios from 'axios';

class CopiasFetcher {

    constructor(API_BASE_URL) {
        this.API_BASE_URL = API_BASE_URL;
    }

  async GetCopias() {
    try {
      const response = await axios.get(this.API_BASE_URL + '/copias-e-impresiones');
      const copias = response.data.result.map(copias => ({ ...copia, checked: false }));
      return copias;
    } catch (error) {
      console.error('Error fetching copias e impresiones:', error);
    }
  }

  async GetCopiasPagination(page, perPage, filters) {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/Copias?page=${page}&perPage=${perPage}`, {
        params: filters
      });
      const resultResponse = response.data.result;
      const copias = resultResponse.data.map(copia => ({ ...copia, checked: false }));
      return copias;
    } catch (error) {
      console.error('Error fetching copias:', error);
    }
  }

  async RegisterCopia(copiaData) {
    try {
      const response = await axios.post(`${this.API_BASE_URL}/copias-e-impresiones`, {
        params: copiaData,
      });
      return result;
    } catch (error) {
      console.error('Error registering copia:', error);
    }
  }
}
export default CopiasFetcher;

// USO DE LA CLASE CopiasFetcher
/*
const CopiasFetcher = new CopiasFetcher("http://localhost/PFI-Services-Api");
const copias = await CopiasFetcher.GetCopias();
console.log(copias);
/*