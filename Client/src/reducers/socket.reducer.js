import { socketConstants } from '_constants';

const defaultState = {
  loadingExecutionForm: false,
}

export function socket(state = defaultState, action) {
  switch (action.type) {
    case socketConstants.NEXT_FORM: {
      return { loadingExecutionForm: true };
    }

    case socketConstants.NEXT_FORM_SUCCESS: {
      return { loadingExecutionForm: false };
    }

    default:
      return state
  }
}
