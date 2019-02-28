import React, { Component } from 'react'
import { styles } from './style'

import { Box, FormField, TextInput, Button, Heading, Text } from 'grommet';
import { Refresh } from 'grommet-icons';
import { Link } from 'react-router-dom'

import converter from 'xml-js'

import bpmnXml from 'example_data/flow1.bpmn'



export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  onChangeusername = (e) => {
    this.setState({ username: e.target.value });
  }

  onResetPassword = () => {
    // this.props.history.replace('/login');

    // Todos

    const json = converter.xml2json(bpmnXml, { compact: false, spaces: 2 });
    console.log(json)

    const xml = converter.json2xml(json, { compact: false, spaces: 2 });
    console.log(xml)
  }

  render() {
    return (
      <Box flex direction="column" align="center" justify="center" background="light-2" fill='vertical'>
        <Box pad='medium' style={{ width: 350 }} elevation="small"
          round={{ size: 'small' }}
          background="light-0" animation='fadeIn'>
          <Heading size="small" >
            WAS
          </Heading>
          <FormField >
            <TextInput
              ref='usernameInput'
              autoFocus
              placeholder="Enter your username"
              value={this.state.username}
              onChange={this.onChangeusername} />
          </FormField>
          <Box>
            <Button primary icon={<Refresh />} label="Reset your password" onClick={this.onResetPassword} />
          </Box>
        </Box>
      </Box>
    )
  }
}
