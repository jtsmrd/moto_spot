import { put, all, takeLatest, select } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import * as ActionTypes from '../ActionTypes';
import * as Actions from '../Actions';
import { getRiderCheckins } from '../Selectors';

function* mapBoundsUpdated(action: Action<ActionTypes.ISetMapBoundsPayload>) {
    const riderCheckins = yield select(getRiderCheckins);
    const visibleRiderCheckins = getVisibleRiderCheckins(riderCheckins, action.payload);
    const visibleRiderCheckinsPayload: ActionTypes.IUpdateVisibleRiderCheckinsPayload = {
        visibleRiderCheckins: visibleRiderCheckins,
    };
    yield put(Actions.updateVisibleRiderCheckinsAction(visibleRiderCheckinsPayload));
}

function getVisibleRiderCheckins(riderCheckins, payload: ActionTypes.ISetMapBoundsPayload) {
    return riderCheckins.filter((rc) => {
        return rc.lat < payload.neLat && rc.lat > payload.swLat && rc.lng < payload.neLng && rc.lng > payload.swLng;
    });
}

export default function* watchMapInfoSagas() {
    yield all([takeLatest(ActionTypes.SET_MAP_BOUNDS, mapBoundsUpdated)]);
}
