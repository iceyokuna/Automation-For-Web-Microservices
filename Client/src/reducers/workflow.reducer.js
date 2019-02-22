import { workflowContants } from '_constants';

const defaultState = {
  generatedForms: [
    {
      "taskId": "Task_0qz6rn4",
      "formData": {
        "formHtml": "<form class=\"form\"><div class=\"form-group\"><label class=\"label\">Title of Email</label><input placeholder=\"Title of your email here\" id=\"title#1\" class=\"input\"/></div><div class=\"form-group\"><label class=\"label\">Receiver email</label><input type=\"email\" placeholder=\"Email of your receiver\" id=\"receiver#1123\" class=\"input\"/></div><div class=\"form-group\"><label class=\"label\">Message</label><textarea name=\"message#233\" placeholder=\"Body of message\" class=\"textarea\"></textarea></div><div class=\"form-group\"></div></form><div></div>",
        "formCss": "* { box-sizing: border-box; } body {margin: 0;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);color:#444444;}.textarea{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eeeeee;border:none;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.label{width:100%;display:block;}"
      }
    },
    {
      "taskId": "Task_04hkkce",
      "formData": {
        "formHtml": "<form class=\"form\"><div class=\"form-group\"><label class=\"label\">Salary</label><input placeholder=\"Tell your salary\" id=\"salary\" name=\"salary\" class=\"input\"/></div></form>",
        "formCss": "* { box-sizing: border-box; } body {margin: 0;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px 0;color:#444444;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.label{width:100%;display:block;}"
      }
    },
  ],
  // generatedForms: [

  // ],
  appliedMethods: {

  },
  executingForm: null,
  formsDone: false,

  recentForm: null,
  appName: 'Default name',
  appDescription: '',

  loadingWorkflowData: false,

  gateWayConditions: {
    "Task_04qtp5o": {
      "variable1": {
        "name": null,
        "type": null
      },
      "variable2": {
        "name": null,
        "type": null
      },
      "operator": null,
      "targetNode": null
    }
  }
}


export function workflow(state = defaultState, action) {
  switch (action.type) {

    case workflowContants.SEND_WORKFLOW_DATA_REQUEST: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = true;
      return nextState;
    }

    case workflowContants.SEND_WORKFLOW_DATA_SUCCESS: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = false;
      return nextState;
    }

    case workflowContants.SEND_WORKFLOW_DATA_FAILURE: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = false;
      return nextState;
    }

    case workflowContants.ADD_NEW_FROM: {
      const { forTask, form } = action;
      const nextState = { ...state };
      const indexToUpdate = nextState.generatedForms.findIndex((item => item.taskId == forTask));
      if (indexToUpdate !== -1) {
        nextState.generatedForms[indexToUpdate] = { taskId: forTask, formData: form };
      } else {
        nextState.generatedForms.push({ taskId: forTask, formData: form })
      }
      nextState.recentForm = { taskId: forTask, form }
      return nextState;
    }

    case workflowContants.SET_CURRENT_EXECUTING_FORM: {
      const nextState = { ...state };
      const { executingForm } = action;
      nextState.executingForm = executingForm;
      return nextState;
    }

    case workflowContants.NAME_TO_ID: {
      const { id, value } = action;
      const nextState = { ...state };
      nextState.formIds[id] = value;
      return nextState;
    }

    case workflowContants.SET_APP_INFO: {
      const { appName, appDescription } = action;
      const nextState = { ...state, appName, appDescription };
      return nextState
    }

    case workflowContants.SET_BPMN_JSON: {
      const { bpmnAppJson } = action;
      const nextState = { ...state, bpmnAppJson };
      return nextState
    }

    case workflowContants.APPLY_METHOD_TO_TASK: {
      const nextState = { ...state };
      nextState.appliedMethods[action.taskId] = action.method;
      return nextState;
    }

    default:
      return state
  }
}
