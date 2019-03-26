import { workflowContants } from '_constants';

const defaultState = {
  showSetTimer: false,
  appliedTimers: {},
}

export function workflowTimers(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.APPLY_CONDITIONS_TO_GATEWAY: {
      const nextState = { ...state };
      return nextState;
    }

    default:
      return state
  }
}
