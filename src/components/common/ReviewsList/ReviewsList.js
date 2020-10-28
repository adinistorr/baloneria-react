import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import DeleteModal from '../../../components/common/DeleteModal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import Reviews from '../../../features/Home/Reviews';

import styles from '../../../features/AdminDashboard/styles/AdminDashboard.module.css';

export default function ReviewsList({isAdmin, isOnHomepage}) {
    const db = firebase.firestore();

    const [reviews, setReviews] = useState([]);
    const [reviewToDelete, setreviewToDelete] = useState();

    useEffect(() => {
        let unsub;
        unsub = db
            .collection('reviews')
            .orderBy('reviewDate', 'desc')
            .onSnapshot(res => {
                const reviewList = [];
                res.forEach(doc => {
                    reviewList.push({id: doc.id, ...doc.data()});
                });
                setReviews(reviewList);
            });
        return () => {
            typeof unsub === 'function' && unsub();
        };
    }, [db]);

    async function handleDeletereview(toDelete) {
        if (!isAdmin) {
            return;
        }

        try {
            await db.collection('reviews').doc(toDelete.id).delete();
            setreviewToDelete(null);
            setReviews(reviews.filter(review => review !== toDelete));
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    }

    return (
        <>
            <DeleteModal
                show={!!reviewToDelete}
                onHide={() => setreviewToDelete(undefined)}
                delEv={() => handleDeletereview(reviewToDelete)}
                obj={reviewToDelete}
            />

            {isOnHomepage && <Reviews reviews={reviews} />}

            {isAdmin && (
                <>
                    {reviews?.map(review => (
                        <div className={isAdmin ? styles.admin : styles.public} key={review.id}>
                            <div className={`card mb-3 ${styles['card-row']}`} htmlFor={review.id}>
                                {review.imageUrl && (
                                    <img
                                        className={`${styles['review-img']} shadow-sm border border-light m-3`}
                                        src={review.imageUrl}
                                        alt="review"
                                        width="200"
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{review.title}</h5>
                                    <p className="card-text">{review.description}</p>
                                    {isAdmin && (
                                        <div className="d-flex justify-content-end">
                                            <Link
                                                to={`/admin/reviews/update/${review.id}`}
                                                className={`btn ${styles['btn-update']}`}
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                            </Link>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    setreviewToDelete(review);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
