import { workflowConstants, globalConstants, } from '_constants';
import { workflowService } from 'services'
import { toast } from 'react-toastify'
import { history, getUserToken } from '_helpers';
import axios from 'axios';
import { monitorActions } from 'actions';

export const workflowActions = {
  addNewForm,
  addNameToId,
  addNewCollaborators,

  resetToInitialParams,
  resetExecutingForm,
  resetExecutionState,

  setMode,

  prepareNewWorkflow,

  deleteCollaborators,
  deleteWorkflowById,
  deleteAppliedMethodByTaskId,

  deleteAssociatedVariableOfElement,

  applyAsyncToTask,
  applyMethodToTask,
  applyConditionsToGateWay,
  applyPreInputsToTask,
  applyTimerToElement,

  setExecutingForm,
  setCurrentFlow,
  setupExistingWorkflow,
  setupNewWorkflow,
  setNextNodes,

  setWorkflowId,
  setBpmnJson,
  setCurrentElement,

  showWaitingDialog,
  closeWaitingDialog,

  toggleMemberDialog,
  toggleTimerDialog,
  togglePreInputDialog,
  toggleEditWorkflowDialog,
  toggleFormTypeDialog,

  // RESTful
  createNewWorkflow,
  updateWorkflow,
  sendWorkflowDataToEngine,
  getMyFlows,
  getAllCollaborators,
};

function showWaitingDialog(message) {
  return {
    type: workflowConstants.SHOW_WAITING_DIALOG,
    message,
  }
}

function closeWaitingDialog() {
  return {
    type: workflowConstants.CLOSE_WAITING_DIALOG,
  }
}

function toggleWaitingDialog() {
  return {
    type: workflowConstants.TOGGLE_WAITING_DIALOG,
  }
}

function applyAsyncToTask(taskId, checked) {
  return {
    type: workflowConstants.APPLY_ASYNC_TO_TASK,
    taskId,
    checked,
  }
}

function resetExecutionState(name, description,
  workflowData, workflowId) {
  return async dispatch => {
    dispatch({ type: workflowConstants.RESET_EXECUTION_STATE_REQUEST });
    try {
      const res = await workflowService.sendWorkflowDataToEngine(
        name, description,
        workflowData, workflowId
      );
      dispatch({ type: workflowConstants.RESET_EXECUTION_STATE_SUCCESS });
      toast.success("Workflow's state is reset");;

      // Get current logs after reset state
      dispatch(monitorActions.getCurrentLogs(workflowId));
    } catch (e) {
      toast.error("Can't reset the workflow's state");
    }
  }
}

function resetToInitialParams() {
  return dispatch => {
    dispatch({ type: workflowConstants.RESET_WORKFLOW_PARAMS });
    dispatch({ type: workflowConstants.RESET_MYFLOWS_PARAMS });
    dispatch({ type: workflowConstants.RESET_COLLABORATOR_PARAMS });
    dispatch({ type: workflowConstants.RESET_CONDITION_PARAMS });
    dispatch({ type: workflowConstants.RESET_LOG_PARAMS });
    dispatch({ type: workflowConstants.RESET_PREINPUT_PARAMS });
    dispatch({ type: workflowConstants.RESET_TIMER_PARAMS });
  }
}

function deleteAssociatedVariableOfElement(elementId) {
  return dispatch => {
    dispatch({ type: workflowConstants.REMOVE_GENERATED_FORM, elementId });
    dispatch({ type: workflowConstants.REMOVE_APPLIED_CONDITION, elementId });
    dispatch({ type: workflowConstants.REMOVE_APPLIED_ASYNC, elementId });
    dispatch({ type: workflowConstants.REMOVE_APPLIED_METHOD, elementId });
    dispatch({ type: workflowConstants.REMOVE_APPLIED_PREINPUT, elementId });
    dispatch({ type: workflowConstants.REMOVE_APPLIED_TIMER, elementId });
  }
}

function deleteAppliedMethodByTaskId(taskId) {
  return {
    type: workflowConstants.DELETE_BPMN_ELEMENT,
    taskId,
  }
}

function setMode(mode) {
  return {
    type: workflowConstants.SET_MODE,
    mode,
  }
}

function prepareNewWorkflow(workflowName, description) {
  return dispatch => {

    let workflowObject = {
      bpmnJson: {},
      appliedMethods: {},
      generatedForms: [],
    }

    dispatch({
      type: workflowConstants.PREPARE_NEW_WORKFLOW,
      workflowName, description,
    });

    history.push('/my_flows/create/design_workflow');
  }
}

function deleteWorkflowById(workflowId) {
  return (dispatch) => {

    workflowService.deleteWorkflowById(workflowId).then(
      res => {
        dispatch({ type: workflowConstants.DELETE_WORKFLOW_SUCCESS, workflowId });
        toast.success("Delete the workflow");
      }
    ).catch(e => {
      toast.error("Can't delete the workflow");
    });
  }
}

function deleteCollaborators(collaborators) {
  return (dispatch, getState) => {
    dispatch({ type: workflowConstants.DELETE_COLLABORATORS_REQUEST });
    const workflow_id = getState().workflowMyFlows.currentFlow.id;
    workflowService.deleteCollaborators(workflow_id, collaborators).then(
      res => {
        dispatch({ type: workflowConstants.DELETE_COLLABORATORS_SUCCESS });
        dispatch(getAllCollaborators(workflow_id));
      }
    ).catch(e => dispatch({ type: workflowConstants.DELETE_COLLABORATORS_FAILURE }))
  }
}

function setNextNodes(nextNodes) {
  return {
    type: workflowConstants.SET_NEXT_NODES,
    nextNodes,
  }
}

function toggleEditWorkflowDialog() {
  return {
    type: workflowConstants.TOGGLE_INFO_DIALOG
  }
}

function getAllCollaborators(workflowId) {
  return dispatch => {

    dispatch(request())
    axios.get(globalConstants.COLLABORATORS_URL + workflowId, {
      headers: {
        Authorization: "Token " + getUserToken(),
      }
    }).then(
      res => {
        dispatch(success(res.data.collaborators));
        dispatch(workflowActions.setupExistingWorkflow());
      }
    ).catch(err => {
      dispatch(failure(err));
    })
  }

  function request() {
    return {
      type: workflowConstants.GET_ALL_COLLABORATORS_REQUEST,
    }
  }

  function success(data) {
    return {
      type: workflowConstants.GET_ALL_COLLABORATORS_SUCCESS,
      collaborators: data,
    }
  }

  function failure(err) {
    return {
      type: workflowConstants.GET_ALL_COLLABORATORS_FAILURE,
      err,
    }
  }

}

function setWorkflowId(workflowId) {
  return {
    type: workflowConstants.SET_WORKFLOW_ID,
    workflowId,
  }
}

function applyTimerToElement(elementId, dateTime) {
  return {
    type: workflowConstants.APPLY_TIMER_TO_ELEMENT,
    elementId,
    dateTime
  }

}

function applyPreInputsToTask(elementId, preInputs, method) {
  return {
    type: workflowConstants.APPLY_PRE_INPUT,
    elementId,
    preInputs,
    method,
  }
}

function setCurrentElement(bpmnNode) {
  return {
    type: workflowConstants.SET_CURRENT_ELEMENT,
    bpmnNode,
  }
}

function toggleMemberDialog() {
  return {
    type: workflowConstants.TOGGLE_MEMBER_DIALOG
  }
}

function toggleFormTypeDialog() {
  return {
    type: workflowConstants.TOGGLE_FORM_TYPE_DIALOG,
  }
}

function toggleTimerDialog() {
  return {
    type: workflowConstants.TOGGLE_TIMER_DIALOG
  }
}

function togglePreInputDialog() {
  return {
    type: workflowConstants.TOGGLE_PRE_INPUT_DIALOG
  }
}

function resetExecutingForm() {
  return {
    type: workflowConstants.RESET_EXECUTING_FORM,
  }
}

function setExecutingForm(form, taskId) {
  return {
    type: workflowConstants.SET_CURRENT_EXECUTING_FORM,
    executingForm: form,
    executingTaskId: taskId,
  }
}

function addNewForm(formType, form, taskId) {
  return {
    type: workflowConstants.ADD_NEW_FROM,
    formType,
    form,
    forTask: taskId
  };
}

function addNameToId(name, value) {
  return {
    id: name,
    value,
    type: workflowConstants.NAME_TO_ID,
  };
}

function updateAllVariables(appliedMethods, taskId, methodToApply) {
  const keys = Object.keys(appliedMethods);
  const variables = [];
  keys.map((elementId, index) => {
    const method = appliedMethods[elementId].method;
    const inputInterface = method.input_interface;
    const outputInterface = method.output_interface;
    let methodOfTaskId = elementId === taskId ? taskId : elementId;
    Object.keys(inputInterface).map((variable, varIndex) => {
      // variables[variable] = inputInterface[variable];
      variables.push({
        variableOf: {
          serviceId: method.service,
          methodId: method.id,
          methodName: method.name,
          methodOfTaskId: methodOfTaskId,
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
          methodId: method.id,
          methodName: method.name,
          methodOfTaskId: methodOfTaskId,
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
      type: workflowConstants.APPLY_METHOD_TO_TASK,
      taskId,
      method,
    });

    const { appliedMethods } = getState().workflow;
    const allVariables = updateAllVariables(appliedMethods, taskId, method);

    dispatch({
      type: workflowConstants.UPDATE_CONDITION_VARIABLES,
      allVariables
    })

  }

}

function applyConditionsToGateWay(gatewayId, conditions) {
  return {
    type: workflowConstants.APPLY_CONDITIONS_TO_GATEWAY,
    gatewayId,
    conditions,
  }
}

function setupExistingWorkflow() {
  return (dispatch, getState) => {
    const currentFlow = getState().workflowMyFlows.currentFlow;

    // Load workflow
    const { appliedConditions, appliedPreInputs, appliedTimers,
      workflowObject, ...dataForWorkflowReducer } = currentFlow;

    dispatch({
      type: workflowConstants.SETUP_EXISTING_WORKFLOW,
      dataForWorkflowReducer,
    });

    // Load workflow's conditions
    const { appliedMethods } = getState().workflow;
    const allVariables = updateAllVariables(appliedMethods);
    dispatch({
      type: workflowConstants.SET_WORKFLOW_CONDITIONS,
      appliedConditions: appliedConditions,
      allVariables,
    });

    // Load workflow's preInputs
    dispatch({
      type: workflowConstants.SET_PRE_INPUTS,
      preInputs: appliedPreInputs,
    })

    // Load workflow's timers
    dispatch({
      type: workflowConstants.SET_APPLIED_TIMER,
      appliedTimers: appliedTimers,
    })

    // Load workflow's asyncs
    dispatch({
      type: workflowConstants.SET_APPLIED_ASYNCS,
      appliedAsyncs: currentFlow.appliedAsyncs || {},
    })
  }
}

function setupNewWorkflow() {
  return {
    type: workflowConstants.SETUP_NEW_WORKFLOW
  }
}

function setCurrentFlow(currentFlow, redirectUrl) {
  return dispatch => {
    dispatch({
      type: workflowConstants.SET_CURRENT_FLOW,
      currentFlow,
      redirectUrl
    });
  }
}

function setBpmnJson(bpmnJson) {
  return {
    type: workflowConstants.SET_BPMN_JSON,
    bpmnJson
  }
}

function createNewWorkflow(name, description, workflowObject) {
  return (dispatch) => {
    dispatch(request());
    workflowService.createNewWorkflow(name, description, workflowObject).then(res => {
      const { detail, ...data } = res.data;
      workflowObject = { ...workflowObject, ...data };
      dispatch(success(workflowObject, "CREATE_NEW"));
      dispatch(sendWorkflowDataToEngine(name, description, workflowObject));
      history.push('/my_flows');
    }).catch(err => {
      toast.error("Can't create a new workflow");
      dispatch(failure());
    })
  }

  function request() {
    return {
      type: workflowConstants.CREATE_NEW_WORKFLOW_REQUEST,
    }
  }
  function success(workflowObject, mode) {
    return {
      type: workflowConstants.CREATE_NEW_WORKFLOW_SUCCESS,
      workflowObject,
      mode,
    }
  }
  function failure(error) {
    return {
      type: workflowConstants.CREATE_NEW_WORKFLOW_FAILURE,
    }
  }
}

function addNewCollaborators(collaborators) {
  return (dispatch, getState) => {
    dispatch(request());
    const workflow_id = getState().workflowMyFlows.currentFlow.id;
    axios.post(globalConstants.COLLABORATORS_URL, {
      workflow_id,
      collaborators,
    }, {
        headers: {
          Authorization: "Token " + getUserToken(),
        }
      }).then(res => {
        toast.success("Invite successfully");
        dispatch(success(res.data));
        dispatch(getAllCollaborators(workflow_id));
      }).catch(err => {
        dispatch(failure(err))
        toast.error("Sorry, some of these members do not exist");
      })
  }

  function request() {
    return {
      type: workflowConstants.ADD_NEW_COLLABORATORS_REQUEST
    }
  }

  function success(data) {
    return {
      type: workflowConstants.ADD_NEW_COLLABORATORS_SUCCESS,
      data
    }
  }

  function failure(err) {
    console.error(err);
    return {
      type: workflowConstants.ADD_NEW_COLLABORATORS_FAILURE
    }
  }
}

function updateWorkflow(name, description,
  workflowData) {
  return (dispatch, getState) => {
    dispatch(request());
    const currentWorkflowId = getState().workflow.workflowId;
    workflowService.updateWorkflow(
      name, description,
      workflowData, currentWorkflowId
    ).then(
      res => {
        dispatch(success());
        dispatch(sendWorkflowDataToEngine(name, description, workflowData, currentWorkflowId));
        history.push('/my_flows');
      }).catch(err => dispatch(failure(err)));

    function request() {
      return {
        type: workflowConstants.SEND_WORKFLOW_DATA_REQUEST
      }
    }

    function success(data) {
      return {
        type: workflowConstants.SEND_WORKFLOW_DATA_SUCCESS,
        data
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: workflowConstants.SEND_WORKFLOW_DATA_FAILURE
      }
    }
  }

}

function sendWorkflowDataToEngine(name, description,
  workflowData, workflowId) {
  return (dispatch, getState) => {
    dispatch(request());
    workflowService.sendWorkflowDataToEngine(name, description,
      workflowData, workflowId
    ).then(
      res => {
        dispatch(success())
        // history.push('/execute_flow/flow1133');
      }).catch(err => dispatch(failure(err)));

    function request() {
      return {
        type: workflowConstants.SEND_WORKFLOW_TO_ENGINE_REQUEST
      }
    }

    function success(data) {
      return {
        type: workflowConstants.SEND_WORKFLOW_TO_ENGINE_SUCCESS,
        data
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: workflowConstants.SEND_WORKFLOW_TO_ENGINE_FAILURE,
      }
    }
  }

}



function getMyFlows() {
  return dispatch => {
    dispatch(request());
    workflowService.getMyFlows().then(
      (res) => {
        dispatch(success(res.data));
      }
    ).catch(err => dispatch(failure(err)));

    function request() {
      return {
        type: workflowConstants.GET_MY_FLOWS_REQUEST,
      }
    }

    function success(data) {
      return {
        type: workflowConstants.GET_MY_FLOWS_SUCCESS,
        data
      }
    }

    function failure(err) {
      console.error(err);
      return {
        type: workflowConstants.GET_MY_FLOWS_FAILURE,
        err,
      }
    }
  }
}


