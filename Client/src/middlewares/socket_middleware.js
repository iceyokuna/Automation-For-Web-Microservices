import { socketConstants } from '_constants'
import { workflowActions } from 'actions'

var socket = new WebSocket(`ws://${socketConstants.LOCAL_SOCKET_URL}/execute/`);

export const socketMiddleware = store => next => action => {
  next(action);

  socket.onopen = (e) => {
    // alert('Success')
  }

  socket.onmessage = (res) => {
    try {
      const data = JSON.parse(res.data);
      switch (data.type) {
        case socketConstants.START_FLOW_SUCCESS: {
          const { form, taskId } = data;
          store.dispatch(workflowActions.setExecutingForm(form, taskId));
        } break;

        case socketConstants.START_FLOW_FAIL: {

        } break;

        case socketConstants.NEXT_FORM_SUCCESS: {
          const { form, taskId } = data;
          store.dispatch(workflowActions.setExecutingForm(form, taskId));
        } break;

        case socketConstants.NEXT_FORM_FAIL: {

        } break;

        case socketConstants.FINISH_ALL_FORMS: {
          store.dispatch(workflowActions.setExecutingForm("DONE"));
        } break;
        default:
          break;
      }
      // store.dispatch(socketActions.receiveMessage(res.data))
    } catch (error) {
      console.error(error);
    }
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
      try {
        socket.send(payload);
      } catch (error) {
        console.error(error);
      }

    } break;

    case socketConstants.START_FLOW: {
      const payload = JSON.stringify({
        message: {
          type: action.type,
          name: action.name
        }
      })
      try {
        socket.send(payload);
      } catch (error) {
        console.error(error);
      }
    } break;

    case socketConstants.NEXT_FORM: {
      const { type, name, formInputValues, taskId } = action;
      const payload = JSON.stringify({
        message: {
          type,
          name,
          formInputValues,
          taskId,
        }
      })
      try {
        socket.send(payload);
      } catch (error) {
        console.error(error);
      }
    } break;

    default:
      break;
  }
}