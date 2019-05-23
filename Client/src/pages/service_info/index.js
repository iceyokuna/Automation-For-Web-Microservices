import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, TextArea,
  TextInput, FormField,
  Text,
} from 'grommet';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';

const ServiceInfo = (props) => {
  const { currentService } = props.userServices;
  if (currentService == null) {
    props.history.replace('/setting/services');
    return null;
  }
  const [serviceName, setServiceName] = useState(currentService.name);
  const [serviceInfo, setServiceInfo] = useState(currentService.info);
  // const [serviceUrl, setServiceUrl] = useState(currentService.path);

  return (
    <Box gap="small" pad="small">

      <Text size="medium" weight="bold">Service's information</Text>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} >
          <FormField>
            <TextInput placeholder="Service name" size="small"
              onChange={e => setServiceName(e.target.value)} value={serviceName} />
          </FormField>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} >
          <FormField>
            <TextInput placeholder="What does this service do ?" size="small"
              onChange={e => setServiceInfo(e.target.value)} value={serviceInfo} />
          </FormField>
        </Col>
      </Row>

      {/* <FormField>
        <TextInput placeholder="Service 's URL e.g. https://myservice.com/api/" size="small"
          onChange={this.onChangeServiceUrl} value={serviceUrl} />
      </FormField>  */}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userServices: state.userServices,
})


export default withRouter(connect(mapStateToProps)(ServiceInfo));
