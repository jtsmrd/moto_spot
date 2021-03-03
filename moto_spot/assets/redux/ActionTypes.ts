import * as Types from './Types';

export const GET_RIDER_CHECKINS_REQUEST = 'GET_RIDER_CHECKINS_REQUEST';
export type GET_RIDER_CHECKINS_REQUEST = typeof GET_RIDER_CHECKINS_REQUEST;
export interface IGetRiderCheckinsRequestPayload {
    lat: number;
    lng: number;
    distance: number;
}

export const GET_RIDER_CHECKINS_RESPONSE = 'GET_RIDER_CHECKINS_RESPONSE';
export type GET_RIDER_CHECKINS_RESPONSE = typeof GET_RIDER_CHECKINS_RESPONSE;
export interface IGetRiderCheckinsResponsePayload {
    riderCheckins: Types.RiderCheckin[];
}

export type IRiderCheckinActionsPayload = IGetRiderCheckinsRequestPayload | IGetRiderCheckinsResponsePayload;
