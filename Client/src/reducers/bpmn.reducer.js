import { bpmnConstants } from '_constants';

const defaultState = {
  // generatedForms: [
  //   {
  //     "taskId": "Task_04qtp5o",
  //     "formData": {
  //       "formHtml": "<div class=\"c2073\">T-Shirt Order\n</div><form class=\"form\"><div class=\"form-group\"><label class=\"label\">Color</label><input placeholder=\"Type here your shirt's color\" name=\"name\" class=\"input\"/></div><div class=\"form-group\">\n  </div><div class=\"form-group\"><label class=\"label\">Shirt size</label></div><input name=\"size\" placeholder=\"Enter your size\" class=\"input\"/><div class=\"form-group\">\n  </div><div class=\"form-group\"><button type=\"submit\" class=\"button\">Next</button></div></form>",
  //       "formCss": "* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.button{width:100%;margin:15px 0;background-color:#009688;border:none;color:#f6f6f6;border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);color:#444444;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}"
  //     }
  //   },
  //   {
  //     "taskId": "Task_15y1zyq",
  //     "formData": {
  //       "formHtml": "<div class=\"c2073\">Location\n</div><form class=\"form\"><div class=\"form-group\"><label class=\"label\">Your address</label></div><input name=\"address\" placeholder=\"Enter your address\" class=\"input\"/><label class=\"label\">City</label><input name=\"city\" placeholder=\"Enter your  city\" class=\"input\"/><div class=\"form-group\"><button type=\"submit\" class=\"button\">Next</button></div></form>",
  //       "formCss": "* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:#444444;background-color:#eee;border:none;}.button{width:100%;margin:15px 0;background-color:#009688;border:none;color:#f6f6f6;border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;}.form{border-radius:3px;padding:10px 15px;box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);color:#444444;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}"
  //     }
  //   },
  //   {
  //     "taskId": "Task_082x4b7",
  //     "formData": {
  //       "formHtml": "<div class=\"c2073\">Payment\n</div><form class=\"form\"><div class=\"form-group\"><label class=\"label\">Email</label></div><input name=\"email\" class=\"input\"/><label class=\"label\">Card Number</label><div class=\"form-group\">\n  </div><div class=\"form-group\">\n  </div><input name=\"card_number\" class=\"input\"/><div class=\"form-group\"><button type=\"submit\" class=\"button\">Next</button></div></form>",
  //       "formCss": "* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;}.input{width:100%;margin-bottom:15px;padding:7px 10px;border-radius:2px;color:rgb(68, 68, 68);background-color:rgb(238, 238, 238);border:none;padding-top:7px;padding-right:10px;padding-bottom:7px;padding-left:10px;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:2px;border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;}.button{width:100%;margin:15px 0;background-color:rgb(0, 150, 136);border:none;color:rgb(246, 246, 246);border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;margin-top:15px;margin-right:0px;margin-bottom:15px;margin-left:0px;border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:2px;padding-top:7px;padding-right:10px;padding-bottom:7px;padding-left:10px;}.form{border-radius:3px;padding:10px 15px;box-shadow:0px 1px 4px 0px;color:rgb(68, 68, 68);border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}"
  //     }
  //   },
  //   {
  //     "taskId": "Task_1xtdmoe",
  //     "formData": {
  //       "formHtml": "<div class=\"c2073\">Summary\n</div><form class=\"form\"><div class=\"form-group\"><label class=\"label\">Name</label></div><div id=\"name\" class=\"c3839\">Insert your text here\n  </div><label class=\"label\">Shirt Size</label><div id=\"size\" class=\"c4017\">Insert your text here\n  </div><label class=\"label\">Address</label><div id=\"address\" class=\"c4820\">Insert your text here\n  </div><label class=\"label\">City</label><div id=\"city\" class=\"c5196\">Insert your text here\n  </div><label class=\"label\">Email</label><div id=\"email\" class=\"c5716\">Insert your text here\n  </div><label class=\"label\">Card Number</label><div id=\"card_number\" class=\"c6083\">Insert your text here\n  </div><div class=\"form-group\"><button type=\"submit\" class=\"button\">OK</button></div></form>",
  //       "formCss": "* { box-sizing: border-box; } body {margin: 0;}.label{width:100%;display:block;font-weight:700;}.button{width:100%;margin:15px 0;background-color:rgb(0, 150, 136);border:none;color:rgb(246, 246, 246);border-radius:2px;padding:7px 10px;font-size:1em;cursor:pointer;margin-top:15px;margin-right:0px;margin-bottom:15px;margin-left:0px;border-top-width:initial;border-right-width:initial;border-bottom-width:initial;border-left-width:initial;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none;border-top-color:initial;border-right-color:initial;border-bottom-color:initial;border-left-color:initial;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-right-radius:2px;border-bottom-left-radius:2px;padding-top:7px;padding-right:10px;padding-bottom:7px;padding-left:10px;}.form{border-radius:3px;padding:10px 15px;box-shadow:0px 1px 4px 0px;color:rgb(68, 68, 68);border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.c2073{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:32px;font-weight:300;}.c3839{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c4017{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c4820{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c5196{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c5716{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.c6083{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}"
  //     }
  //   }
  // ],
  generatedForms: [

  ],
  currentFormIndex: 0,

  formIds: {},
  formsDone: false,

  recentForm: null,
  appName: 'Default name',
  appDescription: '',

  loadingWorkflowData: false,
}

export function bpmn(state = defaultState, action) {
  switch (action.type) {

    case bpmnConstants.SEND_WORKFLOW_DATA_REQUEST: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = true;
      return nextState;
    } break;

    case bpmnConstants.SEND_WORKFLOW_DATA_SUCCESS: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = false;
      return nextState;
    } break;

    case bpmnConstants.SEND_WORKFLOW_DATA_FAILURE: {
      const nextState = { ...state };
      nextState.loadingWorkflowData = false;
      return nextState;
    } break;

    case bpmnConstants.ADD_NEW_FROM: {
      const { forTask, form } = action;
      const nextState = { ...state };
      nextState.generatedForms.push({ taskId: forTask, formData: form })
      nextState.recentForm = { taskId: forTask, form }
      return nextState;
    } break;

    case bpmnConstants.GET_NEXT_FORM: {
      const { currentFormIndex, generatedForms } = state;
      const nextState = { ...state };
      if (currentFormIndex < generatedForms.length) {
        nextState.currentFormIndex += 1;

        if (nextState.currentFormIndex == generatedForms.length - 1) {
          nextState.formsDone = true;
        }
      }
      return nextState;
    } break;

    case bpmnConstants.NAME_TO_ID: {
      const { id, value } = action;
      const nextState = { ...state };
      nextState.formIds[id] = value;
      return nextState;
    } break;

    case bpmnConstants.SET_APP_INFO: {
      const { appName, appDescription } = action;
      const nextState = { ...state, appName, appDescription };
      return nextState
    } break;

    case bpmnConstants.SET_BPMN_JSON: {
      const { bpmnAppJson } = action;
      const nextState = { ...state, bpmnAppJson };
      return nextState
    } break;

    default:
      return state
  }
}
