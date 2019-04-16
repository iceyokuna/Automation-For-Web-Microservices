import { workflowContants } from '_constants';

const defaultState = {
  loadingCollaborators: false,
  collaborators: [],
}

export function workflowCollaborators(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.GET_ALL_COLLABORATORS_REQUEST: {
      return { ...state, loadingCollaborators: true };
    }

    case workflowCollaborators.ADD_NEW_COLLABORATORS_SUCCESS: {
      return { ...state, loadingCollaborators: false };
    }

    case workflowContants.GET_ALL_COLLABORATORS_SUCCESS: {
      const nextState = { ...state };
      nextState.collaborators = action.collaborators;
      nextState.loadingCollaborators = false;
      return nextState;
    }

    case workflowContants.GET_ALL_COLLABORATORS_FAILURE: {
      return { ...state, loadingCollaborators: false };
    }

    default:
      return state
  }
}
