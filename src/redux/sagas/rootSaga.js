import {takeLatest} from "redux-saga/effects";
import {GET_ALL_CURRENCY} from "../actions/actionTypes";
import * as currencySaga from "./currencySaga";

function* rootSaga() {
    yield takeLatest(GET_ALL_CURRENCY, currencySaga.getAllCurrencySaga);
}

export default rootSaga;