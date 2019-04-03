import { workflowContants } from '_constants';

const defaultState = {
  nextFlowElements: [],
  showConditionList: false,
  operators: ['==', '!=', '<', '<=', '>', '>='],
  allVariables: [],
  bpmnNodes: [
    'TASK_1132',
    'TASK_2233E',
    'LANE_133ww'
  ],
  appliedConditions: {},
}

export function workflowConditions(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.SET_WORKFLOW_CONDITIONS: {
      console.log(action);
      return { ...state, appliedConditions: action.appliedConditions }
    }

    case workflowContants.APPLY_CONDITIONS_TO_GATEWAY: {
      const nextState = { ...state };
      const { gatewayId, conditions } = action;
      nextState.appliedConditions[gatewayId] = conditions;
      return nextState;
    }

    case workflowContants.UPDATE_CONDITION_VARIABLES: {
      const nextState = { ...state };
      const { allVariables } = state;
      nextState.allVariables = [...allVariables, ...action.allVariables];
      return nextState;
    }

    default:
      return state
  }
}
