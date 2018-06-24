<<<<<<< HEAD
import {combineReducers} from 'redux';
import datafetchReducer from './datafetch-reducer';

const rootReducer = combineReducers({
    dashboard: datafetchReducer
});

export default rootReducer;
=======
import { combineReducers } from 'redux';

import { REQUEST_LOGIN, REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../actions';
import { alertsData, patientsData, futureAlertsData } from './sampledata';

const rootReducer = combineReducers({ 
  homepage:  homepageReducer,
  dashboard: dashboardReducer
});

export default rootReducer;

// this is the HomePage reducer, responds to all ACTIONS raised from the HomePage page. 
function homepageReducer(state = { isLoggingIn: false }, action) {
  switch (action.type) {
    case REQUEST_LOGIN:

      console.log("REQUEST_LOGIN type of action called.");

      return {
        ...state,
        isLoggingIn: true
      };

      // TODO: attempt login here asynchronously and 
      //  respond with approriate state change on callback function      
    default:
      return state;
  }
};

// this is the dashboard reducer, responds to all ACTIONS raised from the Dashboard page. 
function dashboardReducer(state = { alertsdata: []}, action) {
  switch (action.type) {
    case REQUEST_ALERTS:

      // TODO: API call to the backend to fetch data to return an asynchronous RxJs Observable
      // this can be a timed stream which will continuously update alerts during the lifecycle
      // of current user session (assuming server doesnt support push)

      console.log("REQUEST_ALERTS type of action called.");

      return {
        ...state,
        alertsdata: alertsData
      };
    case REQUEST_ALERTS_MOCK:

      // TODO: API call to the backend to fetch data to return an asynchronous RxJs Observable
      // this can be a timed stream which will continuously update alerts during the lifecycle
      // of current user session (assuming server doesnt support push)

      console.log("REQUEST_ALERTS_MOCK type of action called.");

      return {
        ...state,
        alertsdata: futureAlertsData
      };
    default:
      return state;
  }
};


>>>>>>> parent of d01f52a... Cleaned old files
