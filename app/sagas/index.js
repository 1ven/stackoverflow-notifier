import { takeEvery, delay } from 'redux-saga';
import { call, select, put } from 'redux-saga/effects'
import { fetchLastQuestion, addQuestion } from '../actions';
import api from '../services/api';

function* fetchLastQuestionTask(action) {
  const { tag } = action.payload;
  try {
    const response = yield call(api.fetchLastQuestion, action.payload.tag);

    yield put(fetchLastQuestion.success({
      question: {
        data: response.result.items[0],
        tag,
      },
    }));
  } catch(err) {
    yield put(fetchLastQuestion.failure(err.message));
  }
}

function* handleFetchLastQuestionSuccess(action) {
  const { question } = action.payload;
  const questions = yield select(state => state.questions);
  const isQuestionFresh = questions.filter(q => q.data.question_id === question.data.question_id).length === 0;
  const shouldDisplayNotification = questions.filter(q => q.tag === question.tag).length;

  if (isQuestionFresh) {
    yield put(addQuestion(question));
  }

  if (isQuestionFresh && shouldDisplayNotification) {
    new Notification('New question!', {
      body: question.data.title,
    });
  }
}

function* startListenQuestionsTask(action) {
  while (true) {
    for (let tag of action.payload.tags) {
      yield put(fetchLastQuestion.request({ tag }));
    }

    yield call(delay, 6000);
  }
};

function* watchFetchLastQuestion() {
  yield* takeEvery('LAST_QUESTION_FETCH_REQUEST', fetchLastQuestionTask);
}

function* watchFetchLastQuestionSuccess() {
  yield* takeEvery('LAST_QUESTION_FETCH_SUCCESS', handleFetchLastQuestionSuccess);
}

function* watchStartListenQuestions() {
  yield* takeEvery('START_LISTEN_QUESTIONS', startListenQuestionsTask);
}

export default function* rootSaga() {
  yield [
    watchStartListenQuestions(),
    watchFetchLastQuestion(),
    watchFetchLastQuestionSuccess(),
  ];
};
