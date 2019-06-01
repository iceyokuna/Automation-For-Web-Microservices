import { socketConstants } from '_constants'
import { workflowActions } from 'actions'
import { history } from '_helpers';
import { toast } from 'react-toastify';
var socket = null;

export const socketMiddleware = store => next => action => {
  next(action);

  switch (action.type) {
    case socketConstants.CLOSE_SOCKET: {
      socket.close();
    }

    case socketConstants.OPEN_SOCKET: {
      socket = new WebSocket(`ws://${socketConstants.LOCAL_SOCKET_URL}/execute/`);
      socket.onopen = (e) => {
        const { currentFlow } = store.getState().workflowMyFlows;
        history.push('/execute_flow/' + currentFlow.id);
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

            case socketConstants.WAIT: {

            } break;

            case socketConstants.FINISH_ALL_FORMS: {
              store.dispatch(workflowActions.resetExecutingForm());
              socket.close();
              history.replace('/my_flows');
              toast.success("Execution is done");
            } break;
            default:
              break;
          }
        } catch (error) {
          console.error(error);
        }
      }

      socket.onclose = (res) => {
        console.error(res);
      };

    } break;

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
          name: action.name,
        }
      })
      try {
        socket.send(payload);
      } catch (error) {
        console.error(error);
      }
    } break;

    case socketConstants.NEXT_FORM: {
      const payload = JSON.stringify({
        message: {
          ...action,
        }
      })
      try {
        console.log({ payload });
        socket.send(payload);
      } catch (error) {
        console.log("ERROR");
        console.error(error);
      }
    } break;

    default:
      break;
  }
}