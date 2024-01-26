import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function ModalAction({ isOpen, handleClose, descriptionText, acceptText, cancelText, action, param }) {


  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {descriptionText}
          </Typography>
          <Button variant="contained" onClick={() => {
            if (action && param)
              action(param)
            else if (action && !param)
              action()
            else{
              handleClose()
            }
          }
          }>{acceptText}</Button>
          <Button variant="outlined" onClick={() => handleClose()}>{cancelText}</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAction;
