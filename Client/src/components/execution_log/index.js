import React, { Component } from 'react';

import Dock from 'react-dock';

import { Box, Text } from 'grommet';
import Scrollbars from 'react-custom-scrollbars'

export default class index extends Component {

  render() {
    return (
      <Dock position='bottom' dimMode="none" fluid
        isVisible={this.props.show} dockStyle={{ borderRadius: 12 }}>
        <Box pad="medium" gap="small">
          <Text weight="bold">Execution Logs</Text>
          <Box round={{ size: 'small' }} background="light-1">
            <Scrollbars autoHide style={{ height: 170 }}>
              <Box pad="small" gap="small">
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
                <Text>Workflow#1 : transfer task to user#2</Text>
              </Box>

            </Scrollbars>
          </Box>
        </Box>
      </Dock >
    )
  }
}
