import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App/App';
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import Patients from './components/Patients/Patients';
import Facilities from './components/Facilities/Facilities';
import Reports from './components/Reports/Reports';
import {CONTEXT_PATH} from "./constants";

export default (
    <Route path={CONTEXT_PATH} component={App} base>
        <IndexRoute component={HomePage}/>
        <Route path={`${CONTEXT_PATH}/dashboard`} component={Dashboard}/>
        <Route path={`${CONTEXT_PATH}/patients`} component={Patients}/>
        <Route path={`${CONTEXT_PATH}/facilities`} component={Facilities}/>
        <Route path={`${CONTEXT_PATH}/reports`} component={Reports}/>
    </Route>
);
