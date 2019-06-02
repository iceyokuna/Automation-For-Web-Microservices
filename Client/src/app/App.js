import './index.css';
import './toast.css';
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
import "bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css"
import "react-tabs/style/react-tabs.css";

import React from 'react';

import {
  Home, Login, Register, ResetPassword,
  NotFound, ModelWorkflow, Test, ExecuteFlow
} from 'pages'

import { Router, Route, Switch, } from "react-router-dom";
import { Grommet, Box } from 'grommet';
import { Close, UserAdd } from 'grommet-icons'

import appTheme from 'theme';

import { Provider } from 'react-redux';
import { store, persistor, history } from '_helpers';

import PrivateRoute from 'components/private_route'
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { PersistGate } from 'redux-persist/integration/react'


Box.defaultProps.responsive = false;

const App = () => (
  <Provider store={store}>
    <PersistGate loading={true} persistor={persistor}>
      <Router history={history}>
        <Grommet theme={appTheme} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <ToastContainer hideProgressBar position="top-center"

            closeButton={<Close color="#fff" size="14px" />} />

          <ReactTooltip effect="solid" />

          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset_password" component={ResetPassword} />

            {/* For dev */}
            <Route exact path="/test_modeler" component={ModelWorkflow} />
            <Route exact path="/test_component" component={Test} />
            <Route exact path="/execute_flow/:flowId" component={ExecuteFlow} />

            <PrivateRoute path="/" component={Home} />
            <Route component={NotFound} />
            {/* <Redirect from="*" to="/my_flows" /> */}
          </Switch>
        </Grommet>
      </Router >
    </PersistGate>
  </Provider>
);

export default App;