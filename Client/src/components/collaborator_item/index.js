import React, { Component } from 'react'

import { Box, Text, DropButton } from 'grommet'
import { FormDown } from 'grommet-icons'
import Avatar from 'react-avatar';
import DropContent from 'components/dropdown_content'
import PlainButton from 'components/plain_button'


export default class index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      openDropdown: false
    }
  }

  onCloseDropdown = () => {
    this.setState({
      openDropdown: false,
    });
  };


  onSelectAction = (name, index) => {
    alert(name)
  }


  render() {
    const { firstName, lastName, userName } = this.props
    const { openDropdown } = this.state
    return (
      <Box direction="row" gap="small" margin='xsmall' align="center"
        background="light-0" pad="xsmall" round={{ size: 'small' }}>
        <Avatar size="48px" name={firstName} round />
        <Box direction="row" flex justify="between">
          <Box flex direction="column">
            <Text >{firstName + " " + lastName}</Text>
            <Text size="small" color="dark-6">{userName}</Text>
          </Box>
          <DropButton
            dropAlign={{ top: "bottom", right: "right" }}
            open={openDropdown}
            onClose={() => this.setState({ openDropdown: false })}
            dropContent={
              <DropContent
                title="Actions"
                items={[{ label: 'Edit Permission' }, { label: 'Remove' }]}
                onSelect={this.onSelectAction}
                onClose={this.onCloseDropdown} />}
          >
            <PlainButton icon={<FormDown />}
              onClick={() => this.setState({ openDropdown: true })} />
          </DropButton>
        </Box>
      </Box>
    )
  }
}



