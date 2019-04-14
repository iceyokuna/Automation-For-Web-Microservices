import { notificationConstants } from '_constants';
import { notificationServices } from 'services';

export const notificationActions = {
  getAllNotifications,
};

function getAllNotifications() {
  return dispatch => {
    dispatch(request());
    notificationServices.getAllNotifications().then(
      res => {
        const notifications = res.data;
        dispatch(success(notifications))
      }
    ).catch(error => dispatch(failure()))
  }

  function request() {
    return {
      type: notificationConstants.GET_ALL_NOTIFICATIONS_REQUEST
    }
  }

  function success(notifications) {
    return {
      type: notificationConstants.GET_ALL_NOTIFICATIONS_SUCCESS,
      notifications,
    }
  }

  function failure() {
    return {
      type: notificationConstants.GET_ALL_NOTIFICATIONS_FAILURE,
    }
  }
}
