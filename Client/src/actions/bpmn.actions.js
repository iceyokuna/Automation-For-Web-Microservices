import { bpmnConstants } from '_constants';
import { bpmnService } from 'services'

export const bpmnActions = {
  addNewForm,
  setBpmnJson,
  setAppInfo,

  // RESTful
  getAllServices,
  getAllMethodsByServiceId,
  sendWorkflowBpmnJson,
  sendWorkflowFormData
};

function getAllServices() {
  return dispatch => {
    dispatch(request());
    bpmnService.getAllServices().then(
      res => {
        console.log(res)
      }
    )
  }

  function request() {
    return {
      type: bpmnConstants.GET_ALL_SERVICES_REQUEST
    }
  }

  function success() {
    return {
      type: bpmnConstants.GET_ALL_SERVICES_SUCCESS
    }
  }

  function failure() {
    return {
      type: bpmnConstants.GET_ALL_SERVICES_FAILURE
    }
  }
}

function getAllMethodsByServiceId(serviceId) {
  return dispatch => {

  }
}

function addNewForm(form, taskId) {
  return {
    type: bpmnConstants.ADD_NEW_FROM,
    form: form,
    forTask: taskId
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

function sendWorkflowFormData(formData) {

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


