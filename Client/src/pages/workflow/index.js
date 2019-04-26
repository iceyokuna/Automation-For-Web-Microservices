import React, { Component } from 'react'
import BpmnBoard from 'containers/BpmnBoard';

class ModelWorkflow extends Component {

  render() {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <BpmnBoard />
      </div>
    )
  }
}

export default ModelWorkflow;