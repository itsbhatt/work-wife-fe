import Axios from 'axios';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import CreateEventModal from './components/CreateModal';
import Table from '../../components/Table';
import { headCells } from './constants';
import { Alert, Snackbar } from '@mui/material';
import BackdropLoader from '../../components/BackdropLoader';

const EventsPage = () => {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: 'Saved Successfully',
    type: 'success'
  });

  const [isCreateEventDialogOpen, setCreateEventDialogOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [backdropLoading, setBackdropLoading] = useState(false);

  useEffect(() => {
    fetchData()
  },[]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await Axios.get('/read_tasks');
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      handleOpenSnackbar({
        open: true,
        message: 'Something went wrong',
        type: 'error',
      });
      setLoading(false);
    }
  }

  const onCreateModalCancel = (type, payload) => {
    setCreateEventDialogOpen(false);

    if(type === 'fetch') {
      fetchData();
    } else if(type === 'add') {
      setData((oldState) => ({ ...oldState, Items: [ payload,...data.Items] }))
    }
  }

  const handleOpenSnackbar = (data) => {
    setSnackbarData(data)
  }

  const handleBackdropLoading = (isOpen) => {
    setBackdropLoading(isOpen)
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 3 }}>
        <Button variant="outlined" startIcon={<ControlPointIcon />} onClick={() => setCreateEventDialogOpen(true)}>
          Create Event
        </Button>
      </Box>
      <Table
        title="Events"
        loading={loading}
        columns={headCells}
        setLoading={setLoading}
        data={data.Items || []}
        handleOpenSnackbar={handleOpenSnackbar}
      />

      <CreateEventModal
        loading={backdropLoading}
        open={isCreateEventDialogOpen}
        onCancel={onCreateModalCancel}
        handleOpenSnackbar={handleOpenSnackbar}
        handleBackdropLoading={handleBackdropLoading}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarData.open}
        autoHideDuration={4000}
        onClose={() => handleOpenSnackbar({ open: false })}
      >
        <Alert severity={snackbarData.type}>{snackbarData.message}</Alert>
      </Snackbar>

      <BackdropLoader open={backdropLoading} handleClose={() => handleBackdropLoading(false)}/>
    </>
  )
}

export default EventsPage;