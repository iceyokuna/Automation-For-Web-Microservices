import { workflowConstants } from '_constants';
import { history, getUnique } from '_helpers';

const defaultState = {
  myFlows: [],
  currentFlow: null,
  loadingMyFlows: false,
  err: null,
}

export function workflowMyFlows(state = defaultState, action) {
  switch (action.type) {

    case workflowConstants.RESET_MYFLOWS_PARAMS: {
      return defaultState;
    }

    case workflowConstants.DELETE_WORKFLOW_SUCCESS: {
      const nextState = { ...state };
      nextState.myFlows = state.myFlows.filter((flow) => flow.id != action.workflowId);
      return nextState;
    }

    case workflowConstants.SET_CURRENT_FLOW: {
      const nextState = { ...state };
      nextState.currentFlow = action.currentFlow;
      return nextState;
    }

    case workflowConstants.GET_MY_FLOWS_REQUEST: {
      const nextState = { ...state };
      nextState.loadingMyFlows = true;
      return nextState;
    }
    case workflowConstants.GET_MY_FLOWS_SUCCESS: {
      const nextState = { ...state };
      nextState.loadingMyFlows = false;
      const { data } = action;
      const { collaborator_workflows, owner_workflows } = data;
      const group_flows = collaborator_workflows.map((item, index) => {
        item["type"] = "group"; return item;
      })

      let allFlows = [...owner_workflows, ...group_flows];
      allFlows = getUnique(allFlows, 'id'); // remove duplicate workflow id
      nextState.myFlows = allFlows;
      return nextState;
    }
    case workflowConstants.GET_MY_FLOWS_FAILURE: {
      const nextState = { ...state };
      nextState.loadingMyFlows = false;
      nextState.err = action.err;
      return nextState;
    }

    default:
      return state
  }
}
