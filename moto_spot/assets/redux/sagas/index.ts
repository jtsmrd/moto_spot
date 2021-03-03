import { all, fork } from 'redux-saga/effects';
import watchRiderCheckinRequests from './RiderCheckinSaga';

export function* rootSaga() {
    yield all([fork(watchRiderCheckinRequests)]);
}
