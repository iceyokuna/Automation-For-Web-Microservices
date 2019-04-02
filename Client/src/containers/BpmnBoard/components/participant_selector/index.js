import React, { Component } from 'react'

import { Box, Heading, Layer, Button, Text, Select } from 'grommet'

import { Close, Checkmark } from 'grommet-icons'
import Avatar from 'react-avatar';
import { connect } from 'react-redux';


const defaultOptions = [];
for (let i = 1; i <= 200; i += 1) {
  defaultOptions.push({ username: `Username_${i}`, id: `id_${i}` });
}


const ParticipantItem = ({ firstName, lastName, userName }) => (
  <Box direction="row" gap="small" pad="small" >
    <Avatar size="48px" name={firstName} round />
    <Box flex direction="column" justify="between">
      <Text >{firstName + " " + lastName}</Text>
      <Text size="small" color="dark-6">{userName}</Text>
    </Box>
  </Box>
);

class ParticipantSelector extends Component {

  constructor(props) {
    super(props);

    const { collaborators } = props;

    this.state = {
      defaultOptions: collaborators,
      options: collaborators,
      value: "",
    }
  }

  onClose = () => {
    this.props.onClose();
  }

  selectParticipant = () => {
    this.props.onSelectParticipant(this.state.value);
    this.onClose();
  }

  render() {
    const { options, value, defaultOptions } = this.state;
    const { show, collaborators } = this.props;
    return (
      <Box >
        {show && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box width="500px" pad="medium" gap="medium" >
              <Heading level={2} margin="none">
                Choose a collaborator
              </Heading>

              <Select
                dropHeight="medium"
                size="medium"
                placeholder="ID/Name of your team member"
                value={value}
                options={options}
                onChange={({ option }) => { this.setState({ value: option.collaborator__username }); }}
                onClose={() => this.setState({ options: defaultOptions })}
                onSearch={text => {
                  const exp = new RegExp(text);
                  this.setState({
                    options: defaultOptions.filter(option =>
                      (exp.test(option.collaborator__first_name)
                        || exp.test(option.collaborator__username))
                    )
                  });
                }}
              >

                {(option, index) => (
                  <ParticipantItem firstName={option.collaborator__first_name}
                    lastName={option.collaborator__last_name}
                    userName={option.collaborator__username} />
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

const mapStateToProps = (state) => {
  return {
    collaborators: state.workflowCollaborators.collaborators,
  }
}

export default connect(mapStateToProps)(ParticipantSelector);