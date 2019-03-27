import { workflowContants } from '_constants';

const defaultState = {
  currentNode: null,
}

export function workflowCurrentNode(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.SET_CURRENT_ELEMENT: {
      const nextState = { ...state };
      nextState.currentNode = action.bpmnNode;
      return nextState;
    }

    default:
      return state
  }
}
