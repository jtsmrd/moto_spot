import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';
import * as Types from '../Types';

export interface IMapInfoState {
    mapBounds: Types.MapBounds;
    mapCenter: Types.MapCenter;
    mapZoom: number;
    mapCenterLoaded: boolean;
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
    }
    return state;
}
