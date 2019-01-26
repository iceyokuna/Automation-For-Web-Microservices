import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text, Select } from 'grommet'

import { Close } from 'grommet-icons'
import Avatar from 'react-avatar';

const defaultOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push({ username: `Username ${i}`, id: `id ${i}` });
}


const ParticipantItem = ({ username, id }) => (
  <Box direction="row" gap="small" pad="small" >
    <Avatar size="48px" name={username} round />
    <Box flex direction="column" justify="between">
      <Text >{username}</Text>
      <Text size="small" color="dark-6">@{id}</Text>
    </Box>
  </Box>
);

export default class ParticipantSelector extends Component {
  state = {
    show: true,
    options: defaultOptions,
    value: "",
  }

  onshow = () => this.setState({ show: true });

  onClose = () => {
    this.setState({ show: undefined });
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      show: props.show,
      serviceMethod: props.serviceMethod
    })
  }

  render() {
    const { show, options, value } = this.state;
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
                Choose a participant for this lane
              </Heading>
              <Select
                size="medium"
                placeholder="ID/Name of your team member"
                value={value}
                options={options}
                onChange={({ option }) => { this.setState({ value: option.username }); }}
                onClose={() => this.setState({ options: defaultOptions })}
                onSearch={text => {
                  const exp = new RegExp(text, "i");
                  this.setState({
                    options: defaultOptions.filter(o => exp.test(o))
                  });
                }}
              >

                {(option, index) => (
                  <ParticipantItem username={option.username} id={option.id} />
                )}

              </Select>

              <Box justify="end" direction="row" gap="small">
                <Button label="Close" icon={<Close />} onClick={this.onClose} primary />
              </Box>

            </Box>
          </Layer>)
        }
      </Box>

    );
  }
}
