import React, { Component } from 'react'
import { Box, Button, Text, Paragraph } from 'grommet'
import { Edit, PauseFill, Trash } from 'grommet-icons'

import { Snackbar } from './style'

import PlainButton from 'components/plain_button'

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
    console.log('delete')
  }

  render() {
    const { onSelectFlow, description, owner, name, delay, } = this.props;

    return (
      <Box fill onMouseEnter={this.showSnackbar}
        onMouseLeave={this.hideSnackbar}
        animation={[
          { delay: delay * 100, type: "fadeIn" },
          { delay: delay * 100, type: "zoomIn", size: 'xlarge' }]}>
        <Box round={{ size: "small" }} margin="small" pad="small" background="light-0" style={{ position: 'relative' }}>
          <Box pad="xsmall" gap="small">
            <Button onClick={onSelectFlow} >
              <Text truncate weight="bold" >{name || "Untitled"}</Text>
            </Button>
            <Text truncate color="dark-2">{description || "No description"}</Text>
            <Text truncate color="dark-2">Owner : {owner}</Text>
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

