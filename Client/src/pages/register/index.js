import React, { Component } from 'react'
import { styles } from './style'

import { Box, FormField, TextInput, Button, Heading, Text } from 'grommet';
import { UserNew } from 'grommet-icons';
import { connect } from 'react-redux'
import { userActions } from 'actions';
import {withRouter} from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPass: '',
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
    const userInfo = {
      username: username,
      email: email,
      password1: password,
      password2: confirmPass
    };

    this.props.dispatch(userActions.register(userInfo))

    // this.props.history.replace('/login');

    // Todos

  }

  render() {
    return (
      <Box flex direction="column" align="center" justify="center" background="light-2" fill='vertical'>
        <Box pad='medium' style={{ width: 350 }} elevation='medium' background="light-0" animation='fadeIn'>
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
          <FormField>
            <TextInput
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword} />
          </FormField>
          <FormField>
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

export default withRouter(connect(null,null)(Register));