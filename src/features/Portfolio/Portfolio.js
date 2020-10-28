import React from 'react';

import PortfolioList from '../../components/common/PortfolioList/PortfolioList';
import './PortfolioCard.css';

export default function Portfolio() {
    return (
        <>
            <div className="portfolio-card-header-background shadow"></div>
            <h1 className="portfolio-title">Evenimente</h1>
            <PortfolioList isPublic={true} />;
        </>
    );
}
