import React, { Component, Fragment } from 'react'

import { Box, FormField, TextInput, Button, Text, Image } from 'grommet';
import { Login as Signin, UserAdd } from 'grommet-icons';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { userActions } from 'actions';

import { global } from 'style';
import { colors } from 'theme';
import Spinner from 'react-spinkit';

import { Row, Col } from 'react-flexbox-grid'

class Login extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('user')) {
      this.props.history.push('/my_flows');
    }

    this.state = {
      username: '',
      password: '',

      newUsername: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
      passwordError: null,

    };

  }

  onChangeusername = (e) => {
    this.setState({ username: e.target.value });
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onLogin = () => {
    const { username, password } = this.state;
    this.props.dispatch(userActions.login(username, password));
  }

  onForgot = () => {
    this.props.history.push('/reset_password');
  }

  onSignup = () => {
    const { firstName, lastName, username, email,
      password, confirmPass } = this.state;

    if (password !== confirmPass) {
      this.setState({ passwordError: 'Password must be the same' });
      return;
    }

    const userInfo = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    this.setState({ passwordError: null });
    this.props.dispatch(userActions.register(userInfo))
  }

  onChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  }

  onChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
  }

  onChangeNewUsername = (e) => {
    this.setState({ newUsername: e.target.value });
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  onChangeConfirmPass = (e) => {
    this.setState({ confirmPass: e.target.value });
  }


  onRegister = () => {
    const { firstName, lastName, username, email,
      password, confirmPass } = this.state;

    if (password !== confirmPass) {
      this.setState({ passwordError: 'Password must be the same' });
      return;
    }

    const userInfo = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    this.setState({ passwordError: null });
    this.props.dispatch(userActions.register(userInfo))
  }

  renderSigninButton() {
    if (this.props.loggingIn) {
      return (
        <Box align="center" pad='small'>
          <Spinner
            fadeIn="half"
            name="ball-scale-multiple" color={colors.brand} />
        </Box>
      )
    } else {
      return (
        < Button margin={{ top: 'small' }} primary icon={< Signin />} label="Sign in" onClick={this.onLogin} />
      );
    }
  }

  renderSigninForm = () => {
    return (
      <Box direction="column" pad={{ horizontal: 'medium' }} width="300px">
        <Box height="150px">
          <Image src={require('assets/images/autoweb_icon_2.png')} fit="contain" />
        </Box>
        <FormField >
          <TextInput
            ref='usernameInput'
            autoFocus
            placeholder="Username"
            value={this.state.newUsername}
            onChange={this.onChangeNewUsername} />
        </FormField>
        <FormField>
          <TextInput
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.onChangePassword} />
        </FormField>

        {this.renderSigninButton()}

        <Box justify='center' direction='row' align='start' pad='xsmall'>
          <Button hoverIndicator onClick={this.onForgot}>
            <Text size='small'>Forgot password ?</Text>
          </Button>
        </Box>
      </Box>

    )
  }


  renderSignupForm = () => {
    return (
      <Box direction="column" width="400px" pad={{ horizontal: 'medium' }}>
        <Text margin={{ bottom: 'small' }} size="xlarge" weight="bold">Sign up</Text>
        <Row>
          <Col xs={12} md={12} lg={12} >
            <FormField>
              <TextInput
                ref='usernameInput'
                autoFocus
                placeholder="Username"
                value={this.state.username}
                onChange={this.onChangeUsername} />
            </FormField>
          </Col>

          <Col xs={12} md={6} lg={6} >
            <FormField>
              <TextInput
                ref='firstNameInput'
                autoFocus
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.onChangeFirstName} />
            </FormField>
          </Col>

          <Col xs={12} md={6} lg={6} >
            <FormField>
              <TextInput
                ref='lastNameInput'
                autoFocus
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onChangeLastName} />
            </FormField>
          </Col>

          <Col xs={12} md={12} lg={12} >
            <FormField>
              <TextInput
                ref='emailInput'
                autoFocus
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChangeEmail} />
            </FormField>
          </Col>

          <Col xs={12} md={12} lg={12} >
            <FormField
              error={this.state.passwordError}>
              <TextInput
                placeholder="Password"
                type="password"
                value={this.state.password}
                onChange={this.onChangePassword} />
            </FormField>
          </Col>

          <Col xs={12} md={12} lg={12} >
            <FormField
              error={this.state.passwordError}>
              <TextInput
                placeholder="Confirm password"
                type="password"
                value={this.state.confirmPass}
                onChange={this.onChangeConfirmPass} />
            </FormField>
          </Col>
        </Row>

        <Box pad={{ vertical: 'small' }}>
          <Button label="Create account" onClick={this.onRegister}
            icon={<UserAdd size="18px" />} primary color="accent-1" />
        </Box>
      </Box>
    );
  }


  render() {
    return (
      <Box flex direction="column" align="center" justify="center" fill='vertical'
        style={{ ...global.globalContainer, paddingTop: 0 }}>
        <Box pad='large'
          background="light-0"
          round={{ size: 'small' }}
          animation='fadeIn' gap="medium" direction="row">
          {this.renderSigninForm()}
          <div style={{ width: 5, height: '100%', borderLeft: "1px solid #ccc" }} />
          {this.renderSignupForm()}
        </Box>
      </Box>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export default withRouter(connect(mapStateToProps)(Login));
