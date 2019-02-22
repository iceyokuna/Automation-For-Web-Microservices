import { workflowContants } from '_constants';
import { workflowService } from 'services'
import { socketActions } from 'actions'
import { history } from '_helpers';

export const workflowActions = {
  addNewForm,
  addNameToId,
  applyMethodToTask,
  setExecutingForm,
  // getNextForm,

  setBpmnJson,
  setAppInfo,

  // RESTful
  sendWorkflowData,
  getWorkflowByAppName,
};


function setExecutingForm(form) {
  return {
    type: workflowContants.SET_CURRENT_EXECUTING_FORM,
    executingForm: form,
  }
}

function addNewForm(form, taskId) {
  return {
    type: workflowContants.ADD_NEW_FROM,
    form: form,
    forTask: taskId
  };
}

// function getNextForm() {
//   return {
//     type: workflowContants.SET_CURRENT_EXECUTING_FORM,
//   };
// }

function addNameToId(name, value) {
  return {
    id: name,
    value,
    type: workflowContants.NAME_TO_ID,
  };
}

function applyMethodToTask(taskId, method) {
  return {
    type: workflowContants.APPLY_METHOD_TO_TASK,
    taskId,
    method,
  }
}

function setBpmnJson(bpmnAppJson) {
  return {
    type: workflowContants.SET_BPMN_JSON,
    bpmnAppJson
  }
}

function setAppInfo(appName, appDescription) {
  return {
    type: workflowContants.SET_APP_INFO,
    appName,
    appDescription
  }
}

function sendWorkflowData(appName, appDescription, workflowData) {
  return dispatch => {
    dispatch(request());

    setTimeout(() => {
      console.log(workflowData)
      workflowService.sendWorkflowData(appName, appDescription, workflowData).then(
        res => {
          dispatch(success())
          history.push('/execute_flow/flow1133');
        }).catch(err => dispatch(failure(err)));
    }, 1000);


    function request() {
      return {
        type: workflowContants.SEND_WORKFLOW_DATA_REQUEST
      }
    }

    function success(data) {
      return {
        type: workflowContants.SEND_WORKFLOW_DATA_SUCCESS,
        data
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: workflowContants.SEND_WORKFLOW_DATA_FAILURE
      }
    }
  }

}

function getWorkflowByAppName(appName) {
  return dispatch => {

    dispatch(request());

    function request() {
      return {
        type: workflowContants.GET_WORKFLOW_BY_APP_NAME_REQUEST,
        appName,
      }
    }

    function success(data) {
      return {
        type: workflowContants.GET_WORKFLOW_BY_APP_NAME_SUCCESS,
        data
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: workflowContants.GET_WORKFLOW_BY_APP_NAME_FAILURE
      }
    }
  }
}


