import React from 'react';
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ResetPassword from './ResetPassword';
import SignupPage from "./SignupPage";
import StudentManageRequirements from './StudentManageRequirements';
import AllocationMap from './AllocationMap';
import UserSettings from './UserSettings';
import {BrowserRouter as Router, Route, Switch } from'react-router-dom';

import 'antd/dist/antd.css';
import '../style/style.css';

function App(){
  return(
    <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <ProtectedRoute path="/home" component={HomePage}/>
          <Route path="/reset-password" component={ResetPassword}/>
          <Route path="/signup" component={SignupPage}/>
          <ProtectedRoute path="/manage-requirements/student" component={StudentManageRequirements}/>
          <ProtectedRoute path="/allocation-map" component={AllocationMap}/>
          <ProtectedRoute path="/user-settings" component={UserSettings}/>
        </Switch>
    </Router>
  );
}

export default App;