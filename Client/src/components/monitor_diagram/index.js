import React, { Component } from 'react';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import { json2xml, } from 'xml-js';
import { Box, Text, Button } from 'grommet';
import { connect } from 'react-redux';


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
      overlays.clear();
      overlays.add(currentTask.nodeId, {
        position: {
          bottom: 5,
          right: 30,
        },
        html: '<div class="highlight">This task is here</div>',
      })
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
