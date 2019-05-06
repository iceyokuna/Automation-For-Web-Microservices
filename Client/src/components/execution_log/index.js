import React, { Component } from 'react';

import Dock from 'react-dock';

import { Box, Text, Button } from 'grommet';
import { Close } from 'grommet-icons'
import Scrollbars from 'react-custom-scrollbars';

import { connect } from 'react-redux';
import { logsActions } from 'actions'

class index extends Component {

  renderLogItems = () => {
    const { workflowLogs } = this.props;
    return workflowLogs.data.map((item, index) =>
      <Text key={index}>{item.detail}</Text>)
  }

  onClose = () => {
    this.props.dispatch(logsActions.toggleDock());
  }

  render() {
    const { workflowLogs } = this.props;
    return (
      <Dock position='bottom' dimMode="none"
        isVisible={workflowLogs.show} dockStyle={{ borderRadius: 12, overflow: 'hidden' }}>
        <Box pad="small" gap="xsmall" fill>
          <Box direction="row" justify="between" align="center">
            <Text weight="bold">Execution logs</Text>
            <Button icon={<Close size="14px" />} color="light-0"
              hoverIndicator onClick={this.onClose} />
          </Box>
          <Box round={{ size: 'small' }} background="light-1">
            <Scrollbars autoHide style={{ height: 170 }}>
              <Box pad="small" gap="small">
                {this.renderLogItems()}
              </Box>
            </Scrollbars>
          </Box>
        </Box>
      </Dock >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workflowLogs: state.workflowLogs,
  }
}

export default connect(mapStateToProps)(index);
