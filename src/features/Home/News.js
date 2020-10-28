import React from 'react';
import {Carousel, Container, Row} from 'react-bootstrap';

import './styles/News.css';

export default function News({events}) {
    return (
        <Container>
            <h1 className="text-center">Noutati</h1>
            <Row className="justify-content-center">
                <Carousel className="carousel news col-md-10 col-md-offset-2 my-5">
                    {events?.map(event => (
                        <Carousel.Item key={event.id}>
                            <img className="d-block carousel-image" src={event.imageUrl} alt="news" />
                            <div className="black-overlay"></div>
                            <Carousel.Caption>
                                <h3>{event.title}</h3>
                                <p className="text-overflow text-center">{event.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Row>
        </Container>
    );
}
