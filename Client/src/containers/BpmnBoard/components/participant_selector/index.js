import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text, Select } from 'grommet'

import { Close, Checkmark } from 'grommet-icons'
import Avatar from 'react-avatar';

const defaultOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push({ username: `Username_${i}`, id: `id_${i}` });
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
    options: defaultOptions,
    value: "",
  }

  onClose = () => {
    this.props.onClose();
  }

  selectParticipant = () => {
    this.props.onSelectParticipant(this.state.value);
    this.onClose();
  }

  render() {
    const { options, value } = this.state;
    const { show } = this.props;
    return (
      <Box>
        {show && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box pad="medium" gap="medium" width="medium">
              <Heading level={2} margin="none">
                Choose a collaborator
              </Heading>

              <Select
                dropHeight="medium"
                size="medium"
                placeholder="ID/Name of your team member"
                value={value}
                options={options}
                onChange={({ option }) => { this.setState({ value: option.id }); }}
                onClose={() => this.setState({ options: defaultOptions })}
                onSearch={text => {
                  const exp = new RegExp(text);
                  this.setState({
                    options: defaultOptions.filter(option =>
                      (exp.test(option.username) || exp.test(option.id)))
                  });
                }}
              >

                {(option, index) => (
                  <ParticipantItem username={option.username} id={option.id} />
                )}

              </Select>

              <Box justify="end" direction="row" gap="small">
                <Button label="Ok" onClick={this.selectParticipant} primary />
              </Box>

            </Box>
          </Layer>)
        }
      </Box>

    );
  }
}
