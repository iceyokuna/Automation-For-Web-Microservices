const Prefix = 'workflow/';

export const socketConstants = {
  DEV_SERVER_URL: '178.128.214.101',
  LOCAL_SOCKET_URL: '127.0.0.1:8000',

  SEND_MESSAGE: Prefix + 'SEND_MESSAGE',
  RECEIVE_MESSAGE: Prefix + 'RECEIVE_MESSAGE',

  START_FLOW: Prefix + 'START_FLOW',
  START_FLOW_SUCCESS: Prefix + 'START_FLOW_SUCCESS',
  START_FLOW_FAIL: Prefix + 'START_FLOW_FAIL',

  NEXT_FORM: Prefix + 'NEXT_FORM',
  NEXT_FORM_SUCCESS: Prefix + 'NEXT_FORM_SUCCESS',
  NEXT_FORM_FAIL: Prefix + 'NEXT_FORM_FAIL',

  FINISH_ALL_FORMS: Prefix + 'FINISH_ALL_FORM',

};
