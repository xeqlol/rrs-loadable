import { delay } from 'redux-saga';
import { fork, put, takeEvery, all } from 'redux-saga/effects';

function* handleFetchIncrement() {
  yield delay(100);
  yield put({ type: '@@Incrementer/SUCCESS' });
}

function* watchFetchIncrement() {
  yield takeEvery('@@Incrementer/FETCH', handleFetchIncrement);
}

export default function* rootSaga() {
  yield all([fork(watchFetchIncrement)]);
}
