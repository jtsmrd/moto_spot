import { combineReducers } from 'redux';
import RiderCheckinReducer from './RiderCheckinReducer';

export default combineReducers({ riderCheckins: RiderCheckinReducer });
