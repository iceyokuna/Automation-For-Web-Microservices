import { inboxTasksConstants } from '_constants';

const initialState = {
  isLoading: false,
  data: [],
}

export function inboxTasks(state = initialState, action) {
  switch (action.type) {
    case inboxTasksConstants.GET_ALL_INBOX_TASKS_REQUEST: {
      return {
        isLoading: true,
        data: [],
      }
    }

    case inboxTasksConstants.GET_ALL_INBOX_TASKS_SUCCESS: {
      return {
        isLoading: false,
        data: action.inboxTasks,
      }
    }
    case inboxTasksConstants.GET_ALL_INBOX_TASKS_FAILURE: {
      return {
        isLoading: false,
        error: action.error,
        data: state.data,
      }
    }
    default:
      return state
  }
}