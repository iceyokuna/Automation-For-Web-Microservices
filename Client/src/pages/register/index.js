import React, { Component } from 'react'
import { styles } from './style'

import { Box, FormField, TextInput, Button, Heading, Text, } from 'grommet';
import { UserNew } from 'grommet-icons';
import { connect } from 'react-redux'
import { userActions } from 'actions';
import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPass: '',
      passwordError: null,
    };
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
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
    const { username, email, password, confirmPass } = this.state;

    if (password !== confirmPass) {
      this.setState({ passwordError: 'Password must be the same' });
      return;
    }

    const userInfo = {
      username: username,
      email: email,
      password: password,
      first_name: 'Anonymous_firstname',
      last_name: 'Anonymouse_lastname',
    };
    this.setState({ passwordError: null });
    this.props.dispatch(userActions.register(userInfo))
  }

  render() {
    const { passwordError } = this.state;

    return (
      <Box flex direction="column" align="center" justify="center" background="light-2" fill='vertical'>
        <Box pad='medium' style={{ width: 350 }} elevation="small"
          round={{ size: 'small' }}
          background="light-0" animation='fadeIn'>
          <Heading size="small" >
            WAS
          </Heading>
          <FormField >
            <TextInput
              ref='usernameInput'
              autoFocus
              placeholder="Username"
              value={this.state.username}
              onChange={this.onChangeUsername} />
          </FormField>
          <FormField >
            <TextInput
              ref='emailInput'
              autoFocus
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeEmail} />
          </FormField>
          <FormField
            error={passwordError}>
            <TextInput
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword} />
          </FormField>
          <FormField
            error={passwordError}>
            <TextInput
              placeholder="Confirm password"
              type="password"
              value={this.state.confirmPass}
              onChange={this.onChangeConfirmPass} />
          </FormField>
          <Box pad="small">
            <Button primary icon={<UserNew />} label="Create an account" onClick={this.onRegister} />
          </Box>
        </Box>
      </Box>
    )
  }
}

export default withRouter(connect(null, null)(Register));