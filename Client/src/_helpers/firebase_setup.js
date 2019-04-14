import firebase from 'firebase';

firebase.initializeApp({
  messagingSenderId: "807661190255"
});

const messaging = firebase.messaging();

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token do usuário:', token);

    return token;
  } catch (error) {
    console.error(error);
  }
}

export default messaging;

