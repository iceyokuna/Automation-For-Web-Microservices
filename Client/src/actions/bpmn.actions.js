import { bpmnConstants } from '_constants';

export const bpmnActions = {
  addNewForm,
  setBpmnJson,
  submitAppInfo,
  getAllServices,
  getAllMethodsByServiceId,
};

function getAllServices() {
  return dispatch => {
    dispatch(request());
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

function submitAppInfo(appName, appDescription) {
  return {
    type: bpmnConstants.SUBMIT_APP_INFO,
    appName,
    appDescription
  }
}
