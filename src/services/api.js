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
        return Promise.reject("ошибка")
    }
}

export async function createEmployee(data) {
    try {
        const response = await axios.post(`${baseUrl}/create`,{
            ...data
        });
        return response.data.data
    } catch(e) {
        return Promise.reject("ошибка создания")
    }
}

export async function deleteEmployee(id) {
    try {
        const response = await axios.delete(`${baseUrl}/delete/${id}`);
        return response.data.data
    } catch(e) {
        return Promise.reject("ошибка удаления")
    }
}

export async function updateEmployee(data) {
    try {
        const response = await axios.put(`${baseUrl}/update/${data.id}`, {
            ...data
        });
        return response.data.data
    } catch(e) {
        return Promise.reject("ошибка обновления")
    }
}