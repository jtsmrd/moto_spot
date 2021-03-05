import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';
import * as Actions from '../Actions';
import { request as httpRequest } from '../../client';

function* getRiderCheckins(action: Action<ActionTypes.IGetRiderCheckinsRequestPayload>) {
    try {
        const res = yield call(httpRequest, {
            url: '/api/get-rider-checkins',
            method: 'GET',
            params: {
                lat: action.payload.lat,
                lon: action.payload.lng,
                distance: action.payload.distance,
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

export default function* watchRiderCheckinRequests() {
    yield all([takeLatest(ActionTypes.GET_RIDER_CHECKINS_REQUEST, getRiderCheckins)]);
}
