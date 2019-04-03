import axios from 'axios'
import { globalConstants } from '_constants';
import { getToken } from '_helpers';

const domainName = "http://178.128.214.101:8002"

const engineUrl = "http://127.0.0.1:8000/create_workflow/"


export const workflowService = {
  getAllServices,
  getAllMethodsByServiceId,
  createNewWorkflow,
  updateWorkflow,
  sendWorkflowDataToEngine,
  getMyFlows,
};

function getAllServices() {
  return axios.get(domainName + '/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post(domainName + '/get_all_methods/', { serviceId })
}

function updateWorkflow(
  appName,
  appDescription,
  workflowData,
  workflowId, ) {

  return axios.post(globalConstants.USER_WORKFLOW_URL, {
    id: workflowId,
    data: {
      name: appName,
      description: appDescription,
      ...workflowData
    }
  }, {
      headers: {
        Authorization: "Token " + getToken(),
      }
    })

}

function createNewWorkflow(
  appName,
  appDescription,
  workflowData,
  workflowId,
) {
  return axios.post(globalConstants.USER_WORKFLOW_URL,
    {
      id: workflowId,
      name: appName,
      description: appDescription,
      ...workflowData
    },
    {
      headers: {
        Authorization: "Token " + getToken(),
      }
    })
}


function sendWorkflowDataToEngine(
  appName,
  appDescription,
  workflowData,
) {
  return axios.post(engineUrl,
    {
      name: appName,
      description: appDescription,
      ...workflowData
    },
    {
      headers: {
        Authorization: "Token " + getToken(),
      }
    })
}

function getMyFlows() {
  return axios.get(globalConstants.USER_WORKFLOW_URL, {
    headers: {
      Authorization: "Token " + getToken(),
    }
  })
}