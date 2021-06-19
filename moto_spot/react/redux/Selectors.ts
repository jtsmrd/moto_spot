import { statePropName as riderCheckinStatePropName, IRiderCheckinState } from './reducers/RiderCheckinReducer';
import { statePropName as mapStatePropName, IMapInfoState } from './reducers/MapInfoReducer';
import { statePropName as riderMeetupStatePropName, IRiderMeetupState } from './reducers/RiderMeetupReducer';

export interface IAppState {
    [riderCheckinStatePropName]: IRiderCheckinState;
    [mapStatePropName]: IMapInfoState;
    [otherKeys: string]: any;
}

const riderCheckinState = (state: IAppState) => state[riderCheckinStatePropName];
const mapInfoState = (state: IAppState) => state[mapStatePropName];
const riderMeetupState = (state: IAppState) => state[riderMeetupStatePropName];

export const getRiderCheckins = (state: IAppState) => riderCheckinState(state).riderCheckins;
export const getUserCheckin = (state: IAppState) => riderCheckinState(state).userCheckin;
export const getVisibleRiderCheckins = (state: IAppState) => riderCheckinState(state).visibleRiderCheckins;
export const getMapBounds = (state: IAppState) => mapInfoState(state).mapBounds;
export const getMapZoom = (state: IAppState) => mapInfoState(state).mapZoom;
export const getMapCenter = (state: IAppState) => mapInfoState(state).mapCenter;
export const getMapCenterLoaded = (state: IAppState) => mapInfoState(state).mapCenterLoaded;
export const getPreviousRiderCheckinFetchInfo = (state: IAppState) => riderCheckinState(state).previousFetchInfo;
export const getRiderMeetupState = (state: IAppState) => riderMeetupState(state);
export const getSelectedUserCheckin = (state: IAppState) => mapInfoState(state).selectedUserCheckin;
export const getSelectedRiderCheckin = (state: IAppState) => mapInfoState(state).selectedRiderCheckin;
