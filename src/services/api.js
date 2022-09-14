import axios from 'axios';
const baseUrl = 'https://dummy.restapiexample.com/api/v1';

export async function getEmployeesList() {
    let employees = [];
    try {
        const response = await axios.get(`${baseUrl}/employees`);
        employees = response.data.data;
        return employees;
    } catch(e) {
        return e
    }
}

export async function getEmployee(id) {
    try {
        return await axios.get(`${baseUrl}/employee/${id}`);
    } catch(e) {
        return e
    }
}

export async function createEmployee(data) {
    try {
        return await axios.post(`${baseUrl}/create`,{
            ...data
        });
    } catch(e) {
        return e
    }
}

export async function deleteEmployee(id) {
    try {
        return await axios.delete(`${baseUrl}/delete/${id}`);
    } catch(e) {
        return e
    }
}

export async function updateEmployee(data) {
    try {
        return await axios.put(`${baseUrl}/update/${data.id}`, {
            ...data
        });
    } catch(e) {
        return e
    }
}