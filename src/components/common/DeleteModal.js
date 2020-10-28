import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteModal(props) {
    return (
        <>
            <Modal show={props.show} animation={ false } size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.obj?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want permanently delete this event?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button variant="danger" onClick={props.delEv}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
