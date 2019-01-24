  import axios from 'axios'

export const bpmnService = {
  getAllServices,
  getAllMethodsByServiceId,
  sendWorkflowFormData,
  sendWorkflowBpmnJson,
  sendWorkflowData,
};

function getAllServices() {
  return axios.get('http://127.0.0.1:8000/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post('http://localhost:8000/get_all_methods/', { serviceId })
}

// Send both form and bpmn json together
function sendWorkflowData(appName, appDescription, workflowData) {
  return axios.post('http://localhost:8000/create_workflow/', { appName, appDescription, workflowData })
}

function sendWorkflowFormData(appName, formData) {
  return axios.post('http://localhost:8000/send_workflow_formData/', { appName, formData })
}
function sendWorkflowBpmnJson(appName, bpmnJson) {
  return axios.post('http://localhost:8000/send_workflow_bpmnJson/', { appName, bpmnJson })
}




