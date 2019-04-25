import axios from 'axios'
import { globalConstants } from '_constants';
import { getToken } from '_helpers'

export const notificationServices = {
  getAllNotifications,
  setFCMToken,
};

function setFCMToken(fcmToken, userToken) {
  return axios.post(globalConstants.SET_FCM_TOKEN_URL,
    {
      fcmToken,
    },
    {
      headers: {
        Authorization: "Token " + userToken,
      }
    });

}

function getAllNotifications() {
  return axios.get(globalConstants.GET_ALL_NOTIFICATIONS_URL);
}

