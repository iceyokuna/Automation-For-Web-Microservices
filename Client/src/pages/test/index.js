import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'grommet';
import { askForPermissioToReceiveNotifications } from '_helpers'

class Test extends Component {

  handleGetToken = () => {
    askForPermissioToReceiveNotifications().then(token => {
      // Todo Use Token;
      console.log(token);
    }).catch(err => {
      console.error(err);
    });
  }


  render() {
    return (
      <div>
        <Button label="Get Token" onClick={this.handleGetToken} />
      </div>
    )
  }
}

export default connect(null, null)(Test);