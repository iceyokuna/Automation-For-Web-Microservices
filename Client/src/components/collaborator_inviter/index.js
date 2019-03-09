import React, { Component } from 'react'
import Chips, { Chip } from 'react-chips'
import theme from './chips_theme'

export default class CollaboratorInviter extends Component {
  state = {
    selectedCollaborators: [],
    userIds: ["iceyo#1177", "pym#887", "bas#998"],
  }

  onChangecollaborators = (chips) => {
    this.setState({
      selectedCollaborators: chips,
    })
  }

  render() {
    const { selectedCollaborators, userIds } = this.state
    return (
      <Chips
        placeholder="Collaborators ( optional )"
        alwaysRenderSuggestions
        theme={theme}
        value={selectedCollaborators}
        onChange={this.onChangecollaborators}
        suggestions={userIds} />
    )
  }
}
