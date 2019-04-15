import { notificationConstants } from '_constants';
const initialState = {
  isLoading: false,
  data: [],
}

export function notification(state = initialState, action) {
  switch (action.type) {

    case notificationConstants.ADD_NEW_NOTIFICATION: {
      const { payload } = action;
      const data = payload.data["gcm.notification.data"];
      const { notification } = payload;

      const nextState = { ...state };
      nextState.data.unshift({
        title: notification.title,
        body: notification.body,
        data: JSON.parse(data),
      })
      return nextState;
    }

    case notificationConstants.GET_ALL_NOTIFICATIONS_REQUEST: {
      return {
        isLoading: true,
        data: [],
      }
    }

    case notificationConstants.GET_ALL_NOTIFICATIONS_SUCCESS: {
      return {
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