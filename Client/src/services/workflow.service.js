import axios from 'axios'
import { globalConstants } from '_constants';

const domainName = "http://178.128.214.101:8002"

const engineUrl = "http://127.0.0.1:8000/create_workflow/"


export const workflowService = {
  getAllServices,
  getAllMethodsByServiceId,
  sendWorkflowData,
  sendWorkflowDataToSocket,
  getWorkflowByAppName,
};

function getAllServices() {
  return axios.get(domainName + '/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post(domainName + '/get_all_methods/', { serviceId })
}

// Send both form and bpmn json together
function sendWorkflowData(
  appName,
  appDescription,
  bpmnJson,
  appliedMethods,
  appliedConditions,
  generatedForms) {
  const token = localStorage.getItem('user').toString()
  return axios.post(globalConstants.USER_CREATE_WORKFLOW_URL,
    {
      name: appName,
      description: appDescription,
      bpmnJson,
      appliedMethods,
      appliedConditions,
      generatedForms
    },
    {
      headers: {
        Authorization: "Token " + token,
      }
    })
}


function sendWorkflowDataToSocket(
  appName,
  appDescription,
  bpmnJson,
  appliedMethods,
  appliedConditions,
  generatedForms) {
  const token = localStorage.getItem('user').toString()
  return axios.post(engineUrl,
    {
      name: appName,
      description: appDescription,
      bpmnJson,
      appliedMethods,
      appliedConditions,
      generatedForms
    })
}

function getWorkflowByAppName(appName) {
  return axios.post(domainName + '/get_workflow/', appName)
}
