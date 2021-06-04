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
export const getUserCheckin = (state: IAppState) => getRiderCheckinState(state).userCheckin;
export const getVisibleRiderCheckins = (state: IAppState) => getRiderCheckinState(state).visibleRiderCheckins;
export const getMapBounds = (state: IAppState) => getMapInfoState(state).mapBounds;
export const getMapZoom = (state: IAppState) => getMapInfoState(state).mapZoom;
export const getMapCenter = (state: IAppState) => getMapInfoState(state).mapCenter;
export const getMapCenterLoaded = (state: IAppState) => getMapInfoState(state).mapCenterLoaded;
export const getPreviousRiderCheckinFetchInfo = (state: IAppState) => getRiderCheckinState(state).previousFetchInfo;
