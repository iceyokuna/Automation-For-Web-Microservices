import messaging from '_helpers/firebase_setup';
import { notificationActions } from 'actions';
import { toast } from 'react-toastify';
import { notificationServices } from 'services';
import { getUserToken } from '_helpers'

export function applyFCMListener(store) {
  messaging.onMessage(payload => {
    toast.info(payload.notification.title);
    console.log({payload});
    store.dispatch(notificationActions.addNewNotification(payload));
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

