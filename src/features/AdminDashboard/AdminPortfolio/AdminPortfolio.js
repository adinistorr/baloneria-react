import React from 'react';
import PortfolioList from '../../../components/common/PortfolioList/PortfolioList';
import {Link} from 'react-router-dom';
import styles from '../styles/AdminDashboard.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

export default function AdminPortfolio() {
    return (
        <>
            <div className="d-flex justify-content-between">
                <span className={`h1 mb-3`}>Portfolio</span>
                <Link to="/admin/portfolio/add">
                    <button className={`btn shadow-sm ${styles['btn-add']}`}>
                        <FontAwesomeIcon className={`${styles['add-icon']}`} icon={faPlus} />
                    </button>
                </Link>
            </div>

            <PortfolioList isAdmin={true} />
        </>
    );
}
