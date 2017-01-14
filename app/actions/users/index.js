import { CALL_API } from 'redux-api-middleware';

import {
    USER_REMOVE,
    AJAX_USERS_REQUEST,
    AJAX_USERS_SUCCESS,
    AJAX_USERS_FAILURE
} from '../../constants/users';

export const fetchUsers = () => async dispatch => {
    await dispatch({
        [CALL_API]: {
            endpoint: '/api/users',
            method: 'GET',
            types: [
                AJAX_USERS_REQUEST,
                AJAX_USERS_SUCCESS,
                AJAX_USERS_FAILURE
            ]
        }
    });
};

export const removeUser = userId => ({
    type: USER_REMOVE,
    payload: {
        userId
    }
});
