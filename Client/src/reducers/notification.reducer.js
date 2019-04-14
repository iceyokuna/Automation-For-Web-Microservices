import { notificationConstants } from '_constants';

const initialState = {
  isLoading: false,
  data: [
    { title: "Smart Meter", body: "this is a body", },
    { title: "KMITL Meeting", body: "this is a body", },
    { title: "EIEI", body: "this is a body", },
  ],
}

export function notification(state = initialState, action) {
  switch (action.type) {
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