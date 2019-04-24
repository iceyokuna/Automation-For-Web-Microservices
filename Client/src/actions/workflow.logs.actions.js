import { workflowContants } from '_constants';

export const logsActions = {
  toggleDock,
}

function toggleDock() {
  return {
    type: workflowContants.TOGGLE_LOGS,
  }
}