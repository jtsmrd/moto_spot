import { statePropName as riderCheckinStatePropName, IRiderCheckinState } from './reducers/RiderCheckinReducer';
import { statePropName as mapStatePropName, IMapInfoState } from './reducers/MapInfoReducer';

export interface IAppState {
    [riderCheckinStatePropName]: IRiderCheckinState;
    [mapStatePropName]: IMapInfoState;
    [otherKeys: string]: any;
}

const getRiderCheckinState = (state: IAppState) => state[riderCheckinStatePropName];
const getMapInfoState = (state: IAppState) => state[mapStatePropName];

export const getRiderCheckins = (state: IAppState) => getRiderCheckinState(state).riderCheckins;
export const getMapInfo = (state: IAppState) => getMapInfoState(state);
export const getVisibleRiderCheckins = (state: IAppState) => getMapInfoState(state).visibleRiderCheckins;
