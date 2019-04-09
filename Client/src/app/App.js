import './index.css';
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
import "bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css"

import React from 'react';

import {
  Home, MyFlowsGroup, Login, Register, ResetPassword,
  NotFound, ModelWorkflow, Test, ExecuteFlow
} from 'pages'

import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Grommet } from 'grommet';
import appTheme from 'theme';

import { Provider } from 'react-redux';
import { store, history } from '_helpers';

import PrivateRoute from 'components/private_route'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <Grommet theme={appTheme} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ToastContainer hideProgressBar position="top-center"
          autoClose={3000} toastClassName="toast-container" />
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset_password" component={ResetPassword} />

          {/* For dev */}
          <Route exact path="/test_modeler" component={ModelWorkflow} />
          <Route exact path="/test_component" component={Test} />
          <Route exact path="/execute_flow/:flowId" component={ExecuteFlow} />

          <Route component={NotFound} />
          {/* <Redirect from="*" to="/home/my_flows" /> */}
        </Switch>
      </Grommet>
    </Provider>
  </Router >
);

export default App;