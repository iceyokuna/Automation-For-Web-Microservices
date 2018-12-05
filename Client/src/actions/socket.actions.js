import { socketConstants } from '_constants';

export const socketActions = {
  sendMessage
};

function sendMessage(title, body) {
  return {
    type: socketConstants.SEND_MESSAGE,
    title, body
  };
}
