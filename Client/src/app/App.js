import './index.css';
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
import "bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css"

import React from 'react';

import { Home, Login, Register, ResetPassword, NotFound, ModelWorkflow, Test } from 'pages'
import { Router, Route, Link, Switch } from "react-router-dom";

import { Grommet } from 'grommet';
import appTheme from 'theme';

import { Provider } from 'react-redux';
import { store, history } from '_helpers';

import PrivateRoute from 'components/private_route'

// Only for development

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <Grommet theme={appTheme} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Switch>
          <PrivateRoute path="/my_flows" component={Home} />
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset_password" component={ResetPassword} />

          {/* For dev */}
          <Route exact path="/test_modeler" component={ModelWorkflow} />
          <Route exact path="/test" component={Test} />

          <Route component={NotFound} />
        </Switch>
      </Grommet>
    </Provider>
  </Router >
);

export default App;