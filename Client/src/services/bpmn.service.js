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

sendWorkflowFormData = (formData) => {
  return axios.post('http://localhost:8000/send_workflow_formData/', { formData })
}
sendWorkflowBpmnJson = (bpmnJson) => {
  return axios.post('http://localhost:8000/send_workflow_bpmnJson/', { bpmnJson })
}




