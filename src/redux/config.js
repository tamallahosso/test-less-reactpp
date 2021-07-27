import { createStore, applyMiddleware,  } from "redux";
import createSagaMiddleware from "redux-saga";
import combinedReducers from "./reducers";
import rootSaga from "./sagas/rootSaga";
import {composeWithDevTools} from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const middleware = [sagaMiddleware];
    const store = createStore(
        combinedReducers,
        composeWithDevTools(applyMiddleware(...middleware))
    );
    sagaMiddleware.run(rootSaga, store.dispatch);

    return store;
}