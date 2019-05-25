import React, { useState, useEffect } from 'react';
import { Layer, Heading, Box, } from 'grommet'

const Modal = ({ show, header, component, width, ...props }) => {
  return (show &&
    <Layer
      position="center"
      modal
      onClickOutside={() => props.onCloseModal()}
      onEsc={() => props.onCloseModal()}
    >
      <Box pad="medium" gap="small" width={width || "500px"} direction="column">
        <Heading level={3} margin="none">{header}</Heading>

        {/* Render body of Modal */}
        {component}
      </Box>

    </Layer>
  );
}

export default Modal;


