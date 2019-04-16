import { socketConstants } from '_constants'
import { workflowActions } from 'actions'


export const fcmMiddleware = store => next => action => {
  next(action);

  



  switch (action.type) {
    case socketConstants.SEND_MESSAGE: {

    } break;



    default:
      break;
  }
}