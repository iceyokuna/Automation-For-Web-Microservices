import axios from 'axios'

export const bpmnService = {
  getAllServices,
  getAllMethodsByServiceId,
  sendDesignedForm
};

getAllServices = () => {
  return axios.get('http://localhost:8000/get_all_services/')
}

getAllMethodsByServiceId = (serviceId) => {
  return axios.post('http://localhost:8000/get_all_methods/', { serviceId })
}

sendBpmnWorkflow = (workflow) => {

}


