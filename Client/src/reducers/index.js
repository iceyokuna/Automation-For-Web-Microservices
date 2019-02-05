import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { workflow } from './workflow.reducer';
import { socket } from './socket.reducer';
import { availableServices } from './available_services.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  workflow,
  socket,
  availableServices
});

export default rootReducer;