import { socketConstants } from '_constants'
import { socketActions, workflowActions } from 'actions'

const domainName = '178.128.214.101:8002';


var socket = new WebSocket(`ws://${socketConstants.LOCAL_SOCKET_URL}/execute/`);
// const socket = () => { };


export const socketMiddleware = store => next => action => {
  next(action);

  socket.onopen = (e) => {
    // alert('Success')
  }

  socket.onmessage = (res) => {
    const data = JSON.parse(res.data);
    switch (data.type) {
      case 'workflow/START_FLOW_SUCCESS': {
        const { form } = data;
        store.dispatch(workflowActions.setExecutingForm(form));
      } break;

      case 'START_FLOW_FAIL': {

      } break;

      case 'workflow/NEXT_FORM_SUCCESS': {
        const { form } = data;
        store.dispatch(workflowActions.setExecutingForm(form));
      } break;

      case 'NEXT_FORM_FAIL': {

      } break;
      default:
        break;
    }
    // store.dispatch(socketActions.receiveMessage(res.data))
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