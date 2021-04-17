import { put, all, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from '../ActionTypes';
import { updateVisibleRiderCheckinsAction } from '../Actions';

function* mapBoundsUpdated() {
    yield put(updateVisibleRiderCheckinsAction({}));
}

export default function* watchMapInfoSagas() {
    yield all([takeLatest(ActionTypes.SET_MAP_BOUNDS, mapBoundsUpdated)]);
}
