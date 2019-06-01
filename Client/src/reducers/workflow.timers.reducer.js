import { workflowConstants } from '_constants';

const defaultState = {
  showTimerDialog: false,
  appliedTimers: {},
}

export function workflowTimers(state = defaultState, action) {
  switch (action.type) {

    case workflowConstants.REMOVE_APPLIED_TIMER: {
      const nextState = { ...state };
      const { elementId } = action;
      try {
        delete nextState.appliedTimers[elementId];
      } catch (e) {
        console.error(e);
      }
      
      return nextState;
    }

    case workflowConstants.RESET_TIMER_PARAMS: {
      return defaultState;
    }
    case workflowConstants.TOGGLE_TIMER_DIALOG: {
      const nextState = { ...state };
      nextState.showTimerDialog = !state.showTimerDialog;
      return nextState;
    }

    case workflowConstants.APPLY_TIMER_TO_ELEMENT: {
      const nextState = { ...state };
      const { elementId, dateTime } = action;
      nextState.appliedTimers[elementId] = dateTime;
      return nextState;
    }

    case workflowConstants.SET_APPLIED_TIMER: {
      return { ...state, appliedTimers: action.appliedTimers, }
    }

    default:
      return state
  }
}
