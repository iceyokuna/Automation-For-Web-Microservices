import firebase from 'firebase';
export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyA3nzR_cx2fFP2MR7aSAis3dCeBa147SM4",
    authDomain: "web-automation-service-client.firebaseapp.com",
    databaseURL: "https://web-automation-service-client.firebaseio.com",
    projectId: "web-automation-service-client",
    storageBucket: "web-automation-service-client.appspot.com",
    messagingSenderId: "807661190255"
  });


  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}

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

