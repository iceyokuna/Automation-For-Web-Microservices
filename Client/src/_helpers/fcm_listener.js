// import messaging from '_helpers/firebase_setup';
// import { notificationActions } from 'actions';
// import { toast } from 'react-toastify';
// import { notificationServices } from 'services';
// import { getUserToken } from '_helpers'
// import { workflowConstants } from '_constants'


// export function applyFCMListener(store) {
//   messaging.onMessage(payload => {

//     var parsedData = JSON.parse(payload.data["gcm.notification.data"]);
//     var messageType = parsedData.type;

//     console.log(parsedData);
//     // console.log(messageType);

//     if (messageType == null) {
//       messageType = parsedData.notification.data.type;
//       var data = JSON.parse(parsedData.notification.data);
//       messageType = data.notification.data.type;
//       parsedData = data.notification.data;
//     }

//     // console.log(messageType);

//     switch (messageType) {
//       case "WORKFLOW_STATUS": {
//         store.dispatch({
//           type: workflowConstants.RECEIVE_WORKFLOW_STATUS,
//           data: parsedData,
//         })
//       } break;

//       case "YOUR_TURN": {
//         store.dispatch({
//           type: workflowConstants.RECEIVE_YOUR_TURN,
//           data: parsedData,
//         });

//         // Show notification
//         toast.info(parsedData.title);
//       } break;

//       default: break;
//     }
//   }, err => {
//     console.error(err)
//   });

//   messaging.onTokenRefresh(() => {
//     messaging.getUserToken().then(
//       fcmToken => {
//         const userToken = getUserToken();
//         notificationServices.setFCMToken(fcmToken, userToken).
//           then().catch(e => {
//             alert("Can't update token");
//           })
//       }
//     )
//   })
// }

