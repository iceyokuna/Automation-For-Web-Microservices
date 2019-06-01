import React, { Component } from 'react';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import { json2xml, } from 'xml-js';
import { Box, Button, } from 'grommet';
import { connect } from 'react-redux';
import $ from 'jquery';
import { getElementIdFromLaneValue } from './helper'

const colors = {
  currentNode: "#00B900",
  executed: "#000000",
  userLane: '#FF4080',
}

class index extends Component {

  state = {
    currentTask: {},
    current: true,
  }

  componentDidMount() {
    const viewer = new BpmnViewer({
      container: '#monitoring',
      overlays: {
        defaults: {
          show: { minZoom: 0.2 },
          scale: true
        }
      }
    });

    const { currentFlow } = this.props;
    const xml = json2xml(currentFlow.bpmnJson);

    viewer.importXML(xml, err => {
      if (err) {
        console.log("error rendering", err);
      } else {
        const canvas = viewer.get('canvas');
        canvas.zoom('fit-viewport', 'center');
      }
    });

    this.viewer = viewer;
    this.bindEvents();
  }

  highlightUserlane = () => {
    const { username, currentFlow, } = this.props;
    const overlays = this.viewer.get('overlays');
    const elementRegistry = this.viewer.get('elementRegistry');
    const elementId = getElementIdFromLaneValue(username, currentFlow.bpmnJson);
    const shape = elementRegistry.get(elementId);
    if (shape != null) {
      overlays.add(elementId, {
        position: {},
        html: $('<div/>').css({
          width: shape.width,
          height: shape.height,
          opacity: 0.1,
          backgroundColor: colors.userLane
        })
      });

      overlays.add(elementId, {
        position: {
          bottom: 30,
          right: -10,
        },
        html: $('<div>You are here</div>').css({
          "text-align": 'start',
          color: colors.userLane,
          fontSize: 28,
          width: 300,
        }),
      });
    };
  }


  highlightExecutedElement = (element) => {
    const { elementId } = element;
    const overlays = this.viewer.get('overlays');
    const elementRegistry = this.viewer.get('elementRegistry');
    const shape = elementRegistry.get(elementId);

    if (shape != null) {
      overlays.add(elementId, {
        position: {},
        html: $('<div class="currentNode"/>').css(
          {
            width: shape.width,
            height: shape.height,
            opacity: 0.2,
            backgroundColor: colors.executed,
          }
        )
      });

      // Show status below the node
      overlays.add(elementId, {
        position: {
          bottom: -5,
          right: shape.width / 2,
        },
        html: $('<div>Executed</div>').css({
          "text-align": 'center',
          color: "white",
          fontSize: "14px",
          backgroundColor: colors.executed
        }),
      });
    }
  }

  highlightCurrentElement = (element) => {
    const { elementId } = element;
    const overlays = this.viewer.get('overlays');
    const elementRegistry = this.viewer.get('elementRegistry');
    const shape = elementRegistry.get(elementId);

    if (shape != null) {
      // overlays.clear();
      overlays.add(elementId, {
        position: {},
        html: $('<div class="currentNode"/>').css(
          {
            width: shape.width,
            height: shape.height,
            opacity: 0.3,
            backgroundColor: colors.currentNode,
          }
        )
      });

      // Show status below the node
      overlays.add(elementId, {
        position: {
          bottom: -5,
          right: shape.width / 2,
        },
        html: $('<div>Current</div>').css({
          "text-align": 'center',
          color: "white",
          backgroundColor: colors.currentNode
        }),
      });
    }
  }


  bindEvents = () => {
    window.onresize = this.centerCanvas.bind(this);
    const eventBus = this.viewer.get('eventBus');

    eventBus.on('element.click', (event) => {
      // const currentElement = event.element.businessObject;
      // const { current } = this.state;
      // if (current) {
      //   this.highlightCurrentElement(currentElement.id)
      // } else {
      //   this.highlightExecutedElement(currentElement.id)
      // }
    })

  }


  centerCanvas = () => {
    const canvas = this.viewer.get('canvas');
    canvas.zoom('fit-viewport', 'center');
  }

  componentWillReceiveProps(nextProps) {

    const { workflowLogs } = nextProps;
    const { executedItems, currentElement, } = workflowLogs;


    const overlays = this.viewer.get('overlays');
    overlays.clear();

    // Highlight executed elements
    executedItems.forEach((item, index) => {
      this.highlightExecutedElement(item)
    })

    // Highlight current pointer
    this.highlightCurrentElement(currentElement);
    this.highlightUserlane();
  }

  onClose = () => {
    this.props.onCloseDock();
    const overlays = this.viewer.get('overlays');
    overlays.clear();
  }

  render() {
    const { current } = this.state
    return (
      <Box height={this.props.height}>
        {/* <Button style={{ positon: 'fixed', top: 80, right: 30 }} label={current ? "Current" : "Executed"}
          onClick={() => this.setState({ current: !current })} /> */}
        <div className="content">
          <div id="monitoring" />
        </div>
      </Box>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentFlow: state.workflowMyFlows.currentFlow,
    workflowLogs: state.workflowLogs,
    username: state.authentication.user.username,
  }
}

export default connect(mapStateToProps)(index);
