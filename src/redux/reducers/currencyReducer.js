import {
    GET_ALL_CURRENCY_ERRORS,
    GET_ALL_CURRENCY_REQUEST, GET_ALL_CURRENCY_RESPONSE

} from "../actions/actionTypes";


const initialState = {
    currency: [],
    isLoading: false,
    errors: [],
};

export default function currencyReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_CURRENCY_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ALL_CURRENCY_RESPONSE:
            return {
                ...state,
                currency: action.currency,
                isLoading: false,
            };
        case GET_ALL_CURRENCY_ERRORS:
            return {
                ...state,
                errors: action.message,
            };

        default:
            return state;
    }
}