import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';

const Navbar = (props) => {
  const { open, toggleDrawer } = props;
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ zIndex: 1400 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Work Wife
            <Typography variant="caption" noWrap component="div">
              A service that never lets forget
            </Typography>
          </Typography>

        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
