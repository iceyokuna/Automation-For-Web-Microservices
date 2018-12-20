import axios from 'axios'

export const availaleServicesActions = {
    getAllServices,
    getAllMethodsByServiceId,
};

function getAllServices() {
    return axios.get('http://127.0.0.1:8000/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
    return axios.post('http://localhost:8000/get_all_methods/', { serviceId })
}





