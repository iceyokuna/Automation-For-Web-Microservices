import { workflowContants } from '_constants';
import { toast } from 'react-toastify'

const defaultState = {
  generatedForms: [

  ],
  workflowId: null,
  appliedMethods: {},
  executingForm: null,
  executingTaskId: null,
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

    case workflowContants.DELETE_COLLABORATORS_SUCCESS: {

    }

    case workflowContants.CREATE_NEW_WORKFLOW_REQUEST: {
      return { ...state, sendingWorkflowData: true };
    }

    case workflowContants.PREPARE_NEW_WORKFLOW: {
      const { workflowName, description, workflowObject } = action;
      return {
        ...state, name: workflowName,
        description: description, mode: action.mode,
        ...workflowObject
      };
    }

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
      const indexToUpdate = nextState.generatedForms.findIndex((item => item.taskId === forTask));
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
      return nextState;
    }

    case workflowContants.SET_CURRENT_EXECUTING_FORM: {
      const nextState = { ...state };
      const { executingForm, executingTaskId } = action;
      nextState.executingForm = executingForm;
      nextState.executingTaskId = executingTaskId;
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
        sendingWorkflowData: false,
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
      const { taskId, method } = action;
      method.method.methodOfTaskId = taskId
      nextState.appliedMethods[taskId] = method;
      return nextState;
    }

    default:
      return state
  }
}
