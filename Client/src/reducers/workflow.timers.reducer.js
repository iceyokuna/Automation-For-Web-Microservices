import { workflowContants } from '_constants';

const defaultState = {
  showTimerDialog: false,
  appliedTimers: {},
}

export function workflowTimers(state = defaultState, action) {
  switch (action.type) {

    case workflowContants.REMOVE_APPLIED_TIMER: {
      const nextState = { ...state };
      const { elementId } = action;
      try {
        delete nextState.appliedTimers[elementId];
      } catch (e) {
        console.error(e);
      }
      
      return nextState;
    }

    case workflowContants.RESET_TIMER_PARAMS: {
      return defaultState;
    }
    case workflowContants.TOGGLE_TIMER_DIALOG: {
      const nextState = { ...state };
      nextState.showTimerDialog = !state.showTimerDialog;
      return nextState;
    }

    case workflowContants.APPLY_TIMER_TO_ELEMENT: {
      const nextState = { ...state };
      const { elementId, dateTime } = action;
      nextState.appliedTimers[elementId] = dateTime;
      return nextState;
    }

    case workflowContants.SET_APPLIED_TIMER: {
      return { ...state, appliedTimers: action.appliedTimers, }
    }

    default:
      return state
  }
}
