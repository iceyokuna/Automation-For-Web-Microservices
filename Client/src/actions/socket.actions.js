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


function startFlow(name) {
  return {
    type: socketConstants.START_FLOW,
    name
  }
}

function nextForm(name, formInputValues, taskId, user) {
  return {
    type: socketConstants.NEXT_FORM,
    name,
    formInputValues,
    taskId,
    user,
  }
}
