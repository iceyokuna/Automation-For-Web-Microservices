import React from "react";
import { Button, Box } from 'grommet';
import { Undo, Redo, Code } from 'grommet-icons';

export default ({ onUndo, onRedo, onSave }) => (
  <Box direction='column' style={{ position: 'absolute', right: 300, top: 10 }}
    background="light-0" round={{ size: "xsmall" }}
    elevation="small" pad='xsmall' gap='small' margin="small">
    <Button hoverIndicator onClick={onUndo} >
      <Undo size="medium" />
    </Button>
    <Button hoverIndicator onClick={onRedo}>
      <Redo size="medium" />
    </Button>
    <Button hoverIndicator onClick={onSave} a11yTitle="Download as Json">
      <Code size="medium" />
    </Button>
  </Box>
);
