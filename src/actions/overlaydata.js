import {
    REQUEST_ALERTS_SUMMARY,
    NAVIGATE_TO_ALERT,
    SET_OVERLAY_EXPANSION,
    RESET_OVERLAY_EXPANSION,
    REQUEST_OVERLAY_DATA,
    RECEIVE_OVERLAY_DATA
} from '../constants';

export const overlaydataActions = {
    makeOverlaySummary,
    setOverlayExpansion,
    resetOverlayExpansion,
    navigateToAlertOnMap,
    requestOverlayData,
    receiveOverlayData
};

/**
 * Action to be raised after reciveing new alerts
 * @param alertsdata is the input data required to digest and make overlay summary
 */
function makeOverlaySummary(alertsdata) {
    return {type: REQUEST_ALERTS_SUMMARY, payload: alertsdata};
}

/**
 * Action to be raised after reciveing new alerts
 */
function requestOverlayData() {
    return {type: REQUEST_OVERLAY_DATA, payload: {}};
}

/**
 * Action to be raised after reciveing new alerts
 * @param alertsdata is the input data required to digest and make overlay summary
 */
function receiveOverlayData(alertsdata) {
    return {type: RECEIVE_OVERLAY_DATA, payload: alertsdata};
}

/**
 * Action to be raised when user chooses to navigate to an alert
 * @param alertId is the ID of the alert to navigate to
 * @param floorNumber is the floor number we need to goto.
 * @param allalerts
 */
function navigateToAlertOnMap(floorNumber, alertId, allalerts) {
    return {type: NAVIGATE_TO_ALERT, payload: {floornumber: floorNumber, alertid: alertId, alertsdata: allalerts}};
}

/**
 * Action to be raised when overlay is to be expanded
 */
function setOverlayExpansion() {
    return {type: SET_OVERLAY_EXPANSION};
}

/**
 * Action to be raised when overlay is to be colapsed
 */
function resetOverlayExpansion() {
    return {type: RESET_OVERLAY_EXPANSION};
}
