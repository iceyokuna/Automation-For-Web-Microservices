import { workflowContants } from '_constants';

const defaultState = {
  showPreInputDialog: true,
  appliedPreInputs: {
    "Task_23232": {

    },
    "Task_55555": {

    },
  },
}

export function workflowPreInputs(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.APPLY_PRE_INPUT: {
      const nextState = { ...state };
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
