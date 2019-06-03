import { workflowConstants } from '_constants';
import { workflowService } from 'services'
import { toast } from 'react-toastify';

export const monitorActions = {
  toggleDock,
  getCurrentLogs,
  getInputForm,
}

function getInputForm(workflowId, taskId) {
  return async (dispatch) => {
    dispatch({ type: workflowConstants.GET_INPUT_FORM_REQUEST });

    // setTimeout(() => {
    //   const res = {
    //     data: {
    //       'email': { 'type': 'text', 'name': '', 'value': 'iceyokuna@gmail.com' },
    //       'message': { 'type': 'textarea', 'name': '', 'value': 'AutoWeb-Message' },
    //       'subject': { 'type': 'textarea', 'name': '', 'value': 'AutoWeb-Subject' },
    //     }
    //   };
    //   dispatch({ type: workflowConstants.GET_INPUT_FORM_SUCCESS, data: res.data });
    // }, 1000);
    try {
      const res = await workflowService.getInputForm(workflowId, taskId);
      dispatch({ type: workflowConstants.GET_INPUT_FORM_SUCCESS });
    } catch (e) {
      dispatch({ type: workflowConstants.GET_INPUT_FORM_FAILURE });
      toast.error("Can't get input form");
      console.error(e);
    }
  }

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
    type: workflowConstants.TOGGLE_MONITOR_DOCK,
  }
}