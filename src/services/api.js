import axios from 'axios';
const baseUrl = 'https://dummy.restapiexample.com/api/v1';

export async function getEmployeesList() {
    try {
        const response = await axios.get(`${baseUrl}/employees`);
        return response.data.data;
    } catch(e) {
        return e
    }
}


export async function getEmployee(id) {
    try {
        const response = await axios.get(`${baseUrl}/employee/${id}`);
        return response.data.data
    } catch(e) {
        return e
    }
}

export async function createEmployee(data) {
    try {
        const response = await axios.post(`${baseUrl}/create`,{
            ...data
        });
        return response.data.data
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
        const response = await axios.put(`${baseUrl}/update/${data.id}`, {
            ...data
        });
        return response.data.data
    } catch(e) {
        return e
    }
}