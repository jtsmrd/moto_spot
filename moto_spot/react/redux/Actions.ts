import actionCreatorFactory, { ActionCreator } from 'typescript-fsa';
import * as ActionTypes from './ActionTypes';

const actionCreator = actionCreatorFactory();

export const getRiderCheckinsRequestAction: ActionCreator<ActionTypes.IGetRiderCheckinsRequestPayload> = actionCreator<ActionTypes.IGetRiderCheckinsRequestPayload>(
    ActionTypes.GET_RIDER_CHECKINS_REQUEST,
);

export const getRiderCheckinsResponseAction: ActionCreator<ActionTypes.IGetRiderCheckinsResponsePayload> = actionCreator<ActionTypes.IGetRiderCheckinsResponsePayload>(
    ActionTypes.GET_RIDER_CHECKINS_RESPONSE,
);

export const setMapBoundsAction: ActionCreator<ActionTypes.ISetMapBoundsPayload> = actionCreator<ActionTypes.ISetMapBoundsPayload>(
    ActionTypes.SET_MAP_BOUNDS,
);
