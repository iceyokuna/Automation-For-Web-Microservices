import { bpmnConstants } from '_constants';
import { bpmnService } from 'services'
import { history } from '_helpers';

export const bpmnActions = {
  addNewForm,
  getNextForm,
  addNameToId,

  setBpmnJson,
  setAppInfo,

  // RESTful
  sendWorkflowData,
  getWorkflowByAppName,
};



function addNewForm(form, taskId) {
  return {
    type: bpmnConstants.ADD_NEW_FROM,
    form: form,
    forTask: taskId
  };
}

function getNextForm() {
  return {
    type: bpmnConstants.GET_NEXT_FORM,
  };
}

function addNameToId(name, value) {
  return {
    id: name,
    value,
    type: bpmnConstants.NAME_TO_ID,
  };
}

function setBpmnJson(bpmnAppJson) {
  return {
    type: bpmnConstants.SET_BPMN_JSON,
    bpmnAppJson
  }
}

function setAppInfo(appName, appDescription) {
  return {
    type: bpmnConstants.SET_APP_INFO,
    appName,
    appDescription
  }
}

function sendWorkflowData(appName, appDescription, workflowData) {
  return dispatch => {
    dispatch(request());

    setTimeout(() => {
      bpmnService.sendWorkflowData(appName, appDescription, workflowData).then(
        res => {
          dispatch(success())
          history.push('/execute_flow')
        }).catch(err => dispatch(failure(err)));
    }, 1000);


    function request() {
      return {
        type: bpmnConstants.SEND_WORKFLOW_DATA_REQUEST
      }
    }

    function success(data) {
      return {
        type: bpmnConstants.SEND_WORKFLOW_DATA_SUCCESS,
        data
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: bpmnConstants.SEND_WORKFLOW_DATA_FAILURE
      }
    }
  }

}

function getWorkflowByAppName(appName) {
  return dispatch => {

    dispatch(request());

    function request() {
      return {
        type: bpmnConstants.GET_WORKFLOW_BY_APP_NAME_REQUEST,
        appName,
      }
    }

    function success(data) {
      return {
        type: bpmnConstants.GET_WORKFLOW_BY_APP_NAME_SUCCESS,
        data
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: bpmnConstants.GET_WORKFLOW_BY_APP_NAME_FAILURE
      }
    }
  }
}


