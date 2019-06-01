import { workflowConstants } from '_constants';
import { workflowService } from 'services'

export const logsActions = {
  toggleDock,
  getCurrentLogs,
}

function getCurrentLogs(workflowId) {
  return (dispatch, getState) => {
    dispatch({ type: workflowConstants.GET_CURRENT_LOGS_REQUEST });
    workflowService.getCurrentLogs(workflowId).then(
      res => {
        if (res.data.log == null) {
          dispatch({ type: workflowConstants.GET_CURRENT_LOGS_FAILURE })
        }
        else {
          dispatch({
            type: workflowConstants.GET_CURRENT_LOGS_SUCCESS,
            log: res.data.log,
          });
        }
      }).catch(e =>
        dispatch({ type: workflowConstants.GET_CURRENT_LOGS_FAILURE })
      );
  }
}

function toggleDock() {
  return {
    type: workflowConstants.TOGGLE_LOGS,
  }
}