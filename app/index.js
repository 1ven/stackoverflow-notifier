import 'babel-polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';

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
    store.dispatch({
      type: 'START_LISTEN_QUESTIONS',
      tags: ['reactjs', 'redux'],
    });
  }

  render() {
    const { questions } = this.state;

    return questions.length ? (
      questions.map((q, i) =>
        <div>{q.title}</div>
      )
    ) : (
      <div>Questions not found.</div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
