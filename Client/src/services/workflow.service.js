import axios from 'axios'
import { globalConstants } from '_constants';
import { getUserToken } from '_helpers';

const domainName = "http://178.128.214.101:8002"
const engineUrl = "http://127.0.0.1:8000/create_workflow/"

export const workflowService = {
  getAllServices,
  getAllMethodsByServiceId,
  getMyFlows,
  getCurrentLogs,
  getInputForm,

  resetExecutionState,

  createNewWorkflow,
  updateWorkflow,
  sendWorkflowDataToEngine,

  deleteCollaborators,
  deleteWorkflowById,
};

function getInputForm(workflowId, taskId) {
  return axios.post(globalConstants.GET_PREVIEW_INPUT_FORM_URL, { workflowId, taskId });

}

function resetExecutionState(workflowId) {
  return axios.post(engineUrl, { workflowId });

}

function getCurrentLogs(workflowId) {
  return axios.get(globalConstants.WORKFLOW_LOG_URL + workflowId, {
    headers: {
      Authorization: "Token" + getUserToken(),
    }
  });
}

function deleteWorkflowById(workflowId) {
  return axios.delete(globalConstants.USER_WORKFLOW_URL + `/${workflowId}`, {
    headers: {
      Authorization: "Token " + getUserToken(),
    }
  })
}

function deleteCollaborators(workflow_id, collaborators) {
  return axios.post(globalConstants.DELETE_COLLABORATORS_URL + workflow_id, {
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
) {
  return axios.post(globalConstants.USER_WORKFLOW_URL,
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


function sendWorkflowDataToEngine(
  name,
  description,
  workflowData,
  workflow_id,
) {
  return axios.post(engineUrl,
    {
      name: name,
      description: description,
      user_token: getUserToken(),
      workflow_id,
      ...workflowData
    }
  );
}

function getMyFlows() {
  return axios.get(globalConstants.USER_WORKFLOW_URL, {
    headers: {
      Authorization: "Token " + getUserToken(),
    }
  })
}