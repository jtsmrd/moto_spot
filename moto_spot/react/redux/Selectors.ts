import { statePropName as riderCheckinStatePropName, IRiderCheckinState } from './reducers/RiderCheckinReducer';
import { statePropName as mapStatePropName, IMapState } from './reducers/MapReducer';

export interface IAppState {
    [riderCheckinStatePropName]: IRiderCheckinState;
    [mapStatePropName]: IMapState;
    [otherKeys: string]: any;
}

const getRiderCheckinState = (state: IAppState) => state[riderCheckinStatePropName];
const getMapState = (state: IAppState) => state[mapStatePropName];

export const getRiderCheckins = (state: IAppState) => getRiderCheckinState(state).riderCheckins;
export const getMap = (state: IAppState) => getMapState(state);
