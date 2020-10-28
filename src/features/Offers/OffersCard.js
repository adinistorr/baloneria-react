import React from 'react';
import './OffersCard.css';
import {Container, Row, Card} from 'react-bootstrap';

export default function OffersCard({offers}) {
    return (
        <>
            <Container>
                <Row className="no-gutters">
                    {offers?.map(offer => (
                        <Card className="col-md-3 offset-md-1 my-3" key={offer.id}>
                            <Card.Header>
                                <img src={offer.imageUrl} alt="offer" />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{offer.title}</Card.Title>
                                <Card.Text>{offer.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        </>
    );
}
