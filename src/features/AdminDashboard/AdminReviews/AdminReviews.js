import React from 'react';
import ReviewsList from '../../../components/common/ReviewsList/ReviewsList';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/AdminDashboard.module.css';

export default function AdminReviews() {
    return (
        <>
            <div className="d-flex justify-content-between">
                <span className={`h1 mb-3`}>Reviews</span>
                <Link to="/admin/reviews/add">
                    <button className={`btn shadow-sm ${styles['btn-add']}`}>
                        <FontAwesomeIcon className={`${styles['add-icon']}`} icon={faPlus} />
                    </button>
                </Link>
            </div>
            <ReviewsList isAdmin={true} />
        </>
    );
}
