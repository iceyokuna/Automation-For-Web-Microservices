import { workflowContants } from '_constants';

const defaultState = {
  nextFlowElements: [],
  showConditionList: false,
  operators: ['==', '!=', '<', '<=', '>', '>='],
  allVariables: [],
  bpmnNodes: [],
  appliedConditions: {},
}

export function workflowConditions(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.SET_WORKFLOW_CONDITIONS: {
      return {
        ...state,
        appliedConditions: action.appliedConditions,
        allVariables: action.allVariables,
      }
    }

    case workflowContants.APPLY_CONDITIONS_TO_GATEWAY: {
      const nextState = { ...state };
      const { gatewayId, conditions } = action;
      nextState.appliedConditions[gatewayId] = conditions;
      return nextState;
    }

    case workflowContants.UPDATE_CONDITION_VARIABLES: {
      const nextState = { ...state };
      nextState.allVariables = action.allVariables;
      return nextState;
    }

    case workflowContants.SET_NEXT_NODES: {
      return { ...state, bpmnNodes: action.nextNodes }
    }

    default:
      return state
  }
}
