import { workflowContants, globalConstants } from '_constants';
import { workflowService } from 'services'
import { socketActions } from 'actions'
import { history, getToken } from '_helpers';
import axios from 'axios';

export const workflowActions = {
  addNewForm,
  addNameToId,
  addNewCollaborators,

  applyMethodToTask,
  applyConditionsToGateWay,
  applyPreInputsToTask,

  setExecutingForm,
  setCurrentFlow,
  setupExistingWorkflow,
  setupNewWorkflow,

  setWorkflowId,
  setBpmnJson,
  createNewWorkflow,
  setCurrentElement,
  toggleMemberDialog,
  toggleTimerDialog,
  togglePreInputDialog,

  // RESTful
  sendWorkflowData,
  sendWorkflowDataToEngine,
  getMyFlows,
  getAllCollaborators,
};

function getAllCollaborators(workflowId) {
  return dispatch => {

    dispatch(request())
    axios.get(globalConstants.COLLABORATORS_URL + workflowId, {
      headers: {
        Authorization: "Token " + getToken(),
      }
    }).then(
      res => {
        dispatch(success(res.data.collaborators));
      }
    ).catch(err => {
      dispatch(failure(err));
    })
  }

  function request() {
    return {
      type: workflowContants.GET_ALL_COLLABORATORS_REQUEST,
    }
  }

  function success(data) {
    return {
      type: workflowContants.GET_ALL_COLLABORATORS_SUCCESS,
      collaborators: data,
    }
  }

  function failure(err) {
    return {
      type: workflowContants.GET_ALL_COLLABORATORS_FAILURE,
      err,
    }
  }

}

function setWorkflowId(workflowId) {
  return {
    type: workflowContants.SET_WORKFLOW_ID,
    workflowId,
  }
}

function applyPreInputsToTask(elementId, preInputs, method) {
  return {
    type: workflowContants.APPLY_PRE_INPUT,
    elementId,
    preInputs,
    method,
  }
}

function setCurrentElement(bpmnNode) {
  return {
    type: workflowContants.SET_CURRENT_ELEMENT,
    bpmnNode,
  }
}

function toggleMemberDialog() {
  return {
    type: workflowContants.TOGGLE_MEMBER_DIALOG
  }
}

function toggleTimerDialog() {
  return {
    type: workflowContants.TOGGLE_TIMER_DIALOG
  }
}

function togglePreInputDialog() {
  return {
    type: workflowContants.TOGGLE_PRE_INPUT_DIALOG
  }
}


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

function addNameToId(name, value) {
  return {
    id: name,
    value,
    type: workflowContants.NAME_TO_ID,
  };
}

function getAllVariables(appliedMethods) {
  const keys = Object.keys(appliedMethods);
  const variables = [];
  keys.map((elementId, index) => {
    const method = appliedMethods[elementId].method;
    const inputInterface = method.input_interface;
    const outputInterface = method.output_interface;
    Object.keys(inputInterface).map((variable, varIndex) => {
      // variables[variable] = inputInterface[variable];
      variables.push({
        variableOf: {
          serviceId: method.service,
          methodId: method.id
        },
        name: variable,
        type: inputInterface[variable].type,
      })
    })
    Object.keys(outputInterface).map((variable, varIndex) => {
      // variables[variable] = outputInterface[variable];
      variables.push({
        variableOf: {
          serviceId: method.service,
          methodId: method.id
        },
        name: variable,
        type: outputInterface[variable].type,
      })
    })
  })

  return variables;
}

function applyMethodToTask(taskId, method) {
  return (dispatch, getState) => {

    dispatch({
      type: workflowContants.APPLY_METHOD_TO_TASK,
      taskId,
      method,
    });

    const { appliedMethods } = getState().workflow;
    const allVariables = getAllVariables(appliedMethods);

    dispatch({
      type: workflowContants.UPDATE_CONDITION_VARIABLES,
      allVariables
    })

  }

}

function applyConditionsToGateWay(gatewayId, conditions) {
  return {
    type: workflowContants.APPLY_CONDITIONS_TO_GATEWAY,
    gatewayId,
    conditions,
  }
}

function setupExistingWorkflow() {
  return (dispatch, getState) => {
    const currentFlow = getState().workflowMyFlows.currentFlow;
    dispatch({
      type: workflowContants.SETUP_EXISTING_WORKFLOW,
      currentFlow,
    });
    dispatch({
      type: workflowContants.SET_WORKFLOW_CONDITIONS,
      appliedConditions: currentFlow.appliedConditions,
    })
  }
}

function setupNewWorkflow() {
  return {
    type: workflowContants.SETUP_NEW_WORKFLOW
  }
}

function setCurrentFlow(currentFlow) {
  return {
    type: workflowContants.SET_CURRENT_FLOW,
    currentFlow,
  }

}

function setBpmnJson(bpmnAppJson) {
  return {
    type: workflowContants.SET_BPMN_JSON,
    bpmnAppJson
  }
}

function createNewWorkflow(appName, appDescription, mode) {
  return (dispatch) => {
    dispatch(request());
    workflowService.sendWorkflowData(appName, appDescription, {
      bpmnJson: {},
      appliedMethods: {},
      appliedConditions: {},
      appliedPreInputs: {},
      generatedForms: {},
    }).then(res => {
      dispatch(success(res.data));
    }).catch(err => {
      console.error(err);
      dispatch(failure());
    })
  }

  function request() {
    return {
      type: workflowContants.CREATE_NEW_WORKFLOW_REQUEST,
    }
  }
  function success(workflowObject, mode) {
    return {
      type: workflowContants.CREATE_NEW_WORKFLOW_SUCCESS,
      workflowObject,
      mode,
    }
  }
  function failure(error) {
    return {
      type: workflowContants.CREATE_NEW_WORKFLOW_FAILURE,
    }
  }

}

function addNewCollaborators(workflow_id, collaborators) {
  return (dispatch, getState) => {

    dispatch(request());
    axios.post(globalConstants.COLLABORATORS_URL, {
      workflow_id,
      collaborators,
    }, {
        headers: {
          Authorization: "Token " + getToken(),
        }
      }).then(res => {
        console.log(res.data);
        dispatch(success(res.data));
      }).catch(err => {
        dispatch(failure(err))
      })
  }

  function request() {
    return {
      type: workflowContants.ADD_NEW_COLLABORATORS_REQUEST
    }
  }

  function success(data) {
    return {
      type: workflowContants.ADD_NEW_COLLABORATORS_SUCCESS,
      data
    }
  }

  function failure(err) {
    console.error(err);
    return {
      type: workflowContants.ADD_NEW_COLLABORATORS_FAILURE
    }
  }

}

function sendWorkflowData(appName, appDescription,
  workflowData) {
  return dispatch => {
    dispatch(request());
    setTimeout(() => {
      workflowService.sendWorkflowData(appName, appDescription, workflowData
      ).then(
        res => {
          dispatch(success())
          history.push('/home/my_flows');
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

function sendWorkflowDataToEngine(appName, appDescription,
  workflowData) {
  return dispatch => {
    dispatch(request());
    setTimeout(() => {
      workflowService.sendWorkflowDataToEngine(appName, appDescription,
        workflowData
      ).then(
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



function getMyFlows() {
  return dispatch => {
    dispatch(request());
    workflowService.getMyFlows().then(
      (res) => {
        dispatch(success(res.data.workflow));
      }
    ).catch(err => dispatch(failure(err)));

    function request() {
      return {
        type: workflowContants.GET_MY_FLOWS_REQUEST,
      }
    }

    function success(myFlows) {
      return {
        type: workflowContants.GET_MY_FLOWS_SUCCESS,
        myFlows
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: workflowContants.GET_MY_FLOWS_FAILURE,
        err,
      }
    }
  }
}


