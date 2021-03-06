import React, { Component } from 'react';

import Dock from 'react-dock';

import { Box, Text, Button } from 'grommet';
import { Close } from 'grommet-icons'
import Scrollbars from 'react-custom-scrollbars';

import { connect } from 'react-redux';
import { monitorActions } from 'actions';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';

import { json2xml, } from 'xml-js';
import "./index.css";

class index extends Component {

  state = {
    currentTask: {}
  }

  componentDidMount() {
    const viewer = new BpmnViewer({
      container: '#viewer',
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
        html: '<div class="currentNode">This task is here</div>',
      })
    }
  }

  onClose = () => {
    this.props.onCloseDock();
    const overlays = this.viewer.get('overlays');
    overlays.clear();
  }

  render() {
    const { currentTask } = this.state;
    return (
      <Dock position='bottom' dimMode="none"
        defaultSize={0.4} dimStyle={{ cursor: 'row-resize' }}
        isVisible={this.props.visible} >
        <Box pad="medium" gap="xsmall" fill>

          <Box direction="row" justify="between" align="center">
            <Box gap="xsmall">
              <Text weight="bold">{currentTask.name}</Text>
              <Text color="dark-6">{currentTask.owner}</Text>
            </Box>
            <Button icon={<Close />} color="light-0"
              hoverIndicator onClick={this.onClose} />
          </Box>
          <div className="content">
            <div id="viewer" />
          </div>
        </Box>
      </Dock >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentFlow: state.workflowMyFlows.currentFlow,
  }
}

export default connect(mapStateToProps)(index);
