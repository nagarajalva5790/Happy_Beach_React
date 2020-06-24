import * as ActionTypes from './ActionTypes';

export const Activities = (state = { isLoading: true,
    errMess: null,
    activities:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ACTIVITIES:
            return {...state, isLoading: false, errMess: null, activities: action.payload};

        case ActionTypes.ACTIVITIES_LOADING:
            return {...state, isLoading: true, errMess: null, activities: []}

        case ActionTypes.ACTIVITIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};