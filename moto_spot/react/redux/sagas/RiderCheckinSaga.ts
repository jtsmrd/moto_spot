import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';
import * as Actions from '../Actions';
import * as Types from '../Types';
import { request as httpRequest } from '../../client';
import { getMapBounds, getMapCenter, getMapZoom, getRiderCheckins } from '../Selectors';
import { isExpired } from '../../utilities/dateTimeUtils';

function* fetchRiderCheckins(action: Action<ActionTypes.IGetRiderCheckinsRequestPayload>) {
    const mapZoom = yield select(getMapZoom);
    const mapCenter = yield select(getMapCenter);
    const distance = getSearchDistance(mapZoom);

    try {
        const res = yield call(httpRequest, {
            url: '/api/get_rider_checkins',
            method: 'GET',
            params: {
                lat: mapCenter.lat,
                lng: mapCenter.lng,
                distance: distance,
            },
        });
        const riderCheckinsPayload: ActionTypes.IGetRiderCheckinsResponsePayload = {
            riderCheckins: res.data,
        };
        yield put(Actions.getRiderCheckinsResponseAction(riderCheckinsPayload));
    } catch (e) {
        yield put(Actions.getRiderCheckinsResponseAction(e));
    }
}

function* updateVisibleRiderCheckins() {
    const riderCheckins = yield select(getRiderCheckins);
    const mapBounds = yield select(getMapBounds);
    const visibleRiderCheckins = getVisibleRiderCheckins(riderCheckins, mapBounds);
    const visibleRiderCheckinsPayload: ActionTypes.ISetVisibleRiderCheckinsPayload = {
        visibleRiderCheckins: visibleRiderCheckins,
    };
    yield put(Actions.setVisibleRiderCheckinsAction(visibleRiderCheckinsPayload));
}

function* createRiderCheckin(action: Action<ActionTypes.ICreateRiderCheckinRequestPayload>) {
    try {
        const res = yield call(httpRequest, {
            url: '/api/create_rider_checkin',
            method: 'POST',
            data: {
                lat: action.payload.lat,
                lng: action.payload.lng,
                expire_date: action.payload.expire_date,
            },
        });
        const riderCheckinPayload: ActionTypes.ICreateRiderCheckinResponsePayload = {
            riderCheckin: res.data,
        };
        yield put(Actions.createRiderCheckinResponseAction(riderCheckinPayload));
    } catch (e) {
        yield put(Actions.createRiderCheckinResponseAction(e));
    }
}

function* deleteRiderCheckin(action: Action<ActionTypes.IDeleteRiderCheckinRequestPayload>) {
    try {
        yield call(httpRequest, {
            url: '/api/rider_checkin',
            method: 'DELETE',
            params: {
                id: action.payload.id,
            },
        });
        const deleteRiderCheckinPayload: ActionTypes.IDeleteRiderCheckinResponsePayload = {};
        yield put(Actions.deleteRiderCheckinResponseAction(deleteRiderCheckinPayload));
    } catch (e) {
        yield put(Actions.deleteRiderCheckinResponseAction(e));
    }
}

function getVisibleRiderCheckins(riderCheckins: Types.RiderCheckin[], mapBounds: Types.MapBounds) {
    return riderCheckins.filter((rc) => {
        return (
            rc.lat < mapBounds.neLat &&
            rc.lat > mapBounds.swLat &&
            rc.lng < mapBounds.neLng &&
            rc.lng > mapBounds.swLng &&
            !isExpired(rc.expireDate)
        );
    });
}

function getSearchDistance(zoomLevel: number): number {
    // Zoom distances for 100px by 100px screen
    const zoomDistances = [
        { zoom: 11, distance: 4.8 },
        { zoom: 12, distance: 2.4 },
    ];
    const controlZoom = 13;
    const controlDistance = 1.2;

    // Figure out how to calculate distance using a control zoom/ distance

    const multiplyFactor = window.innerHeight / 100;
    switch (zoomLevel) {
        case 1:
            return 4915.2 * multiplyFactor;
        case 2:
            return 2457.6 * multiplyFactor;
        case 3:
            return 1228.8 * multiplyFactor;
        case 4:
            return 614.4 * multiplyFactor;
        case 5:
            return 307.2 * multiplyFactor;
        case 6:
            return 153.6 * multiplyFactor;
        case 7:
            return 76.8 * multiplyFactor;
        case 8:
            return 38.4 * multiplyFactor;
        case 9:
            return 19.2 * multiplyFactor;
        case 10:
            return 9.6 * multiplyFactor;
        case 11:
            return 4.8 * multiplyFactor;
        case 12:
            return 2.4 * multiplyFactor;
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
            return 1.2 * multiplyFactor;
        default:
            return 200;
    }
}

export default function* watchRiderCheckinRequests() {
    yield all([
        takeLatest(ActionTypes.GET_RIDER_CHECKINS_REQUEST, fetchRiderCheckins),
        takeLatest(ActionTypes.UPDATE_VISIBLE_RIDER_CHECKINS, updateVisibleRiderCheckins),
        takeLatest(ActionTypes.CREATE_RIDER_CHECKIN_REQUEST, createRiderCheckin),
        takeLatest(ActionTypes.DELETE_RIDER_CHECKIN_REQUEST, deleteRiderCheckin),
    ]);
}
