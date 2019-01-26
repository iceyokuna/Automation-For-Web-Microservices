import React, { Component } from 'react'
import { ClientStyle as Style } from 'react-css-component'
import { socketActions } from 'actions'
import { connect } from 'react-redux'
import { Button } from 'grommet'


import ParticipantSelector from 'containers/BpmnBoard/components/participant_selector'

class Test extends Component {


  render() {
    return (
      <div>
        <ParticipantSelector />
      </div>
    )
  }
}

export default connect(null, null)(Test);