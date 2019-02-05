import React, { Component } from 'react'
import { ClientStyle as Style } from 'react-css-component'
import { socketActions } from 'actions'
import { connect } from 'react-redux'
import { Button, Box } from 'grommet'

import FloatDropdown from 'components/float_dropdown'

class Test extends Component {

  startWorkflow = () => {
    this.props.dispatch(socketActions.startFlow('TestFlow'));
  }


  render() {
    return (
      <Box justify="center" align="center" fill="vertical">
        {/* <FloatDropdown /> */}
        <Button label="Start Flow" onClick={() => this.startWorkflow()} />
      </Box>
    )
  }
}

export default connect(null, null)(Test);