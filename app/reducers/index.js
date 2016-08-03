const INITIAL_STATE = {
  questions: [],
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LAST_QUESTION_FETCH_SUCCESS':
      return Object.assign({}, state, {
        questions: [...state.questions, action.payload.question],
      });
    default:
      return state;
  }
}
