import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash, faToggleOn, faToggleOff} from '@fortawesome/free-solid-svg-icons';

import {AlertMessageContext} from '../../../components/common/AlertMessageContext/AlertMessageContext';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import DeleteModal from '../../../components/common/DeleteModal';

import OffersCard from '../../../features/Offers/OffersCard';
import styles from '../../../features/AdminDashboard/styles/AdminDashboard.module.css';

export default function AdminOffers({isAdmin, isPublic}) {
    const db = firebase.firestore();

    const [offers, setOffers] = useState([]);
    const [offerToDelete, seOfferToDelete] = useState();

    const {setAlertMessage} = useContext(AlertMessageContext);

    useEffect(() => {
        let unsub;
        unsub = db
            .collection('offers')
            .orderBy('offerDate', 'desc')
            .onSnapshot(res => {
                const offerList = [];
                res.forEach(doc => {
                    offerList.push({id: doc.id, ...doc.data()});

                    if (isPublic && !doc.data().active) {
                        offerList.pop({id: doc.id, ...doc.data()});
                    }
                });
                setOffers(offerList);
            });
        return () => {
            typeof unsub === 'function' && unsub();
        };
    }, [db, isPublic]);

    async function handleDeleteOffer(toDelete) {
        try {
            await db.collection('offers').doc(toDelete.id).delete();
            seOfferToDelete(null);
            setOffers(offers.filter(offer => offer !== toDelete));
            setAlertMessage({
                message: 'Offer successfully deleted',
                type: 'success',
            });
        } catch (error) {
            setAlertMessage({
                message: error.message,
                type: 'danger',
            });
        }
    }

    async function handleActivateOffer(offer) {
        try {
            await db.collection('offers').doc(offer.id).update({
                active: !offer.active,
            });
            setAlertMessage({
                message: !offer.active ? 'Offer is active' : 'Offer is disabled',
                type: 'success',
            });
        } catch (error) {
            setAlertMessage({
                message: error.message,
                type: 'danger',
            });
        }
    }

    return (
        <>
            {isPublic && <OffersCard offers={offers} />}

            <DeleteModal
                show={!!offerToDelete}
                onHide={() => seOfferToDelete(undefined)}
                delEv={() => handleDeleteOffer(offerToDelete)}
                obj={offerToDelete}
            />
            {isAdmin && (
                <div className={`d-flex flex-wrap ${styles.admin}`}>
                    {offers.map(offer => (
                        <span
                            key={offer.id}
                            className={`my-3 col col-sm-6 col-lg-4 ${styles.center} ${
                                offer.active ? '' : styles['disable-offer']
                            }`}
                        >
                            <Card style={{width: '18rem'}} htmlFor={offer.id}>
                                {offer.imageUrl && <Card.Img variant="top" src={offer.imageUrl} alt="offer" />}
                                <Card.Body>
                                    <Card.Title>{offer.title}</Card.Title>
                                    <Card.Text>{offer.description}</Card.Text>
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            variant="warning"
                                            onClick={() => {
                                                handleActivateOffer(offer);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={offer.active ? faToggleOn : faToggleOff} />
                                        </Button>
                                        <Link
                                            to={`/admin/offers/update/${offer.id}`}
                                            className={`btn ${styles['btn-update']}`}
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                seOfferToDelete(offer);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </span>
                    ))}
                </div>
            )}
        </>
    );
}
