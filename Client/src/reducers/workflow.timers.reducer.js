import { workflowContants } from '_constants';

const defaultState = {
  showTimerDialog: false,
  appliedTimers: {},
}

export function workflowTimers(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.TOGGLE_TIMER_DIALOG: {
      const nextState = { ...state };
      nextState.showTimerDialog = !state.showTimerDialog;
      return nextState;
    }

    default:
      return state
  }
}
