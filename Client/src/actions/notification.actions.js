import { notificationConstants } from '_constants';
import { notificationServices } from 'services';

export const notificationActions = {
  getAllNotifications,
  addNewNotification,
  setFCMToken,
};

function setFCMToken(fcmToken) {
  return dispatch => {
    dispatch(request());

    notificationServices.setFCMToken(fcmToken).then(
      res => {
        dispatch(success());
      }
    ).catch(e => dispatch(failure()))
  }

  function request() {
    return {
      type: notificationConstants.SET_FCMTOKEN_REQUEST
    }
  }

  function success(notifications) {
    return {
      type: notificationConstants.SET_FCMTOKEN_SUCCESS,
      notifications,
    }
  }

  function failure() {
    return {
      type: notificationConstants.SET_FCMTOKEN_FAILURE,
    }
  }
}

function addNewNotification(payload) {
  return {
    type: notificationConstants.ADD_NEW_NOTIFICATION,
    payload,
  }

}

function getAllNotifications() {
  return dispatch => {
    dispatch(request());
    notificationServices.getAllNotifications().then(
      res => {
        const notifications = res.data;
        dispatch(success(notifications));
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
