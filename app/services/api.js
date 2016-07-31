import 'isomorphic-fetch';

const API_ROOT = 'http://api.stackexchange.com/2.2/';

function callApi(endpoint, request) {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const requestWithHeaders = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...request,
  };

  return fetch(API_ROOT + endpoint, requestWithHeaders)
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        return Promise.reject(body);
      }

      return {
        result: body,
        receivedAt: Date.now(),
      };
    });
}

export default {
  fetchLastQuestion(tag) {
    return callApi('questions?pagesize=1&order=desc&sort=activity&tagged='+ tag +'&site=stackoverflow');
  },
};
