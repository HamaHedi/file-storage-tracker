import React, { useState } from 'react';
import ResponsiveDrawer from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Archive from './components/Archive/Archive';
import Starred from './components/Starred/Starred';
import AllFiles from './components/AllFile/Allfiles';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact from='/'>
          <ResponsiveDrawer main={<Home />} pageName='Home Page' />
        </Route>
        <Route exact from='/allFiles'>
          <ResponsiveDrawer main={<AllFiles />} pageName='All Files' />
        </Route>
        <Route exact from='/starred'>
          <ResponsiveDrawer main={<Starred />} pageName='Starred Files' />
        </Route>
        <Route exact from='/Archived'>
          <ResponsiveDrawer main={<Archive />} pageName='Archived Files' />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
