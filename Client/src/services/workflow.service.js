import axios from 'axios'
import { globalConstants } from '_constants';
import { getUserToken } from '_helpers';

const domainName = "http://178.128.214.101:8002"

const engineUrl = "http://127.0.0.1:8000/create_workflow/"


export const workflowService = {
  getAllServices,
  getAllMethodsByServiceId,
  getMyFlows,

  createNewWorkflow,
  updateWorkflow,
  sendWorkflowDataToEngine,

  deleteCollaborators,
};

function deleteCollaborators(workflow_id, collaborators) {
  return axios.post(globalConstants.COLLABORATORS_URL, {
    workflow_id,
    collaborators,
  }, {
      headers: {
        Authorization: 'Token ' + getUserToken()
      }
    })
}

function getAllServices() {
  return axios.get(domainName + '/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post(domainName + '/get_all_methods/', { serviceId })
}

function updateWorkflow(
  name,
  description,
  workflowData,
  workflowId, ) {

  return axios.post(globalConstants.USER_WORKFLOW_URL, {
    id: workflowId,
    data: {
      name: name,
      description: description,
      ...workflowData
    }
  }, {
      headers: {
        Authorization: "Token " + getUserToken(),
      }
    })

}

function createNewWorkflow(
  name,
  description,
  workflowData,
  workflowId,
) {
  return axios.post(globalConstants.USER_WORKFLOW_URL,
    {
      id: workflowId,
      name: name,
      description: description,
      ...workflowData
    },
    {
      headers: {
        Authorization: "Token " + getUserToken(),
      }
    })
}


function sendWorkflowDataToEngine(
  name,
  description,
  workflowData,
) {
  return axios.post(engineUrl,
    {
      name: name,
      description: description,
      ...workflowData
    },
    {
      headers: {
        Authorization: "Token " + getUserToken(),
      }
    })
}

function getMyFlows() {
  return axios.get(globalConstants.USER_WORKFLOW_URL, {
    headers: {
      Authorization: "Token " + getUserToken(),
    }
  })
}