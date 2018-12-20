import { bpmnConstants } from '_constants';

const defaultState = {
  generatedForms: [],
  recentForm: null,
  appName: 'Default name',
  appDescription: '',
  bpmnAppJson: {},


  availableServices: {
    loading: false,
    error: false,
    data: [] // all available services that the main-user can choose
  }
}

export function bpmn(state = defaultState, action) {
  switch (action.type) {

    case bpmnConstants.SEND_WORKFLOW_DATA_REQUEST: {
      const nextState = { ...state };
      return nextState;
    } break;

    case bpmnConstants.SEND_WORKFLOW_BPMN_JSON_SUCCESS: {
      const nextState = { ...state };
      return nextState;
    } break;

    case bpmnConstants.SEND_WORKFLOW_BPMN_JSON_FAILURE: {
      const nextState = { ...state };
      return nextState;
    } break;

    case bpmnConstants.ADD_NEW_FROM: {
      const { forTask, form } = action;
      const nextState = { ...state };
      nextState.generatedForms.push({taskId: forTask, formData: form})
      nextState.recentForm = { taskId: forTask, form }
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
