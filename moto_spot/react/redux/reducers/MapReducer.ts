import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';

export interface IMapState {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
}

export const initialState: IMapState = {
    neLat: 0,
    neLng: 0,
    swLat: 0,
    swLng: 0,
};

export const statePropName = 'map';

export default function MapReducer(
    state: IMapState = initialState,
    action: Action<ActionTypes.IMapActionsPayload>,
): IMapState {
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
    }
    return state;
}
