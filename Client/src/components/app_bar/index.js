import React, { Component } from 'react'
import { Box, Text, DropButton, Button } from 'grommet'
import { User, Notification, } from 'grommet-icons'
import { connect } from 'react-redux'
import { history, } from '_helpers';
import DropContent from 'components/dropdown_content'
import PlainButton from 'components/plain_button';
import NotificationItem from 'components/notification_item';
import { HamburgerContainer } from './style'

import HamburgerButton from 'react-hamburger-menu';
import Scrollbars from 'react-custom-scrollbars';

import { userActions, notificationActions, workflowActions } from 'actions'
import Media from 'react-media';
import Spinner from 'react-spinkit';
import { Link } from 'react-router-dom'
import { colors } from 'theme';
import Badge from 'components/badge';

const iconColor = "#ffffff";
const appName = "Autoweb";

class AppBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openNotificationPanel: undefined,
      openAccountPanel: undefined,
      username: 'Phat Thaveepholcharoen',
      resetBadgeAnim: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(notificationActions.getAllNotifications())
  }

  onCloseDropdown = () => {
    this.setState({
      openNotificationPanel: false,
      openAccountPanel: false
    });

    setTimeout(() => this.setState({
      openNotificationPanel: undefined,
      openAccountPanel: undefined
    }), 1);
  };

  onSelectAccountPanel = (name) => {
    switch (name) {
      case 'Logout': this.props.dispatch(userActions.logout()); break;
    }
  }

  onSelectNotification = (workflowId) => {
    this.props.dispatch(workflowActions.setCurrentFlow(workflowId));
  }

  handleMoreNotifications = () => {
    this.props.dispatch(notificationActions.addNewNotification({
      type: 'YOUR_TURN',
      title: 'Your turn',
      body: 'Checkout your workflow',
      workflowId: 163,
      createdAt: '23/05/19 15:31'
    }))
  }

  renderNotifications = () => {
    const { notification } = this.props;

    if (notification.isLoading === true) {
      return (
        <Box align="center" pad='small'>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple" color={colors.brand} />
        </Box>);
    }

    if (notification.data.length == 0) {
      return (
        <Box justify="center" align="center" pad="medium">
          <Text>You don't have any message</Text>
        </Box>);
    }

    let elements = notification.data.map(({data}, index) =>
      <NotificationItem
        key={index}
        title={data.title} body={data.body}
        workflowId={data.workflowId}
        executedDate={data.executedDate}
        executedTime={data.executedTime}
        taskName={data.taskName}
        taskId={data.taskId}
        onClick={() => { this.onSelectNotification(data.workflowId) }} />
    );

    return (
      <Scrollbars autoHeightMax={350} autoHeight width="250px">
        <Box direction="column">
          {elements}
        </Box>
      </Scrollbars>);

  }


  renderForSignedin() {
    const { user, notification, } = this.props;
    const { openNotificationPanel, openAccountPanel, } = this.state;
    if (user == null) return null;
    return (
      <Box direction="row" gap='small'>

        <Badge length={notification.data.length}>
          <DropButton
            dropAlign={{ top: "bottom", right: "right" }}
            open={openNotificationPanel}
            onClose={() => this.setState({ openNotificationPanel: undefined })}
            dropContent={this.renderNotifications()}
          >
            <PlainButton icon={<Notification color={iconColor} />} />
          </DropButton>
        </Badge>

        <DropButton
          dropAlign={{ top: "bottom", right: "right" }}
          open={openAccountPanel}
          onClose={() => this.setState({ openAccountPanel: undefined })}
          dropContent={
            <DropContent
              title={user.username}
              items={[{ label: 'Account Setting' }, { label: 'Logout' }]}
              onSelect={this.onSelectAccountPanel}
              onClose={this.onCloseDropdown} />}
        >

          <Media query="(min-width: 400px)">
            {matches =>
              matches ? (
                <PlainButton icon={<User color={iconColor} />} label={user.username} />
              ) : (
                  <PlainButton icon={<User color={iconColor} />} />
                )
            }
          </Media>

        </DropButton>
      </Box>);
  }

  render() {
    return (
      <Box
        style={style}
        direction="row"
        align="center"
        justify="between"
        pad="small"
        background='brand'
        height="60px"
        elevation="small"
      >
        <Box direction="row"
          align="center" gap="medium" pad="small">

          <HamburgerContainer>
            <HamburgerButton
              isOpen={this.props.showMenuBar}
              menuClicked={() => this.props.onToggleMenu()}
              width={24}
              height={15}
              strokeWidth={3}
              rotate={0}
              color='white'
              borderRadius={2}
              animationDuration={0.5} />
          </HamburgerContainer>


          <Link to="/my_flows">
            <Text size="xlarge" color='light-0'
              weight="bold">{appName}</Text>
          </Link>

          <Media query="(min-width: 599px)">
            {matched => matched ? (
              <Box direction="row" gap="medium" pad="small">
                <Link to="/my_flows">
                  <PlainButton label="Flows" color="light-0" />
                </Link>

                <Link to="/services">
                  <PlainButton label="Services" color="light-0" />
                </Link>
              </Box>
            ) : null}
          </Media>


        </Box>
        {this.renderForSignedin()}

      </Box>
    )
  }
}

const style = {
  position: 'fixed',
  width: '100%',
  zIndex: 1,
}

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(AppBar);