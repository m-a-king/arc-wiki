import * as React from 'react';
import {
  Box,
  Button,
  Fade,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material';

export default function CommonModal({
  open,
  onClose,
  title,
  children,
}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderColor: 'divider',
    borderRadius: '4px',
    boxShadow: 24,
  };

  return (
    <Modal open={open} closeAfterTransition>
      <Fade in={open}>
        <Box sx={style}>
          {/* Header */}
          <Toolbar
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="body1">{title}</Typography>
          </Toolbar>

          {/* Content */}
          <Box sx={{ p: 3 }}>{children}</Box>

          {/* Footer */}
          <Toolbar
            sx={{
              justifyContent: 'flex-end',
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ mr: 1 }}
            >
              Submit
            </Button>

            {/* Close */}
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={onClose}
            >
              Close
            </Button>
          </Toolbar>
        </Box>
      </Fade>
    </Modal>
  );
}