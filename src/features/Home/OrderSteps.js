import React from 'react';
import colors from '../../assets/images/colors.png';
import decor from '../../assets/images/decor.png';
import party from '../../assets/images/party.png';
import './styles/OrderSteps.css';
import {Container, Row, CardDeck, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function OrderSteps() {
    return (
        <>
            <h1 className="text-center my-5">We create, you celebrate</h1>

            <Container className="mb-5">
                <Row className="justify-content-center">
                    <CardDeck className="col">
                        <Card className="card-elegant">
                            <Card.Img variant="top" src={colors} style={{opacity: 0.7}} />
                            <Card.Body className="card-block">
                                <Card.Title className="text-uppercase">Paleta de culori</Card.Title>
                                <Card.Text className="card-text text-justify">
                                    Selecteaza culorile din preferate din catalog.
                                </Card.Text>
                            </Card.Body>
                            <Link to="/#" className="btn btn-link text-uppercase">
                                Selecteaza
                            </Link>
                        </Card>
                        <Card className="card-elegant">
                            <Card.Img variant="top" src={decor} style={{opacity: 0.7}} />
                            <Card.Body className="card-block">
                                <Card.Title className="text-uppercase">Tipul decorului</Card.Title>
                                <Card.Text className="card-text text-justify">
                                    Alege tipul de aranjament care se potriveste cel mai bine evenimentului tau.
                                </Card.Text>
                            </Card.Body>
                            <Link to="/#" className="btn btn-link text-uppercase">
                                Alege
                            </Link>
                        </Card>
                        <Card className="card-elegant">
                            <Card.Img variant="top" src={party} style={{opacity: 0.7}} />
                            <Card.Body className="card-block">
                                <Card.Title className="text-uppercase">Solicita Oferta </Card.Title>
                                <Card.Text className="card-text text-justify">
                                    Trimite-ne culorile si aranjamentele tale preferate si noi vom reveni cu o oferta in
                                    cel mai scurt timp.
                                </Card.Text>
                            </Card.Body>
                            <Link to="/#" className="btn btn-link text-uppercase">
                                Contact
                            </Link>
                        </Card>
                    </CardDeck>
                </Row>
            </Container>
        </>
    );
}
