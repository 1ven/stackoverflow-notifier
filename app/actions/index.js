import { createActions } from '../utils';

export const fetchLastQuestion = createActions(
  'LAST_QUESTION_FETCH_REQUEST',
  'LAST_QUESTION_FETCH_SUCCESS',
  'LAST_QUESTION_FETCH_FAILURE'
);

export function startListenQuestions(tags) {
  return {
    type: 'START_LISTEN_QUESTIONS',
    payload: {
      tags,
    },
  };
}
