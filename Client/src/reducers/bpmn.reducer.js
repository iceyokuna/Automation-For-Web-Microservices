import { bpmnConstants } from '_constants';

const defaultState = {
  generatedForms: {},
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

    case bpmnConstants.GET_ALL_SERVICES_REQUEST: {
      const nextState = { ...state };
      nextState.availableServices.loading = 'Hello';
      return nextState;
    } break;

    case bpmnConstants.GET_ALL_SERVICES_SUCCESS: {
      const nextState = { ...state };
      nextState.availableServices.loading = false;
      nextState.availableServices.data = action.allServices;
      return nextState;
    } break;

    case bpmnConstants.GET_ALL_SERVICES_FAILURE: {
      const nextState = { ...state };
      nextState.availableServices.loading = false;
      nextState.availableServices.error = true;
      return nextState;
    } break;

    case bpmnConstants.ADD_NEW_FROM: {
      const { forTask, form } = action;
      const nextState = { ...state };
      nextState.generatedForms[forTask] = form;
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
