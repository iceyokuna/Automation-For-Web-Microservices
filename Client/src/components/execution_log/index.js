import React, { Component } from 'react';

import Dock from 'react-dock';

import { Box, Text } from 'grommet';
import Scrollbars from 'react-custom-scrollbars';

import { connect } from 'react-redux'

class index extends Component {

  renderLogItems = () => {
    const { workflowLogs } = this.props;
    return workflowLogs.data.map((item, index) =>
      <Text>{item.detail}</Text>)
  }

  render() {
    const { workflowLogs } = this.props;
    return (
      <Dock position='bottom' dimMode="none" fluid
        isVisible={workflowLogs.show} dockStyle={{ borderRadius: 12 }}>
        <Box pad="medium" gap="small">
          <Text weight="bold">Execution Logs</Text>
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
