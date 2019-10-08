import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers';
import { applyStorageListener } from './storage_listener';
import { applyFCMListener } from './fcm_listener';

import { socketMiddleware, fcmMiddleware } from 'middlewares';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = createLogger();

export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    socketMiddleware,
    fcmMiddleware,
  )
);

export const persistor = persistStore(store);

// Listeners
applyStorageListener(store); // Require for open the second tab in grapesjs editor
// applyFCMListener(store); // turn on/off FCM
