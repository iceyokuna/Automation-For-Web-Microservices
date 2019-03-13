import React, { Component } from "react";
// import BpmnModeler from "bpmn-js/lib/Modeler";
import BpmnModeler from "./custom-modeler";
import magicModdleDescriptor from "./descriptors/magic";
import qaPackage from './descriptors/qa';
import formPackage from './descriptors/form';

import ZoomControls from "./components/ZoomControls";
import FileControls from "./components/FileControls";
import EditingTools from './components/EditingTools';
import BpmnProperty from './components/bpmn_property';
import ServiceRequirement from './components/service_requirement';
import ParticipantSelector from './components/participant_selector';

import ConditionList from 'components/condition_list'

import "./style/app.less";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import bpmnconfig from './bundled-config'
import lintModule from 'bpmn-js-bpmnlint';

import xmlStr from "../../assets/bpmn/xmlStr";
import download from 'downloadjs';
import converter from 'xml-js'

import { Box, Button, Layer, Text } from 'grommet'
import { Upload } from 'grommet-icons'

import styled from 'styled-components'

import Loader from 'react-loader-spinner'
import { workflowActions, availableServicesActions, socketActions } from 'actions'

import appTheme from 'theme';
const colors = appTheme.global.colors;

const NextButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 340px;
`

let scale = 1;

const variables = [
  { name: 'Salary', type: 'Number' },
  { name: 'Single', type: 'Boolean' },
  { name: 'Name', type: 'String' },
];

const operators = ['==', '!=', '<', '<=', '>', '>='];

const bpmnNodes = [
  'TASK_1132',
  'TASK_2233E',
  'LANE_133ww'
];

class BpmnContainer extends Component {

  state = {
    currentElement: null,
    selectedServiceMethod: null,
    showServiceRequirement: false,
    showParticipantSelector: false,
    showConditionList: false,
  };

  componentDidMount() {
    document.body.className = "shown";
    this.bpmnModeler = new BpmnModeler({
      container: "#canvas",
      additionalModules: [
        lintModule
      ],
      linting: {
        bpmnlint: bpmnconfig
      },
      moddleExtensions: {
        form: formPackage,
        qa: qaPackage,
        magic: magicModdleDescriptor
      }
    });

    // this.bpmnModeler.on('commandStack.changed', this.onChange);

    // Request all availale services to be selected on the properties panel
    this.props.dispatch(availableServicesActions.getAllServices());

    // render xml
    this.renderDiagram(xmlStr);
    this.bindEvenCallback();
  }

  componentWillReceiveProps(nextProps) {
    const { xml, bpmn } = nextProps;
    if (xml && xml !== this.props.xml) {
      this.renderDiagram(xml);
    }
  }

  bindEvenCallback = () => {
    // Binding events
    const eventBus = this.bpmnModeler.get('eventBus');
    eventBus.on('element.click', (event) => {
      const currentElement = event.element.businessObject;
      this.setState({
        currentElement: currentElement
      });

      switch (currentElement.$type) {
        case "bpmn:ExclusiveGateway": {
          this.setState({
            showConditionList: true
          })
        }
        default:
          break;
      }
      console.log(event);
    })

    eventBus.on('element.dblclick', (event) => {
      const targetObject = event.element.businessObject;
      if (targetObject.$type == 'bpmn:Lane') {
        this.setState({
          showParticipantSelector: true,
          currentElement: event.element.businessObject,
        })
      }
    })
  }


  attachFormToXML = (newForms) => {
    const { taskId, form } = newForms;

    const elementRegistry = this.bpmnModeler.get('elementRegistry');

    const sequenceFlowElement = elementRegistry.get(taskId),
      businessObject = sequenceFlowElement.businessObject;

    // businessObject.id = 'NewEventName'; // Change ID of the element

    const moddle = this.bpmnModeler.get('moddle');
    const formTag = moddle.create('form:FormData');

    formTag.forTaskId = taskId;
    formTag.html = form.formHtml;
    formTag.css = form.formCss;

    businessObject.extensionElements = moddle.create('bpmn:ExtensionElements');
    const extensions = moddle.create('bpmn:ExtensionElements');
    extensions.get('values').push(formTag);

    const modeling = this.bpmnModeler.get('modeling');
    modeling.updateProperties(sequenceFlowElement, {
      extensionElements: extensions
    });
  }

  renderDiagram = (xml) => {
    this.bpmnModeler.importXML(xml, err => {
      if (err) {
        // Import failed
        console.log("error rendering", err);
      } else {
        // Render success

        const linting = this.bpmnModeler.get('linting');
        linting.activateLinting(); // Activate validator

        // Linting events
        linting.lint().then(
          (result) => {
            // console.log(result);
          }
        )

      }
    });
  }

  handleSaveJson = (e) => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        const json = converter.xml2json(xml, { compact: false, spaces: 2 });
        download(json, 'bpmn.json', 'application/json');

      }
    });
  }

  handleRedo = () => {
    this.bpmnModeler.get('commandStack').redo();
  }

  handleUndo = () => {
    this.bpmnModeler.get('commandStack').undo();
  }

  handleZoom = () => {
    this.bpmnModeler.get('canvas').zoom(scale);
  }

  handleZoomIn = () => {
    scale += 0.1;
    this.handleZoom();
  }

  handleZoomOut = () => {
    if (scale <= 0.3) {
      scale = 0.2
    } else {
      scale -= 0.1;
    };
    this.handleZoom();
  }

  handleZoomReset = () => {
    scale = 1;
    this.handleZoom();
  }

  handleOpen = (fileObj) => {
    let reader = new FileReader();

    reader.onloadend = ((obj) => {
      const xmlStr = obj.srcElement.result
      this.renderDiagram(xmlStr)
    })

    reader.readAsText(fileObj)
  };

  handleCreate = () => {
    const { currentElement } = this.state
    const modeling = this.bpmnModeler.get('modeling');
    const elementRegistry = this.bpmnModeler.get('elementRegistry');

    const sequenceFlowElement = elementRegistry.get(currentElement.id);
    console.log(sequenceFlowElement);
  }

  handleSaveFile = () => {
    this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
      if (!err) {
        download(xml, 'diagram.bpmn', 'application/xml');
      }
    });
  }

  handleSaveImage = () => {
    this.onToggleSidebar()
  }

  onToggleSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    })
  }

  onSubmitDiagram = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        const { appName, appDescription, generatedForms, appliedMethods } = this.props.workflow;
        this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
          if (err) {
            console.error(err);
          } else {
            const bpmnJson = converter.xml2json(xml, { compact: false, spaces: 2 });
            const workflowData = {
              bpmnJson,
              generatedForms,
              appliedMethods,
            }
            this.props.dispatch(workflowActions.sendWorkflowData(
              appName, appDescription,
              workflowData
            ));
          }
        });
      }
    });
  }

  showServiceMethodRequirement = (serviceMethod) => {
    this.setState({
      selectedServiceMethod: serviceMethod,
      showServiceRequirement: true,
    })
  }

  updateByBpmnProperty(newProps) {
    const modeling = this.bpmnModeler.get('modeling');
    const elementRegistry = this.bpmnModeler.get('elementRegistry');

    const sequenceFlowElement = elementRegistry.get(newProps.nodeId);

    modeling.updateProperties(sequenceFlowElement, {
      name: newProps.nodeName,
      testProps: 'eiei'
    })
  }

  applyMethodToCurrentTask = (method) => {
    const taskId = this.state.currentElement.id;
    this.props.dispatch(workflowActions.applyMethodToTask(taskId, method));
  }


  updateByParticipant = (partId) => {
    const modeling = this.bpmnModeler.get('modeling');
    const elementRegistry = this.bpmnModeler.get('elementRegistry');
    const { currentElement } = this.state;

    const sequenceFlowElement = elementRegistry.get(currentElement.id);

    modeling.updateProperties(sequenceFlowElement, {
      name: partId,
    })

    this.setState({ showParticipantSelector: undefined });
  }

  render() {
    const {
      showServiceRequirement,
      showParticipantSelector,
      selectedServiceMethod,
      showConditionList,
      currentElement } = this.state
    const { workflow, availableServices } = this.props;

    return (
      <Box fill>
        <div className="content">
          <div id="canvas" />
        </div>

        {workflow.loadingWorkflowData && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onCloseLoadingDialog}
            onEsc={this.onCloseLoadingDialog}

          >
            <Box pad="medium" gap="small" width="large" width="300px"
              direction="row" justify='center' align="center">
              <Text>Submitting your workflow ...</Text>
              <Loader
                type="Oval"
                color={colors.brand}
                height="24"
                width="24" />

            </Box>
          </Layer>)
        }

        <FileControls
          onOpenFile={this.handleOpen}
          onCreate={this.handleCreate}
          onSaveFile={this.handleSaveFile}
          onSaveImage={this.handleSaveImage}
        />
        <BpmnProperty
          allServices={availableServices.data}
          currentElement={this.state.currentElement}
          onUpdate={(newProps) => this.updateByBpmnProperty(newProps)}
          onSelectServiceMethod={(serviceMethod) => this.showServiceMethodRequirement(serviceMethod)} />
        <ZoomControls
          onZoomIn={this.handleZoomIn}
          onZoomOut={this.handleZoomOut}
          onZoomReset={this.handleZoomReset}
        />
        <EditingTools
          onSave={this.handleSaveJson}
          onRedo={this.handleRedo}
          onUndo={this.handleUndo}
        />

        <NextButtonWrapper>
          <Box pad={{ horizontal: 'xsmall' }} gap='small' margin="small">
            <Button color="accent-1" primary icon={<Upload size="small" />}
              label="Submit" onClick={this.onSubmitDiagram} />
          </Box>
        </NextButtonWrapper>

        <ServiceRequirement
          onCloseRequirement={() => this.setState({ showServiceRequirement: undefined })}
          onSelectMethod={(method) => this.applyMethodToCurrentTask(method)}
          show={showServiceRequirement}
          serviceMethod={selectedServiceMethod} />

        <ParticipantSelector
          show={showParticipantSelector}
          onClose={() => this.setState({ showParticipantSelector: undefined })}
          onSelectParticipant={this.updateByParticipant} />

        <ConditionList
          show={showConditionList}
          gatewayElement={currentElement}
          onCloseConditionList={() => this.setState({ showConditionList: false })}
          variables={variables}
          operators={operators}
          bpmnNodes={bpmnNodes} />

      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { workflow, availableServices } = state;
  return {
    workflow,
    availableServices
  };
};

export default withRouter(connect(mapStateToProps)(BpmnContainer)); 
