import { bpmnConstants } from '_constants';

const defaultState = {
  generatedForms: [
  ],
  currentFormIndex: 0,

  recentForm: null,
  appName: 'Default name',
  appDescription: '',

  loadingWorkflowData: false,
}

export function bpmn(state = defaultState, action) {
  switch (action.type) {

    case bpmnConstants.SEND_WORKFLOW_DATA_REQUEST: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = true;
      return nextState;
    } break;

    case bpmnConstants.SEND_WORKFLOW_DATA_SUCCESS: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = false;
      return nextState;
    } break;

    case bpmnConstants.SEND_WORKFLOW_DATA_FAILURE: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = false;
      return nextState;
    } break;

    case bpmnConstants.ADD_NEW_FROM: {
      const { forTask, form } = action;
      const nextState = { ...state };
      nextState.generatedForms.push({ taskId: forTask, formData: form })
      nextState.recentForm = { taskId: forTask, form }
      return nextState;
    } break;

    case bpmnConstants.GET_NEXT_FORM: {
      const { currentFormIndex, generatedForms } = state;
      const nextState = { ...state };
      if (currentFormIndex < generatedForms.length - 1) {
        nextState.currentFormIndex += 1;
      } else {
        nextState.formsDone = true
      }
      return nextState;
    } break;

    case bpmnConstants.SET_APP_INFO: {
      const { appName, appDescription } = action;
      const nextState = { ...state, appName, appDescription };
      return nextState
    } break;

    case bpmnConstants.SET_BPMN_JSON: {
      const { bpmnAppJson } = action;
      const nextState = { ...state, bpmnAppJson };
      return nextState
    } break;

    default:
      return state
  }
}
