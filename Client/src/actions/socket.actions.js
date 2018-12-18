import { socketConstants } from '_constants';

export const socketActions = {
  sendMessage,
  receiveMessage,
  requestNextForm,
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

function requestNextForm(formValue) {
  return {
    type: socketConstants.REQUEST_NEXT_FORM,
    formValue: {
      param1: 'eiei',
      param2: 'hello'
    }
  }
}
