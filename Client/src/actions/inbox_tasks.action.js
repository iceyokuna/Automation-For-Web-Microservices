import { inboxTasksConstants } from '_constants'

import { inboxTasksService } from 'services'

export const inboxTasksActions = {
  getAllInboxTasks,
};

function getAllInboxTasks() {
  return dispatch => {
    dispatch(request());
    inboxTasksService.getAllInboxTasks()
      .then(
        res => {
          dispatch(success(res.data));
        },
        error => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request() { return { type: inboxTasksConstants.GET_ALL_INBOX_TASKS_REQUEST } }
  function success(inboxTasks) { return { type: inboxTasksConstants.GET_ALL_INBOX_TASKS_SUCCESS, inboxTasks } }
  function failure(error) { return { type: inboxTasksConstants.GET_ALL_INBOX_TASKS_FAILURE, error } }
}
