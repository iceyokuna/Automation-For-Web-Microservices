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

import { userActions, notificationActions } from 'actions'
import Media from 'react-media';
import Spinner from 'react-spinkit';
import { Link } from 'react-router-dom'

import { colors } from 'theme';

const iconColor = "#ffffff";
const appName = "Autoweb";

class AppBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openNotificationPanel: undefined,
      openAccountPanel: undefined,
      username: 'Phat Thaveepholcharoen'
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

  onSelectNotification = (notification) => {
    this.props.history.push('/execute_flow/111', { notification })
  }

  handleMoreNotifications = () => {

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

    const notifiationLength = 4;
    const notifications = notification.data;
    const someNotifications = notifications.slice(0, notifiationLength);

    let elements = someNotifications.map((item, index) =>
      <NotificationItem
        key={index}
        title={item.title} body={item.body} createdAt={item.createdAt}
        onClick={() => { this.onSelectNotification(item) }} />
    );

    if (notifications.length > notifiationLength) {
      elements.push(
        <Button fill plain key="more"
          onClick={this.handleMoreNotifications} >
          <Box justify="center" align="center" pad="small">
            <Text size="small" weight="bold">See more</Text>
          </Box>
        </Button>
      )
    }

    return <Box>{elements}</Box>;

  }


  renderForSignedin() {
    const { user } = this.props;
    if (user === undefined) return null;
    else {
      const { openNotificationPanel, openAccountPanel } = this.state;
      return (
        <Box direction="row" gap='small'>
          <DropButton
            dropAlign={{ top: "bottom", right: "right" }}
            open={openNotificationPanel}
            onClose={() => this.setState({ openNotificationPanel: undefined })}
            dropContent={this.renderNotifications()}
          >
            <PlainButton icon={<Notification color={iconColor} />} />
          </DropButton>

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

            <Media query="(min-width: 599px)">
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

          <Box direction="row" gap="medium" pad="small">
            <PlainButton label="Flows" color="light-0"
              onClick={() => history.push('/my_flows')} />
            <PlainButton label="Services" color="light-0"
              onClick={() => history.push('/services')} />
          </Box>

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