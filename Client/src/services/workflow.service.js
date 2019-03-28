import axios from 'axios'
import { globalConstants } from '_constants';

const domainName = "http://178.128.214.101:8002"

const engineUrl = "http://127.0.0.1:8000/create_workflow/"


export const workflowService = {
  getAllServices,
  getAllMethodsByServiceId,
  sendWorkflowData,
  sendWorkflowDataToEngine,
  getWorkflowByAppName,
};

function getAllServices() {
  return axios.get(domainName + '/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post(domainName + '/get_all_methods/', { serviceId })
}

function sendWorkflowData(
  appName,
  appDescription,
  workflowData,
) {
  let token = localStorage.getItem('user');
  token = JSON.parse(token).token;
  return axios.post(globalConstants.USER_CREATE_WORKFLOW_URL,
    {
      name: appName,
      description: appDescription,
      ...workflowData
    },
    {
      headers: {
        Authorization: "Token " + token,
      }
    })
}


function sendWorkflowDataToEngine(
  appName,
  appDescription,
  workflowData,
) {
  let token = localStorage.getItem('user');
  token = JSON.parse(token).token;
  return axios.post(engineUrl,
    {
      name: appName,
      description: appDescription,
      ...workflowData
    },
    {
      headers: {
        Authorization: "Token " + token,
      }
    })
}

function getWorkflowByAppName(appName) {
  return axios.post(domainName + '/get_workflow/', appName)
}
