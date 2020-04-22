import React from 'react';
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ResetPassword from './ResetPassword';
import SignupPage from "./SignupPage";
import StudentManageRequirements from './StudentManageRequirements';
import AdminManageRequirements from './AdminManageRequirements'
import AdminAllocationMap from './AdminAllocationMap';
import StudentAllocationMap from './StudentAllocationMap';
import UserSettings from './UserSettings';
import {BrowserRouter as Router, Route, Switch, Redirect } from'react-router-dom';

import 'antd/dist/antd.css';
import '../style/style.css';

function App(){
  return(
    <Router>
        <Switch>
          <Route exact path="/"><Redirect to="/login"/></Route>
          <Route path="/login" component={LoginPage}/>
          <ProtectedRoute path="/home" component={HomePage}/>
          <Route path="/reset-password" component={ResetPassword}/>
          <AdminProtectedRoute path="/signup" component={SignupPage}/>
          <ProtectedRoute exact path="/manage-requirements/student" component={StudentManageRequirements}/>
          <AdminProtectedRoute exact path="/manage-requirements/admin" component={AdminManageRequirements}/>
          <ProtectedRoute exact path="/allocation-map/student" component={StudentAllocationMap}/>
          <AdminProtectedRoute exact path="/allocation-map/admin" component={AdminAllocationMap}/>
          <ProtectedRoute path="/user-settings" component={UserSettings}/>
        </Switch>
    </Router>
  );
}

export default App;