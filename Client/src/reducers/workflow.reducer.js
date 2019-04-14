import { workflowContants } from '_constants';
import { toast } from 'react-toastify'

const defaultState = {
  // generatedForms: [
  //   {
  //     "taskId": "Task_0qz6rn4",
  //     "formData": {
  //       "formHtml": "<form class=\"form\"><div class=\"form-group\"><label class=\"label\">Subject</label><input placeholder=\"Type your email subject\" id=\"subject\" name=\"subject\" class=\"input\"/></div><div class=\"form-group\"><label class=\"label\">Receiver Emails</label><input type=\"email\" placeholder=\"Type your receiver emails\" id=\"email\" name=\"email\" class=\"input\"/></div><div class=\"form-group\"><label class=\"label\">Message</label><textarea id=\"message\" name=\"message\" placeholder=\"Message body\" class=\"textarea\"></textarea></div><div class=\"form-group\"></div></form>",
  //       "formCss": "* { box-sizing: border-box; } body {margin: 0;}.textarea{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eeeeee;border:none;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);color:#444444;}.label{width:100%;display:block;}"
  //     }
  //   },
  //   {
  //     "taskId": "Task_04hkkce",
  //     "formData": {
  //       "formHtml": "<form class=\"form\"><div class=\"form-group\"><label class=\"label\">Salary</label><input placeholder=\"Tell your salary\" id=\"salary\" name=\"salary\" class=\"input\"/></div></form>",
  //       "formCss": "* { box-sizing: border-box; } body {margin: 0;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px 0;color:#444444;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.label{width:100%;display:block;}"
  //     }
  //   },
  // ],
  generatedForms: [

  ],
  workflowId: null,
  appliedMethods: {},
  executingForm: null,
  formsDone: false,
  currentNode: null,

  name: 'Default name',
  description: 'Default description',
  collaboratorsToInvite: [],
  bpmnJson: null,

  sendingWorkflowData: false,
  showMemberDialog: false,
  showEditInfoDialog: false,
  showFormTypeDialog: false,
  mode: null,
}

const initState = { ...defaultState };

export function workflow(state = defaultState, action) {
  switch (action.type) {
    case workflowContants.SET_WORKFLOW_ID: {
      const nextState = { ...state };
      nextState.workflowId = action.workflowId;
      return nextState;
    }

    case workflowContants.TOGGLE_INFO_DIALOG: {
      const nextState = { ...state, showEditInfoDialog: !state.showEditInfoDialog };
      return nextState;
    }

    case workflowContants.TOGGLE_FORM_TYPE_DIALOG: {
      const nextState = { ...state, showFormTypeDialog: !state.showFormTypeDialog };
      return nextState;
    }

    case workflowContants.SETUP_EXISTING_WORKFLOW: {
      const { currentFlow } = action;
      const nextState = { ...state, ...currentFlow };
      return nextState;
    }

    case workflowContants.SETUP_NEW_WORKFLOW: {
      const { name, description } = state;
      const nextState = { ...initState, name, description };
      return nextState;
    }

    case workflowContants.SET_CURRENT_ELEMENT: {
      const nextState = { ...state };
      nextState.currentNode = action.bpmnNode;
      return nextState;
    }

    case workflowContants.TOGGLE_MEMBER_DIALOG: {
      const nextState = { ...state };
      nextState.showMemberDialog = !state.showMemberDialog;
      return nextState;
    }

    case workflowContants.ADD_NEW_COLLABORATORS: {
      const nextState = { ...state };
      nextState.collaboratorsToInvite = [...state.collaboratorsToInvite, ...action.newCollaborators]
      return nextState;
    }

    case workflowContants.SEND_WORKFLOW_DATA_REQUEST: {
      const nextState = { ...state };
      nextState.sendingWorkflowData = true;
      return nextState;
    }

    case workflowContants.SEND_WORKFLOW_DATA_SUCCESS: {
      const nextState = { ...state };
      nextState.sendingWorkflowData = false;
      return nextState;
    }

    case workflowContants.SEND_WORKFLOW_DATA_FAILURE: {
      const nextState = { ...state };
      nextState.sendingWorkflowData = false;
      return nextState;
    }

    case workflowContants.ADD_NEW_FROM: {
      const { forTask, form, formType, } = action;
      const nextState = { ...state };
      const typeOfForm = formType === "inputForm" ? "Input form" : "Output form";
      const indexToUpdate = nextState.generatedForms.findIndex((item => item.taskId == forTask));
      if (indexToUpdate !== -1) {  // Found existing form
        nextState.generatedForms[indexToUpdate].taskId = forTask;
        nextState.generatedForms[indexToUpdate].formData = form;
        nextState.generatedForms[indexToUpdate].forms[formType] = form;
        toast.success(`${typeOfForm} is updated`);
      } else { // Create new
        const forms = {
          inputForm: {},
          outputForm: {},
        };
        forms[formType] = form;
        nextState.generatedForms.push({
          taskId: forTask,
          formData: form,
          forms: forms,
        });
        toast.success(`${typeOfForm} is added`);
      }
      nextState.showFormTypeDialog = false;
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

    case workflowContants.CREATE_NEW_WORKFLOW_SUCCESS: {
      const { workflowObject, mode } = action;
      const { workflow_description, workflow_id, workflow_name } = workflowObject;
      const nextState = {
        ...state,
        name: workflow_name,
        workflowId: workflow_id,
        description: workflow_description,
        mode,
      };
      return nextState;
    }

    case workflowContants.SET_BPMN_JSON: {
      const { bpmnJson } = action;
      const nextState = { ...state, bpmnJson };
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
