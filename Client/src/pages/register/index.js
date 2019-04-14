import React, { Component } from 'react'

import { Box, FormField, TextInput, Button, Image, } from 'grommet';
import { UserNew } from 'grommet-icons';
import { connect } from 'react-redux'
import { userActions } from 'actions';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid'
import { global } from 'style'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
      passwordError: null,
    };
  }

  onChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  }

  onChangeLastName = (e) => {
    this.setState({ lastName: e.target.value });
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

  render() {
    const { passwordError } = this.state;

    return (
      <Box flex direction="column" align="center"
        justify="center" fill='vertical'
        style={{ ...global.globalContainer, paddingTop: 0 }}>
        <Box pad='medium' style={{ width: 450 }}
          background="light-0" 
          round={{ size: 'small' }}
          animation='fadeIn'>
          <Image height="150px" src={require('assets/images/autoweb_icon.png')} fit="contain" />

          <Row>
            <Col xs={12} lg={6} md={6}>
              <FormField >
                <TextInput
                  ref='firstNameInput'
                  autoFocus
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName} />
              </FormField>
              <FormField >
                <TextInput
                  ref='lastNameInput'
                  autoFocus
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChange={this.onChangeLastName} />
              </FormField>
              <FormField >
                <TextInput
                  ref='usernameInput'
                  autoFocus
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.onChangeUsername} />
              </FormField>
            </Col>

            <Col xs={12} lg={6} md={6}>
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
            </Col>

          </Row>



          <Box pad="small">
            <Button primary icon={<UserNew />} label="Create an account" onClick={this.onRegister} />
          </Box>
        </Box>
      </Box>
    )
  }
}

export default withRouter(connect(null, null)(Register));