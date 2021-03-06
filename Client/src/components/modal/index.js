import React, { useState, useEffect } from 'react';
import { Layer, Heading, Box, } from 'grommet'

const Modal = ({ show, header, width, ...props }) => {
  return (show &&
    <Layer
      position="center"
      modal
      onClickOutside={() => props.onCloseModal()}
      onEsc={() => props.onCloseModal()}
    >
      <Box pad="medium" gap="small" width={width || "500px"} direction="column">
        {header && (<Heading level={3} margin="none">{header}</Heading>)}

        {/* Render body of Modal */}
        {props.children}
      </Box>

    </Layer>
  );
}

export default Modal;


