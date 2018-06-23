import {
    REQUEST_ALERTS,
    RECEIVE_ALERTS,
    RESET_ALERT_EXPANSION,
    SET_ALERT_EXPANSION,
    REQUEST_SEARCH,
    UPDATE_ALERT_DATA,
    REQUEST_SENSOR_DATA,
    RECEIVE_SENSOR_DATA
} from '../constants';

export const alertsdataActions = {
    requestAlertsData,
    receiveAlertsData,
    resetAlertExpansion,
    setAlertExpansion,
    requestSearch,
    updateAlertData,
    requestSensorData,
    receiveSensorData,
};

/**
 * Action to be raised immediately after login to fetch dashboard data
 */
function requestAlertsData() {
    return {type: REQUEST_ALERTS, payload: {}};
}

/**
 * Raised as a response to valid data return from HTTP server
 * @param alertsdata an array of alerts received
 */
function receiveAlertsData(alertsdata) {
    return {type: RECEIVE_ALERTS, payload: {alertsdata}};
}

/**
 * Action to reset the current expansion of the alert item, auto triggered on select floor
 */
function resetAlertExpansion() {
    return {type: RESET_ALERT_EXPANSION, payload: {}}
}

/**
 * Action to set the current expansion of the alert item
 * @param keyValue is the key to be set as the expanded value
 */
function setAlertExpansion(keyValue) {
    return {type: SET_ALERT_EXPANSION, payload: keyValue}
}

function updateAlertData(alertId, updateObject, enterpriseId, descriptionString) {
    return {type: UPDATE_ALERT_DATA,
        payload: {
            alertid: alertId,
            updateobject: updateObject,
            enterpriseId: enterpriseId,
            description: descriptionString
        }
    }
}

/**
 * Action to be raised when user requests a search item
 * @param keyword search string
 */
function requestSearch(keyword) {
    return {type: REQUEST_SEARCH, payload: keyword};
}

/**
 * Action to be raised immediately after login to fetch Residents data
 */
function requestSensorData(floorid) {
    return {type: REQUEST_SENSOR_DATA, payload: floorid};
}

/**
 * Raised as a response to valid data return from HTTP server
 * @param residentsdata an array of Residents received
 */
function receiveSensorData(residentsdata) {
    return {type: RECEIVE_SENSOR_DATA, payload: residentsdata};
}
