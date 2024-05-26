import axios from "axios";

class sessionFetch {

    constructor(API_BASE_URL) {
        this.API_BASE_URL = API_BASE_URL;
    }

    async login(username, password) {
        console.log('API_BASE_URL:', this.API_BASE_URL);
        const data = {
            user: username,
            password: password
        }
        try {
            const response = await axios.post(`${this.API_BASE_URL}/session`, data);
            const user = response.data;
            return user;
        } catch (error) {
            alert('Sin conexión con el servidor');
            console.error('Error fetching user:', error);
        }
    }
    
}
export default sessionFetch;
