import { workflowContants } from '_constants';
import { workflowService } from 'services'

export const logsActions = {
  toggleDock,
  getCurrentLogs,
}

function getCurrentLogs(workflowId) {
  return (dispatch, getState) => {
    dispatch({ type: workflowContants.GET_CURRENT_LOGS_REQUEST });
    workflowService.getCurrentLogs(workflowId).then(
      res => {
        dispatch({ type: workflowContants.GET_CURRENT_LOGS_REQUEST, data: res.data });
      }).catch(e =>
        dispatch({ type: workflowContants.GET_CURRENT_LOGS_REQUEST })
      );

  }
}

function toggleDock() {
  return {
    type: workflowContants.TOGGLE_LOGS,
  }
}