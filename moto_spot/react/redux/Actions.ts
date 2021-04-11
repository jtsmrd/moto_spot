import actionCreatorFactory, { ActionCreator } from 'typescript-fsa';
import * as ActionTypes from './ActionTypes';

const actionCreator = actionCreatorFactory();

export const getRiderCheckinsRequestAction: ActionCreator<ActionTypes.IGetRiderCheckinsRequestPayload> = actionCreator<ActionTypes.IGetRiderCheckinsRequestPayload>(
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

export const setMapBoundsAction: ActionCreator<ActionTypes.ISetMapBoundsPayload> = actionCreator<ActionTypes.ISetMapBoundsPayload>(
    ActionTypes.SET_MAP_BOUNDS,
);

export const updateVisibleRiderCheckinsAction: ActionCreator<ActionTypes.IUpdateVisibleRiderCheckinsPayload> = actionCreator<ActionTypes.IUpdateVisibleRiderCheckinsPayload>(
    ActionTypes.UPDATE_VISIBLE_RIDER_CHECKINS,
);

export const deleteRiderCheckinRequestAction: ActionCreator<ActionTypes.IDeleteRiderCheckinRequestPayload> = actionCreator<ActionTypes.IDeleteRiderCheckinRequestPayload>(
    ActionTypes.DELETE_RIDER_CHECKIN_REQUEST,
);

export const deleteRiderCheckinResponseAction: ActionCreator<ActionTypes.IDeleteRiderCheckinResponsePayload> = actionCreator<ActionTypes.IDeleteRiderCheckinResponsePayload>(
    ActionTypes.DELETE_RIDER_CHECKIN_RESPONSE,
);
