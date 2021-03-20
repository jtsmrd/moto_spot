import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';
import * as Types from '../Types';

export interface IMapInfoState {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
    visibleRiderCheckins: Types.RiderCheckin[];
}

export const initialState: IMapInfoState = {
    neLat: 0,
    neLng: 0,
    swLat: 0,
    swLng: 0,
    visibleRiderCheckins: [],
};

export const statePropName = 'mapInfo';

export default function MapInfoReducer(
    state: IMapInfoState = initialState,
    action: Action<ActionTypes.IMapActionsPayload>,
): IMapInfoState {
    switch (action.type) {
        case ActionTypes.SET_MAP_BOUNDS: {
            const { neLat, neLng, swLat, swLng } = action.payload as ActionTypes.ISetMapBoundsPayload;
            return {
                ...state,
                neLat,
                neLng,
                swLat,
                swLng,
            };
        }
        case ActionTypes.UPDATE_VISIBLE_RIDER_CHECKINS: {
            const { visibleRiderCheckins } = action.payload as ActionTypes.IUpdateVisibleRiderCheckinsPayload;
            return { ...state, visibleRiderCheckins: visibleRiderCheckins };
        }
    }
    return state;
}
