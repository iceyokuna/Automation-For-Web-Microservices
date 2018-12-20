import { socketConstants } from '_constants';

export const socketActions = {
  sendMessage,
  receiveMessage,

  startFlow,
  nextForm,
};

function sendMessage(title, body) {
  return {
    type: socketConstants.SEND_MESSAGE,
    title, body
  };
}

function receiveMessage(message) {
  return {
    type: socketConstants.RECEIVE_MESSAGE,
    message
  }
}


function startFlow(appName) {
  return {
    type: socketConstants.START_FLOW,
    appName
  }
}

function nextForm(appName) {
  return {
    type: socketConstants.NEXT_FORM,
    appName
  }
}
