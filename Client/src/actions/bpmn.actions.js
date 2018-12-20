import { bpmnConstants } from '_constants';
import { bpmnService } from 'services'
import { history } from '_helpers';

export const bpmnActions = {
  addNewForm,
  getNextForm,

  setBpmnJson,
  setAppInfo,

  // RESTful
  sendWorkflowData,
  sendWorkflowBpmnJson,
  sendWorkflowFormData,
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
        }).catch(err => dispatch(failure()));
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

    function failure() {
      return {
        type: bpmnConstants.SEND_WORKFLOW_DATA_FAILURE
      }
    }


  }

}

function sendWorkflowFormData(workflowData) {
  return dispatch => {
    // dispatch(request());


  }
}

function sendWorkflowBpmnJson(bpmnJson) {
  return dispatch => {
    dispatch(request());

    bpmnService.sendWorkflowBpmnJson(bpmnJson).then(
      res => {

        dispatch(success())
      });
  }

  function request() {
    return {
      type: bpmnConstants.SEND_WORKFLOW_BPMN_JSON_REQUEST
    }
  }

  function success() {
    return {
      type: bpmnConstants.SEND_WORKFLOW_BPMN_JSON_SUCCESS
    }
  }

  function failure() {
    return {
      type: bpmnConstants.SEND_WORKFLOW_BPMN_JSON_FAILURE
    }
  }
}


