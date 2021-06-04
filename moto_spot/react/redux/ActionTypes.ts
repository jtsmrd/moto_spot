import * as Types from './Types';

export const GET_RIDER_CHECKINS_REQUEST = 'GET_RIDER_CHECKINS_REQUEST';
export type GET_RIDER_CHECKINS_REQUEST = typeof GET_RIDER_CHECKINS_REQUEST;

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

export const UPDATE_MAP_BOUNDS = 'UPDATE_MAP_BOUNDS';
export type UPDATE_MAP_BOUNDS = typeof UPDATE_MAP_BOUNDS;
export interface IUpdateMapBoundsPayload {
    mapBounds: Types.MapBounds;
}

export const UPDATE_MAP_CENTER = 'UPDATE_MAP_CENTER';
export type UPDATE_MAP_CENTER = typeof UPDATE_MAP_CENTER;
export interface IUpdateMapCenterPayload {
    mapCenter: Types.MapCenter;
}

export const UPDATE_MAP_ZOOM = 'UPDATE_MAP_ZOOM';
export type UPDATE_MAP_ZOOM = typeof UPDATE_MAP_ZOOM;
export interface IUpdateMapZoomPayload {
    mapZoom: number;
}

export const UPDATE_VISIBLE_RIDER_CHECKINS = 'UPDATE_VISIBLE_RIDER_CHECKINS';
export type UPDATE_VISIBLE_RIDER_CHECKINS = typeof UPDATE_VISIBLE_RIDER_CHECKINS;

export const SET_VISIBLE_RIDER_CHECKINS = 'SET_VISIBLE_RIDER_CHECKINS';
export type SET_VISIBLE_RIDER_CHECKINS = typeof SET_VISIBLE_RIDER_CHECKINS;
export interface ISetVisibleRiderCheckinsPayload {
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

export const REMOVE_EXPIRED_RIDER_CHECKINS = 'REMOVE_EXPIRED_RIDER_CHECKINS';
export type REMOVE_EXPIRED_RIDER_CHECKINS = typeof REMOVE_EXPIRED_RIDER_CHECKINS;
export interface IRemoveExpiredRiderCheckinsPayload {}

export const UPDATE_RIDER_CHECKIN_FETCH_INFO = 'UPDATE_RIDER_CHECKIN_FETCH_INFO';
export type UPDATE_RIDER_CHECKIN_FETCH_INFO = typeof UPDATE_RIDER_CHECKIN_FETCH_INFO;
export interface IUpdateRiderCheckinFetchInfoPayload {
    timestamp: number;
    bounds: Types.MapBounds;
}

export type IRiderCheckinActionsPayload =
    | IGetRiderCheckinsResponsePayload
    | ISetVisibleRiderCheckinsPayload
    | ICreateRiderCheckinRequestPayload
    | ICreateRiderCheckinResponsePayload
    | IDeleteRiderCheckinRequestPayload
    | IDeleteRiderCheckinResponsePayload
    | IRemoveExpiredRiderCheckinsPayload
    | IUpdateRiderCheckinFetchInfoPayload;
export type IMapActionsPayload = IUpdateMapBoundsPayload | IUpdateMapCenterPayload | IUpdateMapZoomPayload;
