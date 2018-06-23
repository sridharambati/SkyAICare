import {REQUEST_FLOOR_DATA, RECEIVE_FLOOR_DATA, DIGEST_FLOOR_DATA, SELECT_FLOOR} from '../constants';

export const floorsdataActions = {
    requestFloorsData,
    receiveFloorsData,
    digestFloorsData,
    selectFloor
};

/**
 * Action to populate the floors data
 */
function requestFloorsData() {
    return {type: REQUEST_FLOOR_DATA, payload: {}};
}

/**
 * Action to receive the floors data
 * @param {*} floorsdata data received as a response to requesting floors
 */
function receiveFloorsData(floorsdata) {
    return {type: RECEIVE_FLOOR_DATA, payload: floorsdata};
}

/**
 * Action to gather and digest floor wise data to state
 * @param {*} alertsdata response of REQUEST_ALERTS call
 */
function digestFloorsData(alertsdata) {
    return {type: DIGEST_FLOOR_DATA, payload: alertsdata};
}

/**
 * Action to select one of the floors from the floors view
 */
function selectFloor(floorNumber, alertsdata) {
    return {type: SELECT_FLOOR, payload: {floornumber: floorNumber, alertsdata: alertsdata}};
}
