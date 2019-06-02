import React, { Component } from 'react';

import Dock from 'react-dock';

import { Box, Text, Button } from 'grommet';
import { Close } from 'grommet-icons'
import Scrollbars from 'react-custom-scrollbars';

import { connect } from 'react-redux';
import { monitorActions } from 'actions';
import MonitorDiagram from 'components/monitor_diagram';

class index extends Component {

  renderLogItems = () => {
    const { workflowMonitor } = this.props;
    return workflowMonitor.data.map((item, index) =>
      <Text key={index}>{item.detail}</Text>)
  }

  onClose = () => {
    this.props.dispatch(monitorActions.toggleDock());
  }

  render() {
    const { children, workflowMonitor, } = this.props;
    return (
      <Dock position='bottom' dimMode="none"
        isVisible={workflowMonitor.showMonitorDock} dockStyle={{ borderRadius: 12, overflow: 'hidden' }}>
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
    workflowMonitor: state.workflowMonitor,
  }
}

export default connect(mapStateToProps)(index);
