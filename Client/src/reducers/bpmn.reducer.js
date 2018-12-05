import { bpmnConstants } from '_constants';

const defaultState = {
  generatedForms: {},
  recentForm: null
}

export function bpmn(state = defaultState, action) {
  switch (action.type) {
    case bpmnConstants.ADD_NEW_FROM: {
      const { forTask, form } = action;
      const nextState = { ...state };
      nextState.generatedForms[forTask] = form;
      nextState.recentForm = { taskId: forTask, form }
      return nextState;
    }
    default:
      return state
  }
}
