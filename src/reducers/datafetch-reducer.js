import {
    REQUEST_ALERTS,
    RECEIVE_FLOOR_DATA,
    RECEIVE_ALERTS,
    REQUEST_SEARCH,
    RECEIVE_SENSOR_DATA,
    REQUEST_FLOOR_DATA,
    DIGEST_FLOOR_DATA,
    SELECT_FLOOR,
    SET_ALERT_EXPANSION,
    RESET_ALERT_EXPANSION,
    NAVIGATE_TO_ALERT,
    REQUEST_ALERTS_SUMMARY,
    SET_OVERLAY_EXPANSION,
    RESET_OVERLAY_EXPANSION,
    REQUEST_LOGIN,
    REQUEST_LOGIN_FAILED,
    REQUEST_USER_DATA,
    RECEIVE_USER_DATA,
    REQUEST_ENTERPRISE_DATA,
    RECEIVE_FLOOR_API_DATA,
    RECEIVE_ENTERPRISE_DATA,
    RECEIVE_VENUE_DATA,
    RECEIVE_BUILDING_DATA,
    RECEIVE_OVERLAY_DATA,
    RECEIVE_SENSOR_ALERT_DATA,
    REQUEST_LOGOUT,
    CONTEXT_PATH
} from '../constants';

import {browserHistory} from 'react-router';
import {annotateWithSearchData, filterAlertsWithKeyword} from '../constants/Utilities';

// this is the dashboard reducer, responds to all ACTIONS raised from the Dashboard page.
const defaultState = {
    alertsdata: [], searchresults: [], residentsdata: [], selection: {
        selectedalert: -1,   // this indicates which of the alerts is expanded currently
        floormap: {},
        floor: 1,
        floorid: 0,
        alerts: []
    },
    scrollId: 0,
    isExpanded: false,
    summary: [],
    highlightsummary: [],
    isLoggingIn: false,
    signin: false,
    userdata: {},
    buildingdata: {},
    floorAPIdata: [],
    enterprisedata: {},
    venuedata: {},
    sensoralertdata: []
};

export default function datafetchReducer(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_ALERTS:
            return state;
        case RECEIVE_ALERTS:
            // TODO, uncomment let alerts = action.payload;
            let alerts = action.payload.alertsdata;
            alerts.sort(function (alert1, alert2) {
            // Sort by count
            var dPriority = alert1.priority - alert2.priority;
            if (dPriority) return dPriority;
                // If there is a tie, sort by time
                var dTime = alert1.time - alert2.time;
                return dTime;
            });
            return {
                ...state,
                alertsdata: alerts
            };
        case REQUEST_SEARCH:
            let keyword = action.payload;
            // keyword is invalid case
            if ((keyword == undefined) || (keyword.length < 3)) {
                return {
                    ...state,
                    searchresults: []
                };
            }
            else {
                let searchResults = filterAlertsWithKeyword(state.alertsdata, keyword);
                return {
                    ...state,
                    searchresults: searchResults
                };
            }
        case RECEIVE_SENSOR_DATA:
            let residents = action.payload;
            return {
                ...state,
                residentsdata: residents

            };
        case RECEIVE_FLOOR_DATA:
            let floorsData = action.payload;
            //Defining a temporary floor object for data manipulation
            let selection_obj = JSON.parse(JSON.stringify(state.selection));
            selection_obj.floor = floorsData.defaultfloor;
            //Loop for selecting the appropriate floormap with respect to the selected floor
            for (var i = 0; i < floorsData.length; i++) {
                if (floorsData[i].floor == selection_obj.floor) {
                    selection_obj.floormap = floorsData[i].floormap;
                }
            }
            return {
                ...state,
                selection: selection_obj,
                floors: floorsData.details
            };
        case DIGEST_FLOOR_DATA:
            //Defining a temporary floor object for data manipulation
            let floor_obj = JSON.parse(JSON.stringify(state.selection));
            let alertsdata = action.payload;
            //Loop for selecting the appropriate alerts with respect to the selected floor
            floor_obj.alerts = [];
            for (let i = 0; i < alertsdata.length; i++) {
                if (alertsdata[i].floor == floor_obj.floor) {
                    floor_obj.alerts.push(alertsdata[i]);
                }
            }
            return {
                ...state,
                selection: floor_obj
            };
        case SELECT_FLOOR:
            let floor_to_set = action.payload.floornumber;
            let floor_id = state.floorAPIdata[floor_to_set - 1].id;
            //Defining a temporary floor object for data manipulation
            let selection_object = JSON.parse(JSON.stringify(state.selection));
            selection_object.floor = floor_to_set; //assigning the selected floor to the temporary object from the payload of the action
            let floorsDatas = state.floorAPIdata;
            //Loop for selecting the appropriate floormap with respect to the selected floor
            for (var i = 0; i < floorsDatas.length; i++) {
                if (floorsDatas[i].id == floor_id) {
                    selection_object.floormap = atob(floorsDatas[i].image.content);
                }
            }

            browserHistory.push(`${CONTEXT_PATH}/dashboard`);
            return {
                ...state,
                selection: selection_object
            };
        case NAVIGATE_TO_ALERT:
            let n_floor_to_set = action.payload.floornumber;
            let n_alerts_change = action.payload.alertsdata;
            let n_alertid = action.payload.alertid;
            n_alerts_change.sort(function (alert1, alert2) {
                // Sort by count
                let dPriority = alert1.priority - alert2.priority;
                if (dPriority) return dPriority;
                // If there is a tie, sort by time
                let dTime = alert1.time - alert2.time;
                return dTime;
            });
            //Defining a temporary floor object for data manipulation
            let n_selection_object = JSON.parse(JSON.stringify(state.selection));
            n_selection_object.floorid = state.floorAPIdata[n_floor_to_set - 1].id; //assigning the selected floor to the temporary object from the payload of the action
            n_selection_object.floor = n_floor_to_set
            let n_floorsDatas = state.floorAPIdata;
            //Loop for selecting the appropriate floormap with respect to the selected floor
            for (var i = 0; i < n_floorsDatas.length; i++) {
                if (n_floorsDatas[i].id === n_selection_object.floorid) {
                    n_selection_object.floormap = atob(n_floorsDatas[i].image.content);
                }
            }

            //Loop for selecting the appropriate alerts with respect to the selected floor based on the selected floor
            n_selection_object.alerts = []; // re initialize
            for (var i = 0; i < n_alerts_change.length; i++) {
                if (n_alerts_change[i].floorId === n_selection_object.floorid) {
                    n_selection_object.alerts.push(n_alerts_change[i]);
                }
            }

            // Loop for selecting appropriate object to be selected based on AlertId
            for (var i = 0; i < n_selection_object.alerts.length; i++) {
                if ((n_selection_object.alerts[i].id) === n_alertid) {
                    n_selection_object.selectedalert = i;
                }
            }
            return {
                ...state,
                selection: n_selection_object,
                scrollId: n_alertid
            };
        case REQUEST_FLOOR_DATA:
            return state;
        case SET_ALERT_EXPANSION:
            let sae_selection = JSON.parse(JSON.stringify(state.selection));
            sae_selection.selectedalert = action.payload;
            return {
                ...state,
                selection: sae_selection
            };
        case RESET_ALERT_EXPANSION:
            let rae_selection = JSON.parse(JSON.stringify(state.selection));
            rae_selection.selectedalert = -1;

            return {
                ...state,
                selection: rae_selection
            };
        case RECEIVE_ALERTS:
            let re_selection = JSON.parse(JSON.stringify(state.selection));
            re_selection.selectedalert = -1;
            return {
                ...state,
                selection: re_selection
            }
        case REQUEST_ALERTS_SUMMARY:
            // alerts summary overlay is digested data
            // the intial values are 8 0s because we are assuming 8 levels of priority/type
            let alertsSummary = [0, 0, 0, 0, 0];
            let alertsHighlightsSummary = [0, 0, 0, 0, 0]
            let alertsData = action.payload;
            //Loop for counting the number of alerts for each type of alert
            for (var i = 0; i < alertsData.length; i++) {
                var obj = alertsData[i].priority;
                alertsSummary[obj - 1]++;//incrementing the corresponding entry in the array for that alert
                if (alertsData[i].alertStatus === "INIT") {
                    alertsHighlightsSummary[obj - 1]++;
                }
            }
            return {
                ...state,
                summary: alertsSummary,
                highlightsummary: alertsHighlightsSummary
            };
        case SET_OVERLAY_EXPANSION:
            return {
                ...state,
                isExpanded: true
            };
        case RESET_OVERLAY_EXPANSION:

            return {
                ...state,
                isExpanded: false
            };
        case RECEIVE_USER_DATA:
            let userDataFromServer = action.payload;
            userDataFromServer.defaultfloor = 1;
            return {
                ...state,
                userdata: userDataFromServer
            };
        case REQUEST_LOGIN:
            return {
                ...state,
                isLoggingIn: true,
                isLoginFailed: false
            };
        case REQUEST_LOGOUT:
            return {
                ...defaultState
            };
        case REQUEST_USER_DATA:
            return {
                ...state,
                isLoggingIn: false
            };
        case REQUEST_LOGIN_FAILED:
            return {
                ...state,
                isLoginFailed: true,
                isLoggingIn: false
            };
        case REQUEST_ENTERPRISE_DATA:
            return {
                ...state,
                userdata: action.payload,
                signin: true
            };
        case RECEIVE_ENTERPRISE_DATA:
            return {
                ...state,
                enterprisedata: action.payload
            };
        case RECEIVE_VENUE_DATA:
            return {
                ...state,
                venuedata: action.payload
            };
        case RECEIVE_BUILDING_DATA:
            return {
                ...state,
                buildingdata: action.payload
            };
        case RECEIVE_FLOOR_API_DATA:
            floor_obj = JSON.parse(JSON.stringify(state.selection));
            floor_obj.floormap = atob(action.payload[0].image.content);
            browserHistory.push(`${CONTEXT_PATH}/dashboard`);
            return {
                ...state,
                floorAPIdata: action.payload,
                selection: floor_obj
            };
        case RECEIVE_OVERLAY_DATA:
            let sensoralertobject3 = action.payload;
            let sensoralertobject = [];
            for (var i = 0; i < sensoralertobject3.length; i++) {
                if (sensoralertobject3[i].floorId !== undefined) {
                    sensoralertobject.push(sensoralertobject3[i]);
                }
            }
            alertsSummary = [0, 0, 0, 0, 0];
            alertsHighlightsSummary = [0, 0, 0, 0, 0];
            //Loop for counting the number of alerts for each type of alert
            for (var i = 0; i < sensoralertobject.length; i++) {
                let priority = 1;
                if (sensoralertobject3[i].alertType === "SOS") {
                    priority = 1;
                }
                else if (sensoralertobject3[i].alertType === "HIGH_IMPACT") {
                    priority = 2;
                }
                else if (sensoralertobject3[i].alertType === "HIGH NOISE") {
                    priority = 3;
                }
                else if (sensoralertobject3[i].alertType === "MISSING") {
                    priority = 4;
                }
                else if (sensoralertobject3[i].alertType === "POWER_OFF") {
                    priority = 5;
                }
                alertsSummary[priority - 1]++;//incrementing the corresponding entry in the array for that alert
                if (sensoralertobject[i].alertStatus === "INIT") {
                    alertsHighlightsSummary[priority - 1]++;
                }
            }
            let returnAlerts = annotateWithSearchData(sensoralertobject);
            return {
                ...state,
                summary: alertsSummary,
                highlightsummary: alertsHighlightsSummary,
                sensoralertdata: sensoralertobject,
                alertsdata: returnAlerts,
            };
        case RECEIVE_SENSOR_ALERT_DATA:
            let sensoralertobject2 = action.payload.sensoralertData;
            sensoralertobject = [];
            for (var i = 0; i < sensoralertobject2.length; i++) {
                if (sensoralertobject2[i].floorId !== undefined) {
                    sensoralertobject.push(sensoralertobject2[i]);
                }
            }
            sensoralertobject.sort(function (alert1, alert2) {
                // Sort by count
                var dtype = alert1.alertType - alert2.alertType;
                if (dtype) return dtype;
                // If there is a tie, sort by time
                var dUTC = alert1.createUtc - alert2.createUtc;
                return dUTC;
            });
            //Defining a temporary floor object for data manipulation
            let sensor_selection_object = JSON.parse(JSON.stringify(state.selection));
            sensor_selection_object.floor = action.payload.floor; //assigning the selected floor to the temporary object from the payload of the action
            sensor_selection_object.floorid = action.payload.floorid;
            sensor_selection_object.alerts = [];
            floorsDatas = state.floorAPIdata;
            //Loop for selecting the appropriate alerts with respect to the selected floor based on the selected floor
            for (let i = 0; i < sensoralertobject.length; i++) {
                if (sensoralertobject[i].floorId === sensor_selection_object.floorid) {
                    sensor_selection_object.alerts.push(sensoralertobject[i]);
                }
            }
            return {
                ...state,
                sensoralertdata: sensoralertobject,
                selection: sensor_selection_object,
                signin: false
            };
        default:
            return state;
    }
};
