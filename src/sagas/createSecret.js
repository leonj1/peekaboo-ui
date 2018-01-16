import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

// worker Saga: will be fired on START_CREATE_SECRET actions
function* createSecret(action) {
   console.log('SAGA action: ' + JSON.stringify(action));
   try {
      console.log('SAGA: Attempting to call backend');
      const token = yield call(axios.post, "https://peekaboo-api.3camels.us/secrets", action.payload);
      console.log('SAGA Returned token: ' + JSON.stringify(token));
      let value = "";
      if (token) {
          value = token.data;
      }
      yield put({type: "SUCCESS_CREATE_SECRET", token: value});
   } catch (e) {
      yield put({type: "FAILED_CREATE_SECRET", current: e.message});
   }
}

function* mySaga() {
  yield takeLatest("START_CREATE_SECRET", createSecret);
}

export default mySaga;

