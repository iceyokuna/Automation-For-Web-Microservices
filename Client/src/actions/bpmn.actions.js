import { bpmnConstants } from '_constants';

export const bpmnActions = {
  addNewForm
};

function addNewForm(form, taskId) {
  return {
    type: bpmnConstants.ADD_NEW_FROM,
    form: form,
    forTask: taskId
  };
}
