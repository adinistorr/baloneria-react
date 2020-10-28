import React from 'react';
import './PortfolioCard.css';

import {Container, Row} from 'react-bootstrap';

export default function PortfolioCard({events}) {
    return (
        <>
            <Container className="py-5">
                <Row className="my-5">
                    {events.map(event => (
                        <div className="col-lg-4 mb-3 mb-lg-4" key={event.id}>
                            <div className="hover hover-1 text-white rounded">
                                <img src={event.imageUrl} alt="" />
                                <div className="hover-overlay"></div>
                                <div className="hover-1-content px-5 py-4">
                                    <h3 className="hover-1-title text-uppercase font-weight-bold mb-0">
                                        {' '}
                                        <span className="font-weight-light"></span>
                                        {event.title}
                                    </h3>
                                    <p className="hover-1-description font-weight-light mb-0">{event.description} </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Row>
            </Container>
        </>
    );
}
