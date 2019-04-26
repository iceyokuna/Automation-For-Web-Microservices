import { workflowContants } from '_constants';

const defaultState = {
  data: [
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
    { detail: "Workflow#1 : transfer task to user#2" },
  ],
  show: false,
}

export function workflowLogs(state = defaultState, action) {
  switch (action.type) {

    case workflowContants.TOGGLE_LOGS: {
      return { ...state, show: !state.show };
    }

    default:
      return state
  }
}
