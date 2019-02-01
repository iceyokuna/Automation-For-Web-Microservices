import axios from 'axios'

const domainName = "http://178.128.214.101:8002"

export const bpmnService = {
  getAllServices,
  getAllMethodsByServiceId,
  sendWorkflowData,
};

function getAllServices() {
  return axios.get(domainName + '/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post(domainName + '/get_all_methods/', { serviceId })
}

// Send both form and bpmn json together
function sendWorkflowData(appName, appDescription, workflowData) {
  return axios.post(domainName + '/create_workflow/', { appName, appDescription, workflowData })
}


