import axios from 'axios'

export const bpmnService = {
  getAllServices,
  getAllMethodsByServiceId,
  sendWorkflowFormData,
  sendWorkflowBpmnJson,
};

function getAllServices() {
  return axios.get('http://127.0.0.1:8000/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post('http://localhost:8000/get_all_methods/', { serviceId })
}

function sendWorkflowFormData(formData) {
  return axios.post('http://localhost:8000/send_workflow_formData/', { formData })
}
function sendWorkflowBpmnJson(bpmnJson) {
  return axios.post('http://localhost:8000/send_workflow_bpmnJson/', { bpmnJson })
}




