import axios from "axios";
import { param } from "jquery";

class StudentsFetcher {

    constructor(API_BASE_URL) {
        this.API_BASE_URL = API_BASE_URL;
    }

    async GetAllStudents() {
        try {
            const response = await axios.get(this.API_BASE_URL + '/students');
            const students = response.data.result.map(student => ({ ...student, checked: false }));
            return students;
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    async GetAllStudentsPagination(page, perPage, filters) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/SearchStudent?page=${page}&perPage=${perPage}`, filters);
            const resultResponse = response.data.result;
            const students = resultResponse.data.map(student => ({ ...student, checked: false }));
            console.log()
            const result = {
                total : response.data.result.total,
                students : students
            }
            return result;
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    async RegisterStudent(studentData) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/students`, studentData);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error registering student:', error);
        }
    }

    async UpdateStudent(studentData) {
        const data = {
            registration : studentData.registration,
            name : studentData.name,
            gender : studentData.gender,
            birthday_date : studentData.birthday_date,
            ethnicity : studentData.ethnicity,
            career : studentData.career,
            status : studentData.status,
            origin_place : studentData.origin_place,
        }
        try {
            const response = await axios.put(`${this.API_BASE_URL}/students`, data);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error updating student:', error);
        }
    }

    async DeleteStudent(registration) {
        try {
            const response = await axios.post(`${this.API_BASE_URL}/DeleteStudent?registration=${registration}`);
            const result = response.data.result;
            return result;
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
}
export default StudentsFetcher;

// USO DE LA CLASE GetAllStudentsPagination
/*
const filters = {
    registration: 66,
    name: null,
    gender: null,
    ethnicity: null,
    career: null,
    status: null
};

const studentsFetcher = new StudentsFetcher("http://localhost/PFI-Services-Api");
const students = await studentsFetcher.GetAllStudentsPagination(1, 2, filters);
console.log(students);
*/

// USO DE LA CLASE GetAllStudents
/*
const studentsFetcher = new StudentsFetcher("http://localhost/PFI-Services-Api");
const students = await studentsFetcher.GetAllStudents();
console.log(students);
*/
