import React, { Component } from 'react'
import { Box, Button, Text, Paragraph } from 'grommet'
import { Edit, Group, Trash, UserManager } from 'grommet-icons'

import { Snackbar } from './style'

import PlainButton from 'components/plain_button'
import { colors } from 'theme';
import { FlowType } from './style'

const iconColor = "#915591"

export default class FlowItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideSnackbar: true
    }
  }

  showSnackbar = (e) => {
    this.setState({
      hideSnackbar: false
    })
  }

  hideSnackbar = (e) => {
    this.setState({
      hideSnackbar: true
    })
  }

  handleEdit = (e) => {
    // Prevents further propagation of the current event in the capturing and bubbling phases.
    e.stopPropagation();
    this.props.onEdit();
  }

  handlePause = (e) => {
    e.stopPropagation();
    console.log('pause')
  }

  handleDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete()
  }

  render() {
    const { onSelectFlow, description, owner, name, delay, type } = this.props;
    return (
      <Box fill onMouseEnter={this.showSnackbar}
        onClick={onSelectFlow}
        onMouseLeave={this.hideSnackbar}
        animation={[
          { delay: delay * 50, type: "fadeIn" },
          { delay: delay * 50, type: "zoomIn", size: 'xlarge' }]} {...this.props}>
        <Box round={{ size: "small" }}
          margin={{ horizontal: "xsmall", vertical: 'small' }}
          pad="small" background="light-0" style={{ position: 'relative' }}>
          <Box pad="xsmall" gap="small">
            <Box direction="row" justify="between">
              <Button onClick={onSelectFlow} >
                <Text truncate weight="bold" >{name || "Untitled"}</Text>
              </Button>

              {type === "group" ?
                <FlowType background="accent-4">
                  <Group size="18px" color={colors["light-0"]} />
                </FlowType> :
                <FlowType background="accent-3">
                  <UserManager size="18px" color={colors["light-0"]} />
                </FlowType>
              }

            </Box>

            <Text truncate color="dark-3">{description || "No description"}</Text>
            <Text truncate color="dark-3">Owner : {owner}</Text>
          </Box>

          <Snackbar hidden={this.state.hideSnackbar}>
            <Box animation={{ type: 'fadeIn', duration: 300 }} direction="row" align="center" justify="end" background="light-0" gap="small">
              <PlainButton icon={<Edit color={iconColor} />} onClick={onSelectFlow} />
              <PlainButton icon={<Trash color={iconColor} />} onClick={this.handleDelete} />
            </Box>
          </Snackbar>
        </Box>
      </Box>
    );
  }
}

