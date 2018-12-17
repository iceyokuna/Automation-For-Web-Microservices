import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text } from 'grommet'
import JSONTree from 'react-json-tree'
import { jsonTheme } from './jsonTheme'

export default class ServiceRequirement extends Component {

  state = {

  }

  onshow = () => this.setState({ show: true });

  onClose = () => this.setState({ show: undefined });

  componentWillReceiveProps = (props) => {
    this.setState({
      show: props.show,
      serviceMethod: props.serviceMethod
    })

  }

  render() {
    const { show, serviceMethod } = this.state;
    console.log(serviceMethod)
    return (
      <Box>
        {show && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box pad="medium" gap="small" width="large">
              <Heading level={2} margin="none">
                {serviceMethod.serviceTitle}
              </Heading>

              <Box direction="row" gap="medium" align="center">
                <Heading level={3} margin="none">
                  {serviceMethod.method.methodName}
                </Heading>
                <Text>{serviceMethod.description}</Text>
              </Box>

              <Text>* Parameters required to use this service</Text>

              <Box height="300px" overflow={{ vertical: 'scroll' }}>
                <JSONTree shouldExpandNode={() => true} hideRoot theme={jsonTheme} data={serviceMethod.method.requirement} />
              </Box>

            </Box>
          </Layer>)
        }
      </Box>

    );
  }
}