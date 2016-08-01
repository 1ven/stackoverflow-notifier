import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    state => ({}),
    initialState,
    applyMiddleware(
      sagaMiddleware
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
