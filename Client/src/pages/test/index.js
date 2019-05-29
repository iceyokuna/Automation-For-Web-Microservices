import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'grommet';
import { askForPermissioToReceiveNotifications } from '_helpers';
import { GoogleLogin } from 'react-google-login';

import ExecutionLog from 'components/execution_log';
import { logsActions } from 'actions';
import axios from 'axios';

class Test extends Component {

  state = { showDock: true, }

  handlegetUserToken = () => {
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
        {/* <Button label="Get Token" onClick={this.handlegetUserToken} /> */}
        <GoogleLogin
          clientId="807661190255-ufo59eru56rqc5nj953vv1iu67v5h8pb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope={"https://www.googleapis.com/auth/drive.file"}
          redirectUri="localhost:3000/execute"
          responseType="code"
          prompt="consent"

        />


        <Button label="POST" onClick={() => {
          axios.post('https://safe-beyond-22181.herokuapp.com/notify', {
            "user_id": "U49df655b5d705af302785bf2811e60b6",
            "message": "hello#2222"
          }).then(res => console.log(res)).catch(e => {
            console.error(e)
          })
        }} />
      </div>
    )
  }
}

export default connect(null, null)(Test);