import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = (props) => {
  const { open, handleOpenClose, title, children, onCancel, onSave, loading } = props;

  const handleClose = () => {
    handleOpenClose(false);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <LoadingButton variant="outlined" onClick={onCancel} sx={{ mx: 2 }}>Cancel</LoadingButton>
        <LoadingButton variant="contained" onClick={onSave} autoFocus loading={loading}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
