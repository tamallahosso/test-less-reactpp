import {combineReducers} from "redux";
import currencyReducer from "./currencyReducer";


const appReducer = combineReducers({
    currencyReducer
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;