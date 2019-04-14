import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers';
import { applyStorageListener } from './storage_listener';
import { applyFCMListener } from './fcm_listener';

import { socketMiddleware, fcmMiddleware } from 'middlewares'

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    socketMiddleware,
    fcmMiddleware,
  )
);

// Listeners
applyStorageListener(store); // Require for open the second tab in grapesjs editor
applyFCMListener(store);
