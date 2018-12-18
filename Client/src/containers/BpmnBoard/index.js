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

import "./style/app.less";

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import bpmnconfig from './bundled-config'
import lintModule from 'bpmn-js-bpmnlint';

import xmlStr from "../../assets/bpmn/xmlStr";
import download from 'downloadjs';
import converter from 'xml-js'

import { Box, Button } from 'grommet'
import styled from 'styled-components'

import { bpmnActions } from 'actions'

const NextButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 340px;
`

let scale = 1;

class BpmnContainer extends Component {

  state = {
    currentElement: null,
    sidebarVisible: true,
    showServiceRequirement: false,
    selectedServiceMethod: null,
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

    // this.bpmnModeler.importXML(exampleXml);
    // this.bpmnModeler.on('import.done', () => {

    // })

    // this.bpmnModeler.on('commandStack.changed', this.onChange);

    this.props.dispatch(bpmnActions.getAllServices())

    this.renderDiagram(xmlStr);


    // this.props.dispatch(bpmnActions.getAllServices())
  }

  componentWillReceiveProps(nextProps) {
    const { xml, bpmn } = nextProps;
    if (xml && xml !== this.props.xml) {
      this.renderDiagram(xml);
    }

    if (bpmn.recentForm) {
      // this.attachFormToXML(bpmn.recentForm);
    }
  }

  attachFormToXML = (newForms) => {
    const { taskId, form } = newForms;

    let elementRegistry = this.bpmnModeler.get('elementRegistry');

    let sequenceFlowElement = elementRegistry.get(taskId),
      businessObject = sequenceFlowElement.businessObject;

    // businessObject.id = 'NewEventName'; // Change ID of the element

    let moddle = this.bpmnModeler.get('moddle');
    let formTag = moddle.create('form:FormData');

    formTag.forTaskId = taskId;
    formTag.html = form.formHtml;
    formTag.css = form.formCss;

    businessObject.extensionElements = moddle.create('bpmn:ExtensionElements');
    const extensions = moddle.create('bpmn:ExtensionElements');
    extensions.get('values').push(formTag);

    let modeling = this.bpmnModeler.get('modeling');
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
        // this.bpmnModeler.getDefinitions();

        var linting = this.bpmnModeler.get('linting');
        linting.activateLinting();

        // Linting events
        linting.lint().then(
          (result) => {
            // console.log(result);
          }
        )

        // Binding events
        let eventBus = this.bpmnModeler.get('eventBus');
        eventBus.on('element.click', (event) => {
          this.setState({
            currentElement: event.element.businessObject
          });
        })

        eventBus.on('element.dbclick', (event) => {
          console.log(event);
        })

      }
    });
  }

  handleSaveJson = (e) => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      if (err) {
        console.error(err);
      } else {
        console.log(xml);
        const json = converter.xml2json(xml, { compact: false, spaces: 2 });
        download(json, 'bpmn.json', 'application/json');

      }
      // console.log(this.bpmnModeler.getDefinitions());
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


  writingBPMNproperties = () => {

    let modeling = this.bpmnModeler.get('modeling');
    let elementRegistry = this.bpmnModeler.get('elementRegistry');

    let sequenceFlowElement = elementRegistry.get('StartEvent_1'),
      businessObject = sequenceFlowElement.businessObject;

    // businessObject.id = 'NewEventName'; // Change ID of the element

    let moddle = this.bpmnModeler.get('moddle');

    var analysis = moddle.create('qa:AnalysisDetails');

    analysis.lastChecked = '2018/10/14';
    analysis.nextCheck = '2018/10/28';
    analysis.comment = ['Hello', 'Test', JSON.stringify({ a: 100 })];

    businessObject.extensionElements = moddle.create('bpmn:ExtensionElements');
    const extensions = moddle.create('bpmn:ExtensionElements');
    extensions.get('values').push(analysis);
    extensions.get('values').push(analysis);

    modeling.updateProperties(sequenceFlowElement, {
      extensionElements: extensions
    });

    // console.log(businessObject);

  }

  updateProperties(newProps) {
    // console.log('Update', newProps);

    let modeling = this.bpmnModeler.get('modeling');
    let elementRegistry = this.bpmnModeler.get('elementRegistry');

    let sequenceFlowElement = elementRegistry.get(newProps.nodeId),
      businessObject = sequenceFlowElement.businessObject;

    modeling.updateProperties(sequenceFlowElement, {
      name: newProps.nodeName,
      testProps: 'eiei'
    })
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
        const bpmnJson = converter.xml2js(xml, { compact: false });
        this.props.dispatch(bpmnActions.sendWorkflowBpmnJson(bpmnJson));
      }
    });
  }

  showServiceMethodRequirement = (serviceMethod) => {

    this.setState({
      selectedServiceMethod: serviceMethod,
      showServiceRequirement: true,
    })
  }




  render() {
    const { sidebarVisible, showServiceRequirement, selectedServiceMethod } = this.state
    const { bpmn } = this.props;
    return (
      <Box fill>
        <div className="content">
          <div id="canvas" />
        </div>
        <FileControls
          onOpenFile={this.handleOpen}
          onCreate={this.handleCreate}
          onSaveFile={this.handleSaveFile}
          onSaveImage={this.handleSaveImage}
        />
        <BpmnProperty
          allServices={bpmn.availableServices.data}
          currentElement={this.state.currentElement}
          onUpdate={(newProps) => this.updateProperties(newProps)}
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
          <Box pad='xsmall' gap='small' margin="small">
            <Button primary label="Next" onClick={this.onSubmitDiagram} />
          </Box>
        </NextButtonWrapper>

        <ServiceRequirement
          show={showServiceRequirement}
          serviceMethod={selectedServiceMethod} />

      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { bpmn } = state;
  return {
    bpmn
  };
};

export default withRouter(connect(mapStateToProps)(BpmnContainer)); 
