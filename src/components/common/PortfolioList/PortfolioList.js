import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import DeleteModal from '../../../components/common/DeleteModal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons';

import News from '../../../features/Home/News';
import PortfolioCard from '../../../features/Portfolio/PortfolioCard';
import styles from '../../../features/AdminDashboard/styles/AdminDashboard.module.css';

export default function PortfolioList({isAdmin, isNews, isPublic}) {
    const db = firebase.firestore();

    const [eventToDelete, setEventToDelete] = useState();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        let unsub;
        unsub = db
            .collection('events')
            .orderBy('eventDate', 'desc')
            .limit(isNews ? 3 : 100)
            .onSnapshot(res => {
                const eventList = [];
                res.forEach(doc => {
                    eventList.push({id: doc.id, ...doc.data()});
                });
                setEvents(eventList);
            });
        return () => {
            typeof unsub === 'function' && unsub();
        };
    }, [db, isNews]);

    async function handleDeleteEvent(toDelete) {
        if (!isAdmin) {
            return;
        }

        try {
            await db.collection('events').doc(toDelete.id).delete();
            setEventToDelete(null);
            setEvents(events.filter(event => event !== toDelete));
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    }

    return (
        <>
            {isNews && <News events={events} />}

            {isPublic && <PortfolioCard events={events} />}

            <DeleteModal
                show={!!eventToDelete}
                onHide={() => setEventToDelete(undefined)}
                delEv={() => handleDeleteEvent(eventToDelete)}
                obj={eventToDelete}
            />

            {isAdmin && (
                <>
                    {events?.map(event => (
                        <div className={styles.admin} key={event.id}>
                            <div className={`card mb-3 ${styles['card-row']}`} htmlFor={event.id}>
                                {event.imageUrl && (
                                    <img
                                        className={`${styles['portfolio-img']} shadow-sm border border-light m-3`}
                                        src={event.imageUrl}
                                        alt="event"
                                        width="200"
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{event.title}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <div className="d-flex justify-content-end">
                                        <Link
                                            to={`/admin/portfolio/update/${event.id}`}
                                            className={`btn ${styles['btn-update']}`}
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                setEventToDelete(event);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
