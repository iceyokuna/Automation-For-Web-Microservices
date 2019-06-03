import { notificationConstants } from '_constants';
const initialState = {
  isLoading: false,
  data: [
    {
      title: 'Your turn',
      body: 'Checkout your workflow',
      workflowId: 163,
      createdAt: '23/05/19 15:31'
    },
    {
      title: 'Your turn #2',
      body: 'Checkout your workflow',
      workflowId: 163,
      createdAt: '23/05/19 15:30'
    },
  ],
}

export function notification(state = initialState, action) {
  switch (action.type) {

    case notificationConstants.RECEIVE_YOUR_TURN: {
      const nextState = { ...state };
      nextState.data.push({
        title: 'Your turn',
        body: 'Checkout your workflow',
        workflowId: 163,
      })
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