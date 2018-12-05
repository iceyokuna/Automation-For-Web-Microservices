import { bpmnConstants } from '_constants';

export const bpmnActions = {
  addNewForm,
  setBpmnJson,
  submitAppInfo
};

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
