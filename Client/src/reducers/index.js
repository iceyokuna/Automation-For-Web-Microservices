import { combineReducers } from 'redux';

import { authentication } from './user.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';

import { workflow } from './workflow.reducer';
import { workflowConditions } from './workflow.conditions.reducer';
import { workflowTimers } from './workflow.timers.reducer';
import { workflowPreInputs } from './workflow.predefine_input.reducer';
import { workflowMyFlows } from './workflow.my_flows.reducer';
import { workflowCollaborators } from './workflow.collaborators.reducer';

import { socket } from './socket.reducer';
import { availableServices } from './available_services.reducer'
import { inboxTasks } from './inbox_tasks.reducer';
import { notification } from './notification.reducer';
import { userServices } from './user_services.reducer';
import { workflowMonitor } from './workflow.monitor.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  workflow,
  workflowConditions,
  workflowTimers,
  workflowPreInputs,
  workflowCollaborators,
  workflowMyFlows,
  socket,
  availableServices,
  inboxTasks,
  notification,
  userServices,
  workflowMonitor,
});

export default rootReducer;