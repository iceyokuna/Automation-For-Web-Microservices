import React, { Component } from 'react';
import { Box, Text } from 'grommet';

export default class index extends Component {

  constructor(props) {
    super(props);

    let dataTypeColor = null;
    switch (props.type) {
      case "file": dataTypeColor = "accent-1"; break;
      case "string": dataTypeColor = "status-ok"; break;
      case "int": dataTypeColor = "accent-3"; break;
      case "string[]": dataTypeColor = "accent-4"; break;
      default: dataTypeColor = "accent-5"; break;
    }

    this.dataTypeColor = dataTypeColor;
  }

  render() {
    const { name, type, methodName } = this.props;
    return (
      <Box pad="xsmall">
        <Box direction="row" gap="small" justify="between">
          <Text>{name} :</Text>
          <Text size="small"
            color={this.dataTypeColor}>{type}</Text>
        </Box>
        <Text size="xsmall">{methodName}</Text>
      </Box>
    );
  }
}