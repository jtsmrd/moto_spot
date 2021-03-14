import { combineReducers } from 'redux';
import RiderCheckinReducer from './RiderCheckinReducer';
import MapReducer from './MapReducer';

export default combineReducers({ riderCheckins: RiderCheckinReducer, map: MapReducer });
