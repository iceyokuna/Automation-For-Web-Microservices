import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Text, Box, } from 'grommet';
import { askForPermissioToReceiveNotifications } from '_helpers';
import { GoogleLogin } from 'react-google-login';

import DockContainer from 'components/execution_log';
import { monitorActions } from 'actions';
import axios from 'axios';
import { globalConstants } from '_constants';

class Test extends Component {

  state = { showDock: true, authCode: '' }

  handlegetUserToken = () => {
    askForPermissioToReceiveNotifications().then(token => {
      // Todo Use Token;
      console.log(token);
    }).catch(err => {
      console.error(err);
    });
  }

  responseGoogle = (response) => {
    // console.log(response.code);
    this.setState({
      authCode: response.code
    })
  }

  render() {
    return (
      <Box direction="column">
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
          axios.post(globalConstants.GOOGLE_DOC_API_CREATE_URL, {
            "auth": "4/YAHdh0_Y5biwxJSwGcQdkkztB5k-shkPxrKmdTF1P29uPMxyqWvPZbH1n2L5sGkfQC1IvggXG-V_bFPc8Z2jRuo",
            "title": "Test NGROKkkkkkkk",
            "f_name": "Phat",
            "l_name": "Tawee",
            "position": "SE"
          }).then(res => console.log(res)).catch(e => {
            console.error(e)
          })
        }} />

        <Box>
          <Text>{this.state.authCode}</Text>
        </Box>
      </Box>
    )
  }
}

export default connect(null, null)(Test);