import React from 'react';
import {Carousel, Container, Row} from 'react-bootstrap';

import './styles/Reviews.css';

export default function Reviews({reviews}) {
    return (
        <>
            <Container>
                <h1 className="text-center">Recenzii</h1>
                <Row className="justify-content-center">
                    <Carousel className="carousel reviews col-md-10 col-md-offset-2 my-5">
                        {reviews?.map(review => (
                            <Carousel.Item key={review.id}>
                                <Carousel.Caption>
                                    <img className="carousel-image" src={review.imageUrl} alt="news" />
                                    <h3>{review.title}</h3>
                                    <p className="text-center">{review.description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Row>
            </Container>
        </>
    );
}
