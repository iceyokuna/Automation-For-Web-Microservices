import { socketConstants } from '_constants'

const enduserSocket = new WebSocket('ws://localhost:8000/main-user/');
// const enduserSocket = () => { };

export const socketMiddleware = store => next => action => {
  next(action);

  enduserSocket.onopen = (e) => {

  }

  enduserSocket.onmessage = (res) => {
    console.log('Got message', res.data);
  }

  enduserSocket.onclose = (res) => {
    console.error('Chat socket closed unexpectedly');
  };

  switch (action.type) {
    case socketConstants.SEND_MESSAGE: {
      // Payload must contain 'message' key
      const payload = JSON.stringify({
        message: {
          type: action.type,
          title: 'My title',
          body: 'Good morning'
        }
      })
      enduserSocket.send(payload);
    } break;

    case socketConstants.SUBMIT_FORM: {
      const payload = JSON.stringify({
        message: {
          type: action.type,
          form: {
            html: 'html data',
            css: 'css dat',
          }
        }
      })
      enduserSocket.send(payload);
    } break;

    default:
      break;
  }
}