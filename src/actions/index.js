<<<<<<< HEAD
export * from './homepage';
export * from './alertsdata';
export * from './floorsdata';
export * from './overlaydata';
=======
export const REQUEST_LOGIN   = 'A_REQUEST_LOGIN'
export const REQUEST_ALERTS  = 'A_REQUEST_ALERTS';

export const REQUEST_ALERTS_MOCK = "MA_REQUEST_ALERTS"

export const createaction_doLogin = (userid, passcode) => {

  const return_object = {
    type: REQUEST_LOGIN,
    payload: {
      userid: userid,
      passcode: passcode
    }
  }
  return return_object;
}

export const createaction_requestAlerts = () => {

  const return_object = {
    type: REQUEST_ALERTS,
    payload: {

    }
    // no payload for requestAlerts, later authentication token may be added
  };
  return return_object;
}
>>>>>>> parent of d01f52a... Cleaned old files
