import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'grommet';
import { askForPermissioToReceiveNotifications } from '_helpers';
import { GoogleLogin } from 'react-google-login';

class Test extends Component {

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
        />,
      </div>
    )
  }
}

export default connect(null, null)(Test);