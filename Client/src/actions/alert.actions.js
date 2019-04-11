import { alertConstants } from '_constants';
import firebase from 'firebase';

firebase.initializeApp({
    messagingSenderId: "807661190255"
});

const messaging = firebase.messaging();
messaging.onMessage(payload => {
    console.log(payload);
}, err => {

});

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}