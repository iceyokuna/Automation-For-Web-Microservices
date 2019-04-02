import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { Layer, Box, Button, Text, Heading } from 'grommet'
import { UserAdd, Close } from 'grommet-icons'

import CollaboratorItem from 'components/collaborator_item'
import CollaboratorInviter from 'components/collaborator_inviter'

import { Row, Col } from 'react-flexbox-grid'
import { workflowActions } from 'actions';

import { Scrollbars } from 'react-custom-scrollbars';

import axios from 'axios';

export class index extends Component {

  state = {
    selectedCollaborators: [],
    userIds: ["iceyo#1177", "pym#887", "bas#998"],
    collaborators: [
      { name: 'Phat Thaveepholcharoen', type: 'Admin' },
      { name: 'Iceyo Kuna', type: 'Manager' },
      { name: 'Treesakul', type: 'User' },
      { name: 'User#14', type: 'User' },
      { name: 'User#77', type: 'User' },
      { name: 'User#77', type: 'User' },
      { name: 'User#77', type: 'User' },
      { name: 'User#77', type: 'User' },
      { name: 'User#77', type: 'User' },
    ],
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

    const { selectedCollaborators } = this.state;
    // console.log(this.props.authentication);
    const token = this.props.authentication.user.token
    // console.log(token)
    // axios.post("http://178.128.214.101:8003/api/collaborator/", {
    //   workflow_id: 3,
    //   collaborators: ["iceyo", "test1"]
    // }, {
    //     headers: {
    //       Authorization: "Token " + token,
    //     }
    //   }).then((res) => console.log(res.data)).catch(err => console.error(err));

    // this.onColseDialog();
  }

  renderCollaboratorItems = () => {
    const { collaborators } = this.state;

    return collaborators.map((item, index) =>
      <Col sm={12} xs={6} md={6} lg={6}>
        <CollaboratorItem key={index} name={item.name} type={item.type} />
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
})


export default connect(mapStateToProps)(index)
