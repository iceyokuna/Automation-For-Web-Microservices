import { workflowConstants } from '_constants';

const defaultState = {
  loading: false,
  loadingInputForm: false,
  showMonitorDock: false,
  executedItems: [],
  currentElement: {},
  formInputValues: {},
}

export function workflowMonitor(state = defaultState, action) {
  switch (action.type) {

    case workflowConstants.GET_INPUT_FORM_REQUEST: {
      return { ...state, loadingInputForm: true };
    }

    case workflowConstants.GET_INPUT_FORM_SUCCESS: {
      const nextState = { ...state };
      nextState.formInputValues = action.data.formInputValues;
      nextState.loadingInputForm = false;
      return nextState;
    }

    case workflowConstants.GET_INPUT_FORM_FAILURE: {
      return { ...state, loadingInputForm: false };
    }

    case workflowConstants.RECEIVE_WORKFLOW_STATUS: {
      const { data } = action;

      return {
        ...state,
        executedItems: data.executedItems,
        currentElement: data.currentElement,
      }
    }

    case workflowConstants.RESET_LOG_PARAMS: {
      return defaultState;
    }

    case workflowConstants.GET_CURRENT_LOGS_REQUEST: {
      return { ...state, loading: true };
    }

    case workflowConstants.GET_CURRENT_LOGS_SUCCESS: {
      const { currentElement, executedItems } = action.log;
      return {
        ...state, loading: false,
        currentElement, executedItems
      };
    }

    case workflowConstants.GET_CURRENT_LOGS_FAILURE: {
      return { ...state, loading: false, executedItems: [], currentElement: {} };
    }

    case workflowConstants.TOGGLE_MONITOR_DOCK: {
      return { ...state, showMonitorDock: !state.showMonitorDock };
    }

    default:
      return state
  }
}
