import React from 'react';
import styles from './styles/Homepage.module.css';

import AboutUs from './AboutUs';
import OrderSteps from './OrderSteps';
import PortfolioList from '../../components/common/PortfolioList/PortfolioList';
import ReviewsList from '../../components/common/ReviewsList/ReviewsList';
import {Link} from 'react-router-dom';

export default function Homepage() {
    return (
        <div>
            <div className={`${styles['fullscreen-background']}`}></div>
            <div className={styles.logo}></div>
            <div className={`${styles['buttons-header']}`}>
                <Link to="/contact" className={`${styles['button-header']}`}>
                    CONTACT
                </Link>
                <Link to="/oferte" className={`${styles['button-header']}`}>
                    OFERTE
                </Link>
            </div>
            <AboutUs />
            <OrderSteps />
            <PortfolioList isNews={true} />
            <ReviewsList isOnHomepage={true} />
        </div>
    );
}
