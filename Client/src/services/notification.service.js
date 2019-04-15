import axios from 'axios'
import { globalConstants } from '_constants'

export const notificationServices = {
  getAllNotifications,
};

function getAllNotifications() {
  return axios.get(globalConstants.GET_ALL_NOTIFICATIONS_URL);
}

