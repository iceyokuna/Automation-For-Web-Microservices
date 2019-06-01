import { workflowConstants } from '_constants';
import { toast } from 'react-toastify'

const defaultState = {
  generatedForms: [

  ],
  workflowId: null,
  appliedMethods: {},
  appliedAsyncs: {},
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
  mode: "CREATE_NEW",
}

const initState = { ...defaultState };

export function workflow(state = defaultState, action) {
  switch (action.type) {

    case workflowConstants.APPLY_ASYNC_TO_TASK: {
      const nextState = { ...state };
      const { checked, taskId } = action;
      if (checked == true) {
        nextState.appliedAsyncs[taskId] = checked;
      } else {
        delete nextState.appliedAsyncs[taskId];
      }
      return nextState;
    }

    case workflowConstants.RESET_WORKFLOW_PARAMS: {
      return defaultState;
    }

    case workflowConstants.REMOVE_APPLIED_ASYNC: {
      const nextState = { ...state };
      const { elementId } = action;
      try {
        delete nextState.appliedAsyncs[elementId];
      } catch (e) {
        console.error(e);
      }
      return nextState;
    }

    case workflowConstants.REMOVE_GENERATED_FORM: {
      const nextState = { ...state };
      const { generatedForms } = nextState;
      for (let i = 0; i < generatedForms.length; i++) {
        if (generatedForms[i].taskId === action.elementId) {
          generatedForms.splice(i, 1);
          break;
        }
      }
      return nextState;
    }

    case workflowConstants.REMOVE_APPLIED_METHOD: {
      const nextState = { ...state };
      const { elementId } = action;
      try {
        delete nextState.appliedMethods[elementId];
      } catch (e) {
        console.error(e);
      }
      return nextState;
    }

    case workflowConstants.SET_APPLIED_ASYNCS: {
      return { ...state, appliedAsyncs: action.appliedAsyncs };
    }

    case workflowConstants.SET_BPMN_JSON: {
      return { ...state, bpmnJson: action.bpmnJson };
    }

    case workflowConstants.SET_APPLIED_METHODS: {
      return { ...state, appliedMethods: action.appliedMethods };
    }

    case workflowConstants.SET_GENERATED_FORMS: {
      return { ...state, generatedForms: action.generatedForms };
    }

    case workflowConstants.SET_MODE: {
      return { ...state, mode: action.mode };
    }

    case workflowConstants.CREATE_NEW_WORKFLOW_REQUEST: {
      return { ...state, sendingWorkflowData: true };
    }

    case workflowConstants.PREPARE_NEW_WORKFLOW: {
      const { workflowName, description, workflowObject } = action;
      return {
        ...state, name: workflowName,
        description: description,
        ...workflowObject
      };
    }

    case workflowConstants.SET_WORKFLOW_ID: {
      const nextState = { ...state };
      nextState.workflowId = action.workflowId;
      return nextState;
    }

    case workflowConstants.TOGGLE_INFO_DIALOG: {
      const nextState = { ...state, showEditInfoDialog: !state.showEditInfoDialog };
      return nextState;
    }

    case workflowConstants.TOGGLE_FORM_TYPE_DIALOG: {
      const nextState = { ...state, showFormTypeDialog: !state.showFormTypeDialog };
      return nextState;
    }

    case workflowConstants.SETUP_EXISTING_WORKFLOW: {
      const { dataForWorkflowReducer } = action;
      const nextState = { ...state, ...dataForWorkflowReducer };
      return nextState;
    }

    case workflowConstants.SETUP_NEW_WORKFLOW: {
      const { name, description } = state;
      const nextState = { ...initState, name, description };
      return nextState;
    }

    case workflowConstants.SET_CURRENT_ELEMENT: {
      const nextState = { ...state };
      nextState.currentNode = action.bpmnNode;
      return nextState;
    }

    case workflowConstants.TOGGLE_MEMBER_DIALOG: {
      const nextState = { ...state };
      nextState.showMemberDialog = !state.showMemberDialog;
      return nextState;
    }

    case workflowConstants.ADD_NEW_COLLABORATORS: {
      const nextState = { ...state };
      nextState.collaboratorsToInvite = [...state.collaboratorsToInvite, ...action.newCollaborators]
      return nextState;
    }

    case workflowConstants.SEND_WORKFLOW_DATA_REQUEST: {
      const nextState = { ...state };
      nextState.sendingWorkflowData = true;
      return nextState;
    }

    case workflowConstants.SEND_WORKFLOW_DATA_SUCCESS: {
      const nextState = { ...state };
      nextState.sendingWorkflowData = false;
      return nextState;
    }

    case workflowConstants.SEND_WORKFLOW_DATA_FAILURE: {
      const nextState = { ...state };
      nextState.sendingWorkflowData = false;
      return nextState;
    }

    case workflowConstants.ADD_NEW_FROM: {
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

    case workflowConstants.RESET_EXECUTING_FORM: {
      return {
        ...state,
        executingForm: null,
        executingTaskId: null
      };
    }

    case workflowConstants.SET_CURRENT_EXECUTING_FORM: {
      const nextState = { ...state };
      const { executingForm, executingTaskId } = action;
      nextState.executingForm = executingForm;
      nextState.executingTaskId = executingTaskId;
      return nextState;
    }

    case workflowConstants.NAME_TO_ID: {
      const { id, value } = action;
      const nextState = { ...state };
      nextState.formIds[id] = value;
      return nextState;
    }

    case workflowConstants.CREATE_NEW_WORKFLOW_SUCCESS: {
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

    case workflowConstants.SET_BPMN_JSON: {
      const { bpmnJson } = action;
      const nextState = { ...state, bpmnJson };
      return nextState
    }

    case workflowConstants.APPLY_METHOD_TO_TASK: {
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
