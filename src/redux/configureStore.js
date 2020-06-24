import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';

import {Accommodations} from './accommodations';
import{Activities} from './activities';
import {Leaders} from './leaders'
import { InitialFeedback } from './forms';
import {Reviews} from './reviews';

export const ConfigureStore = () => {   
    const store = createStore(
        combineReducers({
            accommodations: Accommodations,
            activities: Activities,
            leaders: Leaders,
            reviews: Reviews,
            ...createForms({
                feedback: InitialFeedback
            })   
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}