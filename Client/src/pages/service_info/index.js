import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, TextArea,
  TextInput, FormField,
  Text, Select
} from 'grommet';
import { Add, Edit } from 'grommet-icons'
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { colors } from 'theme';
import Modal from 'components/modal';
import { userServicesActions } from 'actions';

const requestTypeOptions = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const interfacePlaceholder = `{
  "date": {
    "type": "string",
    "elementType": "input"
  }
}`;

const ServiceInfo = (props) => {
  const { currentService } = props.userServices;
  if (currentService == null) {
    props.history.replace('/setting/services');
    return null;
  }
  const [serviceName, setServiceName] = useState(currentService.name);
  const [serviceInfo, setServiceInfo] = useState(currentService.info);
  const [serviceUrl, setServiceUrl] = useState(currentService.path || "https://google.com/api");
  const [showMethodDialog, setShowMethodDialog] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);
  const [methodName, setMethodName] = useState("");
  const [methodInfo, setMethodInfo] = useState("");
  const [methodUrl, setMethodUrl] = useState("");
  const [methodType, setMethodType] = useState("");
  const [methodInputInterface, setMethodInputInterface] = useState("");
  const [methodOutputInterface, setMethodOutputInterface] = useState("");

  useEffect(() => {
    if (currentMethod != null) {
      setMethodName(currentMethod.name);
      setMethodInfo(currentMethod.info);
      setMethodUrl(currentMethod.path || "/method#77");
      setMethodType(currentMethod.methodType || "GET");
      setMethodInputInterface(JSON.stringify(currentMethod.input_interface, null, 2));
      setMethodOutputInterface(JSON.stringify(currentMethod.output_interface, null, 2));
    }

  }, [currentMethod])

  const onSelectMethod = (method) => {
    setCurrentMethod(method);
    setShowMethodDialog(true);
  }

  const onUpdateMethod = () => {

  }

  const onAddNewMethod = () => {
    props.dispatch(userServicesActions.addNewMethod(
      methodName,
      methodInfo,
      methodType,
      methodInputInterface,
      methodOutputInterface,
    ))
  }

  const onUpdateServiceInfo = () => {

  }


  function renderServiceInfo() {
    return (
      <Fragment>
        <Text margin={{ bottom: 'small' }} size="large" weight="bold">Service's information</Text>
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
          <Col xs={12} sm={12} md={12} lg={12} >
            <FormField>
              <TextInput placeholder="URL's path e.g. /news/techologies" size="small"
                onChange={e => setServiceUrl(e.target.value)} value={serviceUrl} />
            </FormField>
          </Col>
        </Row>
        <Box direction="row" justify="end">
          <Button label="Update" icon={<Edit />} color="accent-1"
            onClick={onUpdateServiceInfo} primary />
        </Box>
      </Fragment>);
  }

  function renderMethodList() {
    const { methods } = currentService;
    return (
      <Fragment>
        <Text margin={{ bottom: 'small' }} size="large" weight="bold">Service's methods</Text>
        <table>
          <tr>
            <th>Method name</th>
            <th>URL's endpoint</th>
            <th>Request type</th>
          </tr>
          {methods.map((item, index) =>
            <tr className="service" onClick={() => onSelectMethod(item)}>
              <td>{item.name}</td>
              <td>{item.info}</td>
              <td>{item.methodType || "GET"}</td>
            </tr>
          )}
        </table>
      </Fragment>
    )
  }

  function renderMethodInfo() {
    return (
      <Box gap="small">
        <Row >
          <Col xs={12} md={5} lg={5}>
            <FormField>
              <TextInput placeholder="Method name" size="small"
                onChange={e => setMethodName(e.target.value)} value={methodName} />
            </FormField>
          </Col>
          <Col xs={12} md={7} ld={7} >
            <FormField>
              <TextInput placeholder="What does this method do ?" size="small"
                onChange={e => setMethodInfo(e.target.value)} value={methodInfo} />
            </FormField>
          </Col>

          <Col xs={12} md={8} lg={8}>
            <FormField>
              <TextInput placeholder="URL's path e.g. /news/techologies" size="small"
                onChange={e => setMethodUrl(e.target.value)} value={methodUrl} />
            </FormField>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormField>
              <Select
                id="methodType"
                name="methodType"
                placeholder="GET"
                value={methodType}
                options={requestTypeOptions}
                onChange={({ option }) => setMethodType(option)}
              />
            </FormField>
          </Col>
        </Row>

        <Row style={{ height: 200 }}>
          <Col xs={12} md={6} lg={6}>
            <TextArea fill
              value={methodInputInterface} placeholder={interfacePlaceholder}
              onChange={e => setMethodInputInterface(e.target.value)} />
          </Col>

          <Col xs={12} md={6} lg={6}>
            <TextArea fill
              value={methodOutputInterface} placeholder={interfacePlaceholder}
              onChange={e => setMethodOutputInterface(e.target.value)} />
          </Col>
        </Row>

        <Box direction="row" justify="end" gap="small">
          <Button icon={<Add />} label="Create new"
            onClick={onAddNewMethod} color="accent-1" />
          <Button icon={<Edit />} label="Update" primary
            onClick={onUpdateMethod} color="accent-1" />
        </Box>
      </Box>
    );
  }

  return (
    <Box gap="small" pad="small" margin={{ top: "medium" }} animation="fadeIn">
      {renderServiceInfo()}
      {renderMethodList()}
      <Modal show={showMethodDialog}
        width="650px"
        onCloseModal={() => setShowMethodDialog(false)}
        header="Method's information" component={renderMethodInfo()} />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userServices: state.userServices,
})


export default withRouter(connect(mapStateToProps)(ServiceInfo));
