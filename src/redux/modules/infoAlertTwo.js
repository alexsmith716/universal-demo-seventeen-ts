// Actions
// -------------------
const LOAD = 'redux-example/infoAlertTwo/LOAD';
const LOAD_SUCCESS = 'redux-example/infoAlertTwo/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/infoAlertTwo/LOAD_FAIL';

import { postRequestConcatExportASYNC } from '../../utils/mockAPI';

const initialState = {
  loaded: false,
  data: null,
};

// Reducer
// -------------------
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > LOAD > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > LOAD > REDUCER > action: ', action);
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > LOAD_SUCCESS > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > LOAD_SUCCESS > REDUCER > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > LOAD_FAIL > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > LOAD_FAIL > REDUCER > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        // error: action.error,
        error: true,
        errorResponse: {message: action.error.message, documentation_url:''},
      };

    default:
      return state;
  }
}

// Actions (action creators)
// -------------------
export function isLoaded(globalState) {
  return globalState.infoAlertTwo && globalState.infoAlertTwo.loaded;
}

export function load() {
  console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > load() +++++++++++++++++++++++++++');
  let location = 'https://api.github.com/feeds';
  // let location = 'https://www.metaweather.com/api/location/2459115/';
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => postRequestConcatExportASYNC('resolve', true, 1600)
      .then(
        result => {
          console.log('>>>>>>>>>>>>>>>> INFOALERTTWO > load() > THEN > RESULT: ', result);
          return result;
        }, 
      )
  };
};
