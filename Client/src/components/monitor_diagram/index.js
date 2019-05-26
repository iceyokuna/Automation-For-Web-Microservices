import React, { Component } from 'react';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import { json2xml, } from 'xml-js';
import { Box, } from 'grommet';
import { connect } from 'react-redux';
import $ from 'jquery';

const colors = {
  currentNode: "#00B900",
  executed: "#000000",
}

class index extends Component {

  state = {
    currentTask: {}
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

    window.onresize = this.centerCanvas.bind(this);
    this.viewer = viewer;
  }

  centerCanvas = () => {
    const canvas = this.viewer.get('canvas');
    canvas.zoom('fit-viewport', 'center');
  }

  componentWillReceiveProps(nextProps) {
    const { currentTask } = nextProps;
    if (currentTask) {
      this.setState({ currentTask });
      const overlays = this.viewer.get('overlays');
      const elementRegistry = this.viewer.get('elementRegistry');
      const shape = elementRegistry.get(currentTask.nodeId);

      overlays.clear();
      overlays.add(currentTask.nodeId,
        {
          position: {
          },
          html: $('<div class="currentNode"/>').css(
            {
              width: shape.width,
              height: shape.height,
              opacity: 0.3,
              backgroundColor: colors.currentNode,
            }
          )
        }
      );

      // Show status below the node
      overlays.add(currentTask.nodeId,
        {
          position: {
            bottom: -5,
            right: shape.width / 2,
          },
          html: $('<div>Current</div>').css({
            width: shape.width,
            "text-align": 'center',
            color: colors.currentNode,
          }),
        }
      );

    }
  }

  onClose = () => {
    this.props.onCloseDock();
    const overlays = this.viewer.get('overlays');
    overlays.clear();
  }

  render() {
    return (
      <Box height={this.props.height}>
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
  }
}

export default connect(mapStateToProps)(index);
