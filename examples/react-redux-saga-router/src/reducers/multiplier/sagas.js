import { delay } from 'redux-saga';
import { fork, put, takeEvery, all } from 'redux-saga/effects';

function* handleFetchMultiply() {
  yield delay(100);
  yield put({ type: '@@Multiplier/SUCCESS' });
}

function* watchFetchMultiply() {
  yield takeEvery('@@Multiplier/FETCH', handleFetchMultiply);
}

export default function* rootSaga() {
  yield all([fork(watchFetchMultiply)]);
}
