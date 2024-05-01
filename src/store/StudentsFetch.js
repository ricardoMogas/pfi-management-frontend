import axios from "axios";

class StudentsFetcher {
    constructor() {}

    static async GetAllStudents() {
        try {
            const response = await axios.get(process.env.VITE_REACT_APP_BASE_API + '/students');
            const students = response.data.result.map(student => ({ ...student, checked: false }));
            return students;
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }
    
    static async GetAllStudentsPagination(page, perPage, filters) {
        try {
            const response = await axios.get(`http://localhost/PFI-Services-Api/students?page=${page}&perPage=${perPage}`, {
                params: filters
            });
            const resultResponse = response.data.result;
            const students = resultResponse.data.map(student => ({ ...student, checked: false }));
            return students;
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    static async RegisterStudent(studentData) {
        try {
            const response = await axios.post('http://localhost/PFI-Services-Api/students', studentData, {
                params: studentData,
            });
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }
}
export default StudentsFetcher;

// USO DE LA CLASE GetAllStudentsPagination
/*
const filters = {
    registration: 66208,
    name: null,
    gender: null,
    ethnicity: null,
    career: null,
    status: null
};

const students = await StudentsFetcher.GetAllStudentsPagination(1, 2, filters);
console.log(students);
*/

// USO DE LA CLASE GetAllStudents

const students = await StudentsFetcher.GetAllStudents();
console.log(students);

