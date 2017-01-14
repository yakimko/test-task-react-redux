import { CALL_API, isRSAA } from 'redux-api-middleware';

export default () => next => async(action) => {
    if (!isRSAA(action)) {
        return next(action);
    }

    const callAPI = action[CALL_API];

    if (__DEVELOPMENT__) {
        callAPI.endpoint = `mocks${callAPI.endpoint}/results.json`;
    }

    return next(action);
};
