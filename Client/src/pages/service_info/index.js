import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Box, Button, TextArea,
  TextInput, FormField,
  Text, Select
} from 'grommet';
import { Add, Edit, Upload } from 'grommet-icons'
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { colors } from 'theme';
import Modal from 'components/modal';
import AppPage from 'components/app_page';
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
    props.history.replace('/services');
    return null;
  }
  const [serviceName, setServiceName] = useState(currentService.name);
  const [serviceInfo, setServiceInfo] = useState(currentService.info);
  const [serviceUrl, setServiceUrl] = useState(currentService.path || "https://google.com/api");
  const [showMethodDialog, setShowMethodDialog] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);
  const [currentMethodIndex, setCurrentMethodIndex] = useState(null);
  const [methodName, setMethodName] = useState("");
  const [methodInfo, setMethodInfo] = useState("");
  const [methodUrl, setMethodUrl] = useState("");
  const [methodType, setMethodType] = useState("");
  const [methodInputInterface, setMethodInputInterface] = useState("");
  const [methodOutputInterface, setMethodOutputInterface] = useState("");
  const [mode, setMode] = useState("update");

  useEffect(() => {
    if (currentMethod != null) {
      setMethodName(currentMethod.name);
      setMethodInfo(currentMethod.info);
      setMethodUrl(currentMethod.path || "/method#77");
      setMethodType(currentMethod.methodType || "GET");
      setMethodInputInterface(JSON.stringify(currentMethod.input_interface, null, 2));
      setMethodOutputInterface(JSON.stringify(currentMethod.output_interface, null, 2));
    }

  }, [currentMethod,])

  const onSelectMethod = (method, index) => {
    setCurrentMethod(method);
    setCurrentMethodIndex(index);
    setMode("update");
    setShowMethodDialog(true);
  }

  const onUpdateMethod = () => {
    const { currentServiceId } = props.userServices;
    const updatedMethod = {
      name: methodName,
      info: methodInfo,
      path: methodUrl,
      // methodType,
      input_interface: JSON.parse(methodInputInterface),
      output_interface: JSON.parse(methodOutputInterface),
    }
    props.dispatch(userServicesActions.updateMethod(
      currentServiceId,
      currentMethod.id,
      currentMethodIndex,
      updatedMethod));

    setShowMethodDialog(false);
  }

  const onAddNewMethod = () => {
    const data = {
      name: methodName,
      info: methodInfo,
      method_type: methodType,
      input_interface: JSON.parse(methodInputInterface),
      output_interface: JSON.parse(methodOutputInterface),
      path: methodUrl,
    }

    props.dispatch(userServicesActions.addNewMethod(data))
    setShowMethodDialog(false);
  }

  const onUpdateServiceInfo = () => {
    const { currentServiceId } = props.userServices;
    const updatedService = {
      name: serviceName,
      info: serviceInfo,
      url: serviceUrl,
    }
    props.dispatch(userServicesActions.updateService(currentServiceId, updatedService))
  }

  const onShowMethodDialog = () => {
    setMode("create");
    setShowMethodDialog(true);
  }

  function renderServiceInfo() {
    return (
      <Fragment>
        <Box direction="row" justify="between" align="center" margin={{ bottom: 'medium' }}>
          <Text size="large" weight="bold">Title</Text>
          <Button label="Update" icon={<Edit />} color="accent-1"
            onClick={onUpdateServiceInfo} primary />
        </Box>
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
      </Fragment>);
  }

  function renderMethodList() {
    const { methods } = currentService;
    return (
      <Fragment>
        <Box direction="row" justify="between" align="center" margin={{ bottom: 'medium' }}>
          <Text size="large" weight="bold">Methods</Text>
          <Button label="Add method" icon={<Add />} color="accent-3"
            onClick={onShowMethodDialog} primary />
        </Box>
        <table>
          <tr>
            <th>Method name</th>
            <th>URL's endpoint</th>
            <th>Request type</th>
          </tr>
          {methods.map((item, index) =>
            <tr className="service" onClick={() => onSelectMethod(item, index)}>
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
      <Box gap="medium">
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

        <Box direction="row" justify="end">
          {mode === "update" ? <Button icon={<Edit />} label="Update" primary
            onClick={onUpdateMethod} color="accent-3" /> :
            <Button label="Submit" icon={<Upload size="18px" />} color="accent-3"
              onClick={onAddNewMethod} primary />}
        </Box>
      </Box>
    );
  }

  return (
    <AppPage title="Service's information">
      <Box gap="small" pad="small" animation="fadeIn">
        {renderServiceInfo()}
        {renderMethodList()}
        <Modal show={showMethodDialog}
          width="650px"
          onCloseModal={() => setShowMethodDialog(false)}
          header="Method's information" component={renderMethodInfo()} />
      </Box>
    </AppPage>
  );
}

const mapStateToProps = (state) => ({
  userServices: state.userServices,
})


export default withRouter(connect(mapStateToProps)(ServiceInfo));
