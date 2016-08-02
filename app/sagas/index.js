import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects'
import { fetchLastQuestion } from '../actions';
import api from '../services/api';

function* fetchLastQuestionTask(action) {
  const response = yield call(api.fetchLastQuestion, action.tag);
}

function* startListenQuestionsTask(action) {
  action.tags.forEach(tag => {
    console.log(tag);
  });
};

function* watchFetchLastQuestion() {
  yield* takeEvery('LAST_QUESTION_FETCH_REQUEST', fetchLastQuestionTask);
}

function* watchStartListenQuestions() {
  yield* takeEvery('START_LISTEN_QUESTIONS', startListenQuestionsTask);
}

export default function* rootSaga() {
  yield [
    watchStartListenQuestions()
  ];
};
