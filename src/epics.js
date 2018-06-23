import {browserHistory} from 'react-router';
import {combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';
import {alertsdataActions, floorsdataActions, homepageActions, overlaydataActions} from './actions';
import {
    DIGEST_FLOOR_DATA,
    NAVIGATE_TO_ALERT,
    REQUEST_ALERTS,
    REQUEST_BUILDING_DATA,
    REQUEST_ENTERPRISE_DATA,
    REQUEST_FLOOR_API_DATA,
    REQUEST_FLOOR_DATA,
    REQUEST_LOGIN,
    REQUEST_SENSOR_DATA,
    REQUEST_SENSOR_ALERT_DATA,
    REQUEST_USER_DATA,
    REQUEST_VENUE_DATA,
    WEB_API_URL,
    UPDATE_ALERT_DATA,
    REQUEST_LOGOUT,
    REQUEST_OVERLAY_DATA,
    CONTEXT_PATH
} from './constants';

// This logouts the from API session and also APP session.
export const requestLogout = actions$ => actions$
    .ofType(REQUEST_LOGOUT)
    .map(() => {
        ajax({
            url: WEB_API_URL + 'careGiver/logout/',
            method: 'POST',
            body: {},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            crossDomain: true,
            withCredentials: true
        }).subscribe(res => {
            browserHistory.push(CONTEXT_PATH);
        }, err => {
            browserHistory.push(CONTEXT_PATH);
        });
        return {type: 'NO_CLASH_TYPE'};
    });

/**
 * "requestLogin" invoked automatically when user presses login button
 * success would result in raising an action to fetch user data
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestLogin = actions$ =>
    actions$
        .ofType(REQUEST_LOGIN)
        .mergeMap(action =>
            ajax({
                url: WEB_API_URL + 'careGiver/login/',
                method: 'POST',
                body: {userName: action.payload.username, password: action.payload.password},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                crossDomain: true,
                withCredentials: true
            })
                .map((res) => {
                    if (res.response.enabled === true) {
                        return (homepageActions.requestUserData(),
                            homepageActions.requestEnterpriseData(res.response));
                    }
                })
                .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestUserData" invoked reactively to fetch the user data
 * success would result in raising an action to receive the user data
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestUserData = actions$ =>
    actions$
        .ofType(REQUEST_USER_DATA)
        .mergeMap(action =>
                ajax
                    .getJSON('/userdata')
                    .mergeMap((data) => Observable.of(
                        homepageActions.receiveUserData(data),
                        floorsdataActions.requestFloorsData()
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestFloorsData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive floor data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestFloorsData = actions$ =>
    actions$
        .ofType(REQUEST_FLOOR_DATA)
        .mergeMap(action =>
                ajax
                    .getJSON('/floorsdata')
                    .mergeMap((data) => Observable.of(
                        floorsdataActions.receiveFloorsData(data),
                        alertsdataActions.requestAlertsData()
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestAlerts" invoked reactively upon success of fetching floors data
 * once alerts data is available, its saved and also populated in the overlay
 * @param {*} actions$ default parameter for each such epic
 */
export const requestAlerts = actions$ =>
    actions$
        .ofType(REQUEST_ALERTS)
        .mergeMap(action =>
            ajax
                .getJSON('/alertsdata')
                .mergeMap(data => Observable.of(
                    alertsdataActions.receiveAlertsData(data),
                    overlaydataActions.makeOverlaySummary(data),
                    floorsdataActions.digestFloorsData(data)
                ))
                //.catch(error => Observable.of(alertsdataActions.requestAlertsDataFailed()))
                .catch(error => Observable.of(alertsdataActions.receiveAlertsData(data)))
        );

/**
 * "navigateToAlert" invoked reactively upon user action
 * overlay closes as a side affect
 * @param {*} actions$ default parameter for each such epic
 */
export const navigateToAlert = actions$ =>
    actions$
        .ofType(NAVIGATE_TO_ALERT)
        .mergeMap(() => Observable.of(
            overlaydataActions.resetOverlayExpansion()
        ));

/**
 * "redirectToDashboard" invoked reactively upon digesting the floors data
 * @param {*} actions$ default parameter for each such epic
 */
export const redirectToDashboard = actions$ =>
    actions$
        .ofType(DIGEST_FLOOR_DATA)
        .map(() => {
            browserHistory.push(`${CONTEXT_PATH}/dashboard`);
            return {type: 'NO_CLASH_TYPE'};
        });


/**********************************************API LOGIC *******************************************************/

/**
 * "requestEnterpriseData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive Enterprise data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestEnterpriseData = actions$ =>
    actions$
        .ofType(REQUEST_ENTERPRISE_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'enterprise/find',
                    method: 'POST',
                    body: {id: action.payload.enterpriseId},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        homepageActions.receiveEnterpriseData(data.response[0]),
                        homepageActions.requestVenueData(data.response[0].id)
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestVenueData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive Venue data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestVenueData = actions$ =>
    actions$
        .ofType(REQUEST_VENUE_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'venue/find/',
                    method: 'POST',
                    body: {enterpriseId: action.payload},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        homepageActions.receiveVenueData(data.response[0]),
                        homepageActions.requestBuildingData(data.response[0].id)
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestBuildingData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive Building data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestBuildingData = actions$ =>
    actions$
        .ofType(REQUEST_BUILDING_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'building/find/',
                    method: 'POST',
                    body: {venueId: action.payload},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        homepageActions.receiveBuildingData(data.response[0]),
                        homepageActions.requestFloorAPIData(data.response[0].id)
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestFloorAPIData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive FloorAPI data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestFloorAPIData = actions$ =>
    actions$
        .ofType(REQUEST_FLOOR_API_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'floor/find/',
                    method: 'POST',
                    body: {buildingId: action.payload},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        homepageActions.receiveFloorAPIData(data.response),
                        alertsdataActions.requestSensorData(data.response[0].id),
                        homepageActions.requestSensorAlertData(data.response[0].id, 1),
                        overlaydataActions.requestOverlayData()
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );
/**
 * "requestSensorData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive sensor data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestSensorData = actions$ =>
    actions$
        .ofType(REQUEST_SENSOR_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'sensor/findByFloorId/',
                    method: 'POST',
                    body: {floorId: action.payload},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        alertsdataActions.receiveSensorData(data.response)
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestSensorAlertData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive SensorAlert data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestOverlayAlertData = actions$ =>
    actions$
        .ofType(REQUEST_OVERLAY_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'sensorAlert/findWithSelect/',
                    method: 'POST',
                    body: {
                        select: '["id", "description", "alertType", "alertStatus", "createUTC", "sensor:x", "sensor:y", "senior:firstName", "senior:lastName", "audioList", "enterprise:description","enterprise:name","floorId"]',
                        noAlertStatus: 'DONE',
                        maxResults: 50
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        overlaydataActions.receiveOverlayData(data.response)
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );
/**
 * "requestSensorAlertData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive SensorAlert data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const requestSensorAlertData = actions$ =>
    actions$
        .ofType(REQUEST_SENSOR_ALERT_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'sensorAlert/findWithSelect/',
                    method: 'POST',
                    body: {
                        floorId: action.payload.floorid,
                        select: '["id", "description", "alertType", "alertStatus", "createUTC", "sensor:x", "sensor:y", "senior:firstName", "senior:lastName", "audioList", "enterprise:description","enterprise:name","floorId"]',
                        noAlertStatus: 'DONE',
                        maxResults: 50
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        homepageActions.receiveSensorAlertData(data.response, action.payload.floorid, action.payload.floor)
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );

/**
 * "requestSensorAlertData" invoked reactively upon success of requesting user data
 * success would result in raising an action to receive SensorAlert data and populate the state
 *
 * @param {*} actions$ default parameter for each such epic
 */
export const updateAlertData = actions$ =>
    actions$
        .ofType(UPDATE_ALERT_DATA)
        .mergeMap(action =>
                ajax({
                    url: WEB_API_URL + 'sensorAlert/triggerEvent/',
                    method: 'POST',
                    body: {
                        id: action.payload.alertid,
                        alertEvent: action.payload.updateobject,
                        description: action.payload.description
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    crossDomain: true,
                    withCredentials: true
                })
                    .mergeMap((data) => Observable.of(
                        homepageActions.requestEnterpriseData(action.payload.enterpriseId)
                    ))
            // TODO, retry and fail gracefully
            // .catch(error => Observable.of(homepageActions.loginFailed()))
        );


/* ************************************************************************************* */

export default combineEpics(
    requestLogout,
    requestLogin,
    requestUserData,
    requestFloorsData,
    requestAlerts,
    redirectToDashboard,
    navigateToAlert,
    //below are API epics
    requestEnterpriseData,
    requestVenueData,
    requestBuildingData,
    requestFloorAPIData,
    requestSensorData,
    requestSensorAlertData,
    requestOverlayAlertData
);
