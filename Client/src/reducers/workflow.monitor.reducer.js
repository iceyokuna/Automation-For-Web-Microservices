import { workflowConstants } from '_constants';

const defaultState = {
  // data: [
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  //   { detail: "Workflow#1 : transfer task to user#2" },
  // ],
  loading: false,
  showMonitorDock: false,

  executedItems: [],
  currentElement: {},
  inputFormValues: {},
}

export function workflowMonitor(state = defaultState, action) {
  switch (action.type) {

    case workflowConstants.GET_INPUT_FORM_REQUEST: {

    }

    case workflowConstants.GET_INPUT_FORM_SUCCESS: {
      const nextState = { ...state };
      nextState.inputFormValues = action.data;
      return nextState;
    }

    case workflowConstants.GET_INPUT_FORM_FAILURE: {

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
