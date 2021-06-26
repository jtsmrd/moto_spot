import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';
import * as Types from '../Types';

export enum MapViewMode {
    RiderCheckins,
    RiderMeetups,
    CreateRiderMeetup,
}

export interface IMapInfoState {
    mapBounds: Types.MapBounds;
    mapCenter: Types.MapCenter;
    mapZoom: number;
    mapCenterLoaded: boolean;
    selectedUserCheckin?: Types.RiderCheckin;
    selectedRiderCheckin?: Types.RiderCheckin;
    mapViewMode: MapViewMode;
}

export const initialState: IMapInfoState = {
    mapBounds: {
        neLat: 0,
        neLng: 0,
        swLat: 0,
        swLng: 0,
    },
    mapCenter: {
        lat: 0,
        lng: 0,
    },
    mapZoom: 0,
    mapCenterLoaded: false,
    selectedUserCheckin: null,
    selectedRiderCheckin: null,
    mapViewMode: MapViewMode.RiderCheckins,
};

export const statePropName = 'mapInfo';

export default function MapInfoReducer(
    state: IMapInfoState = initialState,
    action: Action<ActionTypes.IMapActionsPayload>,
): IMapInfoState {
    switch (action.type) {
        case ActionTypes.UPDATE_MAP_BOUNDS: {
            const { mapBounds } = action.payload as ActionTypes.IUpdateMapBoundsPayload;
            return {
                ...state,
                mapBounds: mapBounds,
            };
        }
        case ActionTypes.UPDATE_MAP_CENTER: {
            const { mapCenter } = action.payload as ActionTypes.IUpdateMapCenterPayload;
            return {
                ...state,
                mapCenter: mapCenter,
                mapCenterLoaded: true,
            };
        }
        case ActionTypes.UPDATE_MAP_ZOOM: {
            const { mapZoom } = action.payload as ActionTypes.IUpdateMapZoomPayload;
            return {
                ...state,
                mapZoom: mapZoom,
            };
        }
        case ActionTypes.SET_SELECTED_USER_CHECKIN: {
            const { userCheckin } = action.payload as ActionTypes.ISetSelectedUserCheckinPayload;
            return {
                ...state,
                selectedUserCheckin: userCheckin,
            };
        }
        case ActionTypes.SET_SELECTED_RIDER_CHECKIN: {
            const { riderCheckin } = action.payload as ActionTypes.ISetSelectedRiderCheckinPayload;
            return {
                ...state,
                selectedRiderCheckin: riderCheckin,
            };
        }
        case ActionTypes.SET_MAP_VIEW_MODE: {
            const { mapViewMode } = action.payload as ActionTypes.ISetMapViewMode;
            return {
                ...state,
                mapViewMode: mapViewMode,
            };
        }
    }
    return state;
}
