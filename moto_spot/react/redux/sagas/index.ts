import { all, fork } from 'redux-saga/effects';
import watchRiderCheckinRequests from './RiderCheckinSaga';
import watchMapInfoSagas from './MapInfoSaga';

export function* rootSaga() {
    yield all([fork(watchRiderCheckinRequests), fork(watchMapInfoSagas)]);
}
