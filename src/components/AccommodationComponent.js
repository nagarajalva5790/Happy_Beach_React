import React from 'react';
import {
    Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

AccommodationComponent.propTypes = {

};

function RenderRoomItem({ accommodation, onClick }) {
    return (
        <Card>
            <Link to={`/accommodation/${accommodation.id}`} >
                <CardImg width="100%" src={baseUrl + accommodation.image} alt={accommodation.name} />
                <CardImgOverlay>
                    <CardTitle>{accommodation.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function AccommodationComponent(props) {

    const room = props.accommodations.accommodations.map((accommodation) => {
        return (
            <div className="col-12 col-md-5 m-1" key={accommodation.id}>
                <RenderRoomItem accommodation={accommodation} onClick={props.onClick} />
            </div>
        );
    });

    if (props.accommodations.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.accommodations.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.accommodations.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Accommodation</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Rooms</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {room}
            </div>
        </div>
    );
}

export default AccommodationComponent;