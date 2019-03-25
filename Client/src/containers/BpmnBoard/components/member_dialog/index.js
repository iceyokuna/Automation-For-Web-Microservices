import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Layer, Box, Button, Text, Heading } from 'grommet'
import { UserAdd, Close } from 'grommet-icons'

import CollaboratorItem from 'components/collaborator_item'
import CollaboratorInviter from 'components/collaborator_inviter'

import { Row, Col } from 'react-flexbox-grid'
import { workflowActions } from 'actions';

export class index extends Component {

  state = {
    selectedCollaborators: [],
    userIds: ["iceyo#1177", "pym#887", "bas#998"],
  }

  onChangecollaborators = (chips) => {
    this.setState({
      selectedCollaborators: chips,
    })
  }

  onColseDialog = () => {
    this.props.dispatch(workflowActions.toggleMemberDialog());
  }

  onInvite = () => {
    // Todo : insert async function


    this.props.dispatch(workflowActions.toggleMemberDialog());
  }

  render() {
    const { showMemberDialog } = this.props;
    const { selectedCollaborators, userIds } = this.state;
    return (
      <Fragment>
        {showMemberDialog && (
          <Layer>
            <Box pad="medium" gap="small" width="850px" direction="column">
              <Heading level={2} margin="none">
                Members
              </Heading>

              <Box background="light-1" pad="small" round={{ size: 'small' }}>
                <Row style={{ height: 250, overflowY: 'auto' }}>
                  <Col sm={12} xs={6} md={6} lg={6}>
                    <CollaboratorItem name="Phat Thaveepholcharoen" type="Member" />
                  </Col>
                  <Col sm={12} xs={6} md={6} lg={6}>
                    <CollaboratorItem name="Phat Thaveepholcharoen" type="Member" />
                  </Col>
                  <Col sm={12} xs={6} md={6} lg={6}>
                    <CollaboratorItem name="Phat Thaveepholcharoen" type="Member" />
                  </Col>
                  <Col sm={12} xs={6} md={6} lg={6}>
                    <CollaboratorItem name="Phat Thaveepholcharoen" type="Member" />
                  </Col>
                  <Col sm={12} xs={6} md={6} lg={6}>
                    <CollaboratorItem name="Phat Thaveepholcharoen" type="Member" />
                  </Col>
                  <Col sm={12} xs={6} md={6} lg={6}>
                    <CollaboratorItem name="Phat Thaveepholcharoen" type="Member" />
                  </Col>
                  <Col sm={12} xs={6} md={6} lg={6}>
                    <CollaboratorItem name="Phat Thaveepholcharoen" type="Member" />
                  </Col>
                </Row>
              </Box>

              <Text size="medium">
                Invite members
              </Text>
              <CollaboratorInviter
                onChangecollaborators={this.onChangecollaborators}
                selectedCollaborators={selectedCollaborators}
                userIds={userIds} />

              <Box direction="row" justify="end" align="center" gap="small">
                <Button icon={<UserAdd />} label="Invite" primary onClick={this.onInvite} />
                <Button icon={<Close />} label="Close" onClick={this.onColseDialog} />
              </Box>

            </Box>
          </Layer>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  showMemberDialog: state.workflow.showMemberDialog,
})


export default connect(mapStateToProps)(index)
