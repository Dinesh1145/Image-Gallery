// import {createStore} from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import combineReducers from './reducers/index';
import imageSaga from './ReduxSaga';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: combineReducers,
    middleware: () => [sagaMiddleware]
});
sagaMiddleware.run(imageSaga);

export default store;


