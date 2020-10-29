import React from 'react';
import './OffersCard.css';
import {Container, Row, Card} from 'react-bootstrap';

export default function OffersCard({offers}) {
    return (
        <>
            <Container>
                <Row className="public-card-row">
                    {offers?.map(offer => (
                        <span
                            key={offer.id}
                            className={`my-3 col col-sm-12 col-lg-4 d-flex align-items-stretch public-offer-center`}
                        >
                            <Card key={offer.id}>
                                <Card.Img className="public-offer-img" variant="top" src={offer.imageUrl} alt="offer" />

                                <Card.Body>
                                    <Card.Title>{offer.title}</Card.Title>
                                    <Card.Text>{offer.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </span>
                    ))}
                </Row>
            </Container>
        </>
    );
}
