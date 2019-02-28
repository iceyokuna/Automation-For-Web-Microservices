import React from "react";
import { Box, Button } from 'grommet';
import { FolderOpen, AddCircle, Download, Image } from 'grommet-icons';

import { FilePicker } from 'react-file-picker'


export default ({ onOpenFile, onOpenFileError, onCreate, onSaveFile, onSaveImage, }) => (
  <Box direction='row' style={{ position: 'absolute', left: 10, bottom: 10 }}
    background="light-0" round={{ size: "xsmall" }}
    elevation="small" pad='xsmall' gap='small' margin="small">

    <FilePicker
      extensions={['bpmn']}
      onChange={fileObj => onOpenFile(fileObj)}
      onError={errMsg => onOpenFileError(errMsg)}
    >
      <Button hoverIndicator  >
        <FolderOpen size="medium" />
      </Button>
    </FilePicker>


    <Button hoverIndicator onClick={onCreate}>
      <AddCircle size="medium" />
    </Button>
    <Button hoverIndicator onClick={onSaveFile}>
      <Download size="medium" />
    </Button>
    <Button hoverIndicator onClick={onSaveImage}>
      <Image size="medium" />
    </Button>
  </Box>
);
