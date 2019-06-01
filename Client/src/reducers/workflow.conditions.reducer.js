import { workflowConstants } from '_constants';

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

    case workflowConstants.REMOVE_APPLIED_CONDITION: {
      const nextState = { ...state };
      const { elementId } = action;
      try {
        delete nextState.appliedConditions[elementId];
      } catch (e) {
        console.error(e);
      }
      return nextState;
    }

    case workflowConstants.RESET_CONDITION_PARAMS: {
      return defaultState;
    }

    case workflowConstants.SET_WORKFLOW_CONDITIONS: {
      return {
        ...state,
        appliedConditions: action.appliedConditions,
        allVariables: action.allVariables,
      }
    }

    case workflowConstants.APPLY_CONDITIONS_TO_GATEWAY: {
      const nextState = { ...state };
      const { gatewayId, conditions } = action;
      nextState.appliedConditions[gatewayId] = conditions;
      return nextState;
    }

    case workflowConstants.UPDATE_CONDITION_VARIABLES: {
      const nextState = { ...state };
      nextState.allVariables = action.allVariables;
      return nextState;
    }

    case workflowConstants.SET_NEXT_NODES: {
      return { ...state, bpmnNodes: action.nextNodes }
    }

    default:
      return state
  }
}
