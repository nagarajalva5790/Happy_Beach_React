import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

AboutComponent.propTypes = {

};


function RenderLeader({ leader }) {
    return (
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + leader.image} alt={leader.name} style={{ height: 100, width: 100 }} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    );

}

function LeaderList(props) {

    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <Fade in key={leader.id}>
                <div className="col-12 mt-2">
                    <RenderLeader leader={leader} />
                </div>
            </Fade>
        );
    });

    if (props.leaders.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.leaders.errMess) {
        return (
            <div className="col-12">
                <h4>{props.leaders.errMess}</h4>
            </div>
        );
    }
    else {
        return (
            <Media list>
                <Stagger in>
                    {leaders}
                </Stagger>
            </Media>
        );
    }
}

function AboutComponent(props) {
    return (

        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Beach Happy Resort, located on the famous Ullal-Someshwar beach, is a resort that is set in a historical, traditional, cultural and folk lore background. It is the first beach resort of Karnataka.</p>
                    <p>Discovered by the Portuguese, as legend has it that when they landed, they exclaimed OLALA, on a map its still there and Rani Abakka Chowta the first Tuluwa queen who ruled from 1526 -70 in Ullal and the Chowta Dynasty from Udupi to Kasargod.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 1975</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">Alva's Pvt Lmt.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">150</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Why do we love the sea? It is because it has some potent power to make us think things we like to think.</p>
                                <footer className="blockquote-footer">Robert Henri,
                                <cite title="Source Title"> An organizer of the group known as "The Eight,"</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <LeaderList leaders={props.leaders} />
                </div>
            </div>
        </div>
    );
}

export default AboutComponent;