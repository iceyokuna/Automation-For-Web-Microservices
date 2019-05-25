import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text } from 'grommet'
import { Checkmark } from 'grommet-icons'
import JSONTree from 'react-json-tree'
import { jsonTheme } from './jsonTheme'
import Scrollbars from 'react-custom-scrollbars'

export default class ServiceRequirement extends Component {

  state = {

  }

  show = () => this.setState({ show: true });

  close = () => {
    this.setState({ show: undefined });
    this.props.onCloseRequirement();
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      show: props.show,
      serviceMethod: props.serviceMethod
    })

  }

  selectMethod = (method) => {
    this.props.onSelectMethod(method);
    this.close();
  }


  render() {
    const { show, serviceMethod } = this.state;
    return (
      <Box>
        {show && (
          <Layer
            position="center"
            modal
            onClickOutside={this.close}
            onEsc={this.close}
          >
            <Box pad="medium" gap="small" width="large">
              <Heading level={2} margin="none">
                {serviceMethod.name}
              </Heading>

              <Box direction="row" gap="medium" align="center">
                <Heading level={3} margin="none">
                  {serviceMethod.method.name}
                </Heading>
                <Text>{serviceMethod.info}</Text>
              </Box>

              <Text>* Parameters required to use this service</Text>

              <Scrollbars style={{ height: 250 }} autoHide={false}>
                <Heading level={4} margin="none">
                  Input Interface
                </Heading>
                <JSONTree hideRoot theme={jsonTheme} data={serviceMethod.method.input_interface} />
                <Heading level={4} margin="none">
                  Output Interface
                </Heading>
                <JSONTree hideRoot theme={jsonTheme} data={serviceMethod.method.output_interface} />
              </Scrollbars>

              <Box direction="row" justify="end">
                <Button style={{ width: 100 }} label="OK" icon={<Checkmark />} primary color="accent-1" onClick={() => this.selectMethod(serviceMethod)} />
              </Box>

            </Box>
          </Layer>)
        }
      </Box>

    );
  }
}
