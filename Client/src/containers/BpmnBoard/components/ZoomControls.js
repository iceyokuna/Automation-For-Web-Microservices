import React from "react";

import { Box, Button } from 'grommet';
import { Add, Subtract, Location } from 'grommet-icons';

export default ({ onZoomIn, onZoomOut, onZoomReset }) => (
  <Box direction='column' style={{ position: 'absolute', right: 300, bottom: 10 }}
    background="light-0"
    elevation='medium' pad='xsmall' gap='small' margin="small">
    <Button hoverIndicator onClick={onZoomReset}>
      <Location size="medium" />
    </Button>
    <Button hoverIndicator onClick={onZoomIn} >
      <Add size="medium" />
    </Button>
    <Button hoverIndicator onClick={onZoomOut}>
      <Subtract size="medium" />
    </Button>
  </Box>
);
