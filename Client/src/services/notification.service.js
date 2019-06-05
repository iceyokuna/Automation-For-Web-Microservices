import axios from 'axios'
import { globalConstants } from '_constants';
import { getUserToken } from '_helpers'

export const notificationServices = {
  getAllNotifications,
  setFCMToken,
};

function setFCMToken(fcmToken) {
  return axios.post(globalConstants.SET_FCM_TOKEN_URL,
    {
      fcmToken,
    },
    {
      headers: {
        Authorization: "Token " + getUserToken(),
      }
    });

}

function getAllNotifications() {
  return axios.get(globalConstants.NOTIFICATION_URL, {
    headers: {
      Authorization: "Token " + getUserToken(),
    }
  });
}

