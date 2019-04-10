import React, { Component } from "react";
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
import MemberDialog from './components/member_dialog';
import TimerTrigger from 'components/timer_trigger';
import ConditionList from 'components/condition_list';
import PredefineInput from 'components/predefine_input';
import EditWorkflowInfo from 'components/edit_workflow_dialog';


import "./style/app.less";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import bpmnconfig from './bundled-config'
import lintModule from 'bpmn-js-bpmnlint';

import xmlStr from "../../assets/bpmn/xmlStr";
import download from 'downloadjs';
import converter, { xml2js, json2xml } from 'xml-js'

import { Box, Button, Layer, Text } from 'grommet'
import { Upload, Group, Test, Edit } from 'grommet-icons'

import { workflowActions, availableServicesActions } from 'actions'

import Spinner from 'react-spinkit'
import { colors } from 'theme';
import { InviteButton, NextButton, SendWorkflowButton, EditInfoButton } from './style'


let scale = 1;

class BpmnContainer extends Component {

  constructor(props) {
    super(props);
    const { dispatch, workflow } = props;

    this.state = {
      currentElement: null,
      selectedServiceMethod: null,
      showServiceRequirement: false,
      showParticipantSelector: false,
      showConditionList: false,
    };

    if (workflow.mode !== "CREATE_NEW") {
      dispatch(workflowActions.setupExistingWorkflow());
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

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
    dispatch(availableServicesActions.getAllServices());
    this.renderDiagram(xmlStr);
    this.bindEvenCallback();
  }

  componentWillReceiveProps(nextProps) {
    const { workflow } = nextProps;
    // If load a new workflow
    if (this.props.workflow.bpmnJson != workflow.bpmnJson) {
      try {
        const bpmnXml = json2xml(workflow.bpmnJson)
        this.renderDiagram(bpmnXml);
      } catch (error) {
        const bpmnXml = xmlStr;
        this.renderDiagram(bpmnXml);
      }
    }
  }

  bindEvenCallback = () => {
    // Binding events
    const eventBus = this.bpmnModeler.get('eventBus');
    eventBus.on('element.click', (event) => {
      const currentElement = event.element.businessObject;
      this.props.dispatch(workflowActions.setCurrentElement(currentElement));
      this.setState({
        currentElement: currentElement
      });
      console.log(event);
    })

    eventBus.on('element.dblclick', (event) => {
      const currentElement = event.element.businessObject;
      this.setState({
        currentElement: currentElement
      });

      switch (currentElement.$type) {
        case 'bpmn:Lane':
          this.showParticipantSelector();
          break;
        default:
          break;
      }
    })
  }

  showParticipantSelector = () => {
    this.setState({
      showParticipantSelector: true,
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

  onEditDiagram = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        const bpmnJson = JSON.parse(
          converter.xml2json(xml, { compact: false, spaces: 2 }));
        this.props.dispatch(workflowActions.setBpmnJson(bpmnJson));
        this.props.dispatch(workflowActions.toggleEditWorkflowDialog());
      }
    });
  }

  onInvite = () => {
    this.props.dispatch(workflowActions.toggleMemberDialog());
  }

  onSubmitDiagram = (mode) => {
    const { name, description, generatedForms, appliedMethods } = this.props.workflow;
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        const bpmnJson = JSON.parse(
          converter.xml2json(xml, { compact: false, spaces: 2 }));

        const { workflowConditions, workflowPreInputs } = this.props;
        const { appliedConditions } = workflowConditions;
        const { appliedPreInputs } = workflowPreInputs;

        const workflowData = {
          bpmnJson,
          appliedMethods,
          appliedConditions,
          appliedPreInputs,
          generatedForms,
        }

        if (mode === "ToEngine") {
          this.props.dispatch(workflowActions.sendWorkflowDataToEngine(
            name,
            description,
            workflowData
          ));
        } else {
          this.props.dispatch(workflowActions.updateWorkflow(
            name,
            description,
            workflowData
          ));
        }
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

        {workflow.sendingWorkflowData && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onCloseLoadingDialog}
            onEsc={this.onCloseLoadingDialog}

          >
            <Box pad="medium" gap="small" width="large" width="350px"
              direction="row" justify='center' align="center">
              <Text>Submitting your workflow</Text>
              <Spinner
                fadeIn="quarter"
                name="three-bounce"
                color={colors.brand} />

            </Box>
          </Layer>)
        }

        <EditWorkflowInfo />
        <MemberDialog />
        <TimerTrigger />
        <PredefineInput />

        <FileControls
          onOpenFile={this.handleOpen}
          onCreate={this.handleCreate}
          onSaveFile={this.handleSaveFile}
          onSaveImage={this.handleSaveImage}
        />

        <BpmnProperty
          allServices={availableServices.data}
          currentElement={this.state.currentElement}
          onAssignTask={this.showParticipantSelector}
          onUpdate={(newProps) => this.updateByBpmnProperty(newProps)}
          onShowConditions={() => this.setState({ showConditionList: true })}
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

        <EditInfoButton
          color="accent-1" primary plain={false}
          icon={<Edit size="18px" color="#ffffff" />}
          title="Edit information"
          onClick={this.onEditDiagram}
        />


        <SendWorkflowButton
          color="accent-4" primary plain={false}
          icon={<Test size="18px" color="#ffffff" />}
          title="Send workflow directly to engine"
          onClick={() => this.onSubmitDiagram("ToEngine")}
        />

        <InviteButton
          color="accent-3"
          primary plain={false} title="Collaborators"
          icon={<Group size="18px" />}
          onClick={this.onInvite} />

        <NextButton color="accent-2" primary icon={<Upload size="18px" color="#fff" />}
          title="Upload Workflow" plain={false} onClick={this.onSubmitDiagram} />

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
        />

      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { workflow, availableServices
    , workflowConditions,
    workflowPreInputs, workflowMyFlows } = state;
  return {
    workflow,
    workflowConditions,
    availableServices,
    workflowPreInputs,
    workflowMyFlows,
  };
};

export default withRouter(connect(mapStateToProps)(BpmnContainer)); 
