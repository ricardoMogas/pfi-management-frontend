import axios from 'axios';

class BorrowingFetch {

    constructor(API_BASE_URL) {
        this.API_BASE_URL = API_BASE_URL;
    }

    async GetTypeBorrowing() {
        try {
            const response = await axios.get(`${this.API_BASE_URL}/Borrowing?GetTypeBorrowing=true`);
            const resultResponse = response.data.result;
            return resultResponse;
        } catch (error) {
            console.error('Error fetching copias:', error);
        }
    }

    async GetBorrowingsItems(TypeBorrowing) {
        try {
            const response = await axios.get(`${this.API_BASE_URL}/Service?TypeBorrowing=${TypeBorrowing}`);
            const resultResponse = response.data;
            return resultResponse;
        } catch (error) {
            console.error('Error fetching copias:', error);
        }
    }
    /*
    {
        "TypeBorrowing": "book",
        "registration": "66209",
        "item_id": "5",
        "date": "2024-05-10 18:54:11.000000",
        "return_date": "2024-05-10 18:54:11.000000"
    }
    */
    async NewBorrowing(Borrowing) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/Borrowing`, Borrowing);
            const resultResponse = response.data;
            return resultResponse;
        } catch (error) {
            console.error('Error fetching copias:', error);
        }
    }
}
export default BorrowingFetch;

