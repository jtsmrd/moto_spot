import actionCreatorFactory, { ActionCreator } from 'typescript-fsa';
import * as ActionTypes from './ActionTypes';

const actionCreator = actionCreatorFactory();

export const getRiderCheckinsRequestAction: ActionCreator<any> = actionCreator<any>(
    ActionTypes.GET_RIDER_CHECKINS_REQUEST,
);

export const getRiderCheckinsResponseAction: ActionCreator<ActionTypes.IGetRiderCheckinsResponsePayload> = actionCreator<ActionTypes.IGetRiderCheckinsResponsePayload>(
    ActionTypes.GET_RIDER_CHECKINS_RESPONSE,
);

export const createRiderCheckinRequestAction: ActionCreator<ActionTypes.ICreateRiderCheckinRequestPayload> = actionCreator<ActionTypes.ICreateRiderCheckinRequestPayload>(
    ActionTypes.CREATE_RIDER_CHECKIN_REQUEST,
);

export const createRiderCheckinResponseAction: ActionCreator<ActionTypes.ICreateRiderCheckinResponsePayload> = actionCreator<ActionTypes.ICreateRiderCheckinResponsePayload>(
    ActionTypes.CREATE_RIDER_CHECKIN_RESPONSE,
);

export const updateMapBoundsAction: ActionCreator<ActionTypes.IUpdateMapBoundsPayload> = actionCreator<ActionTypes.IUpdateMapBoundsPayload>(
    ActionTypes.UPDATE_MAP_BOUNDS,
);

export const updateMapCenterAction: ActionCreator<ActionTypes.IUpdateMapCenterPayload> = actionCreator<ActionTypes.IUpdateMapCenterPayload>(
    ActionTypes.UPDATE_MAP_CENTER,
);

export const updateMapZoomAction: ActionCreator<ActionTypes.IUpdateMapZoomPayload> = actionCreator<ActionTypes.IUpdateMapZoomPayload>(
    ActionTypes.UPDATE_MAP_ZOOM,
);

export const updateVisibleRiderCheckinsAction: ActionCreator<any> = actionCreator<any>(
    ActionTypes.UPDATE_VISIBLE_RIDER_CHECKINS,
);

export const setVisibleRiderCheckinsAction: ActionCreator<ActionTypes.ISetVisibleRiderCheckinsPayload> = actionCreator<ActionTypes.ISetVisibleRiderCheckinsPayload>(
    ActionTypes.SET_VISIBLE_RIDER_CHECKINS,
);

export const expireRiderCheckinRequestAction: ActionCreator<ActionTypes.IExpireRiderCheckinRequestPayload> = actionCreator<ActionTypes.IExpireRiderCheckinRequestPayload>(
    ActionTypes.EXPIRE_RIDER_CHECKIN_REQUEST,
);

export const expireRiderCheckinResponseAction: ActionCreator<ActionTypes.IExpireRiderCheckinResponsePayload> = actionCreator<ActionTypes.IExpireRiderCheckinResponsePayload>(
    ActionTypes.EXPIRE_RIDER_CHECKIN_RESPONSE,
);

export const removeExpiredRiderCheckins: ActionCreator<ActionTypes.IRemoveExpiredRiderCheckinsPayload> = actionCreator<ActionTypes.IRemoveExpiredRiderCheckinsPayload>(
    ActionTypes.REMOVE_EXPIRED_RIDER_CHECKINS,
);

export const updateRiderCheckinFetchInfoAction: ActionCreator<ActionTypes.IUpdateRiderCheckinFetchInfoPayload> = actionCreator<ActionTypes.IUpdateRiderCheckinFetchInfoPayload>(
    ActionTypes.UPDATE_RIDER_CHECKIN_FETCH_INFO,
);
