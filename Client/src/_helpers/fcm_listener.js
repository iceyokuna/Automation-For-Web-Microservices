import messaging from '_helpers/firebase_setup';
import { notificationActions } from 'actions';
import { toast } from 'react-toastify';
import { notificationServices } from 'services';
import { getUserToken } from '_helpers'
import { workflowContants } from '_constants'


export function applyFCMListener(store) {
  messaging.onMessage(payload => {
    // Show notification
    toast.info(payload.notification.title);
    const parsedData = JSON.parse(payload.data["gcm.notification.data"]);
    const messageType = parsedData.type;

    switch (messageType) {
      case "WORKFLOW_STATUS": {
        store.dispatch({
          type: workflowContants.RECEIVE_WORKFLOW_STATUS,
          data: parsedData,
        })
      } break;
      default: break;
    }

    // store.dispatch(notificationActions.addNewNotification(payload));
  }, err => {
    console.error(err)
  });

  messaging.onTokenRefresh(() => {
    messaging.getUserToken().then(
      fcmToken => {
        const userToken = getUserToken();
        notificationServices.setFCMToken(fcmToken, userToken).
          then().catch(e => {
            alert("Can't update token");
          })
      }
    )
  })
}

