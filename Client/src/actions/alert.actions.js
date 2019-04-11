import { alertConstants } from '_constants';

import messaging from '_helpers/firebase_setup';

messaging.onMessage(payload => {
    console.log(payload);
}, err => {
    console.error(err)
})

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