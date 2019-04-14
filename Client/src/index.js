
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'app/App';
import registerServiceWorker from 'app/registerServiceWorker';
import { askForPermissioToReceiveNotifications } from '_helpers';
import message from '_helpers/firebase_setup';

ReactDOM.render(
  <App />,
  document.getElementById('root'));
  
registerServiceWorker();

