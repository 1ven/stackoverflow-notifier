import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger();

  const store = createStore(
    state => ({}),
    initialState,
    applyMiddleware(
      sagaMiddleware,
      loggerMiddleware
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
