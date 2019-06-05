import { notificationConstants, workflowConstants } from '_constants';
const initialState = {
  isLoading: false,
  data: [],
}

export function notification(state = initialState, action) {
  switch (action.type) {

    case notificationConstants.RECEIVE_YOUR_TURN: {
      const nextState = { ...state };
      nextState.data.unshift(action.data);
      return nextState;
    }

    case notificationConstants.ADD_NEW_NOTIFICATION: {
      const nextState = { ...state };
      nextState.data.unshift(action.payload);
      return nextState;
    }

    case notificationConstants.GET_ALL_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        data: [],
      }
    }

    case notificationConstants.GET_ALL_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.notifications,
      }
    }
    case notificationConstants.GET_ALL_NOTIFICATIONS_FAILURE: {
      return {
        isLoading: false,
        data: state.data,
      }
    }
    default:
      return state
  }
}