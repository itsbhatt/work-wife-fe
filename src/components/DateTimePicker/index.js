import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DateTimePickerWrapper = (props) => {
  const { value, label, name, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={value}
        onChange={(val) => onChange({ target : { name, value: val }})}
        minDate={Date.now()}
      />
    </LocalizationProvider>
  );
}

export default DateTimePickerWrapper; 
