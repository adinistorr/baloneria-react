import React from 'react';
import {Link} from 'react-router-dom';
import OffersList from '../../../components/common/OffersList/OffersList';
import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/AdminDashboard.module.css';

export default function AdminOffers() {
    return (
        <>
            <Container className="d-flex justify-content-between">
                <span className={`h1 mb-3`}>Offers</span>
                <Link to="/admin/offers/add">
                    <button className={`btn shadow-sm ${styles['btn-add']}`}>
                        <FontAwesomeIcon className={`${styles['add-icon']}`} icon={faPlus} />
                    </button>
                </Link>
            </Container>

            <OffersList isAdmin={true} />
        </>
    );
}
