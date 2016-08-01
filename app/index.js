const React = require('react');
const ReactDOM = require('react-dom');

import 'babel-polyfill';

import configureStore from './store/configureStore';

const store = configureStore();

store.dispatch({
  type: 'START_LISTEN_QUESTIONS',
  tags: ['reactjs', 'redux']
});

function App() {
  return (
    <div>Test</div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
