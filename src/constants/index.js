/**
 * This is the API end point to contact for data
 */
export const WEB_API_URL = 'https://api.aiportal.co/bstream/api/v1/';
export const CONTEXT_PATH = '/aicare';

/**
 * All actions that can be raised when user is not logged in
 */
export const REQUEST_LOGOUT = 'A_REQUEST_LOGOUT';
export const REQUEST_LOGIN = 'A_REQUEST_LOGIN';
export const REQUEST_USER_DATA = 'A_REQUEST_USER_DATA';
export const RECEIVE_USER_DATA = 'A_RECEIVE_USER_DATA';
export const REQUEST_LOGIN_FAILED = 'A_REQUEST_LOGIN_FAILED';

/**
 * All actions that can be raised after user is logged in
 */

export const REQUEST_ENTERPRISE_DATA = 'A_REQUEST_ENTERPRISE_DATA';
export const RECEIVE_ENTERPRISE_DATA = 'A_RECEIVE_ENTERPRISE_DATA';
export const REQUEST_VENUE_DATA = 'A_REQUEST_VENUE_DATA';
export const RECEIVE_VENUE_DATA = 'A_RECEIVE_VENUE_DATA';
export const REQUEST_FLOOR_API_DATA = 'A_REQUEST_FLOOR_API_DATA';
export const RECEIVE_FLOOR_API_DATA = 'A_RECEIVE_FLOOR_API_DATA';
export const REQUEST_BUILDING_DATA = 'A_REQUEST_BUILDING_DATA';
export const RECEIVE_BUILDING_DATA = 'A_RECEIVE_BUILDING_DATA';
export const REQUEST_SENSOR_ALERT_DATA = 'A_REQUEST_SENSOR_ALERT_DATA';
export const RECEIVE_SENSOR_ALERT_DATA = 'A_RECEIVE_SENSOR_ALERT_DATA';

/**
 * All actions that can raised for dashboard refresh
 */
export const REQUEST_ALERTS = 'A_REQUEST_ALERTS';
export const RECEIVE_ALERTS = 'A_RECEIVE_ALERTS';
export const REQUEST_ALERTS_FAILED = 'A_REQUEST_ALERTS_FAILED';
export const REQUEST_SEARCH = 'A_REQUEST_SEARCH';
export const UPDATE_ALERT_DATA = 'A_UPDATE_ALERT_DATA';

/**
 * All actions that can be raised for the overlay
 */
export const REQUEST_ALERTS_SUMMARY = 'A_REQUEST_ALERTS_SUMMARY';
export const REQUEST_OVERLAY_DATA = 'A_REQUEST_OVERLAY_DATA';
export const RECEIVE_OVERLAY_DATA = 'A_RECEIVE_OVERLAY_DATA';
export const NAVIGATE_TO_ALERT = 'A_NAVIGATE_TO_ALERT';
export const SET_OVERLAY_EXPANSION = 'A_SET_OVERLAY_EXPANSION';
export const RESET_OVERLAY_EXPANSION = 'A_RESET_OVERLAY_EXPANSION';

/**
 * All actions that can be raised for the map area
 */
export const REQUEST_FLOOR_DATA = 'A_REQUEST_FLOOR_DATA';
export const RECEIVE_FLOOR_DATA = 'A_RECEIVE_FLOOR_DATA';
export const DIGEST_FLOOR_DATA = 'A_DIGEST_FLOOR_DATA';
export const SELECT_FLOOR = 'A_SELECT_FLOOR';
export const RESET_ALERT_EXPANSION = 'A_RESET_ALERT_EXPANSION';
export const SET_ALERT_EXPANSION = 'A_SET_ALERT_EXPANSION';
export const REQUEST_SENSOR_DATA = 'A_REQUEST_SENSOR_DATA';
export const RECEIVE_SENSOR_DATA = 'A_RECEIVE_SENSOR_DATA';
