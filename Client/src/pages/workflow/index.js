import React, { Component } from 'react'

import BpmnBoard from 'containers/BpmnBoard';

import { Button } from 'grommet'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class ModelWorkflow extends Component {

  render() {
    console.log('workflow', this.props);
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <BpmnBoard />
      </div>
    )
  }
}

export default ModelWorkflow;