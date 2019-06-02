import React, { Component } from 'react';

import Dock from 'react-dock';

import { Box, Text, Button } from 'grommet';
import { Close } from 'grommet-icons'
import Scrollbars from 'react-custom-scrollbars';

import { connect } from 'react-redux';
import { logsActions } from 'actions';
import MonitorDiagram from 'components/monitor_diagram';

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
    const { children, workflowLogs, } = this.props;
    return (
      <Dock position='bottom' dimMode="none"
        isVisible={workflowLogs.show} dockStyle={{ borderRadius: 12, overflow: 'hidden' }}>
        <Box pad="medium" gap="medium" fill>
          <Box direction="row" justify="between" align="center">
            <Text weight="bold">Monitoring</Text>
            <Button icon={<Close size="14px" />} color="light-0"
              hoverIndicator onClick={this.onClose} />
          </Box>
          {children}
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
