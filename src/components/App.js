import React from 'react';
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ResetPassword from './ResetPassword';
<<<<<<< HEAD
import SignupPage from './SignupPage';
import {BrowserRouter as Router, Route, Switch} from'react-router-dom';
=======
import UploadRequirements from './UploadRequirements';
import AllocationMap from './AllocationMap';
import UserSettings from './UserSettings';
import {BrowserRouter as Router, Route, Switch } from'react-router-dom';
>>>>>>> c7ccd1a6eb64a86e36a8e1bc7de17b595aec4b1e
import 'antd/dist/antd.css';
import '../style/style.css';

function App(){
  return(
    <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <ProtectedRoute path="/home" component={HomePage}/>
          <Route path="/reset-password" component={ResetPassword}/>
<<<<<<< HEAD
          <Route path="/signup" component={SignupPage}/>
=======
          <ProtectedRoute path="/upload-requirements" component={UploadRequirements}/>
          <ProtectedRoute path="/allocation-map" component={AllocationMap}/>
          <ProtectedRoute path="/user-settings" component={UserSettings}/>
>>>>>>> c7ccd1a6eb64a86e36a8e1bc7de17b595aec4b1e
        </Switch>
    </Router>
  );
}

export default App;