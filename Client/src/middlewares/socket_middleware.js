import { socketConstants } from '_constants'
import { socketActions } from 'actions'

var socket = new WebSocket('ws://178.128.214.101:8002/execute/');
// const socket = () => { };


export const socketMiddleware = store => next => action => {
  next(action);

  socket.onopen = (e) => {
    // alert('Success')
  }

  socket.onmessage = (res) => {
    console.log('Got message', res.data);
    store.dispatch(socketActions.receiveMessage(res.data))
  }

  socket.onclose = (res) => {
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
      socket.send(payload);
    } break;

    case socketConstants.START_FLOW: {
      const payload = JSON.stringify({
        message: {
          type: action.type,
          appName: action.appName
        }
      })
      socket.send(payload);
    } break;

    case socketConstants.NEXT_FORM: {
      const payload = JSON.stringify({
        message: {
          type: action.type,
          appName: action.appName
        }
      })
      socket.send(payload);
    } break;

    default:
      break;
  }
}