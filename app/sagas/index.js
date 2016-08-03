import { takeEvery } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects'
import { fetchLastQuestion } from '../actions';
import api from '../services/api';

function* fetchLastQuestionTask(action) {
  try {
    const response = yield call(api.fetchLastQuestion, action.payload.tag);
    const derivedQuestion = response.result.items[0];
    const questions = yield select(state => state.questions);
    const isQuestionFresh = questions.filter(q => q.question_id === derivedQuestion.question_id).length === 0;

    if (isQuestionFresh) {
      yield put(fetchLastQuestion.success({
        question: derivedQuestion,
      }));
    }
  } catch(err) {
    yield put(fetchLastQuestion.failure(err.message));
  }
}

function* startListenQuestionsTask(action) {
  for (let tag of action.payload.tags) {
    yield put(fetchLastQuestion.request({ tag }));
  }
};

function* watchFetchLastQuestion() {
  yield* takeEvery('LAST_QUESTION_FETCH_REQUEST', fetchLastQuestionTask);
}

function* watchStartListenQuestions() {
  yield* takeEvery('START_LISTEN_QUESTIONS', startListenQuestionsTask);
}

export default function* rootSaga() {
  yield [
    watchStartListenQuestions(),
    watchFetchLastQuestion(),
  ];
};
