import {put} from "redux-saga/effects";
import * as api from "../../api/apiService";
import {
    GET_ALL_CURRENCY_ERRORS,
    GET_ALL_CURRENCY_REQUEST, GET_ALL_CURRENCY_RESPONSE,
} from "../actions/actionTypes";

export function* getAllCurrencySaga() {
    yield put({type: GET_ALL_CURRENCY_REQUEST});
    try {
        const {data} = yield api.getAllCurrencyApi();
        yield put({type: GET_ALL_CURRENCY_RESPONSE, currency: data});
    } catch (e) {
        yield put({
            type: GET_ALL_CURRENCY_ERRORS,
            message:
                "Something went wrong! Try again later. Sorry, it's not FE developer",
        });
    }
}