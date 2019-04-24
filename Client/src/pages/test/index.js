import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'grommet';
import { askForPermissioToReceiveNotifications } from '_helpers';
import { GoogleLogin } from 'react-google-login';

import ExecutionLog from 'components/execution_log';
import { logsActions } from 'actions'

class Test extends Component {

  state = { showDock: true, }

  handleGetToken = () => {
    askForPermissioToReceiveNotifications().then(token => {
      // Todo Use Token;
      console.log(token);
    }).catch(err => {
      console.error(err);
    });
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div>
        <Button label="Get Token" onClick={this.handleGetToken} />
        <GoogleLogin
          clientId="807661190255-ufo59eru56rqc5nj953vv1iu67v5h8pb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope={"https://www.googleapis.com/auth/drive.file"}
          redirectUri="localhost:3000/execute"
        />

        <Button label="Open Dock" onClick={() => {
          this.props.dispatch(logsActions.toggleDock())
        }} />
        <ExecutionLog show={this.state.showDock} />
      </div>
    )
  }
}

export default connect(null, null)(Test);