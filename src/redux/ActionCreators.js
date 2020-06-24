import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchAccommodations = () => (dispatch) => {

    dispatch(accommodationLoading(true));

    return fetch(baseUrl + 'accommodations')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(accommodations => dispatch(addAccommodations(accommodations)))
        .catch(error => dispatch(accommodationsFailed(error.message)));
}

export const accommodationLoading = () => ({
    type: ActionTypes.ACCOMMODATIONS_LOADING
});

export const accommodationsFailed = (errmess) => ({
    type: ActionTypes.ACCOMMODATIONS_FAILED,
    payload: errmess
});

export const addAccommodations = (accommodations) => ({
    type: ActionTypes.ADD_ACCOMMODATIONS,
    payload: accommodations
});

export const fetchActivities = () => (dispatch) => {

    dispatch(activitiesLoading(true));

    return fetch(baseUrl + 'activities')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(activities => dispatch(addActivities(activities)))
        .catch(error => dispatch(activitiesFailed(error.message)));
}

export const activitiesLoading = () => ({
    type: ActionTypes.ACTIVITIES_LOADING
});

export const activitiesFailed = (errmess) => ({
    type: ActionTypes.ACTIVITIES_FAILED,
    payload: errmess
});

export const addActivities = (activities) => ({
    type: ActionTypes.ADD_ACTIVITIES,
    payload: activities
});

export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


export const postFeedback = (feedback) => (dispatch) => {
        
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};



export const addReview = (review) => ({
    type: ActionTypes.ADD_REVIEW,
    payload: review
});

export const postReview = (accomId, rating, author, review) => (dispatch) => {

    const newReview = {
        accomId: accomId,
        rating: rating,
        author: author,
        review: review
    };
    newReview.date = new Date().toISOString();
    
    return fetch(baseUrl + 'reviews', {
        method: "POST",
        body: JSON.stringify(newReview),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addReview(response)))
    .catch(error =>  { console.log('post Reviews', error.message); alert('Your Review could not be posted\nError: '+error.message); });
};


export const fetchReviews = () => (dispatch) => {
    return fetch(baseUrl + 'reviews')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(reviews => dispatch(addReviews(reviews)))
        .catch(error => dispatch(reviewsFailed(error.message)));
};

export const reviewsFailed = (errmess) => ({
    type: ActionTypes.REVIEWS_FAILED,
    payload: errmess
});

export const addReviews = (reviews) => ({
    type: ActionTypes.ADD_REVIEWS,
    payload: reviews
});