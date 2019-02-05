const Prefix = 'socket/';

export const socketConstants = {
  DEV_SERVER_URL: '178.128.214.101',
  LOCAL_SOCKET_URL: '127.0.0.1:8000',

  SEND_MESSAGE: Prefix + 'SEND_MESSAGE',
  RECEIVE_MESSAGE: Prefix + 'RECEIVE_MESSAGE',

  START_FLOW: Prefix + 'START_FLOW',
  NEXT_FORM: Prefix + 'NEXT_FORM',
};
