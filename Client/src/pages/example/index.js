import React, { Component } from 'react'
import { styles } from "./style";

import {
  withTheme, withStyles,
  Button, AppBar, Toolbar, Typography, Grid
} from "@material-ui/core";

import PaypalButton from '../../components/paypal_button';
import CustomMap from '../../components/custom_map'

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
};

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

class Home extends Component {
  render() {
    const { classes, theme } = this.props;

    const onSuccess = (payment) =>
      console.log('Successful payment!', payment);

    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);

    const onCancel = (data) =>
      console.log('Cancelled payment!', data);

    return (
      <div style={{ height: '100%' }}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <Typography variant="title" color="inherit">
              Home
          </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.body} spacing={8}>
          {/* <Button variant="contained" className={[classes.myButton, classes.myButtonColor]}>Click me</Button> */}
          <Button variant="raised" color="primary">Hello</Button>
          <Grid item lg={3} xs={12} className={classes.payButtonContainer}>
            <PaypalButton
              client={CLIENT}
              env={ENV}
              commit={true}
              currency={'USD'}
              total={100}
              onSuccess={onSuccess}
              onError={onError}
              onCancel={onCancel}
            />
          </Grid >
          <Grid item lg={9} xs={12}>
            <CustomMap showMarker positions={[{ lat: 13.730210, lng: 100.778333 }, { lat: 13.730210, lng: 100.788333 }]} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withTheme()(withStyles(styles)(Home));