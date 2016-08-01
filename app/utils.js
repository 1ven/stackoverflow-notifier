export function createActions(types) {
  return {
    request(payload) {
      return {
        type: types[0],
        payload,
      };
    },
    success(payload) {
      return {
        type: types[1],
        payload,
      };
    },
    failure(error) {
      return {
        type: types[2],
        error: error || 'Something bad happened',
      };
    },
  };
}
