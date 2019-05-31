import { workflowContants } from '_constants';

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

    case workflowContants.RECEIVE_WORKFLOW_STATUS: {
      const { data } = action;

      return {
        ...state,
        executedItems: data.executedItems,
        currentElement: data.currentElement,
      }
    }

    case workflowContants.RESET_LOG_PARAMS: {
      return defaultState;
    }

    case workflowContants.GET_CURRENT_LOGS_REQUEST: {
      return { ...state, loading: true };
    }

    case workflowContants.GET_CURRENT_LOGS_SUCCESS: {
      const { currentElement, executedItems } = action.log;
      return {
        ...state, loading: false,
        currentElement, executedItems
      };
    }

    case workflowContants.GET_CURRENT_LOGS_FAILURE: {
      return { ...state, loading: false, executedItems: [], currentElement: {} };
    }

    case workflowContants.TOGGLE_LOGS: {
      return { ...state, show: !state.show };
    }

    default:
      return state
  }
}
