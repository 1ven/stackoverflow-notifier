import 'babel-polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { startListenQuestions } from './actions';

const store = configureStore();

class App extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
    };
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        questions: store.getState().questions,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    store.dispatch(startListenQuestions([
      'reactjs',
      'redux',
      'css',
      'javascript',
      'html',
      'angular',
      'java',
    ]));
  }

  render() {
    const { questions } = this.state;

    return questions.length ? (
      <div>
        {questions.map((q, i) =>
          <div key={i}>{q.data.title}</div>
        )}
      </div>
    ) : (
      <div>Questions not found.</div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
