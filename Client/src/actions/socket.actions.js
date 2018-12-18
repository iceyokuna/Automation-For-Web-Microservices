import { socketConstants } from '_constants';

export const socketActions = {
  sendMessage,
  submitForm
};

function sendMessage(title, body) {
  return {
    type: socketConstants.SEND_MESSAGE,
    title, body
  };
}

function submitForm(formData) {
  return {
    type: socketConstants.SUBMIT_FORM
  }
}
