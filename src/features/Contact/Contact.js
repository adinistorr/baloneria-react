import React from 'react';
import {Form, Col, Button, Container, Row, Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons';
import {INSTAGRAM_URL, FACEBOOK_URL} from '../../utils/constants';

import './Contact.css';

export default function Portfolio() {
    return (
        <>
            <div className="portfolio-card-header-background shadow"></div>
            <h1 className="portfolio-title">Contact</h1>
            <Container className="contact my-5">
                <Row>
                    <Form className="col-6">
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridlName">
                                <Form.Label>Nume</Form.Label>
                                <Form.Control placeholder="Nume" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridfName">
                                <Form.Label>Prenume</Form.Label>
                                <Form.Control placeholder="Prenume" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Oras</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDistrict">
                                <Form.Label>Localitate</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Tipul evenimentului</Form.Label>
                                <Form.Control as="select" defaultValue="Alege...">
                                    <option>Alege...</option>
                                    <option>Inaugurare</option>
                                    <option>Corporate</option>
                                    <option>Aniversare</option>
                                    <option>Botez</option>
                                    <option>Nunta</option>
                                    <option>Altul (specific in descriere)</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Detalii</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <div className="social-contact d-flex flex-column col-6">
                        <Card className="background-fb">
                            <a target="_blank" rel="noopener noreferrer" href={FACEBOOK_URL}>
                                <Card.Body>
                                    <FontAwesomeIcon icon={faFacebook} />
                                    <span className="msg-fb">Contacteaza-ne pe Facebook</span>
                                </Card.Body>
                            </a>
                        </Card>
                        <Card className="background-insta">
                            <a target="_blank" rel="noopener noreferrer" href={INSTAGRAM_URL}>
                                <Card.Body>
                                    <FontAwesomeIcon icon={faInstagram} />
                                    <span className="msg-insta">Contacteaza-ne pe Instagram</span>
                                </Card.Body>
                            </a>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}
