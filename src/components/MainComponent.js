import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Accommodation from './AccommodationComponent';
import About from './AboutComponent';
import Contact from './ContactComponet';
import AccommDetail from './AccommDetailsComponent';
import { fetchAccommodations, fetchActivities, fetchLeaders, postFeedback, postReview, fetchReviews } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
        accommodations: state.accommodations,
        activities: state.activities,
        leaders: state.leaders,
        reviews: state.reviews
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAccommodations: () => { dispatch(fetchAccommodations()) },
    fetchActivities: () => { dispatch(fetchActivities()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    postReview: (accomId, rating, author, review) => dispatch(postReview(accomId, rating, author, review)),
    fetchReviews: () => { dispatch(fetchReviews()) }
});

class MainComponent extends Component {

    componentDidMount() {
        this.props.fetchAccommodations();
        this.props.fetchActivities();
        this.props.fetchLeaders();
        this.props.fetchReviews();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    accommodation={this.props.accommodations.accommodations.filter((accommodation) => accommodation.featured)[0]}
                    accommodationsLoading={this.props.accommodations.isLoading}
                    accommodationErrMess={this.props.accommodations.errMess}
                    activity={this.props.activities.activities.filter((activity) => activity.featured)[0]}
                    activitiesLoading={this.props.activities.isLoading}
                    activitiesErrMess={this.props.activities.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const AccomId = ({ match }) => {
            return (
                <AccommDetail accommodation={this.props.accommodations.accommodations.filter((accommodation) => accommodation.id === parseInt(match.params.accomId, 10))[0]}
                    isLoading={this.props.accommodations.isLoading}
                    errMess={this.props.accommodations.errMess}
                    reviews={this.props.reviews.reviews.filter((review) => review.accomId === parseInt(match.params.accomId, 10))}
                    reviewsErrMess={this.props.reviews.errMess}
                    postReview={this.props.postReview}
                />
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/accommodation' component={() => <Accommodation accommodations={this.props.accommodations} />} />
                    <Route path='/accommodation/:accomId' component={AccomId} />
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
                    <Redirect to="/home" />
                </Switch>
                </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

MainComponent.propTypes = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));