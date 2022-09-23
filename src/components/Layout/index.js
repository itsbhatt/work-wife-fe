import React from 'react';

import Main from './Main';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";

const PersistentDrawerLeft = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} />
      <Sidebar open={open}/>
      <Main open={open}>
        <Outlet />
      </Main>
    </>
  );
}

export default PersistentDrawerLeft;
