import { combineReducers } from 'redux';
import RiderCheckinReducer from './RiderCheckinReducer';
import MapInfoReducer from './MapInfoReducer';

export default combineReducers({
    riderCheckins: RiderCheckinReducer,
    mapInfo: MapInfoReducer,
});
