import {
    USER_REMOVE,
    AJAX_USERS_REQUEST,
    AJAX_USERS_SUCCESS,
    AJAX_USERS_FAILURE
} from '../../constants/users';

const initialState = {
    items: [],
    isFetching: false
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case AJAX_USERS_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case AJAX_USERS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isFetching: false
            };
        case AJAX_USERS_FAILURE:
            return {
                ...state,
                items: [],
                isFetching: false
            };
        case USER_REMOVE:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.userId)
            };
        default:
            return state;
    }
};

export default users;
