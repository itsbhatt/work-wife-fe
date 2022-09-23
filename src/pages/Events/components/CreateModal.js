import { useState } from 'react';
import Axios from 'axios';
import {
  FormControl,
  Grid,
  TextField,
} from '@mui/material';

import AlertDialog from '../../../components/Dialog';
import DateTimePicker from '../../../components/DateTimePicker';
import dayjs from 'dayjs';

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

const CreateModal = ({ open, onCancel, handleOpenSnackbar, loading, handleBackdropLoading }) => {
  const [errors, setError] = useState({});
  const [formData, setFormData] = useState({
    event_name: '',
    source: '',
    trigger_time: null,
    payload: '',
  });

  const validateData = () => {
    const tempError = {...errors};
    let isDataInvalid = false;
    Object.keys(formData).forEach(el => {
      if (!formData[el]) {
        tempError[el] = true;
        isDataInvalid = true;
      } else {
        tempError[el] = false;
      }
    });

    if (!isJsonString(formData.payload)) {
      tempError.payload = true;
      isDataInvalid = true;
    }

    setError(tempError);

    if(isDataInvalid) {
      handleOpenSnackbar({
        open: true,
        message: 'Please enter valid data',
        type: 'error',
      });

      return true;
    }
  }

  const onSave = async () => {
    const isInvalid = validateData();
    if(isInvalid) return;

    handleBackdropLoading(true);
    const dataPayload = {
      ...formData,
      status: 'Pending',
      trigger_time: dayjs(formData.trigger_time).format()
    }
    try {
      await Axios.post('/create_task', {
        ...formData,
        trigger_time: dayjs(formData.trigger_time).format()
      });

      onCancel('add', dataPayload);
      handleBackdropLoading(false);

      handleOpenSnackbar({
        open: true,
        message: 'Event created successfully',
        type: 'success'
      });
    } catch (error) {
      console.log(error);
      handleBackdropLoading(false);
      handleOpenSnackbar({
        open: true,
        message: 'Something went wrong',
        type: 'error',
      });
    }
  };

  const handleChange = (e) => {
    setFormData((oldData) => ({ ...oldData, [e.target.name]: e.target.value }));
  };

  console.log(errors.trigger_time);

  return (
    <AlertDialog
      title={'Create Event'}
      onSave={onSave}
      onCancel={onCancel}
      open={open}
      loading={loading}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl sx={{ mt: 2, width: '100%' }}>
            <TextField
              name="event_name"
              id="outlined-basic"
              label="Event Name"
              variant="outlined"
              onChange={handleChange}
              value={formData.event_name}
              required
              error={errors.event_name}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ mt: 2, width: '100%' }}>
            <TextField
              name="source"
              id="outlined-basic"
              label="Source Name"
              variant="outlined"
              onChange={handleChange}
              value={formData.source}
              required
              error={errors.source}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ mt: 2, width: '100%' }}>
            <DateTimePicker
              name="trigger_time"
              label="Trigger Time"
              onChange={handleChange}
              value={formData.trigger_time}
              required
              error={errors.trigger_time}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ mt: 2, width: '100%' }}>
            <TextField
              name="payload"
              label="Payload"
              multiline
              rows={4}
              onChange={handleChange}
              value={formData.payload}
              required
              error={errors.payload}
            />
          </FormControl>
        </Grid>
      </Grid>
    </AlertDialog>
  );
};

export default CreateModal;
