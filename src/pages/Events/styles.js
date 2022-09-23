import { styled } from '@mui/material/styles';

export const classes = {
  errorIcon: `event-errorIcon`,
  errorToDisplay: `event-errorToDisplay`,
  confirmationText: `event-confirmationText`,
};

export const Root = styled('div')(() => ({
  [`& ${classes.errorToDisplay}`]: {
    gap: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  [`& ${classes.errorIcon}`]: {
    fontSize: '18px'
  },
  [`& ${classes.confirmationText}`]: {
    fontSize: '18px',
  },
}));
