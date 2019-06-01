import { workflowConstants } from '_constants';

const defaultState = {
  showPreInputDialog: false,
  appliedPreInputs: {},
}

export function workflowPreInputs(state = defaultState, action) {
  switch (action.type) {

    case workflowConstants.REMOVE_APPLIED_PREINPUT: {
      const nextState = { ...state };
      const { elementId } = action;
      try {
        delete nextState.appliedPreInputs[elementId];
      } catch (e) {
        console.error(e);
      }
      return nextState;
    }

    case workflowConstants.RESET_PREINPUT_PARAMS: {
      return defaultState;
    }

    case workflowConstants.APPLY_PRE_INPUT: {
      const nextState = { ...state };
      const { elementId, preInputs, method } = action;
      nextState.appliedPreInputs[elementId] = {
        preInputs: preInputs,
        method: method,
      };
      return nextState;
    }

    case workflowConstants.SET_PRE_INPUTS: {
      const nextState = { ...state };
      const { preInputs } = action;
      nextState.appliedPreInputs = preInputs;
      return nextState;
    }

    case workflowConstants.TOGGLE_PRE_INPUT_DIALOG: {
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
