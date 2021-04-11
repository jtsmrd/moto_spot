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

export const CREATE_RIDER_CHECKIN_REQUEST = 'CREATE_RIDER_CHECKIN_REQUEST';
export type CREATE_RIDER_CHECKIN_REQUEST = typeof CREATE_RIDER_CHECKIN_REQUEST;
export interface ICreateRiderCheckinRequestPayload {
    lat: number;
    lng: number;
    expire_date?: number;
}

export const CREATE_RIDER_CHECKIN_RESPONSE = 'CREATE_RIDER_CHECKIN_RESPONSE';
export type CREATE_RIDER_CHECKIN_RESPONSE = typeof CREATE_RIDER_CHECKIN_RESPONSE;
export interface ICreateRiderCheckinResponsePayload {
    riderCheckin: Types.RiderCheckin;
}

export const SET_MAP_BOUNDS = 'SET_MAP_BOUNDS';
export type SET_MAP_BOUNDS = typeof SET_MAP_BOUNDS;
export interface ISetMapBoundsPayload {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
}

export const UPDATE_VISIBLE_RIDER_CHECKINS = 'UPDATE_VISIBLE_RIDER_CHECKINS';
export type UPDATE_VISIBLE_RIDER_CHECKINS = typeof UPDATE_VISIBLE_RIDER_CHECKINS;
export interface IUpdateVisibleRiderCheckinsPayload {
    visibleRiderCheckins: Types.RiderCheckin[];
}

export const DELETE_RIDER_CHECKIN_REQUEST = 'DELETE_RIDER_CHECKIN_REQUEST';
export type DELETE_RIDER_CHECKIN_REQUEST = typeof DELETE_RIDER_CHECKIN_REQUEST;
export interface IDeleteRiderCheckinRequestPayload {
    id: number;
}

export const DELETE_RIDER_CHECKIN_RESPONSE = 'DELETE_RIDER_CHECKIN_RESPONSE';
export type DELETE_RIDER_CHECKIN_RESPONSE = typeof DELETE_RIDER_CHECKIN_RESPONSE;
export interface IDeleteRiderCheckinResponsePayload {}

export type IRiderCheckinActionsPayload =
    | IGetRiderCheckinsRequestPayload
    | IGetRiderCheckinsResponsePayload
    | ICreateRiderCheckinRequestPayload
    | ICreateRiderCheckinResponsePayload
    | IDeleteRiderCheckinRequestPayload
    | IDeleteRiderCheckinResponsePayload;
export type IMapActionsPayload = ISetMapBoundsPayload | IUpdateVisibleRiderCheckinsPayload;
