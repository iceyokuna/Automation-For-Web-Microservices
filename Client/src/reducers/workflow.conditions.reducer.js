import { workflowContants } from '_constants';

const defaultState = {
  nextFlowElements: [],
  showConditionList: false,
  operators: ['==', '!=', '<', '<=', '>', '>='],
  allVariables: [
    { name: 'Salary', type: 'Number' },
    { name: 'Single', type: 'Boolean' },
    { name: 'Name', type: 'String' },
  ],
  appliedConditions: {},
}

export function workflowConditions(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.APPLY_CONDITIONS_TO_GATEWAY: {
      const nextState = { ...state };
      const { gatewayId, conditions } = action;
      nextState.appliedConditions[gatewayId] = conditions;
      // nextState.allVariables.push({})
      return nextState;
    }

    default:
      return state
  }
}
