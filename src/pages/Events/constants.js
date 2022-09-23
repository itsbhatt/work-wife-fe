export const headCells = [
  {
    id: 'event_name',
    numeric: false,
    disablePadding: true,
    label: 'Event',
  },
  {
    id: 'source',
    numeric: false,
    disablePadding: true,
    label: 'Source',
  },
  {
    id: 'frequency',
    numeric: false,
    disablePadding: true,
    label: 'Frequency',
  },
  {
    id: 'payload',
    numeric: false,
    disablePadding: true,
    label: 'Payload',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'actual_trigger_time',
    numeric: false,
    disablePadding: true,
    label: 'Trigger Time',
  },
];

export const exampleData = [
  {
    trigger_time: '2022-10-03T16:27:00+05:30',
    actual_trigger_time: '2022-10-03T16:27:53+05:30',
    frequency: 'once',
    source: 'consumer',
    event_name: 'expire_deal',
    payload: "{'test': 'hello', 'deal_id': '1234'}",
    status: 'pending',
  },
  {
    trigger_time: '2022-10-03T16:27:00+05:30',
    actual_trigger_time: '2022-10-03T16:27:53+05:30',
    frequency: 'once',
    source: 'consumer',
    event_name: 'expire_deal 2',
    payload: "{'test': 'hello', 'deal_id': '1234'}",
    status: 'pending',
  },
];

export const dialogConfig = [
  {
    key: 'event_name',
    name: 'event_name',
    label: 'Event Name',
    type: 'text',
    clearable: true,
    mandatory: true,
    autoComplete: 'off',
    inputType: 'textFields',
    errorText: 'This field accepts only alphabets',
  },
  {
    key: 'dateOfBirth',
    name: 'dateOfBirth',
    type: 'text',
    label: 'DOB',
    views: ['date'],
    mandatory: true,
    iconPosition: 'end',
    format: 'dd/MM/yyyy',
    maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 21)),
    inputType: 'picker',
  },
  {
    key: 'addressLine1',
    name: 'addressLine1',
    label: 'Address Line 1',
    mandatory: true,
    type: 'text',
    clearable: true,
    autoComplete: 'off',
    inputType: 'textFields',
  },
];
