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
  show: false,
  loading: false,

  executedItems: [],
  currentElement: {},
}

export function workflowLogs(state = defaultState, action) {
  switch (action.type) {

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

    case workflowConstants.TOGGLE_LOGS: {
      return { ...state, show: !state.show };
    }

    default:
      return state
  }
}
