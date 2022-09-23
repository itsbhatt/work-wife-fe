import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import Table from '../../components/Table';
import AlertDialog from '../../components/Dialog';
import { exampleData, headCells } from './constants';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import DateTimePicker from '../../components/DateTimePicker';


const EventsPage = () => {
  const [isCreateEventDialogOpen, setCreateEventDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorToDisplay, setErrorToDisplay] = useState(null);
  const [errors] = useState(false);

  const onSave = () => {
    console.log('Saved');
  }

  const onCancel = () => {
    setCreateEventDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormData(oldData => ({ ...oldData, [e.target.name]: e.target.value}));
  };

  const onClearFilter = (type) => () => {
    setFormData({ ...formData, [type]: '' });
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 3 }}>
        <Button variant="outlined" startIcon={<ControlPointIcon />} onClick={() => setCreateEventDialogOpen(true)}>
          Create Event
        </Button>
      </Box>
      <Table columns={headCells} data={exampleData} title="Events"/>

      <AlertDialog
        title={'Create Event'}
        onSave={onSave}
        onCancel={onCancel}
        open={isCreateEventDialogOpen}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <TextField name="event_name" id="outlined-basic" label="Event Name" variant="outlined" onChange={handleChange}/>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <TextField name="source" id="outlined-basic" label="Source Name" variant="outlined" onChange={handleChange} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ mt: 2, width: '100%' }}>
              <DateTimePicker name="trigger_time" label="Trigger Time" onChange={handleChange} />
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
              />
            </FormControl>
          </Grid>
        </Grid>
      </AlertDialog>
    </>
  )
}

export default EventsPage;