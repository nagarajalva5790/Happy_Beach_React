import * as ActionTypes from './ActionTypes';

export const Accommodations = (state = { isLoading: true,
    errMess: null,
    accommodations:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ACCOMMODATIONS:
            return {...state, isLoading: false, errMess: null, accommodations: action.payload};

        case ActionTypes.ACCOMMODATIONS_LOADING:
            return {...state, isLoading: true, errMess: null, accommodations: []}

        case ActionTypes.ACCOMMODATIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};