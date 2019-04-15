import messaging from '_helpers/firebase_setup';
import { notificationActions } from 'actions';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { colors } from 'theme';

export function applyFCMListener(store) {
  messaging.onMessage(payload => {
    toast(payload.notification.title, {
      className: css({
        backgroundColor: colors["accent-4"],
        color: colors["light-0"],
      })
    });
    store.dispatch(notificationActions.addNewNotification(payload));
  }, err => {
    console.error(err)
  })
}

