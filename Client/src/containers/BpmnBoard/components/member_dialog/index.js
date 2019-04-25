import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Layer, Box, Button, Text, Heading } from 'grommet'
import CollaboratorItem from 'components/collaborator_item'
import CollaboratorInviter from 'components/collaborator_inviter'

import { Row, Col } from 'react-flexbox-grid'
import { workflowActions } from 'actions';

import { Scrollbars } from 'react-custom-scrollbars';
import Spinner from 'react-spinkit';
import { colors } from 'theme';

export class index extends Component {

  state = {
    selectedCollaborators: [],
    userIds: ["iceyo#1177", "pym#887", "bas#998"],
  }

  componentDidMount = () => {
    const { dispatch, workflow } = this.props;
    dispatch(workflowActions.getAllCollaborators(workflow.workflowId));
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
    const { selectedCollaborators } = this.state;
    const { workflow, dispatch } = this.props;
    dispatch(workflowActions.addNewCollaborators(workflow.workflowId, selectedCollaborators));
  }

  renderCollaboratorItems = () => {
    const { workflowCollaborators } = this.props;
    const { collaborators, loadingCollaborators } = workflowCollaborators;
    if (loadingCollaborators === true) {
      return (
        <Box align="center" pad='small'>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple" color={colors.brand} />
        </Box>
      );
    }

    return collaborators.map((item, index) =>
      <Col sm={12} xs={6} md={6} lg={6}>
        <CollaboratorItem key={index}
          userName={item.collaborator__username}
          firstName={item.collaborator__first_name}
          lastName={item.collaborator__last_name} />
      </Col>)
  }

  render() {
    const { showMemberDialog } = this.props;
    const { selectedCollaborators, userIds } = this.state;
    return (
      <Fragment>
        {showMemberDialog && (
          <Layer
            onEsc={this.onColseDialog}
            onClickOutside={this.onColseDialog}>
            <Box pad="medium" gap="small" width="850px" direction="column">
              <Heading level={2} margin="none">
                Collaborators
              </Heading>

              <Box background="light-1" round={{ size: 'small' }}>
                <Scrollbars
                  autoHide
                  style={{ height: 250 }}
                >
                  <Row >
                    {this.renderCollaboratorItems()}
                  </Row>
                </Scrollbars>

              </Box>

              <Text size="medium">
                Invite members
              </Text>
              <CollaboratorInviter
                onChangecollaborators={this.onChangecollaborators}
                selectedCollaborators={selectedCollaborators}
                userIds={userIds} />

              <Box direction="row" justify="end" align="center" gap="small">
                <Button label="Invite" primary onClick={this.onInvite} />
                <Button label="Close" onClick={this.onColseDialog} />
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
  authentication: state.authentication,
  workflow: state.workflow,
  workflowCollaborators: state.workflowCollaborators,
})


export default connect(mapStateToProps)(index)
