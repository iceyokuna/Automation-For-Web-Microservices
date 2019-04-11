
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/App';
import registerServiceWorker from 'app/registerServiceWorker';
import { askForPermissioToReceiveNotifications, initializeFirebase } from '_helpers';


ReactDOM.render(
  <App />,
  document.getElementById('root'));
initializeFirebase();
registerServiceWorker();

