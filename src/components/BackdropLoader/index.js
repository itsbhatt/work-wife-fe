import { Backdrop, CircularProgress } from '@mui/material';

const BackdropLoader = (props) => {
  const { open, handleClose }  = props;
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackdropLoader;