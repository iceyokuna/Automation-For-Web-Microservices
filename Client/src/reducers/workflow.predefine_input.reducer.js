import { workflowContants } from '_constants';

const defaultState = {
  showPreInputDialog: false,
  appliedPreInputs: {},
}

export function workflowPreInputs(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.APPLY_PRE_INPUT: {
      const nextState = { ...state };
      const { elementId, preInputs, method } = action;
      nextState.appliedPreInputs[elementId] = {
        preInputs: preInputs,
        method: method,
      };
      return nextState;
    }

    case workflowContants.SET_PRE_INPUTS: {
      const nextState = { ...state };
      const { preInputs } = action;
      nextState.appliedPreInputs = preInputs;
      return nextState;
    }

    case workflowContants.TOGGLE_PRE_INPUT_DIALOG: {
      const nextState = {
        ...state,
        showPreInputDialog: !state.showPreInputDialog
      };
      return nextState;
    }

    default:
      return state
  }
}
