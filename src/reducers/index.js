import {combineReducers} from 'redux';
import datafetchReducer from './datafetch-reducer';

const rootReducer = combineReducers({
    dashboard: datafetchReducer
});

export default rootReducer;
