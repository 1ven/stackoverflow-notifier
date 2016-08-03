const INITIAL_STATE = {
  questions: [],
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_QUESTION':
      return Object.assign({}, state, {
        questions: [...state.questions, action.payload.question],
      });
    default:
      return state;
  }
}
